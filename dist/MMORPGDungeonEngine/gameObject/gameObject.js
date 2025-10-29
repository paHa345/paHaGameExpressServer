"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseFrameNumber = exports.game = exports.UserMoveDirections = void 0;
var UserMoveDirections;
(function (UserMoveDirections) {
    UserMoveDirections["right"] = "right";
    UserMoveDirections["down"] = "down";
    UserMoveDirections["up"] = "up";
    UserMoveDirections["left"] = "left";
    UserMoveDirections["stop"] = "stop";
})(UserMoveDirections || (exports.UserMoveDirections = UserMoveDirections = {}));
exports.game = {
    statObj: { NPC: {}, gamers: {} },
    gameIsstarted: false,
    users: {},
    gameField: {},
    attackStatusObj: {},
    frameObj: {
        mainFrame: 0,
        objects: {},
    },
};
//функция перезаписи текущей позиции в чанки
const increaseFrameNumber = () => {
    if (exports.game.frameObj.mainFrame === 5) {
        exports.game.frameObj.mainFrame = 0;
        // for (const key in state.frameObj.objects) {
        //   state.frameObj.objects[key].idFrame = 0;
        // }
    }
    else {
        exports.game.frameObj.mainFrame = exports.game.frameObj.mainFrame + 1;
        // for (const key in state.frameObj.objects) {
        //   state.frameObj.objects[key].idFrame = state.frameObj.mainFrame;
        // }
    }
};
exports.increaseFrameNumber = increaseFrameNumber;
