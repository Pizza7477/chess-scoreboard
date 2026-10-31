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


console.log(calculateTotals());