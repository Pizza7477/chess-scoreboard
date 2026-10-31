// The Four Departments
const departments = ["BTroop", "HKTroop", "KTroop", "SHQ"]

// Results of each session. "placements" lists departments from 1st to last.
const sessions = [
    {
        name: "Session 1",
        multiplier: 1,
        placements: ["BTroop", "HKTroop", "KTroop", "SHQ"]
    },

    {
        name: "Session 2",
        multiplier: 1,
        placements: ["SHQ", "BTroop", "HKTroop", "KTroop"]
    },

    {
        name: "Session 3",
        multiplier: 2,
        placements : ["KTroop", "SHQ", "BTroop", "HKTroop"]
    }
];

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
        session.placements.forEach(function (dept, index) {
          totals[dept] += pointsByPlace[index] * session.multiplier; 
        });
    });

    return totals
}


// Turn the totals into a sorted list: highest points first
function getRanking() {
    const totals = calculateTotals();

    const ranking = departments.map(function (dept){
        return { name: dept, points: totals[dept] };
    });

    ranking.sort(function (a, b) {
        return b.points - a.points;
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

        row.innerHTML = `
            <td>#${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.points}</td>
        
        `;
        
        tableBody.appendChild(row);
    });
}

showScoreboard();