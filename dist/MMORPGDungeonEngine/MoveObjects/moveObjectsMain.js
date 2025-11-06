"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveNPC = exports.setClientCoordinates = exports.setUserCurrentChanks = void 0;
const types_1 = require("../../types");
const gameObject_1 = require("../gameObject/gameObject");
const setUserCurrentChanks = (chanksQuantity, socketID, direction) => {
    if (!gameObject_1.game.users[socketID]) {
        return;
    }
    const prevTopLeftXChank = Math.floor(gameObject_1.game.users[socketID].square.prevCoord.topLeft.x / 8);
    const prevTopLeftYChank = Math.floor(gameObject_1.game.users[socketID].square.prevCoord.topLeft.y / 8);
    const prevBottomLeftXChank = Math.floor(gameObject_1.game.users[socketID].square.prevCoord.bottomLeft.x / 8);
    const prevBottomLeftYChank = Math.floor(gameObject_1.game.users[socketID].square.prevCoord.bottomLeft.y / 8);
    const prevTopRightXChank = Math.floor(gameObject_1.game.users[socketID].square.prevCoord.topRight.x / 8);
    const prevTopRightYChank = Math.floor(gameObject_1.game.users[socketID].square.prevCoord.topRight.y / 8);
    const topLeftXChank = Math.floor(gameObject_1.game.users[socketID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(gameObject_1.game.users[socketID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(gameObject_1.game.users[socketID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(gameObject_1.game.users[socketID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(gameObject_1.game.users[socketID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(gameObject_1.game.users[socketID].square.currentCoord.topRight.y / 8);
    for (let i = 0; i <= chanksQuantity.width; i++) {
        if (direction === gameObject_1.UserMoveDirections.down) {
            gameObject_1.game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
        }
        gameObject_1.game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
        if (direction === gameObject_1.UserMoveDirections.up) {
            gameObject_1.game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
        }
        gameObject_1.game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
    }
    for (let i = 0; i < chanksQuantity.height; i++) {
        gameObject_1.game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
        if (direction === gameObject_1.UserMoveDirections.right) {
            gameObject_1.game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
            };
        }
        gameObject_1.game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
            objectID: socketID,
            isObjectChank: true,
        };
        if (direction === gameObject_1.UserMoveDirections.left) {
            gameObject_1.game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
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
const directions = [
    gameObject_1.UserMoveDirections.right,
    gameObject_1.UserMoveDirections.down,
    gameObject_1.UserMoveDirections.up,
    gameObject_1.UserMoveDirections.left,
    gameObject_1.UserMoveDirections.stop,
];
const moveNPC = (NPCID, NPCType) => {
    let directionPointer = 0;
    let time = Date.now();
    const moveNPCInterval = setInterval(() => {
        var _a, _b, _c;
        if (Date.now() - time > 5000) {
            const getRandomNumber = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            directionPointer = getRandomNumber(0, 4);
            time = Date.now();
        }
        if ((_a = gameObject_1.game.users[NPCID]) === null || _a === void 0 ? void 0 : _a.deathAnimationStatus) {
            return;
        }
        if (!gameObject_1.game.users[NPCID]) {
            clearInterval(moveNPCInterval);
            return;
        }
        if (!((_b = gameObject_1.game.users[NPCID]) === null || _b === void 0 ? void 0 : _b.getDamageStatus) || !((_c = gameObject_1.game.users[NPCID]) === null || _c === void 0 ? void 0 : _c.deathAnimationStatus)) {
            (0, exports.setClientCoordinates)(NPCType, NPCID, {
                direction: directions[directionPointer],
                roomID: "asdasd",
                shiftUserPixels: 1,
            });
        }
    }, 33);
};
exports.moveNPC = moveNPC;
