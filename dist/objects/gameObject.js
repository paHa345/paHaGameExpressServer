"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseFrameNumber = exports.setUserCurrentChanks = exports.createGameField = exports.game = exports.UserMoveDirections = void 0;
var UserMoveDirections;
(function (UserMoveDirections) {
    UserMoveDirections["right"] = "right";
    UserMoveDirections["down"] = "down";
    UserMoveDirections["up"] = "up";
    UserMoveDirections["left"] = "left";
    UserMoveDirections["stop"] = "stop";
})(UserMoveDirections || (exports.UserMoveDirections = UserMoveDirections = {}));
exports.game = {
    gameIsstarted: false,
    users: {},
    gameField: {},
    attackStatusObj: {},
    frameObj: {
        mainFrame: 0,
        objects: {},
    },
};
const createGameField = (socketID) => {
    if (!exports.game.gameField[0]) {
        for (let i = 0; i < 50; i++) {
            const gameFieldCreatedObjRow = {};
            for (let j = 0; j < 50; j++) {
                gameFieldCreatedObjRow[j] = {};
            }
            exports.game.gameField[i] = gameFieldCreatedObjRow;
        }
        exports.game.gameField[10][10].type = "stone";
        exports.game.gameField[10][10].notMove = true;
        exports.game.gameField[10][10].coord = {
            topLeft: { x: 8 * 10, y: 8 * 10 },
            topRight: { x: 8 * 10 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 10, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 10 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[10][11].type = "stone";
        exports.game.gameField[10][11].notMove = true;
        exports.game.gameField[10][11].coord = {
            topLeft: { x: 8 * 10, y: 8 * 11 },
            topRight: { x: 8 * 10 + 8, y: 8 * 11 },
            bottomLeft: { x: 8 * 10, y: 8 * 11 + 8 },
            bottomRight: { x: 8 * 10 + 8, y: 8 * 11 + 8 },
        };
        exports.game.gameField[10][12].type = "stone";
        exports.game.gameField[10][12].notMove = true;
        exports.game.gameField[10][12].coord = {
            topLeft: { x: 8 * 10, y: 8 * 12 },
            topRight: { x: 8 * 10 + 8, y: 8 * 12 },
            bottomLeft: { x: 8 * 10, y: 8 * 12 + 8 },
            bottomRight: { x: 8 * 10 + 8, y: 8 * 12 + 8 },
        };
        exports.game.gameField[10][13].type = "stone";
        exports.game.gameField[10][13].notMove = true;
        exports.game.gameField[10][13].coord = {
            topLeft: { x: 8 * 10, y: 8 * 13 },
            topRight: { x: 8 * 10 + 8, y: 8 * 13 },
            bottomLeft: { x: 8 * 10, y: 8 * 13 + 8 },
            bottomRight: { x: 8 * 10 + 8, y: 8 * 13 + 8 },
        };
        exports.game.gameField[10][14].type = "stone";
        exports.game.gameField[10][14].notMove = true;
        exports.game.gameField[10][14].coord = {
            topLeft: { x: 8 * 10, y: 8 * 14 },
            topRight: { x: 8 * 10 + 8, y: 8 * 14 },
            bottomLeft: { x: 8 * 10, y: 8 * 14 + 8 },
            bottomRight: { x: 8 * 10 + 8, y: 8 * 14 + 8 },
        };
        exports.game.gameField[10][15].type = "stone";
        exports.game.gameField[10][15].notMove = true;
        exports.game.gameField[10][15].coord = {
            topLeft: { x: 8 * 10, y: 8 * 15 },
            topRight: { x: 8 * 10 + 8, y: 8 * 15 },
            bottomLeft: { x: 8 * 10, y: 8 * 15 + 8 },
            bottomRight: { x: 8 * 10 + 8, y: 8 * 15 + 8 },
        };
        exports.game.gameField[11][10].type = "stone";
        exports.game.gameField[11][10].notMove = true;
        exports.game.gameField[11][10].coord = {
            topLeft: { x: 8 * 11, y: 8 * 10 },
            topRight: { x: 8 * 11 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 11, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 11 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[12][10].type = "stone";
        exports.game.gameField[12][10].notMove = true;
        exports.game.gameField[12][10].coord = {
            topLeft: { x: 8 * 12, y: 8 * 10 },
            topRight: { x: 8 * 12 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 12, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 12 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[13][10].type = "stone";
        exports.game.gameField[13][10].notMove = true;
        exports.game.gameField[13][10].coord = {
            topLeft: { x: 8 * 13, y: 8 * 10 },
            topRight: { x: 8 * 13 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 13, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 13 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[14][10].type = "stone";
        exports.game.gameField[14][10].notMove = true;
        exports.game.gameField[14][10].coord = {
            topLeft: { x: 8 * 14, y: 8 * 10 },
            topRight: { x: 8 * 14 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 14, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 14 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[15][10].type = "stone";
        exports.game.gameField[15][10].notMove = true;
        exports.game.gameField[15][10].coord = {
            topLeft: { x: 8 * 15, y: 8 * 10 },
            topRight: { x: 8 * 15 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 15, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 15 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[16][10].type = "stone";
        exports.game.gameField[16][10].notMove = true;
        exports.game.gameField[16][10].coord = {
            topLeft: { x: 8 * 16, y: 8 * 10 },
            topRight: { x: 8 * 16 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 16, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 16 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[4][10].type = "stone";
        exports.game.gameField[4][10].notMove = true;
        exports.game.gameField[4][10].coord = {
            topLeft: { x: 8 * 4, y: 8 * 10 },
            topRight: { x: 8 * 4 + 8, y: 8 * 10 },
            bottomLeft: { x: 8 * 4, y: 8 * 10 + 8 },
            bottomRight: { x: 8 * 4 + 8, y: 8 * 10 + 8 },
        };
        exports.game.gameField[4][11].type = "stone";
        exports.game.gameField[4][11].notMove = true;
        exports.game.gameField[4][11].coord = {
            topLeft: { x: 8 * 4, y: 8 * 11 },
            topRight: { x: 8 * 4 + 8, y: 8 * 11 },
            bottomLeft: { x: 8 * 4, y: 8 * 11 + 8 },
            bottomRight: { x: 8 * 4 + 8, y: 8 * 11 + 8 },
        };
        exports.game.gameField[4][12].type = "stone";
        exports.game.gameField[4][12].notMove = true;
        exports.game.gameField[4][12].coord = {
            topLeft: { x: 8 * 4, y: 8 * 12 },
            topRight: { x: 8 * 4 + 8, y: 8 * 12 },
            bottomLeft: { x: 8 * 4, y: 8 * 12 + 8 },
            bottomRight: { x: 8 * 4 + 8, y: 8 * 12 + 8 },
        };
        exports.game.gameField[4][13].type = "stone";
        exports.game.gameField[4][13].notMove = true;
        exports.game.gameField[4][13].coord = {
            topLeft: { x: 8 * 4, y: 8 * 13 },
            topRight: { x: 8 * 4 + 8, y: 8 * 13 },
            bottomLeft: { x: 8 * 4, y: 8 * 13 + 8 },
            bottomRight: { x: 8 * 4 + 8, y: 8 * 13 + 8 },
        };
    }
    const numberOfGamers = Object.keys(exports.game.users).length;
    exports.game.users[socketID] = {
        chanks: {
            topChanks: {},
            bottomChanks: {},
            rightChanks: {},
            leftChanks: {},
        },
        attackStatus: { isCooldown: false },
        square: {
            prevCoord: {
                topLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8,
                },
                topRight: {
                    x: 8 + 32 + numberOfGamers * 40,
                    y: 8,
                },
                bottomLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8 + 32,
                },
                bottomRight: {
                    x: 8 + 32 + numberOfGamers * 40,
                    y: 8 + 32,
                },
            },
            currentCoord: {
                topLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8,
                },
                topRight: {
                    x: 8 + 24 + numberOfGamers * 40,
                    y: 8,
                },
                bottomLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8 + 32,
                },
                bottomRight: {
                    x: 8 + 24 + numberOfGamers * 40,
                    y: 8 + 32,
                },
            },
        },
        moveDirection: UserMoveDirections.stop,
        userRole: numberOfGamers > 0 ? "creeper" : "steve",
    };
    (0, exports.setUserCurrentChanks)(socketID);
    exports.game.frameObj.objects[socketID] = { idFrame: 0 };
    exports.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
//функция перезаписи текущей позиции в чанки
const setUserCurrentChanks = (socketID, direction) => {
    if (!exports.game.users[socketID]) {
        return;
    }
    const prevTopLeftXChank = Math.floor(exports.game.users[socketID].square.prevCoord.topLeft.x / 8);
    const prevTopLeftYChank = Math.floor(exports.game.users[socketID].square.prevCoord.topLeft.y / 8);
    const prevBottomLeftXChank = Math.floor(exports.game.users[socketID].square.prevCoord.bottomLeft.x / 8);
    const prevBottomLeftYChank = Math.floor(exports.game.users[socketID].square.prevCoord.bottomLeft.y / 8);
    const prevTopRightXChank = Math.floor(exports.game.users[socketID].square.prevCoord.topRight.x / 8);
    const prevTopRightYChank = Math.floor(exports.game.users[socketID].square.prevCoord.topRight.y / 8);
    const topLeftXChank = Math.floor(exports.game.users[socketID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(exports.game.users[socketID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(exports.game.users[socketID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(exports.game.users[socketID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(exports.game.users[socketID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(exports.game.users[socketID].square.currentCoord.topRight.y / 8);
    for (let i = 0; i < 4; i++) {
        if (direction === UserMoveDirections.down) {
            exports.game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].type = undefined;
        }
        exports.game.gameField[topLeftYChank][topLeftXChank + i].type = "user";
        if (direction === UserMoveDirections.up) {
            exports.game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].type = undefined;
        }
        exports.game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].type = "user";
    }
    for (let i = 0; i < 4; i++) {
        exports.game.gameField[topLeftYChank + i][topLeftXChank].type = "user";
        if (direction === UserMoveDirections.right) {
            exports.game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].type = undefined;
        }
        exports.game.gameField[topRightYChank + i][topRightXChank].type = "user";
        if (direction === UserMoveDirections.left) {
            exports.game.gameField[prevTopRightYChank + i][prevTopRightXChank].type = undefined;
        }
    }
};
exports.setUserCurrentChanks = setUserCurrentChanks;
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
