import { createSlice } from '@reduxjs/toolkit';
import type { Match } from '../../types/match';

type MatchesState = {
    matches: Match[];
}

const initialState: MatchesState = {
    matches: [],
}

export const matchesSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        'setMatches': (state, action) => {
            state.matches = action.payload.sort((a: Match,b: Match)=>{
                return a.date > b.date ? -1: 1
            })
        },

    }
})

export const { setMatches } = matchesSlice.actions
export default matchesSlice.reducer

