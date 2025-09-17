import { createSlice } from "@reduxjs/toolkit";

export interface IServerSideCoopGamesSlice {
  CoopGamesState: {
    test: string;
  };
}

interface IServerSideCoopGamesState {
  test: string;
}

export const ServerSideCoopGamesState: IServerSideCoopGamesState = {
  test: "jhgjhgjhg",
};

export const ServerSideCoopGamesSlice = createSlice({
  name: "ServerSideCoopGames",
  initialState: ServerSideCoopGamesState,
  reducers: {
    setTest(state) {
      state.test = "New text string";
    },
  },
});

export const ServerSideCoopGamesActions = ServerSideCoopGamesSlice.actions;
