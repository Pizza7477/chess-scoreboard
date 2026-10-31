// The Four Departments
const departments = ["BTroop", "HKTroop", "KTroop", "SHQ"]

// Results of each session. "placements" lists departments from 1st to last.
const sessions = [
    {
        name: "Session 1",
        multiplier: 1,
        lichessScores: { BTroop: 52, HKTroop: 90, KTroop: 40, SHQ: 33 }
    },

    {
        name: "Session 2",
        multiplier: 1,
        lichessScores: { BTroop: 40, HKTroop: 50, KTroop: 20, SHQ: 63 }
    },

    {
        name: "Session 3",
        multiplier: 1,
        lichessScores: { BTroop: 30, HKTroop: 90, KTroop: 80, SHQ: 40 }
    },

   {
        name: "Session 4",
        multiplier: 1,
        lichessScores: { BTroop: 70, HKTroop: 80, KTroop: 70, SHQ: 30 }
    }
];

function getPlacements(session) {
    return departments.slice().sort(function (a, b) {
        return session.lichessScores[b] - session.lichessScores[a];
    });
}

// Points for each finishing position: 1st gets 4, 2nd gets 3 and so on
const pointsByPlace = [4, 3, 2, 1];

// Add up every session's points for every department
function calculateTotals() {
    const totals={};

    // Start every deparment on 0 points
    departments.forEach(function (dept){
        totals[dept] = 0;
    });

    // Go through each session, then each placement inside it
    sessions.forEach(function (session) {
        getPlacements(session).forEach(function (dept, index) {
          totals[dept] += pointsByPlace[index] * session.multiplier; 
        });
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
        
        tableBody.appendChild(row);
    });
}

showScoreboard();

// One color per department (the keys must match departments name)
const departmentColors = {
    BTroop: "#22d3ee",
    HKTroop: "#3b82f6",
    KTroop: "#8b5cf6",
    SHQ: "#10b981"
};

// Work out everyone's total after each session
function getHistory() {
    const running = {};

    departments.forEach(function (dept) {
        running[dept] = 0;
    });

    const history = [];

    sessions.forEach(function (session) {
        getPlacements(session).forEach(function (dept, index) {
            running[dept] += pointsByPlace[index] * session.multiplier;
        });

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