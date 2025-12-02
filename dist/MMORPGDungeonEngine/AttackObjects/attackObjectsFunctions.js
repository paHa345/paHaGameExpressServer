"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCGetChanksUnderAttack = exports.calculateDamage = exports.getChanksAndObjectsUnderAttack = exports.setAttackObjectStatus = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const types_1 = require("../../types");
const statObjectsMain_1 = require("../StatObjects/statObjectsMain");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
const setAttackObjectStatus = (attackObjectID, attackObjectStatus, attackObjectType, io) => {
    gameObject_1.game.users[attackObjectID].imgName = `${attackObjectType}AttackImage`;
    const startAttackTimestamp = Date.now();
    gameObject_1.game.attackStatusObj[attackObjectID] = {
        time: startAttackTimestamp,
        isCooldown: true,
        isActive: true,
    };
    io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverStartAttack", {
        attackObjectID: attackObjectID,
    });
    let stopAttackInterval;
    stopAttackInterval = setInterval(() => {
        if (Date.now() - startAttackTimestamp > 500) {
            gameObject_1.game.attackStatusObj[attackObjectID].isActive = false;
            gameObject_1.game.users[attackObjectID].imgName = `${gameObject_1.game.users[attackObjectID].objectType}WalkImage`;
            clearInterval(stopAttackInterval);
        }
    }, 100);
    let cooldownInterval;
    cooldownInterval = setInterval(() => {
        if (Date.now() - startAttackTimestamp > 1000) {
            gameObject_1.game.attackStatusObj[attackObjectID].isCooldown = false;
            clearInterval(cooldownInterval);
        }
    }, 100);
};
exports.setAttackObjectStatus = setAttackObjectStatus;
const getChanksAndObjectsUnderAttack = (direction, attackObjectID, attackAreaDeep, objectEdgeChanks, io) => {
    const objectUnderAttack = {};
    const chanksUnderAttack = [];
    const attackAreaCoords = () => {
        console.log(gameObject_1.game.users[attackObjectID].NPCViewDirection);
        // для игрока
        if (!gameObject_1.game.users[attackObjectID].NPCViewDirection) {
            console.log(gameObject_1.game.users[attackObjectID].moveDirection);
            if (gameObject_1.game.users[attackObjectID].moveDirection === gameObject_1.UserMoveDirections.up) {
            }
        }
        // для NPC
    };
    attackAreaCoords();
    const addUnderAttackObjectsAndChunksArr = (underAttackChankObjectID, row, col) => {
        chanksUnderAttack.push({ row: row, col: col });
        if (underAttackChankObjectID) {
            objectUnderAttack[underAttackChankObjectID] = 1;
        }
    };
    if (direction === gameObject_1.UserMoveDirections.up || direction === gameObject_1.UserMoveDirections.stop) {
        for (let i = 0; i <= types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].widthChanks; i++) {
            for (let j = 0; j < attackAreaDeep; j++) {
                if (objectEdgeChanks.topLeftYChank - 1 - j < 0)
                    continue;
                gameObject_1.game.gameField[objectEdgeChanks.topLeftYChank - 1 - j][objectEdgeChanks.topLeftXChank + i].chankUnderAttack = true;
                addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[objectEdgeChanks.topLeftYChank - 1 - j][objectEdgeChanks.topLeftXChank + i]
                    .objectDataChank.objectID, objectEdgeChanks.topLeftYChank - 1 - j, objectEdgeChanks.topLeftXChank + i);
            }
        }
    }
    if (direction === gameObject_1.UserMoveDirections.down) {
        for (let i = 0; i <= types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].widthChanks; i++) {
            for (let j = 0; j < attackAreaDeep; j++) {
                if (objectEdgeChanks.bottomLeftYChank + j > gameObject_1.game.mapSize - 1)
                    continue;
                gameObject_1.game.gameField[objectEdgeChanks.bottomLeftYChank + j][objectEdgeChanks.bottomLeftXChank + i].chankUnderAttack = true;
                addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[objectEdgeChanks.bottomLeftYChank + j][objectEdgeChanks.bottomLeftXChank + i].objectDataChank.objectID, objectEdgeChanks.bottomLeftYChank + j, objectEdgeChanks.bottomLeftXChank + i);
            }
        }
    }
    if (direction === gameObject_1.UserMoveDirections.left) {
        if (objectEdgeChanks.topLeftXChank - 1 < 0) {
            return;
        }
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].heightChanks; i++) {
            for (let j = 0; j < attackAreaDeep; j++) {
                if (objectEdgeChanks.topLeftXChank - 1 - j < 0)
                    continue;
                gameObject_1.game.gameField[objectEdgeChanks.topLeftYChank + i][objectEdgeChanks.topLeftXChank - 1 - j].chankUnderAttack = true;
                addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[objectEdgeChanks.topLeftYChank + i][objectEdgeChanks.topLeftXChank - 1 - j]
                    .objectDataChank.objectID, objectEdgeChanks.topLeftYChank + i, objectEdgeChanks.topLeftXChank - 1 - j);
            }
        }
    }
    if (direction === gameObject_1.UserMoveDirections.right) {
        for (let i = 0; i < types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].heightChanks; i++) {
            for (let j = 0; j < attackAreaDeep; j++) {
                if (objectEdgeChanks.topRightXChank + 1 + j > gameObject_1.game.mapSize - 1)
                    continue;
                gameObject_1.game.gameField[objectEdgeChanks.topRightYChank + i][objectEdgeChanks.topRightXChank + 1 + j].chankUnderAttack = true;
                addUnderAttackObjectsAndChunksArr(gameObject_1.game.gameField[objectEdgeChanks.topRightYChank + i][objectEdgeChanks.topRightXChank + 1 + j].objectDataChank.objectID, objectEdgeChanks.topRightYChank + i, objectEdgeChanks.topRightXChank + 1 + j);
            }
        }
    }
    setTimeout(() => {
        chanksUnderAttack.map((chank) => {
            gameObject_1.game.gameField[chank.row][chank.col].chankUnderAttack = false;
        });
    }, 600);
    return {
        chanksUnderAttack: chanksUnderAttack,
        objectUnderAttack: objectUnderAttack,
    };
};
exports.getChanksAndObjectsUnderAttack = getChanksAndObjectsUnderAttack;
const calculateDamage = (direction, attackObjectID, io, objectUnderAttack) => {
    for (const underAttackObjectID in objectUnderAttack) {
        if (!gameObject_1.game.users[underAttackObjectID])
            return;
        if (gameObject_1.game.users[underAttackObjectID].type === "NPC") {
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
                                    isGamerChank: null,
                                };
                            }
                        }
                    }
                };
                getDeletedObjectCurrentChanks(underAttackObjectID);
                gameObject_1.game.users[underAttackObjectID].deathAnimationStatus = true;
                gameObject_1.game.users[underAttackObjectID].imgName = `${gameObject_1.game.users[underAttackObjectID].objectType}DeathImage`;
                io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCDeathAnimationStatus", {
                    underAttackObjectID: underAttackObjectID,
                });
                setTimeout(() => {
                    delete gameObject_1.game.users[underAttackObjectID];
                }, 1200);
                // setTimeout(() => {
                //   chanksUnderAttack.map((chank) => {
                //     game.gameField[chank.row][chank.col].chankUnderAttack = false;
                //   });
                // }, 600);
                return;
            }
            // отправляем всем клиентам данные о hp объекта,
            // по которому прошёл урон
            io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverUnderAttackObjectStat", {
                underAttackObjID: underAttackObjectID,
                underAttackObjectType: gameObject_1.game.users[underAttackObjectID].type,
                underAttackObjStat: gameObject_1.game.statObj.NPC[underAttackObjectID],
            });
            (0, moveObjectsMain_1.setClientCoordinates)(gameObject_1.game.users[underAttackObjectID].objectType, underAttackObjectID, {
                direction: direction,
                roomID: "asdasd",
                shiftUserPixels: 4,
            });
            gameObject_1.game.users[underAttackObjectID].getDamageStatus = true;
            gameObject_1.game.users[underAttackObjectID].imgName = `${gameObject_1.game.users[underAttackObjectID].objectType}GetDamageImage`;
            console.log(gameObject_1.game.users[underAttackObjectID].imgName);
            setTimeout(() => {
                gameObject_1.game.users[underAttackObjectID].getDamageStatus = false;
                gameObject_1.game.users[underAttackObjectID].imgName = `${gameObject_1.game.users[underAttackObjectID].objectType}WalkImage`;
            }, 900);
        }
        if (gameObject_1.game.users[underAttackObjectID].type === "gamer") {
            (0, statObjectsMain_1.reduceGamerHP)(underAttackObjectID, attackObjectID);
            io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverUnderAttackObjectStat", {
                underAttackObjID: underAttackObjectID,
                underAttackObjectType: gameObject_1.game.users[underAttackObjectID].type,
                underAttackObjStat: gameObject_1.game.statObj.gamers[underAttackObjectID],
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
            }, 750);
        }
    }
};
exports.calculateDamage = calculateDamage;
const NPCGetChanksUnderAttack = (objectEdgeChanks, attackObjectID, io) => {
    gameObject_1.game.NPCDataObj[attackObjectID].NPCPrepareToAttackStatus = true;
    if (gameObject_1.game.users[attackObjectID].NPCViewDirection === gameObject_1.UserMoveDirections.up ||
        gameObject_1.game.users[attackObjectID].NPCViewDirection === gameObject_1.UserMoveDirections.stop) {
        gameObject_1.game.NPCUnderAttackChanksObj[attackObjectID] = {
            underAttackArea: {
                baseChankX: objectEdgeChanks.topLeftXChank,
                baseChankY: objectEdgeChanks.topLeftYChank - 3,
                heightChanksNum: 3,
                widthChanksNum: types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].widthChanks,
            },
        };
        io.of("/")
            .to("68a82c599d9ad19c1b4ec4d2")
            .emit("NPCChanksUnderAttack", gameObject_1.game.NPCUnderAttackChanksObj);
    }
    if (gameObject_1.game.users[attackObjectID].NPCViewDirection === gameObject_1.UserMoveDirections.down) {
        gameObject_1.game.NPCUnderAttackChanksObj[attackObjectID] = {
            underAttackArea: {
                baseChankX: objectEdgeChanks.bottomLeftXChank,
                baseChankY: objectEdgeChanks.bottomLeftYChank,
                heightChanksNum: 3,
                widthChanksNum: types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].widthChanks,
            },
        };
        io.of("/")
            .to("68a82c599d9ad19c1b4ec4d2")
            .emit("NPCChanksUnderAttack", gameObject_1.game.NPCUnderAttackChanksObj);
    }
    if (gameObject_1.game.users[attackObjectID].NPCViewDirection === gameObject_1.UserMoveDirections.left) {
        gameObject_1.game.NPCUnderAttackChanksObj[attackObjectID] = {
            underAttackArea: {
                baseChankX: objectEdgeChanks.topLeftXChank - 3,
                baseChankY: objectEdgeChanks.topLeftYChank,
                heightChanksNum: types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].heightChanks,
                widthChanksNum: 3,
            },
        };
        io.of("/")
            .to("68a82c599d9ad19c1b4ec4d2")
            .emit("NPCChanksUnderAttack", gameObject_1.game.NPCUnderAttackChanksObj);
    }
    if (gameObject_1.game.users[attackObjectID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
        gameObject_1.game.NPCUnderAttackChanksObj[attackObjectID] = {
            underAttackArea: {
                baseChankX: objectEdgeChanks.topRightXChank,
                baseChankY: objectEdgeChanks.topRightYChank,
                heightChanksNum: types_1.NPCOrGamerObjectsData[gameObject_1.game.users[attackObjectID].objectType].heightChanks,
                widthChanksNum: 3,
            },
        };
        io.of("/")
            .to("68a82c599d9ad19c1b4ec4d2")
            .emit("NPCChanksUnderAttack", gameObject_1.game.NPCUnderAttackChanksObj);
    }
};
exports.NPCGetChanksUnderAttack = NPCGetChanksUnderAttack;
