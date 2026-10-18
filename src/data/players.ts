import type { Player} from '../types/player';
import client from './client';

export const getPlayers = async () => {
    // const res = await client.get("/players");
    // return res.data.data.Items;
    return [
        {name: 'player_1', points: 2},
        {name: 'player_2', points: 4},
        {name: 'player_3', points: 1}
    ]
}

export const updatePlayer = async (playerData: Player) => {
    const res = await client.put("/players", {
        ...playerData
    })
    return res.data;
}