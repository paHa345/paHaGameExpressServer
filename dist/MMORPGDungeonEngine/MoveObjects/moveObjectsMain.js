"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCVisibleAreaMain = exports.clearMoveNPCInterval = exports.moveNPCMain = exports.setClientCoordinates = exports.setUserCurrentChanks = void 0;
const types_1 = require("../../types");
const gameObject_1 = require("../gameObject/gameObject");
const setUserCurrentChanks = (chanksQuantity, objectID, direction) => {
    if (!gameObject_1.game.users[objectID]) {
        return;
    }
    const prevTopLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.prevCoord.topLeft.x / 8);
    const prevTopLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.prevCoord.topLeft.y / 8);
    const prevBottomLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.prevCoord.bottomLeft.x / 8);
    const prevBottomLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.prevCoord.bottomLeft.y / 8);
    const prevTopRightXChank = Math.floor(gameObject_1.game.users[objectID].square.prevCoord.topRight.x / 8);
    const prevTopRightYChank = Math.floor(gameObject_1.game.users[objectID].square.prevCoord.topRight.y / 8);
    const topLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.y / 8);
    const isGamer = gameObject_1.game.users[objectID].type === "gamer";
    for (let i = 0; i <= chanksQuantity.width; i++) {
        if (direction === gameObject_1.UserMoveDirections.down) {
            gameObject_1.game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
                isGamerChank: null,
            };
        }
        gameObject_1.game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
            objectID: objectID,
            isObjectChank: true,
            isGamerChank: isGamer,
        };
        if (direction === gameObject_1.UserMoveDirections.up) {
            gameObject_1.game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
                isGamerChank: null,
            };
        }
        gameObject_1.game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
            objectID: objectID,
            isObjectChank: true,
            isGamerChank: isGamer,
        };
    }
    for (let i = 0; i < chanksQuantity.height; i++) {
        gameObject_1.game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
            objectID: objectID,
            isObjectChank: true,
            isGamerChank: isGamer,
        };
        if (direction === gameObject_1.UserMoveDirections.right) {
            gameObject_1.game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
                isGamerChank: null,
            };
        }
        gameObject_1.game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
            objectID: objectID,
            isObjectChank: true,
            isGamerChank: isGamer,
        };
        if (direction === gameObject_1.UserMoveDirections.left) {
            gameObject_1.game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
                isGamerChank: null,
            };
            gameObject_1.game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
                objectID: objectID,
                isObjectChank: true,
                isGamerChank: isGamer,
            };
        }
    }
};
exports.setUserCurrentChanks = setUserCurrentChanks;
const setClientCoordinates = (objectType, objectID, clientData) => {
    if (gameObject_1.game.users[objectID]) {
        gameObject_1.game.users[objectID].square.prevCoord = JSON.parse(JSON.stringify(gameObject_1.game.users[objectID].square.currentCoord));
    }
    if (gameObject_1.game.users[objectID] && gameObject_1.game.attackStatusObj[objectID]) {
        gameObject_1.game.users[objectID].getDamageStatus
            ? (gameObject_1.game.users[objectID].imgName = `${objectType}GetDamageImage`)
            : (gameObject_1.game.users[objectID].imgName = `${objectType}WalkImage`);
        gameObject_1.game.attackStatusObj[objectID].isActive
            ? (gameObject_1.game.users[objectID].imgName = `${objectType}AttackImage`)
            : (gameObject_1.game.users[objectID].imgName = `${objectType}WalkImage`);
    }
    const setMoveCoord = () => {
        if (clientData.direction === gameObject_1.UserMoveDirections.down) {
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y =
                gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y =
                gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y + clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.y =
                gameObject_1.game.users[objectID].square.currentCoord.topLeft.y + clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topRight.y =
                gameObject_1.game.users[objectID].square.currentCoord.topRight.y + clientData.shiftUserPixels;
        }
        if (clientData.direction === gameObject_1.UserMoveDirections.left) {
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x =
                gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x - clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x =
                gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x - clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x =
                gameObject_1.game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x =
                gameObject_1.game.users[objectID].square.currentCoord.topRight.x - clientData.shiftUserPixels;
        }
        if (clientData.direction === gameObject_1.UserMoveDirections.right) {
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x =
                gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x + clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x =
                gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x + clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x =
                gameObject_1.game.users[objectID].square.currentCoord.topLeft.x + clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x =
                gameObject_1.game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels;
        }
        if (clientData.direction === gameObject_1.UserMoveDirections.up) {
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y =
                gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y - clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y =
                gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y - clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.y =
                gameObject_1.game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels;
            gameObject_1.game.users[objectID].square.currentCoord.topRight.y =
                gameObject_1.game.users[objectID].square.currentCoord.topRight.y - clientData.shiftUserPixels;
        }
    };
    const setCurrentCoord = function (clientData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (!gameObject_1.game.users[objectID])
            return;
        gameObject_1.game.users[objectID].moveDirection = clientData.direction;
        if (clientData.direction === gameObject_1.UserMoveDirections.down) {
            // смотрим чанки, на которые хотим встать
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels >
                (gameObject_1.game.mapSize - 1) * 8 ||
                ((_a = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)]) === null || _a === void 0 ? void 0 : _a.notMove) ||
                ((_b = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)]) === null || _b === void 0 ? void 0 : _b.notMove) ||
                ((_c = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)]) === null || _c === void 0 ? void 0 : _c.objectDataChank.isObjectChank) ||
                ((_d = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)]) === null || _d === void 0 ? void 0 : _d.objectDataChank.isObjectChank)
                ? (gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y =
                    gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y)
                : setMoveCoord();
        }
        if (clientData.direction === gameObject_1.UserMoveDirections.left) {
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels < 0 ||
                ((_e = gameObject_1.game.gameField[Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.y + 5) / 8)][Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.x / 8)]) === null || _e === void 0 ? void 0 : _e.notMove) ||
                ((_f = gameObject_1.game.gameField[Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y - 5) / 8)][Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x / 8)]) === null || _f === void 0 ? void 0 : _f.notMove) ||
                ((_g = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.x - 8) / 8)]) === null || _g === void 0 ? void 0 : _g.objectDataChank.isObjectChank) ||
                ((_h = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x - 8) / 8)]) === null || _h === void 0 ? void 0 : _h.objectDataChank.isObjectChank)
                ? (gameObject_1.game.users[objectID].square.currentCoord.topLeft.x =
                    gameObject_1.game.users[objectID].square.currentCoord.topLeft.x)
                : setMoveCoord();
        }
        if (clientData.direction === gameObject_1.UserMoveDirections.right) {
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels >
                (gameObject_1.game.mapSize - 2) * 8 ||
                ((_j = gameObject_1.game.gameField[Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topRight.y + 5) / 8)][Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.x / 8)]) === null || _j === void 0 ? void 0 : _j.notMove) ||
                ((_k = gameObject_1.game.gameField[Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y - 5) / 8)][Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x / 8)]) === null || _k === void 0 ? void 0 : _k.notMove) ||
                ((_l = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topRight.x + 8) / 8)]) === null || _l === void 0 ? void 0 : _l.objectDataChank.isObjectChank) ||
                ((_m = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x + 8) / 8)]) === null || _m === void 0 ? void 0 : _m.objectDataChank.isObjectChank)
                ? (gameObject_1.game.users[objectID].square.currentCoord.topRight.x =
                    gameObject_1.game.users[objectID].square.currentCoord.topRight.x)
                : setMoveCoord();
        }
        if (clientData.direction === gameObject_1.UserMoveDirections.up) {
            if (Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.y - 13) / 8) < 0) {
                return;
            }
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels < 0 ||
                ((_o = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.x + 5) / 8)]) === null || _o === void 0 ? void 0 : _o.notMove) ||
                ((_p = gameObject_1.game.gameField[Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.y / 8)][Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topRight.x - 5) / 8)]) === null || _p === void 0 ? void 0 : _p.notMove) ||
                ((_q = gameObject_1.game.gameField[Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.x / 8)]) === null || _q === void 0 ? void 0 : _q.objectDataChank.isObjectChank) ||
                ((_r = gameObject_1.game.gameField[Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.x / 8)]) === null || _r === void 0 ? void 0 : _r.objectDataChank.isObjectChank)
                ? (gameObject_1.game.users[objectID].square.currentCoord.topLeft.y =
                    gameObject_1.game.users[objectID].square.currentCoord.topLeft.y)
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
let moveNPCInterval;
const moveNPCMain = (io) => {
    const directions = [
        gameObject_1.UserMoveDirections.right,
        gameObject_1.UserMoveDirections.down,
        gameObject_1.UserMoveDirections.up,
        gameObject_1.UserMoveDirections.left,
        gameObject_1.UserMoveDirections.stop,
    ];
    const NPCObj = [];
    for (const objectID in gameObject_1.game.users) {
        NPCObj.push({
            timeMoveDirection: Date.now(),
            timeViewCheck: Date.now(),
            NPCID: objectID,
            directionPointer: 0,
            NPCCondition: {
                type: "observation",
                moveDirercion: 0,
                viewDirection: 0,
            },
        });
    }
    moveNPCInterval = setInterval(() => {
        var _a, _b, _c, _d, _e;
        for (let i = 0; i < NPCObj.length; i++) {
            if (!gameObject_1.game.users[NPCObj[i].NPCID]) {
                NPCObj.splice(i, 1);
                return;
            }
            if (Date.now() - NPCObj[i].timeViewCheck > 1500) {
                console.log(NPCObj[i].NPCCondition.type);
                (0, exports.NPCVisibleAreaMain)(NPCObj[i], NPCObj[i].NPCID, io);
                NPCObj[i].timeViewCheck = Date.now();
            }
            if (Date.now() - NPCObj[i].timeMoveDirection > 5000) {
                const getRandomNumber = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };
                NPCObj[i].directionPointer = getRandomNumber(0, 4);
                NPCObj[i].timeMoveDirection = Date.now();
            }
            if ((_a = gameObject_1.game.users[NPCObj[i].NPCID]) === null || _a === void 0 ? void 0 : _a.deathAnimationStatus) {
                return;
            }
            if (NPCObj[i].NPCCondition.type === "observation" &&
                (!((_b = gameObject_1.game.users[NPCObj[i].NPCID]) === null || _b === void 0 ? void 0 : _b.getDamageStatus) ||
                    !((_c = gameObject_1.game.users[NPCObj[i].NPCID]) === null || _c === void 0 ? void 0 : _c.deathAnimationStatus))) {
                gameObject_1.game.users[NPCObj[i].NPCID].NPCViewDirection = directions[NPCObj[i].directionPointer];
                // setClientCoordinates(game.users[NPCObj[i].NPCID].objectType, NPCObj[i].NPCID, {
                //   direction: directions[NPCObj[i].directionPointer],
                //   roomID: "asdasd",
                //   shiftUserPixels: 1,
                // });
            }
            if (NPCObj[i].NPCCondition.type === "aggression" &&
                (!((_d = gameObject_1.game.users[NPCObj[i].NPCID]) === null || _d === void 0 ? void 0 : _d.getDamageStatus) ||
                    !((_e = gameObject_1.game.users[NPCObj[i].NPCID]) === null || _e === void 0 ? void 0 : _e.deathAnimationStatus))) {
                (0, exports.setClientCoordinates)(gameObject_1.game.users[NPCObj[i].NPCID].objectType, NPCObj[i].NPCID, {
                    direction: directions[NPCObj[i].directionPointer],
                    roomID: "asdasd",
                    shiftUserPixels: 1,
                });
            }
        }
    }, 33);
};
exports.moveNPCMain = moveNPCMain;
const clearMoveNPCInterval = () => {
    clearInterval(moveNPCInterval);
    moveNPCInterval = null;
};
exports.clearMoveNPCInterval = clearMoveNPCInterval;
const NPCVisibleAreaMain = (NPCObj, NPCID, io) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!gameObject_1.game.users[NPCID])
        return;
    const topLeftXChank = Math.floor(gameObject_1.game.users[NPCID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(gameObject_1.game.users[NPCID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(gameObject_1.game.users[NPCID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(gameObject_1.game.users[NPCID].square.currentCoord.topRight.y / 8);
    const chanks = [];
    let baseNPCLevel;
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.up ||
        gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.stop) {
        baseNPCLevel = topLeftXChank + 1;
        console.log(baseNPCLevel);
        //смотрим основную ось, есть ли на ней игрок
        for (let i = 0; i < 4; i++) {
            if (topLeftYChank - 1 - i < 0)
                break;
            if (gameObject_1.game.gameField[topLeftYChank - 1 - i][baseNPCLevel].objectDataChank.isGamerChank === true &&
                i === 0) {
                console.log("Игрок в зоне атаки. Атакую");
                NPCObj.NPCCondition.type = "aggression";
                return;
            }
            if (gameObject_1.game.gameField[topLeftYChank - 1 - i][baseNPCLevel].objectDataChank.isGamerChank === true &&
                i > 0) {
                NPCObj.NPCCondition.type = "aggression";
                NPCObj.directionPointer = 2;
                return;
            }
        }
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 6; i++) {
            if (topLeftXChank - 3 + i < 0 || topLeftXChank - 3 + i > gameObject_1.game.mapSize - 1)
                continue;
            for (let j = 0; j < 4; j++) {
                if (topLeftYChank - 1 - j < 0)
                    continue;
                if ((i === 0 && j === 0) ||
                    (i === 0 && j === 1) ||
                    (i === 1 && j === 0) ||
                    (i === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 5 && j === 0) ||
                    (i === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 5 && j === 1) ||
                    (i === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 4 && j === 0)) {
                    continue;
                }
                if (((_b = (_a = gameObject_1.game.gameField[topLeftYChank - 1 - j][topLeftXChank - 3 + i]) === null || _a === void 0 ? void 0 : _a.objectDataChank) === null || _b === void 0 ? void 0 : _b.isGamerChank) === true) {
                    console.log(`Вижу игрока: ${topLeftYChank - 1 - j}: ${topLeftXChank - 3 + i}.`);
                    console.log(`Двигаюсь к нему ${topLeftXChank - 3 + i > baseNPCLevel ? " вправо" : " влево"}`);
                    topLeftXChank - 3 + i > baseNPCLevel
                        ? (NPCObj.directionPointer = 0)
                        : (NPCObj.directionPointer = 3);
                    NPCObj.NPCCondition.type = "aggression";
                    return;
                }
                chanks.push({
                    x: topLeftXChank - 3 + i,
                    y: topLeftYChank - 1 - j,
                });
            }
        }
        NPCObj.NPCCondition.type = "observation";
        io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.down) {
        baseNPCLevel = bottomLeftXChank + 1;
        for (let i = 0; i < 4; i++) {
            if (bottomLeftYChank + 1 + i > gameObject_1.game.mapSize - 1)
                break;
            if (gameObject_1.game.gameField[bottomLeftYChank + 1 + i][baseNPCLevel].objectDataChank.isGamerChank ===
                true &&
                i === 0) {
                console.log("Игрок в зоне атаки. Атакую");
                NPCObj.NPCCondition.type = "aggression";
                return;
            }
            if (gameObject_1.game.gameField[bottomLeftYChank + 1 + i][baseNPCLevel].objectDataChank.isGamerChank ===
                true &&
                i > 0) {
                NPCObj.NPCCondition.type = "aggression";
                NPCObj.directionPointer = 2;
                return;
            }
        }
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 6; i++) {
            if (bottomLeftXChank - 3 + i < 0 || bottomLeftXChank - 3 + i > gameObject_1.game.mapSize - 1)
                continue;
            for (let j = 0; j < 4; j++) {
                if (bottomLeftYChank + 1 + j > gameObject_1.game.mapSize - 1 - 1)
                    continue;
                if ((i === 0 && j === 0) ||
                    (i === 0 && j === 1) ||
                    (i === 1 && j === 0) ||
                    (i === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 5 && j === 0) ||
                    (i === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 5 && j === 1) ||
                    (i === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].widthChanks + 4 && j === 1)) {
                    continue;
                }
                if (((_d = (_c = gameObject_1.game.gameField[bottomLeftYChank + 1 + j][bottomLeftXChank - 3 + i]) === null || _c === void 0 ? void 0 : _c.objectDataChank) === null || _d === void 0 ? void 0 : _d.isGamerChank) === true) {
                    console.log(`Вижу игрока: ${bottomLeftYChank + 1 + j}: ${bottomLeftXChank - 3 + i}.`);
                    console.log(`Двигаюсь к нему ${bottomLeftXChank - 3 + i > baseNPCLevel ? " вправо" : " влево"}`);
                    bottomLeftXChank - 3 + i > baseNPCLevel
                        ? (NPCObj.directionPointer = 0)
                        : (NPCObj.directionPointer = 3);
                    NPCObj.NPCCondition.type = "aggression";
                    return;
                }
                chanks.push({
                    x: bottomLeftXChank - 3 + i,
                    y: bottomLeftYChank + 1 + j,
                });
            }
        }
        NPCObj.NPCCondition.type = "observation";
        io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left) {
        baseNPCLevel = topLeftYChank + 2;
        // console.log(baseNPCLevel);
        for (let i = 0; i < 4; i++) {
            if (topLeftXChank - 1 - i < 0)
                break;
            if (gameObject_1.game.gameField[baseNPCLevel][topLeftXChank - 1 - i].objectDataChank.isGamerChank === true &&
                i === 0) {
                console.log("Игрок в зоне атаки. Атакую");
                NPCObj.NPCCondition.type = "aggression";
                return;
            }
            if (gameObject_1.game.gameField[baseNPCLevel][topLeftXChank - 1 - i].objectDataChank.isGamerChank === true &&
                i > 0) {
                console.log("Игрок на оси атаки. Двигаюсь к нему");
                NPCObj.NPCCondition.type = "aggression";
                NPCObj.directionPointer = 3;
                return;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (topLeftXChank - 1 - i < 0)
                continue;
            for (let j = 0; j < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 6; j++) {
                if (topLeftYChank - 3 + j < 0 || topLeftYChank - 3 + j > gameObject_1.game.mapSize - 1) {
                    continue;
                }
                if ((i === 0 && j === 0) ||
                    (i === 0 && j === 1) ||
                    (i === 1 && j === 0) ||
                    (j === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 5 && i === 0) ||
                    (j === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 4 && i === 0) ||
                    (j === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 5 && i === 1)) {
                    continue;
                }
                if (((_f = (_e = gameObject_1.game.gameField[topLeftYChank - 3 + j][topLeftXChank - 1 - i]) === null || _e === void 0 ? void 0 : _e.objectDataChank) === null || _f === void 0 ? void 0 : _f.isGamerChank) === true) {
                    console.log(`Вижу игрока: ${topLeftYChank - 3 + j}: ${topLeftXChank - 1 - i}.`);
                    console.log(`Двигаюсь к нему ${topLeftYChank - 3 + j > baseNPCLevel ? " вниз" : " вверх"}`);
                    topLeftYChank - 3 + j > baseNPCLevel
                        ? (NPCObj.directionPointer = 1)
                        : (NPCObj.directionPointer = 2);
                    NPCObj.NPCCondition.type = "aggression";
                    return;
                }
                chanks.push({
                    x: topLeftXChank - 1 - i,
                    y: topLeftYChank - 3 + j,
                });
            }
        }
        NPCObj.NPCCondition.type = "observation";
        io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
        baseNPCLevel = topRightYChank + 2;
        for (let i = 0; i < 4; i++) {
            if (topRightYChank + 1 + i > gameObject_1.game.mapSize - 1)
                break;
            if (gameObject_1.game.gameField[baseNPCLevel][topRightYChank + 1 + i].objectDataChank.isGamerChank ===
                true &&
                i === 0) {
                console.log("Игрок в зоне атаки. Атакую");
                NPCObj.NPCCondition.type = "aggression";
                return;
            }
            if (gameObject_1.game.gameField[baseNPCLevel][topRightYChank + 1 + i].objectDataChank.isGamerChank ===
                true &&
                i > 0) {
                console.log("Игрок на оси атаки. Двигаюсь к нему");
                NPCObj.NPCCondition.type = "aggression";
                NPCObj.directionPointer = 0;
                return;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (topRightXChank + 1 + i > gameObject_1.game.mapSize - 1)
                continue;
            for (let j = 0; j < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 6; j++) {
                if (topRightYChank - 3 + j < 0 || topRightYChank - 3 + j > gameObject_1.game.mapSize - 1) {
                    continue;
                }
                if ((i === 0 && j === 0) ||
                    (i === 0 && j === 1) ||
                    (i === 1 && j === 0) ||
                    (j === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 5 && i === 0) ||
                    (j === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 4 && i === 0) ||
                    (j === types_1.NPCOrGamerObjectsData[gameObject_1.game.users[NPCID].objectType].heightChanks + 5 && i === 1)) {
                    continue;
                }
                if (((_h = (_g = gameObject_1.game.gameField[topRightYChank - 3 + j][topRightXChank + 1 + i]) === null || _g === void 0 ? void 0 : _g.objectDataChank) === null || _h === void 0 ? void 0 : _h.isGamerChank) === true) {
                    console.log(`Вижу игрока: ${topRightYChank - 3 + j}: ${topRightXChank + 1 + i}.`);
                    console.log(`Двигаюсь к нему ${topRightYChank - 3 + j > baseNPCLevel ? " вниз" : " вверх"}`);
                    topRightYChank - 3 + j > baseNPCLevel
                        ? (NPCObj.directionPointer = 1)
                        : (NPCObj.directionPointer = 2);
                    NPCObj.NPCCondition.type = "aggression";
                    return;
                }
                // if (
                //   game.gameField[topRightYChank - 3 + j][topRightXChank + 1 + i]?.objectDataChank
                //     ?.isGamerChank === true
                // ) {
                //   console.log(`user detected: ${topRightYChank - 3 + j}: ${topRightXChank + 1 + i}`);
                //   return;
                // }
                chanks.push({
                    x: topRightXChank + 1 + i,
                    y: topRightYChank - 3 + j,
                });
            }
        }
        NPCObj.NPCCondition.type = "observation";
        io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
};
exports.NPCVisibleAreaMain = NPCVisibleAreaMain;
