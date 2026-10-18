import { createSlice } from '@reduxjs/toolkit';
import type { Match } from '../../types/match';

type TrainersState = {
    matches: Match[];
}

const initialState: TrainersState = {
    matches: [],
}

export const trainersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        'setMatches': (state, action) => {
            state.matches = action.payload.sort((a: Match,b: Match)=>{
                return a.date > b.date ? -1: 1
            })
        },

    }
})

export const { setMatches } = trainersSlice.actions
export default trainersSlice.reducer

