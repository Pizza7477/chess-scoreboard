// The Four Departments
const departments = ["B-Troop", "HK-Troop", "K-Troop", "SHQ"]

// Results of each session. "placements" lists departments from 1st to last.
const sessions = [
    {
        name: "Session - 0",
        multiplier: 1,
        lichessScores: { "B-Troop": 0, "HK-Troop": 0, "K-Troop": 0, "SHQ": 0 }
    },

    {
        name: "Session - 1",
        multiplier: 1,
        lichessScores: { "B-Troop": 18, "HK-Troop": 20, "K-Troop": 8, "SHQ": 0 }
    }
];

function getPlacements(session) {
    return departments.slice().sort(function (a, b) {
        return session.lichessScores[b] - session.lichessScores[a];
    });
}

// A session with no entered scores should not affect the standings.
function hasLichessScores(session) {
    return departments.some(function (dept) {
        return session.lichessScores[dept] !== 0;
    });
}

// Points for each finishing position: 1st gets 4, 2nd gets 3 and so on
const pointsByPlace = [4, 3, 2, 1];

// One color per department (the keys must match departments name)
const departmentColors = {
    "B-Troop": "#22d3ee",
    "HK-Troop": "#3b82f6",
    "K-Troop": "#8b5cf6",
    "SHQ": "#10b981"
};

function addSessionPoints(session, totals) {
    if (!hasLichessScores(session)) {
        return;
    }

    getPlacements(session).forEach(function (dept, index) {
        totals[dept] += pointsByPlace[index] * session.multiplier;
    });
}

// Add up every session's points for every department
function calculateTotals() {
    const totals={};

    // Start every deparment on 0 points
    departments.forEach(function (dept){
        totals[dept] = 0;
    });

    // Go through each session, then each placement inside it
    sessions.forEach(function (session) {
        addSessionPoints(session, totals);
    });

    return totals
}


// Turn the totals into a sorted list: highest points first
function getRanking() {
    const totals = calculateTotals();

    const ranking = departments.map(function (dept) {
        let lichess = 0;
        let bestPlace = departments.length;

        sessions.forEach(function (session) {
            // Tiebreaker 1: add up the Lichess scores
            lichess += session.lichessScores[dept];

            // Tiebreaker 2: find the best (lowest) finishing position
            if (!hasLichessScores(session)) {
                return;
            }
            const place = getPlacements(session).indexOf(dept) + 1;
            if (place < bestPlace) {
                bestPlace = place;
            }
        });

        return { name: dept, points: totals[dept], lichess, bestPlace };
    });

    ranking.sort(function (a, b) {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        if (b.lichess !== a.lichess) {
            return b.lichess - a.lichess;
        }
        return a.bestPlace - b.bestPlace;
    });

    return ranking;
}

// Draw the leader box and the table on the page
function showScoreboard() {
    const ranking = getRanking();

    // Leader box: the first item in the sorted list
    const leaderBox = document.getElementById("leaderTeam");
    leaderBox.textContent = ranking[0].name + " (" + ranking[0].points + ")";
    leaderBox.style.color = departmentColors[ranking[0].name];


    // Table: clear it, then add one row per department
    const tableBody = document.getElementById("scoreTableBody");
    tableBody.innerHTML = "";

    ranking.forEach(function (team, index) {
        const row = document.createElement("tr");

        if (index === 0) {
            row.classList.add("first-place");
        }

        // The top 2 departments reach the final
        // let badge = "";
        // if (index < 2) {
        //    row.classList.add("finalist");
        //    badge = `<span class="finalist-badge">Finalist</span>`;
        //}

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.points}</td>
            <td>${team.lichess}</td>
        `;
        const teamNameCell = row.cells[1];
        teamNameCell.classList.add("team-name");
        teamNameCell.style.color = departmentColors[team.name];
        teamNameCell.style.fontWeight = "bold";
        
        tableBody.appendChild(row);
    });
}

showScoreboard();

// Work out everyone's total after each session
function getHistory() {
    const running = {};

    departments.forEach(function (dept) {
        running[dept] = 0;
    });

    const history = [];

    sessions.forEach(function (session) {
        addSessionPoints(session, running);

        // Save a COPY of the totals as they stand after this session
        history.push({ ...running });
    });

    return history;

}

function drawChart() {
    const history = getHistory();
    const ctx = document.getElementById("scoreChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            // The bottom axis: one label per session
            labels: sessions.map(function (session) {
                return session.name;
            }),
            // One line per department
            datasets: departments.map(function (dept) {
                return {
                    label: dept,
                    data: history.map(function (snapshot) {
                        return snapshot[dept];
                    }),
                    borderColor: departmentColors[dept],
                    backgroundColor: departmentColors[dept],
                    tension: 0.3
                };
            })
        },
        options: {
            plugins: {
                legend: { labels: { color: "#e2e8f0" } }
            },
            scales: {
                x: {
                    ticks: { color: "#cbd5e1" },
                    grid: { color: "rgba(148, 163, 184, 0.08)" }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: "#cbd5e1" },
                    grid: { color: "rgba(148, 163, 184, 0.08)" }
                }
            }
        }
    });
}

drawChart();