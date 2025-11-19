"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDamage = exports.getChanksAndObjectsUnderAttack = exports.setAttackObjectStatus = exports.attackObjectMainMechanism = exports.getObjectEdgeChanks = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const types_1 = require("../../types");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
const statObjectsMain_1 = require("../StatObjects/statObjectsMain");
const getObjectEdgeChanks = (objectID) => {
    const topLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.y / 8);
    return {
        topLeftXChank: topLeftXChank,
        topLeftYChank: topLeftYChank,
        bottomLeftXChank: bottomLeftXChank,
        bottomLeftYChank: bottomLeftYChank,
        topRightXChank: topRightXChank,
        topRightYChank: topRightYChank,
    };
};
exports.getObjectEdgeChanks = getObjectEdgeChanks;
const attackObjectMainMechanism = (attackObjectID, direction, attackObjectStatus, attackObjectType, io) => {
    var _a, _b;
    if ((_a = gameObject_1.game.attackStatusObj[attackObjectID]) === null || _a === void 0 ? void 0 : _a.isCooldown) {
        return;
    }
    if ((_b = gameObject_1.game.attackStatusObj[attackObjectID]) === null || _b === void 0 ? void 0 : _b.isActive) {
        return;
    }
    //тут разделение на мехиники атаки NPC или игрока
    const objectEdgeChanks = (0, exports.getObjectEdgeChanks)(attackObjectID);
    if (attackObjectStatus === "gamer") {
        (0, exports.setAttackObjectStatus)(attackObjectID, attackObjectStatus, attackObjectType, io);
        const chanksAndObjectsUnderAttack = (0, exports.getChanksAndObjectsUnderAttack)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, 1, objectEdgeChanks, io);
        if (chanksAndObjectsUnderAttack === null || chanksAndObjectsUnderAttack === void 0 ? void 0 : chanksAndObjectsUnderAttack.objectUnderAttack) {
            (0, exports.calculateDamage)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, io, chanksAndObjectsUnderAttack === null || chanksAndObjectsUnderAttack === void 0 ? void 0 : chanksAndObjectsUnderAttack.objectUnderAttack);
        }
    }
    if (attackObjectStatus === "NPC") {
        // сначала определяем  чанки, по которым будут проходить удары
        // отправляем их на клиент
        // NPC останавливается
        // и через 2000 мс выполняется атака
        //рассчитаем чанки, по которым пройдёт удар
        const NPCAttack = () => {
            const NPCGetChanksUnderAttack = (objectEdgeChanks) => {
                console.log(objectEdgeChanks.bottomLeftXChank);
                console.log(gameObject_1.game.users[attackObjectID].moveDirection);
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
            NPCGetChanksUnderAttack(objectEdgeChanks);
            setTimeout(() => {
                delete gameObject_1.game.NPCUnderAttackChanksObj[attackObjectID];
                if (gameObject_1.game.NPCDataObj[attackObjectID]) {
                    gameObject_1.game.NPCDataObj[attackObjectID].NPCPrepareToAttackStatus = false;
                }
                io.of("/")
                    .to("68a82c599d9ad19c1b4ec4d2")
                    .emit("NPCChanksUnderAttack", gameObject_1.game.NPCUnderAttackChanksObj);
                if (!gameObject_1.game.users[attackObjectID])
                    return;
                const chanksAndObjectsUnderAttack = (0, exports.getChanksAndObjectsUnderAttack)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, 4, objectEdgeChanks, io);
                // if (chanksAndObjectsUnderAttack?.objectUnderAttack) {
                //   calculateDamage(
                //     game.users[attackObjectID].moveDirection,
                //     attackObjectID,
                //     io,
                //     chanksAndObjectsUnderAttack?.objectUnderAttack
                //   );
                // }
            }, 3000);
        };
        NPCAttack();
    }
};
exports.attackObjectMainMechanism = attackObjectMainMechanism;
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
            // io.of("/").to(clientData.roomID).emit("serverStopAttackCooldown", {
            //   // roomID: clientData.roomID,
            //   // socketID: attackObjectID,
            //   // attackStatus: game.users[attackObjectID].attackStatus,
            //   // isCooldown: false,
            // });
            // console.log("Stop interval");
            // increaseFrameNumber();
            // io.of("/").to(clientData.roomID).emit("serverResetCooldown", {
            //   attackStatusObj: game.attackStatusObj,
            // });
            clearInterval(cooldownInterval);
        }
    }, 100);
};
exports.setAttackObjectStatus = setAttackObjectStatus;
const getChanksAndObjectsUnderAttack = (direction, attackObjectID, attackAreaDeep, objectEdgeChanks, io) => {
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
    console.log("Damage");
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
};
exports.calculateDamage = calculateDamage;
