import { createSlice } from '@reduxjs/toolkit';

type LoadingState = {
    loading: boolean;
}

const initialState: LoadingState = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        'setLoading': (state, action) => {
            const { loading } = action.payload
            state.loading = loading
        }
    }
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer

