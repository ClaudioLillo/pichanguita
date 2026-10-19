import type { Match} from '../types/match';
import client from './client';

export const getMatches = async () => {
    const res = await client.get("/matches");
    return res.data.data.Items;
}

export const createMatch = async (matchData: Match) => {
    const res = await client.post("/matches", {
        ...matchData
    })
    return res.data;
}

export const updateMatch = async (matchData: Match) => {
    const res = await client.put("/matches", {
        ...matchData
    })
    return res.data;
}