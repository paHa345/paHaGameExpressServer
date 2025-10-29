"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChanksUnderAttack = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const types_1 = require("../../types");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
const statObjectsMain_1 = require("../StatObjects/statObjectsMain");
const getChanksUnderAttack = (direction, attackObjectID, io) => {
    const topLeftXChank = Math.floor(gameObject_1.game.users[attackObjectID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(gameObject_1.game.users[attackObjectID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(gameObject_1.game.users[attackObjectID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(gameObject_1.game.users[attackObjectID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(gameObject_1.game.users[attackObjectID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(gameObject_1.game.users[attackObjectID].square.currentCoord.topRight.y / 8);
    const objectUnderAttack = {};
    const chanksUnderAttack = [];
    const addUnderAttackObjectsAndChunksArr = (underAttackChankObjectID, row, col) => {
        chanksUnderAttack.push({ row: row, col: col });
        if (underAttackChankObjectID) {
            objectUnderAttack[underAttackChankObjectID] = 1;
        }
    };
    if (direction === gameObject_1.UserMoveDirections.up || direction === gameObject_1.UserMoveDirections.stop) {
        for (let i = 0; i <= types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].widthChanks; i++) {
            gameObject_1.game.gameField[topLeftYChank - 1][topLeftXChank + i].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[topLeftYChank - 1][topLeftXChank + i].objectDataChank.objectID, topLeftYChank - 1, topLeftXChank + i);
        }
    }
    if (direction === gameObject_1.UserMoveDirections.down) {
        for (let i = 0; i <= types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].widthChanks; i++) {
            gameObject_1.game.gameField[bottomLeftYChank][bottomLeftXChank + i].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[bottomLeftYChank][bottomLeftXChank + i].objectDataChank.objectID, bottomLeftYChank, bottomLeftXChank + i);
        }
    }
    if (direction === gameObject_1.UserMoveDirections.left) {
        if (topLeftXChank - 1 < 0) {
            return;
        }
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].heightChanks; i++) {
            gameObject_1.game.gameField[topLeftYChank + i][topLeftXChank - 1].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[topLeftYChank + i][topLeftXChank - 1].objectDataChank.objectID, topLeftYChank + i, topLeftXChank - 1);
        }
    }
    if (direction === gameObject_1.UserMoveDirections.right) {
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].heightChanks; i++) {
            gameObject_1.game.gameField[topRightYChank + i][topRightXChank + 1].chankUnderAttack = true;
            addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[topRightYChank + i][topRightXChank + 1].objectDataChank.objectID, topRightYChank + i, topRightXChank + 1);
        }
    }
    for (const underAttackObjectID in objectUnderAttack) {
        if (!gameObject_1.game.users[underAttackObjectID])
            return;
        if (gameObject_1.game.statObj.NPC[underAttackObjectID] === undefined)
            return;
        // отнимаем hp у лбъекта, по которому проходит урон
        (0, statObjectsMain_1.reduceNPCHP)(underAttackObjectID, attackObjectID);
        // если у объекта по которому проходит урон, не осталось hp, то запускается анимация
        //  и объект удаляется и очищаются занимаемые чанки
        if (gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP <= 0) {
            // находим чанки и очищаем их
            const getDeletedObjectCurrentChanks = (underAttackObjectID) => {
                const topLeftXChank = Math.floor(gameObject_1.game.users[underAttackObjectID].square.currentCoord.topLeft.x / 8);
                const topLeftYChank = Math.floor(gameObject_1.game.users[underAttackObjectID].square.currentCoord.topLeft.y / 8);
                const deletedObjectType = gameObject_1.game.users[underAttackObjectID].objectType;
                for (let i = 0; i <= types_1.NPCOrGamerObjectsData[deletedObjectType].widthChanks; i++) {
                    for (let j = 0; j <= types_1.NPCOrGamerObjectsData[deletedObjectType].heightChanks; j++) {
                        if (gameObject_1.game.gameField[topLeftYChank + j][topLeftXChank + i].objectDataChank.objectID ===
                            underAttackObjectID) {
                            gameObject_1.game.gameField[topLeftYChank + j][topLeftXChank + i].objectDataChank = {
                                objectID: undefined,
                                isObjectChank: false,
                            };
                        }
                    }
                }
            };
            getDeletedObjectCurrentChanks(underAttackObjectID);
            gameObject_1.game.users[underAttackObjectID].deathAnimationStatus = true;
            gameObject_1.game.users[underAttackObjectID].imgName = `${gameObject_1.game.users[underAttackObjectID].objectType}DeathImage`;
            setTimeout(() => {
                delete gameObject_1.game.users[underAttackObjectID];
            }, 1200);
            setTimeout(() => {
                chanksUnderAttack.map((chank) => {
                    gameObject_1.game.gameField[chank.row][chank.col].chankUnderAttack = false;
                });
            }, 600);
            return;
        }
        // отправляем всем клиентам данные о hp объекта,
        // по которому прошёл урон
        io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverUnderAttackObjectStat", {
            underAttackObjID: underAttackObjectID,
            underAttackObjStat: gameObject_1.game.statObj.NPC[underAttackObjectID],
        });
        (0, moveObjectsMain_1.setClientCoordinates)(gameObject_1.game.users[underAttackObjectID].objectType, underAttackObjectID, {
            direction: direction,
            roomID: "asdasd",
            shiftUserPixels: 4,
        });
        gameObject_1.game.users[underAttackObjectID].getDamageStatus = true;
        gameObject_1.game.users[underAttackObjectID].imgName = `${gameObject_1.game.users[underAttackObjectID].objectType}GetDamageImage`;
        setTimeout(() => {
            gameObject_1.game.users[underAttackObjectID].getDamageStatus = false;
            gameObject_1.game.users[underAttackObjectID].imgName = `${gameObject_1.game.users[underAttackObjectID].objectType}WalkImage`;
        }, 900);
    }
    setTimeout(() => {
        chanksUnderAttack.map((chank) => {
            gameObject_1.game.gameField[chank.row][chank.col].chankUnderAttack = false;
        });
    }, 600);
};
exports.getChanksUnderAttack = getChanksUnderAttack;
