"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameField = exports.game = exports.UserMoveDirections = void 0;
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
    for (let i = 0; i < 25; i++) {
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
    const numberOfGamers = Object.keys(exports.game.users).length;
    exports.game.users[socketID] = {
        attackStatus: { isCooldown: false },
        square: {
            prevCoord: {
                topLeft: {
                    x: 10 + numberOfGamers * 40,
                    y: 10,
                },
                topRight: {
                    x: 10 + 32 + numberOfGamers * 40,
                    y: 10,
                },
                bottomLeft: {
                    x: 10 + numberOfGamers * 40,
                    y: 10 + 32,
                },
                bottomRight: {
                    x: 10 + 32 + numberOfGamers * 40,
                    y: 10 + 32,
                },
            },
            currentCoord: {
                topLeft: {
                    x: 10 + numberOfGamers * 40,
                    y: 10,
                },
                topRight: {
                    x: 10 + 32 + numberOfGamers * 40,
                    y: 10,
                },
                bottomLeft: {
                    x: 10 + numberOfGamers * 40,
                    y: 10 + 32,
                },
                bottomRight: {
                    x: 10 + 32 + numberOfGamers * 40,
                    y: 10 + 32,
                },
            },
        },
        moveDirection: UserMoveDirections.stop,
        userRole: numberOfGamers > 0 ? "creeper" : "steve",
    };
    exports.game.frameObj.objects[socketID] = { idFrame: 0 };
    exports.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
