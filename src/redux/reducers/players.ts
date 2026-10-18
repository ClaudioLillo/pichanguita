import { createSlice } from '@reduxjs/toolkit';
import type { Player } from '../../types/player';

type TrainersState = {
    players: Player[];
}

const initialState: TrainersState = {
    players: [],
}

export const trainersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        'setPlayers': (state, action) => {
            state.players = action.payload.sort((a: Player,b: Player)=>{
                return a.points > b.points ? -1: 1
            })
        },

    }
})

export const { setPlayers } = trainersSlice.actions
export default trainersSlice.reducer

