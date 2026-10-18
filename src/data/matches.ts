import type { Match} from '../types/match';
import client from './client';

export const getMatches = async () => {
    // const res = await client.get("/matches");
    // return res.data.data.Items;
    const matches : Match[] = [
        {
            team1: [
                {name: 'player_1'},
                {name: 'player_2'},
            ],
            team2: [
                {name: 'player_3'},
                {name: 'player_4'},
            ],
            result: {
                team1: 3,
                team2: 0,
            },
            submittedBy: 'Mari',
            date: 1792334974000,
        }
    ]
    return matches;
}

export const updateMatch = async (matchData: Match) => {
    const res = await client.put("/matches", {
        ...matchData
    })
    return res.data;
}