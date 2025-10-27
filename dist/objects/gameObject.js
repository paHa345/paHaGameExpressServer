"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChanksUnderAttack = exports.setClientCoordinates = exports.moveNPC = exports.increaseFrameNumber = exports.setUserCurrentChanks = exports.createGameField = exports.game = exports.UserMoveDirections = void 0;
const types_1 = require("../types");
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
const addGamerOrNPC = (addedElType, objectType, addedElID, hp, armour, damage) => {
    const numberOfGamers = addedElType === "NPC" ? 5 : Object.keys(exports.game.users).length;
    if (addedElType === "gamer") {
        exports.game.statObj.gamers[addedElID] = {
            baseHP: hp,
            currentHP: hp,
            currentArmour: armour,
            currentDamage: damage,
            percentHP: 100,
        };
    }
    else {
        exports.game.statObj.NPC[addedElID] = {
            baseHP: hp,
            currentHP: hp,
            currentArmour: armour,
            currentDamage: damage,
            percentHP: 100,
        };
    }
    exports.game.users[addedElID] = {
        type: addedElType,
        objectType: objectType,
        getDamageStatus: false,
        imgName: `${objectType}WalkImage`,
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
                    x: 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: 8,
                },
                bottomLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
                bottomRight: {
                    x: 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
            },
            currentCoord: {
                topLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8,
                },
                topRight: {
                    x: 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: 8,
                },
                bottomLeft: {
                    x: 8 + numberOfGamers * 40,
                    y: 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
                bottomRight: {
                    x: 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
            },
        },
        moveDirection: UserMoveDirections.stop,
        userRole: numberOfGamers > 0 ? "creeper" : "steve",
    };
    (0, exports.setUserCurrentChanks)({
        width: types_1.NPCOrGamerObjectsData[objectType].widthChanks,
        height: types_1.NPCOrGamerObjectsData[objectType].heightChanks,
    }, addedElID);
    exports.game.frameObj.objects[addedElID] = { idFrame: 0 };
};
const createGameField = (socketID) => {
    if (!exports.game.gameField[0]) {
        for (let i = 0; i < 50; i++) {
            const gameFieldCreatedObjRow = {};
            for (let j = 0; j < 50; j++) {
                gameFieldCreatedObjRow[j] = {
                    objectDataChank: {
                        isObjectChank: false,
                    },
                };
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
        addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
    }
    addGamerOrNPC("gamer", "gamer", socketID, 100, 0.2, 10);
    exports.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
//функция перезаписи текущей позиции в чанки
const setUserCurrentChanks = (chanksQuantity, socketID, direction) => {
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
    for (let i = 0; i <= chanksQuantity.width; i++) {
        if (direction === UserMoveDirections.down) {
            exports.game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
        }
        exports.game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
        if (direction === UserMoveDirections.up) {
            exports.game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
        }
        exports.game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
    }
    for (let i = 0; i < chanksQuantity.height; i++) {
        exports.game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
        if (direction === UserMoveDirections.right) {
            exports.game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
        }
        exports.game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
        if (direction === UserMoveDirections.left) {
            exports.game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
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
let moveClientSquare;
const moveNPC = () => {
    let timeCurrent;
    let timePrev;
    moveClientSquare = setInterval(() => {
        if (!timeCurrent) {
            timeCurrent = Date.now();
            timePrev = Date.now() - 33;
        }
        else {
            timePrev = timeCurrent;
            timeCurrent = Date.now();
        }
        const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 20);
        // setClientCoordinates({ ...clientData, shiftUserPixels });
    }, 33);
};
exports.moveNPC = moveNPC;
const setClientCoordinates = (objectType, objectID, clientData) => {
    if (exports.game.users[objectID]) {
        exports.game.users[objectID].square.prevCoord = JSON.parse(JSON.stringify(exports.game.users[objectID].square.currentCoord));
    }
    if (exports.game.users[objectID] && exports.game.attackStatusObj[objectID]) {
        exports.game.users[objectID].getDamageStatus
            ? (exports.game.users[objectID].imgName = `${objectType}GetDamageImage`)
            : (exports.game.users[objectID].imgName = `${objectType}WalkImage`);
        exports.game.attackStatusObj[objectID].isActive
            ? (exports.game.users[objectID].imgName = `${objectType}AttackImage`)
            : (exports.game.users[objectID].imgName = `${objectType}WalkImage`);
    }
    const setMoveCoord = () => {
        if (clientData.direction === UserMoveDirections.down) {
            exports.game.users[objectID].square.currentCoord.bottomLeft.y =
                exports.game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.bottomRight.y =
                exports.game.users[objectID].square.currentCoord.bottomRight.y + clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topLeft.y =
                exports.game.users[objectID].square.currentCoord.topLeft.y + clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topRight.y =
                exports.game.users[objectID].square.currentCoord.topRight.y + clientData.shiftUserPixels;
        }
        if (clientData.direction === UserMoveDirections.left) {
            exports.game.users[objectID].square.currentCoord.bottomLeft.x =
                exports.game.users[objectID].square.currentCoord.bottomLeft.x - clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.bottomRight.x =
                exports.game.users[objectID].square.currentCoord.bottomRight.x - clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topLeft.x =
                exports.game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topRight.x =
                exports.game.users[objectID].square.currentCoord.topRight.x - clientData.shiftUserPixels;
        }
        if (clientData.direction === UserMoveDirections.right) {
            exports.game.users[objectID].square.currentCoord.bottomLeft.x =
                exports.game.users[objectID].square.currentCoord.bottomLeft.x + clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.bottomRight.x =
                exports.game.users[objectID].square.currentCoord.bottomRight.x + clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topLeft.x =
                exports.game.users[objectID].square.currentCoord.topLeft.x + clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topRight.x =
                exports.game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels;
        }
        if (clientData.direction === UserMoveDirections.up) {
            exports.game.users[objectID].square.currentCoord.bottomLeft.y =
                exports.game.users[objectID].square.currentCoord.bottomLeft.y - clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.bottomRight.y =
                exports.game.users[objectID].square.currentCoord.bottomRight.y - clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topLeft.y =
                exports.game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels;
            exports.game.users[objectID].square.currentCoord.topRight.y =
                exports.game.users[objectID].square.currentCoord.topRight.y - clientData.shiftUserPixels;
        }
    };
    const setCurrentCoord = function (clientData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (!exports.game.users[objectID])
            return;
        exports.game.users[objectID].moveDirection = clientData.direction;
        if (clientData.direction === UserMoveDirections.down) {
            // смотрим чанки, на которые хотим встать
            exports.game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels > 300 ||
                ((_a = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.bottomLeft.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)]) === null || _a === void 0 ? void 0 : _a.notMove) ||
                ((_b = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.bottomRight.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)]) === null || _b === void 0 ? void 0 : _b.notMove) ||
                ((_c = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.bottomLeft.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)]) === null || _c === void 0 ? void 0 : _c.objectDataChank.isObjectChank) ||
                ((_d = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.bottomRight.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)]) === null || _d === void 0 ? void 0 : _d.objectDataChank.isObjectChank)
                ? (exports.game.users[objectID].square.currentCoord.bottomLeft.y =
                    exports.game.users[objectID].square.currentCoord.bottomLeft.y)
                : setMoveCoord();
        }
        if (clientData.direction === UserMoveDirections.left) {
            exports.game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels < 0 ||
                ((_e = exports.game.gameField[Math.floor((exports.game.users[objectID].square.currentCoord.topLeft.y + 5) / 8)][Math.floor(exports.game.users[objectID].square.currentCoord.topLeft.x / 8)]) === null || _e === void 0 ? void 0 : _e.notMove) ||
                ((_f = exports.game.gameField[Math.floor((exports.game.users[objectID].square.currentCoord.bottomLeft.y - 5) / 8)][Math.floor(exports.game.users[objectID].square.currentCoord.bottomLeft.x / 8)]) === null || _f === void 0 ? void 0 : _f.notMove) ||
                ((_g = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.topLeft.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.topLeft.x - 8) / 8)]) === null || _g === void 0 ? void 0 : _g.objectDataChank.isObjectChank) ||
                ((_h = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.bottomLeft.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.bottomLeft.x - 8) / 8)]) === null || _h === void 0 ? void 0 : _h.objectDataChank.isObjectChank)
                ? (exports.game.users[objectID].square.currentCoord.topLeft.x =
                    exports.game.users[objectID].square.currentCoord.topLeft.x)
                : setMoveCoord();
        }
        if (clientData.direction === UserMoveDirections.right) {
            exports.game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels > 300 ||
                ((_j = exports.game.gameField[Math.floor((exports.game.users[objectID].square.currentCoord.topRight.y + 5) / 8)][Math.floor(exports.game.users[objectID].square.currentCoord.topRight.x / 8)]) === null || _j === void 0 ? void 0 : _j.notMove) ||
                ((_k = exports.game.gameField[Math.floor((exports.game.users[objectID].square.currentCoord.bottomRight.y - 5) / 8)][Math.floor(exports.game.users[objectID].square.currentCoord.bottomRight.x / 8)]) === null || _k === void 0 ? void 0 : _k.notMove) ||
                ((_l = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.topRight.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.topRight.x + 8) / 8)]) === null || _l === void 0 ? void 0 : _l.objectDataChank.isObjectChank) ||
                ((_m = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.bottomRight.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.bottomRight.x + 8) / 8)]) === null || _m === void 0 ? void 0 : _m.objectDataChank.isObjectChank)
                ? (exports.game.users[objectID].square.currentCoord.topRight.x =
                    exports.game.users[objectID].square.currentCoord.topRight.x)
                : setMoveCoord();
        }
        if (clientData.direction === UserMoveDirections.up) {
            if (Math.floor((exports.game.users[objectID].square.currentCoord.topLeft.y - 13) / 8) < 0) {
                return;
            }
            exports.game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels < 0 ||
                ((_o = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.topLeft.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.topLeft.x + 5) / 8)]) === null || _o === void 0 ? void 0 : _o.notMove) ||
                ((_p = exports.game.gameField[Math.floor(exports.game.users[objectID].square.currentCoord.topRight.y / 8)][Math.floor((exports.game.users[objectID].square.currentCoord.topRight.x - 5) / 8)]) === null || _p === void 0 ? void 0 : _p.notMove) ||
                ((_q = exports.game.gameField[Math.floor((exports.game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][Math.floor(exports.game.users[objectID].square.currentCoord.topLeft.x / 8)]) === null || _q === void 0 ? void 0 : _q.objectDataChank.isObjectChank) ||
                ((_r = exports.game.gameField[Math.floor((exports.game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][Math.floor(exports.game.users[objectID].square.currentCoord.topRight.x / 8)]) === null || _r === void 0 ? void 0 : _r.objectDataChank.isObjectChank)
                ? (exports.game.users[objectID].square.currentCoord.topLeft.y =
                    exports.game.users[objectID].square.currentCoord.topLeft.y)
                : setMoveCoord();
        }
    };
    setCurrentCoord(clientData);
    (0, exports.setUserCurrentChanks)({
        height: types_1.NPCOrGamerObjectsData[objectType].heightChanks,
        width: types_1.NPCOrGamerObjectsData[objectType].widthChanks,
    }, objectID, clientData.direction);
    // io.of("/").to(clientData.roomID).emit("serverMove", game.users);
};
exports.setClientCoordinates = setClientCoordinates;
const getChanksUnderAttack = (direction, objectID) => {
    const topLeftXChank = Math.floor(exports.game.users[objectID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(exports.game.users[objectID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(exports.game.users[objectID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(exports.game.users[objectID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(exports.game.users[objectID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(exports.game.users[objectID].square.currentCoord.topRight.y / 8);
    const objectUnderAttack = {};
    const chanksUnderAttack = [];
    const addUnderAttackObjectsAndChunksArr = (underAttackChankObjectID, row, col) => {
        chanksUnderAttack.push({ row: row, col: col });
        if (underAttackChankObjectID) {
            objectUnderAttack[underAttackChankObjectID] = 1;
        }
        for (const objectID in objectUnderAttack) {
            if (!exports.game.users[objectID])
                return;
            (0, exports.setClientCoordinates)(exports.game.users[objectID].objectType, objectID, {
                direction: direction,
                roomID: "asdasd",
                shiftUserPixels: 1,
            });
            exports.game.users[objectID].getDamageStatus = true;
            exports.game.users[objectID].imgName = `${exports.game.users[objectID].objectType}GetDamageImage`;
            setTimeout(() => {
                console.log("Stop Damage");
                exports.game.users[objectID].getDamageStatus = false;
                exports.game.users[objectID].imgName = `${exports.game.users[objectID].objectType}WalkImage`;
            }, 900);
        }
    };
    if (direction === UserMoveDirections.up || direction === UserMoveDirections.stop) {
        for (let i = 0; i <= types_1.NPCOrGamerObjectsData[exports.game.users[objectID].objectType].widthChanks; i++) {
            exports.game.gameField[topLeftYChank - 1][topLeftXChank + i].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(exports.game.gameField[topLeftYChank - 1][topLeftXChank + i].objectDataChank.objectID, topLeftYChank - 1, topLeftXChank + i);
        }
    }
    if (direction === UserMoveDirections.down) {
        for (let i = 0; i <= types_1.NPCOrGamerObjectsData[exports.game.users[objectID].objectType].widthChanks; i++) {
            exports.game.gameField[bottomLeftYChank][bottomLeftXChank + i].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(exports.game.gameField[bottomLeftYChank][bottomLeftXChank + i].objectDataChank.objectID, bottomLeftYChank, bottomLeftXChank + i);
        }
    }
    if (direction === UserMoveDirections.left) {
        if (topLeftXChank - 1 < 0) {
            return;
        }
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[exports.game.users[objectID].objectType].heightChanks; i++) {
            exports.game.gameField[topLeftYChank + i][topLeftXChank - 1].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(exports.game.gameField[topLeftYChank + i][topLeftXChank - 1].objectDataChank.objectID, topLeftYChank + i, topLeftXChank - 1);
        }
    }
    if (direction === UserMoveDirections.right) {
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[exports.game.users[objectID].objectType].heightChanks; i++) {
            exports.game.gameField[topRightYChank + i][topRightXChank + 1].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(exports.game.gameField[topRightYChank + i][topRightXChank + 1].objectDataChank.objectID, topRightYChank + i, topRightXChank + 1);
        }
    }
    setTimeout(() => {
        chanksUnderAttack.map((chank) => {
            exports.game.gameField[chank.row][chank.col].chankUnderAttack = false;
        });
    }, 600);
};
exports.getChanksUnderAttack = getChanksUnderAttack;
