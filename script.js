// The Four Departments
const departments = ["B-Troop", "HK-Troop", "K-Troop", "SHQ"]
const TOTAL_SESSIONS = 5;

// Results of each session. "placements" lists departments from 1st to last.
const sessions = [
    {
        name: "Start",
        multiplier: 1,
        lichessScores: { "B-Troop": 0, "HK-Troop": 0, "K-Troop": 0, "SHQ": 0 }
    },

    {
        name: "Session - 1",
        multiplier: 1,
        lichessScores: { "B-Troop": 14, "HK-Troop": 16, "K-Troop": 12, "SHQ": 0 }
    },

    {
        name: "Session - 2",
        multiplier: 1,
        lichessScores: { "B-Troop": 23, "HK-Troop": 26, "K-Troop": 23, "SHQ": 2 }
    },

    {
        name: "Session - 3",
        multiplier: 1,
        lichessScores: { "B-Troop": 44, "HK-Troop": 28, "K-Troop": 33, "SHQ": 7 }
    },

    {
        name: "Session - 4",
        multiplier: 1,
        lichessScores: { "B-Troop": 21, "HK-Troop": 36, "K-Troop": 42, "SHQ": 5 },
        // Optional: points taken off a troop's score for this session
        penalties: { "K-Troop": 5 }
    },

    {
        name: "Session - 5",
        multiplier: 1,
        lichessScores: { "B-Troop": 12, "HK-Troop": 20, "K-Troop": 26, "SHQ": 0 }
    }
];

// Penalty points taken off a troop in one session (0 if none)
function getPenalty(session, dept) {
    return (session.penalties && session.penalties[dept]) || 0;
}

// The score that counts: Lichess score minus any penalty
function getScore(session, dept) {
    return session.lichessScores[dept] - getPenalty(session, dept);
}

function getPlacements(session) {
    return departments.slice().sort(function (a, b) {
        return getScore(session, b) - getScore(session, a);
    });
}

// A session with no entered scores should not affect the standings.
function hasLichessScores(session) {
    return departments.some(function (dept) {
        return session.lichessScores[dept] !== 0;
    });
}

// True once every session has real scores (the final standings are known)
function isTournamentComplete() {
    return sessions.filter(hasLichessScores).length >= TOTAL_SESSIONS;
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

// Work out the points each troop earns in ONE session (tied troops share the points)
function getSessionPoints(session) {
    const points = {};

    departments.forEach(function (dept) {
        points[dept] = 0;
    });

    if (!hasLichessScores(session)) {
        return points;
    }

    const placements = getPlacements(session);
    let i = 0;

    while (i < placements.length) {
        // Find where the group of tied troops ends
        let j = i;
        while (j + 1 < placements.length &&
               getScore(session, placements[j + 1]) === getScore(session, placements[i])) {
            j++;
        }

        // Add up the points for the places this group covers, then share them equally
        let pool = 0;
        for (let k = i; k <= j; k++) {
            pool += pointsByPlace[k];
        }
        const share = pool / (j - i + 1);

        for (let k = i; k <= j; k++) {
            points[placements[k]] = share * session.multiplier;
        }

        i = j + 1;
    }

    return points;
}

// Add one session's points on top of a running total
function addSessionPoints(session, totals) {
    const points = getSessionPoints(session);

    departments.forEach(function (dept) {
        totals[dept] += points[dept];
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
        let penalty = 0;
        let bestPlace = departments.length;

        sessions.forEach(function (session) {
            // Tiebreaker 1: add up the Lichess scores (after penalties)
            lichess += getScore(session, dept);
            penalty += getPenalty(session, dept);

            // Tiebreaker 2: find the best (lowest) finishing position
            if (!hasLichessScores(session)) {
                return;
            }
            const place = getPlacements(session).indexOf(dept) + 1;
            if (place < bestPlace) {
                bestPlace = place;
            }
        });

        return { name: dept, points: totals[dept], lichess, penalty, bestPlace };
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

    // How many sessions have real scores?
    const played = sessions.filter(hasLichessScores).length;
    const leaderBox = document.getElementById("leaderTeam");

    if (played === 0) {
        leaderBox.textContent = "No results yet";
        leaderBox.style.color = "";
        document.getElementById("leaderLead").textContent = "";
    } else {
        // Leader box: the first item in the sorted list
        leaderBox.textContent = ranking[0].name;
        leaderBox.style.color = departmentColors[ranking[0].name];

        // How far ahead of 2nd place?
        const gap = ranking[0].points - ranking[1].points;
        let leadText = ranking[0].points + " pts • ";
        if (gap > 0) {
            leadText += "leads " + ranking[1].name + " by " + gap + (gap === 1 ? " pt" : " pts");
        } else {
            leadText += "level on points with " + ranking[1].name;
        }
        document.getElementById("leaderLead").textContent = leadText;
    }

    document.getElementById("sessionStatus").textContent =
        "After " + played + " of " + TOTAL_SESSIONS + " sessions • Top 2 reach the final";

    // When all sessions are done, swap the leader box for the Finalists banner
    const complete = isTournamentComplete();
    const banner = document.getElementById("finalBanner");
    document.querySelector(".leader-box").style.display = complete ? "none" : "";
    banner.style.display = complete ? "block" : "none";

    if (complete) {
        const first = ranking[0];
        const second = ranking[1];

        banner.innerHTML = `
            <div class="final-kicker">★ Finalists ★</div>
            <div class="final-sub">The Final • 20 Nov 2026 • Deurali Club</div>
            <div class="final-matchup">
                <div class="final-card gold">
                    <span class="final-place">1st</span>
                    <span class="final-team" style="color: ${departmentColors[first.name]}">${first.name}</span>
                    <span class="final-pts">${first.points} pts</span>
                </div>
                <div class="final-vs">VS</div>
                <div class="final-card silver">
                    <span class="final-place">2nd</span>
                    <span class="final-team" style="color: ${departmentColors[second.name]}">${second.name}</span>
                    <span class="final-pts">${second.points} pts</span>
                </div>
            </div>
            <div class="final-others">
                3rd: <strong style="color: ${departmentColors[ranking[2].name]}">${ranking[2].name}</strong>
                &nbsp;•&nbsp;
                4th: <strong style="color: ${departmentColors[ranking[3].name]}">${ranking[3].name}</strong>
            </div>
            <div class="final-status">All ${TOTAL_SESSIONS} sessions complete</div>
        `;
    }

    // Table: clear it, then add one row per department
    const tableBody = document.getElementById("scoreTableBody");
    tableBody.innerHTML = "";

    ranking.forEach(function (team, index) {
        const row = document.createElement("tr");

        // Final standings: gold and silver rows for the two finalists only
        let rankCell = index + 1;
        if (complete && index < 2) {
            row.classList.add(index === 0 ? "gold-row" : "silver-row");
            rankCell = '<span class="rank-medal ' + (index === 0 ? "gold" : "silver") + '">' + (index + 1) + "</span>";
        } else if (index === 0) {
            row.classList.add("first-place");
        }

        row.innerHTML = `
            <td>${rankCell}</td>
            <td>${team.name}</td>
            <td>${team.points}</td>
            <td>${team.lichess}${team.penalty > 0 ? ' <span class="penalty-note">(−' + team.penalty + ' penalty)</span>' : ""}</td>
        `;
        const teamNameCell = row.cells[1];
        teamNameCell.classList.add("team-name");
        teamNameCell.style.color = departmentColors[team.name];
        teamNameCell.style.fontWeight = "bold";
        
        tableBody.appendChild(row);
    });
}

showScoreboard();

// Session Results grid: one row per played session, latest first
function showSessionResults() {
    const body = document.getElementById("sessionResultsBody");
    body.innerHTML = "";

    const played = sessions.filter(hasLichessScores).reverse();

    if (played.length === 0) {
        body.innerHTML = '<tr><td colspan="5">No results yet</td></tr>';
        return;
    }

    played.forEach(function (session) {
        const placements = getPlacements(session);
        const points = getSessionPoints(session);

        let cells = "<td>" + session.name;
        if (session.multiplier > 1) {
            cells += ' <span class="multiplier-badge">×' + session.multiplier + '</span>';
        }
        cells += "</td>";

        placements.forEach(function (dept, i) {
            const score = getScore(session, dept);
            const penalty = getPenalty(session, dept);
            const tied = placements.some(function (other, j) {
                return j !== i && getScore(session, other) === score;
            });

            const penaltyText = penalty > 0
                ? ' <span class="penalty-note">(' + session.lichessScores[dept] + ' − ' + penalty + ' penalty)</span>'
                : "";

            cells += `
                <td>
                    <span class="result-team" style="color: ${departmentColors[dept]}">${dept}</span>
                    <span class="result-detail">${score} Lichess${penaltyText} • +${points[dept]} pts${tied ? " • tie" : ""}</span>
                </td>`;
        });

        const row = document.createElement("tr");
        row.innerHTML = cells;
        body.appendChild(row);
    });
}

showSessionResults();

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

    // Use the same font as the rest of the page
    Chart.defaults.font.family = '"Inter", system-ui, sans-serif';

    new Chart(ctx, {
        type: "line",
        data: {
            labels: sessions.map(function (session) {
                return session.name;
            }),
            datasets: departments.map(function (dept) {
                return {
                    label: dept,
                    data: history.map(function (snapshot) {
                        return snapshot[dept];
                    }),
                    borderColor: departmentColors[dept],
                    borderWidth: 4,
                    tension: 0.35,
                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointBackgroundColor: "#101010",
                    pointBorderColor: departmentColors[dept],
                    pointBorderWidth: 3
                };
            })
        },
        options: {
            responsive: true,
            // Taller chart on phones so the lines and legend aren't cramped
            aspectRatio: window.innerWidth < 600 ? 1.1 : 2,
            interaction: { mode: "index", intersect: false },
            animation: { duration: 1200, easing: "easeOutQuart" },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#f4f1ea",
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 20,
                        font: { size: window.innerWidth < 600 ? 12 : 14 }
                    }
                },
                tooltip: {
                    backgroundColor: "#1a1a1a",
                    borderColor: "#e3c565",
                    borderWidth: 1,
                    titleColor: "#e3c565",
                    bodyColor: "#f4f1ea",
                    padding: 12,
                    itemSort: function (a, b) {
                        return b.parsed.y - a.parsed.y;
                    },
                    callbacks: {
                        label: function (item) {
                            return " " + item.dataset.label + ": " + item.parsed.y + " pts";
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#a8a398", font: { size: 13 } },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Points", color: "#a8a398" },
                    ticks: { color: "#a8a398", precision: 0, font: { size: 13 } },
                    grid: { color: "rgba(227, 197, 101, 0.10)" }
                }
            }
        }
    });
}

drawChart();

// Add up one player's scores across all sessions
function sumOf(list) {
    return list.reduce(function (sum, n) {
        return sum + n;
    }, 0);
}

function getTotal(player) {
    return sumOf(player.scores);
}

// Get one team's players, highest total first
function getTeamPlayers(teamName) {
    return players
        .filter(function (player) { return player.team === teamName; })
        .sort(function (a, b) {
            const difference = getTotal(b) - getTotal(a);

            // Different totals: higher score goes first
            if (difference !== 0) {
                return difference;
            }

            // Same total: sort alphabetically by name
            return a.name.localeCompare(b.name);
        });
}

// Fill each team box with its top 5 players
function fillTeamBoxes() {
    // The two finalists get a soft gold glow once the tournament is complete
    const finalists = isTournamentComplete()
        ? getRanking().slice(0, 2).map(function (team) { return team.name; })
        : [];

    document.querySelectorAll(".team-box").forEach(function (box) {
        const teamName = box.dataset.team;
        box.classList.toggle("finalist-box", finalists.includes(teamName));
        const list = box.querySelector(".mini-list");
        const teamPlayers = getTeamPlayers(teamName);

        // The team total goes in the header
        const teamTotal = teamPlayers.reduce(function (sum, player) {
            return sum + getTotal(player);
        }, 0);
        const teamPenalty = sessions.reduce(function (sum, session) {
            return sum + getPenalty(session, teamName);
        }, 0);

        box.querySelector(".team-total").textContent = teamPenalty > 0
            ? "Team total: " + (teamTotal - teamPenalty) + " (−" + teamPenalty + " penalty)"
            : "Team total: " + teamTotal;

        // The list is sorted, so the first player has the top score
        const topScore = getTotal(teamPlayers[0]);

        list.innerHTML = "";

        teamPlayers.forEach(function (player) {
            const score = getTotal(player);
            const crown = (score === topScore && score > 0) ? " 👑" : "";
            const percent = topScore > 0 ? (score / topScore) * 100 : 0;

            const item = document.createElement("li");
            item.innerHTML = `
                <span class="mini-info">
                    <span class="mini-name">${player.name}${crown}</span>
                    <span class="mini-record">${sumOf(player.wins)}W · ${sumOf(player.draws)}D · ${sumOf(player.losses)}L</span>
                </span>
                <span class="mini-score">${score}</span>
            `;
            item.style.setProperty("--bar", percent + "%");
            list.appendChild(item);
        });
    });
}

fillTeamBoxes();