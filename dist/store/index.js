"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const ServerSideCoopGameSlice_1 = require("./ServerSideCoopGameSlice");
const store = (0, toolkit_1.configureStore)({
    reducer: {
        ServerSideCoopGamesStore: ServerSideCoopGameSlice_1.ServerSideCoopGamesSlice.reducer,
    },
});
exports.default = store;
