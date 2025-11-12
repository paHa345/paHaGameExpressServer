"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDamage = exports.getChanksAndObjectsUnderAttack = exports.setAttackObjectStatus = exports.attackObjectMainMechanism = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const types_1 = require("../../types");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
const statObjectsMain_1 = require("../StatObjects/statObjectsMain");
const attackObjectMainMechanism = (attackObjectID, direction, attackObjectStatus, attackObjectType, io) => {
    var _a, _b;
    if ((_a = gameObject_1.game.attackStatusObj[attackObjectID]) === null || _a === void 0 ? void 0 : _a.isCooldown) {
        return;
    }
    if ((_b = gameObject_1.game.attackStatusObj[attackObjectID]) === null || _b === void 0 ? void 0 : _b.isActive) {
        return;
    }
    //тут разделение на мехиники атаки NPC или игрока
    if (attackObjectStatus === "gamer") {
        (0, exports.setAttackObjectStatus)(attackObjectID, attackObjectStatus, attackObjectType, io);
        const chanksAndObjectsUnderAttack = (0, exports.getChanksAndObjectsUnderAttack)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, io);
        if (chanksAndObjectsUnderAttack === null || chanksAndObjectsUnderAttack === void 0 ? void 0 : chanksAndObjectsUnderAttack.objectUnderAttack) {
            (0, exports.calculateDamage)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, io, chanksAndObjectsUnderAttack === null || chanksAndObjectsUnderAttack === void 0 ? void 0 : chanksAndObjectsUnderAttack.objectUnderAttack);
        }
    }
    if (attackObjectStatus === "NPC") {
        console.log("NPC Attack");
        // сначала определяем  чанки, по которым будут проходить удары
        // отправляем их на клиент
        // NPC останавливается
        // и через 1000 мс выполняется атака
    }
};
exports.attackObjectMainMechanism = attackObjectMainMechanism;
const setAttackObjectStatus = (attackObjectID, attackObjectStatus, attackObjectType, io) => {
    // if (attackObjectStatus === "NPC") {
    //   // вычисляем чанки под атакой, отправляем их на коиент
    //   // а через 1000 мс проходит атака
    //   const chanksUnderAttack = getChanksAndObjectsUnderAttack(
    //     game.users[attackObjectID].moveDirection,
    //     attackObjectID,
    //     io
    //   );
    //   io.of("/")
    //     .to("68a82c599d9ad19c1b4ec4d2")
    //     .emit("serverNPCAttackChanks", chanksUnderAttack?.chanksUnderAttack);
    //   setTimeout(() => {
    //     game.users[attackObjectID].imgName = `${attackObjectType}AttackImage`;
    //     const startAttackTimestamp = Date.now();
    //     game.attackStatusObj[attackObjectID] = {
    //       time: startAttackTimestamp,
    //       isCooldown: true,
    //       isActive: true,
    //     };
    //     io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverStartAttack", {
    //       attackObjectID: attackObjectID,
    //     });
    //     let stopAttackInterval: any;
    //     stopAttackInterval = setInterval(() => {
    //       if (Date.now() - startAttackTimestamp > 500) {
    //         game.attackStatusObj[attackObjectID].isActive = false;
    //         game.users[attackObjectID].imgName = `${game.users[attackObjectID].objectType}WalkImage`;
    //         clearInterval(stopAttackInterval);
    //       }
    //     }, 100);
    //     let cooldownInterval: any;
    //     cooldownInterval = setInterval(() => {
    //       if (Date.now() - startAttackTimestamp > 1000) {
    //         game.attackStatusObj[attackObjectID].isCooldown = false;
    //         clearInterval(cooldownInterval);
    //       }
    //     }, 100);
    //   }, 1000);
    // }
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
const getChanksAndObjectsUnderAttack = (direction, attackObjectID, io) => {
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
