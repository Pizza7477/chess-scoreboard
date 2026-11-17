// Each list holds one number per session: [Session 0, Session 1, Session 2]
// scores = player points (win = 2, draw = 1), wins/draws/losses = game counts
const players = [
    { name: "IDOKNOWW",      team: "B-Troop",  scores: [0, 6, 2],  wins: [0, 3, 1], draws: [0, 0, 0], losses: [0, 0, 1] },
    { name: "Adis0n8393",    team: "B-Troop",  scores: [0, 2, 0],  wins: [0, 1, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "rajthapa0734",  team: "B-Troop",  scores: [0, 2, 4],  wins: [0, 1, 2], draws: [0, 0, 0], losses: [0, 0, 1] },
    { name: "Ghumeraammaya", team: "B-Troop",  scores: [0, 2, 4],  wins: [0, 1, 2], draws: [0, 0, 0], losses: [0, 1, 2] },
    { name: "Kaalchakra16",  team: "B-Troop",  scores: [0, 2, 9],  wins: [0, 1, 4], draws: [0, 0, 1], losses: [0, 1, 1] },
    { name: "IP_MY_Pants",   team: "B-Troop",  scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 2, 1] },
    { name: "tamangb",       team: "B-Troop",  scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "RAJANMAGAR",    team: "B-Troop",  scores: [0, 0, 4],  wins: [0, 0, 2], draws: [0, 0, 0], losses: [0, 0, 1] },

    { name: "Bikra",         team: "HK-Troop", scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "Sundar_Thapa",  team: "HK-Troop", scores: [0, 4, 0],  wins: [0, 2, 0], draws: [0, 0, 0], losses: [0, 1, 1] },
    { name: "Shem05",        team: "HK-Troop", scores: [0, 4, 12], wins: [0, 2, 6], draws: [0, 0, 0], losses: [0, 1, 1] },
    { name: "GurungV100",    team: "HK-Troop", scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 3, 1] },
    { name: "Gurun9209",     team: "HK-Troop", scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "Mikhayal_Rai",  team: "HK-Troop", scores: [0, 2, 2],  wins: [0, 1, 1], draws: [0, 0, 0], losses: [0, 2, 4] },
    { name: "RK_Thapa",      team: "HK-Troop", scores: [0, 6, 12], wins: [0, 3, 6], draws: [0, 0, 0], losses: [0, 1, 2] },

    { name: "Sheksir",       team: "K-Troop",  scores: [0, 4, 0],  wins: [0, 2, 0], draws: [0, 0, 0], losses: [0, 0, 2] },
    { name: "AppyMelo",      team: "K-Troop",  scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "sudip2827",     team: "K-Troop",  scores: [0, 4, 4],  wins: [0, 2, 2], draws: [0, 0, 0], losses: [0, 2, 4] },
    { name: "grgsahas",      team: "K-Troop",  scores: [0, 0, 1],  wins: [0, 0, 0], draws: [0, 0, 1], losses: [0, 0, 4] },
    { name: "Roshanjungb",   team: "K-Troop",  scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "Chetanpun1",    team: "K-Troop",  scores: [0, 2, 0],  wins: [0, 1, 0], draws: [0, 0, 0], losses: [0, 3, 1] },
    { name: "yubrajj",       team: "K-Troop",  scores: [0, 2, 6],  wins: [0, 1, 3], draws: [0, 0, 0], losses: [0, 1, 3] },
    { name: "Amul1999",      team: "K-Troop",  scores: [0, 0, 12], wins: [0, 0, 6], draws: [0, 0, 0], losses: [0, 0, 0] },

    { name: "RamLG",         team: "SHQ",      scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 1, 4] },
    { name: "sonihang3624",  team: "SHQ",      scores: [0, 0, 2],  wins: [0, 0, 1], draws: [0, 0, 0], losses: [0, 0, 2] },
    { name: "Binaya12345",   team: "SHQ",      scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] },
    { name: "Dineshghale",   team: "SHQ",      scores: [0, 0, 0],  wins: [0, 0, 0], draws: [0, 0, 0], losses: [0, 0, 0] }
];