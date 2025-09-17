import { configureStore } from "@reduxjs/toolkit";
import { ServerSideCoopGamesSlice } from "./ServerSideCoopGameSlice";

const store = configureStore({
  reducer: {
    ServerSideCoopGamesStore: ServerSideCoopGamesSlice.reducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
