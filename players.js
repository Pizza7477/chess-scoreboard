// Each list holds one number per session: [Session 0, Session 1, Session 2, Session 3, Session 4]
// scores = player points (win = 2, draw = 1), wins/draws/losses = game counts
const players = [
    { name: "IDOKNOWW",      team: "B-Troop",  scores: [0, 6, 2, 10, 0],   wins: [0, 3, 1, 5, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 1, 3, 0] },
    { name: "Adis0n8393",    team: "B-Troop",  scores: [0, 2, 0, 0, 7],    wins: [0, 1, 0, 0, 3], draws: [0, 0, 0, 0, 1], losses: [0, 0, 0, 0, 0] },
    { name: "rajthapa0734",  team: "B-Troop",  scores: [0, 2, 4, 14, 4],   wins: [0, 1, 2, 7, 1], draws: [0, 0, 0, 0, 2], losses: [0, 0, 1, 1, 0] },
    { name: "Ghumeraammaya", team: "B-Troop",  scores: [0, 2, 4, 2, 0],    wins: [0, 1, 2, 1, 0], draws: [0, 0, 0, 0, 0], losses: [0, 1, 2, 2, 0] },
    { name: "Kaalchakra16",  team: "B-Troop",  scores: [0, 2, 9, 4, 0],    wins: [0, 1, 4, 2, 0], draws: [0, 0, 1, 0, 0], losses: [0, 1, 1, 1, 0] },
    { name: "IP_MY_Pants",   team: "B-Troop",  scores: [0, 0, 0, 2, 4],    wins: [0, 0, 0, 1, 2], draws: [0, 0, 0, 0, 0], losses: [0, 2, 1, 3, 6] },
    { name: "tamangb",       team: "B-Troop",  scores: [0, 0, 0, 0, 0],    wins: [0, 0, 0, 0, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 0, 0] },
    { name: "RAJANMAGAR",    team: "B-Troop",  scores: [0, 0, 4, 6, 4],    wins: [0, 0, 2, 3, 2], draws: [0, 0, 0, 0, 0], losses: [0, 0, 1, 1, 2] },
    { name: "Tirtha4632",    team: "B-Troop",  scores: [0, 0, 0, 6, 2],    wins: [0, 0, 0, 3, 1], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 1, 5] },

    { name: "Bikra",         team: "HK-Troop", scores: [0, 0, 0, 0, 0],    wins: [0, 0, 0, 0, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 0, 0] },
    { name: "Sundar_Thapa",  team: "HK-Troop", scores: [0, 4, 0, 0, 0],    wins: [0, 2, 0, 0, 0], draws: [0, 0, 0, 0, 0], losses: [0, 1, 1, 0, 1] },
    { name: "Shem05",        team: "HK-Troop", scores: [0, 4, 12, 10, 8],  wins: [0, 2, 6, 5, 4], draws: [0, 0, 0, 0, 0], losses: [0, 1, 1, 3, 1] },
    { name: "GurungV100",    team: "HK-Troop", scores: [0, 0, 0, 2, 3],    wins: [0, 0, 0, 1, 1], draws: [0, 0, 0, 0, 1], losses: [0, 3, 1, 3, 4] },
    { name: "Gurun9209",     team: "HK-Troop", scores: [0, 0, 0, 0, 0],    wins: [0, 0, 0, 0, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 0, 0] },
    { name: "Mikhayal_Rai",  team: "HK-Troop", scores: [0, 2, 2, 6, 6],    wins: [0, 1, 1, 3, 3], draws: [0, 0, 0, 0, 0], losses: [0, 2, 4, 2, 2] },
    { name: "RK_Thapa",      team: "HK-Troop", scores: [0, 6, 12, 10, 15], wins: [0, 3, 6, 5, 7], draws: [0, 0, 0, 0, 1], losses: [0, 1, 2, 3, 0] },
    { name: "Hktp",          team: "HK-Troop", scores: [0, 0, 0, 0, 4],    wins: [0, 0, 0, 0, 2], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 0, 3] },

    { name: "Sheksir",       team: "K-Troop",  scores: [0, 4, 0, 8, 6],    wins: [0, 2, 0, 4, 3], draws: [0, 0, 0, 0, 0], losses: [0, 0, 2, 0, 1] },
    { name: "AppyMelo",      team: "K-Troop",  scores: [0, 0, 0, 0, 3],    wins: [0, 0, 0, 0, 1], draws: [0, 0, 0, 0, 1], losses: [0, 0, 0, 0, 1] },
    { name: "sudip2827",     team: "K-Troop",  scores: [0, 4, 4, 4, 6],    wins: [0, 2, 2, 2, 3], draws: [0, 0, 0, 0, 0], losses: [0, 2, 4, 3, 1] },
    { name: "grgsahas",      team: "K-Troop",  scores: [0, 0, 1, 1, 5],    wins: [0, 0, 0, 0, 2], draws: [0, 0, 1, 1, 1], losses: [0, 0, 4, 6, 2] },
    { name: "Roshanjungb",   team: "K-Troop",  scores: [0, 0, 0, 0, 0],    wins: [0, 0, 0, 0, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 0, 0] },
    { name: "Chetanpun1",    team: "K-Troop",  scores: [0, 2, 0, 6, 7],    wins: [0, 1, 0, 3, 3], draws: [0, 0, 0, 0, 1], losses: [0, 3, 1, 2, 3] },
    { name: "yubrajj",       team: "K-Troop",  scores: [0, 2, 6, 2, 5],    wins: [0, 1, 3, 1, 2], draws: [0, 0, 0, 0, 1], losses: [0, 1, 3, 4, 4] },
    { name: "Amul1999",      team: "K-Troop",  scores: [0, 0, 12, 12, 10], wins: [0, 0, 6, 6, 5], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 2, 1] },

    { name: "RamLG",         team: "SHQ",      scores: [0, 0, 0, 4, 1],    wins: [0, 0, 0, 2, 0], draws: [0, 0, 0, 0, 1], losses: [0, 1, 4, 2, 5] },
    { name: "sonihang3624",  team: "SHQ",      scores: [0, 0, 2, 1, 4],    wins: [0, 0, 1, 0, 2], draws: [0, 0, 0, 1, 0], losses: [0, 0, 2, 3, 4] },
    { name: "Binaya12345",   team: "SHQ",      scores: [0, 0, 0, 0, 0],    wins: [0, 0, 0, 0, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 0, 0] },
    { name: "Dineshghale",   team: "SHQ",      scores: [0, 0, 0, 2, 0],    wins: [0, 0, 0, 1, 0], draws: [0, 0, 0, 0, 0], losses: [0, 0, 0, 1, 2] }
];
