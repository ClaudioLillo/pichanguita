import type { Player} from '../types/player';
import client from './client';

export const getPlayers = async () => {
    const res = await client.get("/players");
    return res.data.data.Items;
    
}

export const createPlayer = async(playerData: Player) => {
    const res = await client.post("/players", {
        ...playerData
    })
    return res.data;
}

export const updatePlayer = async (playerData: Player) => {
    const res = await client.put("/players", {
        ...playerData
    })
    return res.data;
}