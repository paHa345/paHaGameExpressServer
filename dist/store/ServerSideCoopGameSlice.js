"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSideCoopGamesActions = exports.ServerSideCoopGamesSlice = exports.ServerSideCoopGamesState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.ServerSideCoopGamesState = {
    test: "jhgjhgjhg",
};
exports.ServerSideCoopGamesSlice = (0, toolkit_1.createSlice)({
    name: "ServerSideCoopGames",
    initialState: exports.ServerSideCoopGamesState,
    reducers: {
        setTest(state) {
            state.test = "New text string";
        },
    },
});
exports.ServerSideCoopGamesActions = exports.ServerSideCoopGamesSlice.actions;
