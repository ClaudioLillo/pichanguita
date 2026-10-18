import { configureStore } from "@reduxjs/toolkit";

import playersReducer from "../reducers/players";
import matchesReducer from "../reducers/matches";
import loadingReducer from "../reducers/loading";

const store = configureStore({
    reducer: {
        players: playersReducer,
        matches: matchesReducer,
        loading: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
