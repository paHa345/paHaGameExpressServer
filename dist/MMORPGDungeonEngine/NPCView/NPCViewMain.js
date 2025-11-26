"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCViewMain = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const types_1 = require("../../types");
const attackObjectsMain_1 = require("../AttackObjects/attackObjectsMain");
const NPCViewMain = (NPCObj, NPCID, io) => {
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
        //смотрим основную ось, есть ли на ней игрок
        for (let i = 0; i < 4; i++) {
            if (topLeftYChank - 1 - i < 0)
                break;
            if (gameObject_1.game.gameField[topLeftYChank - 1 - i][baseNPCLevel].objectDataChank.isGamerChank === true &&
                i === 0 &&
                !NPCObj.NPCPrepareToAttackStatus) {
                console.log("Игрок в зоне атаки. Сейчас я его ударю");
                NPCObj.NPCCondition.type = "aggression";
                (0, attackObjectsMain_1.attackObjectMainMechanism)(NPCID, gameObject_1.game.users[NPCID].NPCViewDirection, "NPC", "orc3", io);
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
        // io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
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
                (0, attackObjectsMain_1.attackObjectMainMechanism)(NPCID, gameObject_1.game.users[NPCID].NPCViewDirection, "NPC", "orc3", io);
                NPCObj.NPCCondition.type = "aggression";
                return;
            }
            if (gameObject_1.game.gameField[bottomLeftYChank + 1 + i][baseNPCLevel].objectDataChank.isGamerChank ===
                true &&
                i > 0) {
                NPCObj.NPCCondition.type = "aggression";
                NPCObj.directionPointer = 1;
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
        // io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left) {
        baseNPCLevel = topLeftYChank + 2;
        for (let i = 0; i < 4; i++) {
            if (topLeftXChank - 1 - i < 0)
                break;
            if (gameObject_1.game.gameField[baseNPCLevel][topLeftXChank - 1 - i].objectDataChank.isGamerChank === true &&
                i === 0) {
                console.log("Игрок в зоне атаки. Атакую");
                NPCObj.NPCCondition.type = "aggression";
                (0, attackObjectsMain_1.attackObjectMainMechanism)(NPCID, gameObject_1.game.users[NPCID].NPCViewDirection, "NPC", "orc3", io);
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
        // io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
        baseNPCLevel = topRightYChank + 2;
        for (let i = 0; i < 4; i++) {
            if (topRightXChank + 1 + i > gameObject_1.game.mapSize - 1)
                break;
            if (gameObject_1.game.gameField[baseNPCLevel][topRightXChank + 1 + i].objectDataChank.isGamerChank ===
                true &&
                i === 0) {
                console.log("Игрок в зоне атаки. Атакую");
                NPCObj.NPCCondition.type = "aggression";
                (0, attackObjectsMain_1.attackObjectMainMechanism)(NPCID, gameObject_1.game.users[NPCID].NPCViewDirection, "NPC", "orc3", io);
                return;
            }
            if (gameObject_1.game.gameField[baseNPCLevel][topRightXChank + 1 + i].objectDataChank.isGamerChank ===
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
                chanks.push({
                    x: topRightXChank + 1 + i,
                    y: topRightYChank - 3 + j,
                });
            }
        }
        NPCObj.NPCCondition.type = "observation";
        // io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
    }
};
exports.NPCViewMain = NPCViewMain;
