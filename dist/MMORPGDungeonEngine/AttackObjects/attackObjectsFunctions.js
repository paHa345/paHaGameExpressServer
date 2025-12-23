"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCGetChanksUnderAttack = exports.calculateDamage = exports.getChanksAndObjectsUnderAttack = exports.getAreaAndObjectsUnderAttack = exports.setAttackObjectStatus = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const types_1 = require("../../types");
const statObjectsMain_1 = require("../StatObjects/statObjectsMain");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
const moveObjectsFunctions_1 = require("../MoveObjects/moveObjectsFunctions");
const getAttackAreaCoordsFunctions_1 = require("./getAttackAreaCoordsFunctions");
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
        if (!gameObject_1.game.users[attackObjectID]) {
            clearInterval(stopAttackInterval);
            return;
        }
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
const getAreaAndObjectsUnderAttack = (direction, attackObjectID, attackAreaDeep) => {
    const attackObjectCoords = (0, moveObjectsFunctions_1.getObjectCoords)(attackObjectID);
    const underAttackSectorsAndObjects = {};
    const attackAreaCoord = {};
    const objectsUnderAttack = {};
    const getAttackAreaCoords = () => {
        if (direction === gameObject_1.UserMoveDirections.up) {
            (0, getAttackAreaCoordsFunctions_1.getUpAttackAreaCoords)(attackObjectCoords, attackAreaDeep, attackAreaCoord);
        }
        if (direction === gameObject_1.UserMoveDirections.down) {
            (0, getAttackAreaCoordsFunctions_1.getDownAttackAreaCoords)(attackObjectCoords, attackAreaDeep, attackAreaCoord);
        }
        if (direction === gameObject_1.UserMoveDirections.left) {
            (0, getAttackAreaCoordsFunctions_1.getLeftAttackAreaCoords)(attackObjectCoords, attackAreaDeep, attackAreaCoord);
        }
        if (direction === gameObject_1.UserMoveDirections.right) {
            (0, getAttackAreaCoordsFunctions_1.getRightAttackAreaCoords)(attackObjectCoords, attackAreaDeep, attackAreaCoord);
        }
    };
    getAttackAreaCoords();
    for (const coord in attackAreaCoord) {
        if (underAttackSectorsAndObjects[`${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(attackAreaCoord[coord].x / (20 * 8))}`])
            continue;
        underAttackSectorsAndObjects[`${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(attackAreaCoord[coord].x / (20 * 8))}`] =
            gameObject_1.game.sectors[`${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(attackAreaCoord[coord].x / (20 * 8))}`];
        for (const objectID in gameObject_1.game.sectors[`${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(attackAreaCoord[coord].x / (20 * 8))}`].objectsID) {
            if (objectID === attackObjectID)
                continue;
            // берём координаты объекта
            // координаты области под атакой и смотрим находятся ли они в этой области
            // first point
            if ((0, getAttackAreaCoordsFunctions_1.firstPointIntersection)(direction, objectID, attackAreaCoord)) {
                objectsUnderAttack[objectID] = 1;
                continue;
            }
            // bottom middle point
            if ((0, getAttackAreaCoordsFunctions_1.middlePointIntersection)(direction, objectID, attackAreaCoord)) {
                objectsUnderAttack[objectID] = 1;
                continue;
            }
            // bottom right point
            if ((0, getAttackAreaCoordsFunctions_1.secoundPointIntersection)(direction, objectID, attackAreaCoord)) {
                objectsUnderAttack[objectID] = 1;
                continue;
            }
        }
    }
    //create attack area and get objects under attack
    // if (direction === UserMoveDirections.up) {
    //   getUpAttackAreaCoords(attackObjectCoords, attackAreaDeep, attackAreaCoord);
    //   for (const coord in attackAreaCoord) {
    //     if (
    //       underAttackSectorsAndObjects[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ]
    //     )
    //       continue;
    //     underAttackSectorsAndObjects[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ] =
    //       game.sectors[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ];
    //     for (const objectID in game.sectors[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ].objectsID) {
    //       if (objectID === attackObjectID) continue;
    //       // берём координаты объекта
    //       // координаты области под атакой и смотрим находятся ли они в этой области
    //       // bottom left point
    //       if (
    //         game.users[objectID].square.currentCoord.bottomLeft.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomLeft.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomLeft.x >
    //           attackAreaCoord["topLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.bottomLeft.x <
    //           attackAreaCoord["topRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // bottom middle point
    //       if (
    //         game.users[objectID].square.currentCoord.bottomLeft.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomLeft.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.bottomLeft.x +
    //             game.users[objectID].square.currentCoord.bottomRight.x) /
    //             2
    //         ) > attackAreaCoord["topLeftCoords"].x &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.bottomLeft.x +
    //             game.users[objectID].square.currentCoord.bottomRight.x) /
    //             2
    //         ) < attackAreaCoord["topRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // bottom right point
    //       if (
    //         game.users[objectID].square.currentCoord.bottomRight.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomRight.y <
    //           attackAreaCoord["bottomRightCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomRight.x >
    //           attackAreaCoord["topLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.bottomRight.x <
    //           attackAreaCoord["topRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //     }
    //   }
    // }
    // if (direction === UserMoveDirections.down) {
    //   getDownAttackAreaCoords(attackObjectCoords, attackAreaDeep, attackAreaCoord);
    //   for (const coord in attackAreaCoord) {
    //     if (
    //       underAttackSectorsAndObjects[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ]
    //     )
    //       continue;
    //     underAttackSectorsAndObjects[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ] =
    //       game.sectors[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ];
    //     for (const objectID in game.sectors[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ].objectsID) {
    //       if (objectID === attackObjectID) continue;
    //       // берём координаты объекта
    //       // координаты области под атакой и смотрим находятся ли они в этой области
    //       // top left point
    //       if (
    //         game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topLeft.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topLeft.x >
    //           attackAreaCoord["bottomLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.topLeft.x <
    //           attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // top middle point
    //       if (
    //         game.users[objectID].square.currentCoord.topRight.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topRight.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.topLeft.x +
    //             game.users[objectID].square.currentCoord.topRight.x) /
    //             2
    //         ) > attackAreaCoord["bottomLeftCoords"].x &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.topLeft.x +
    //             game.users[objectID].square.currentCoord.topRight.x) /
    //             2
    //         ) < attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // top right point
    //       if (
    //         game.users[objectID].square.currentCoord.topRight.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topRight.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topRight.x >
    //           attackAreaCoord["bottomLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.topRight.x <
    //           attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //     }
    //   }
    // }
    // if (direction === UserMoveDirections.left) {
    //   getLeftAttackAreaCoords(attackObjectCoords, attackAreaDeep, attackAreaCoord);
    //   for (const coord in attackAreaCoord) {
    //     if (
    //       underAttackSectorsAndObjects[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ]
    //     )
    //       continue;
    //     underAttackSectorsAndObjects[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ] =
    //       game.sectors[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ];
    //     for (const objectID in game.sectors[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ].objectsID) {
    //       if (objectID === attackObjectID) continue;
    //       // берём координаты объекта
    //       // координаты области под атакой и смотрим находятся ли они в этой области
    //       // top right point
    //       if (
    //         game.users[objectID].square.currentCoord.topRight.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topRight.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topRight.x >
    //           attackAreaCoord["bottomLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.topRight.x <
    //           attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // bottom right point
    //       if (
    //         game.users[objectID].square.currentCoord.bottomRight.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomRight.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomRight.x >
    //           attackAreaCoord["bottomLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.bottomRight.x <
    //           attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // right middle point
    //       if (
    //         game.users[objectID].square.currentCoord.topRight.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topRight.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.bottomRight.x +
    //             game.users[objectID].square.currentCoord.topRight.x) /
    //             2
    //         ) > attackAreaCoord["bottomLeftCoords"].x &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.bottomRight.x +
    //             game.users[objectID].square.currentCoord.topRight.x) /
    //             2
    //         ) < attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //     }
    //   }
    // }
    // if (direction === UserMoveDirections.right) {
    //   getRightAttackAreaCoords(attackObjectCoords, attackAreaDeep, attackAreaCoord);
    //   for (const coord in attackAreaCoord) {
    //     if (
    //       underAttackSectorsAndObjects[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ]
    //     )
    //       continue;
    //     underAttackSectorsAndObjects[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ] =
    //       game.sectors[
    //         `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //           attackAreaCoord[coord].x / (20 * 8)
    //         )}`
    //       ];
    //     for (const objectID in game.sectors[
    //       `${Math.floor(attackAreaCoord[coord].y / (20 * 8))}${Math.floor(
    //         attackAreaCoord[coord].x / (20 * 8)
    //       )}`
    //     ].objectsID) {
    //       if (objectID === attackObjectID) continue;
    //       // берём координаты объекта
    //       // координаты области под атакой и смотрим находятся ли они в этой области
    //       // top left point
    //       if (
    //         game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topLeft.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topLeft.x >
    //           attackAreaCoord["bottomLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.topLeft.x <
    //           attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // bottom left point
    //       if (
    //         game.users[objectID].square.currentCoord.bottomLeft.y >
    //           attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomLeft.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.bottomLeft.x >
    //           attackAreaCoord["bottomLeftCoords"].x &&
    //         game.users[objectID].square.currentCoord.bottomLeft.x <
    //           attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //       // left middle point
    //       if (
    //         game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
    //         game.users[objectID].square.currentCoord.topLeft.y <
    //           attackAreaCoord["bottomLeftCoords"].y &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.bottomLeft.x +
    //             game.users[objectID].square.currentCoord.topLeft.x) /
    //             2
    //         ) > attackAreaCoord["bottomLeftCoords"].x &&
    //         Math.floor(
    //           (game.users[objectID].square.currentCoord.bottomLeft.x +
    //             game.users[objectID].square.currentCoord.topLeft.x) /
    //             2
    //         ) < attackAreaCoord["bottomRightCoords"].x
    //       ) {
    //         objectsUnderAttack[objectID] = 1;
    //         continue;
    //       }
    //     }
    //   }
    // }
    return { objectsUnderAttack: objectsUnderAttack };
};
exports.getAreaAndObjectsUnderAttack = getAreaAndObjectsUnderAttack;
const getChanksAndObjectsUnderAttack = (direction, attackObjectID, attackAreaDeep, objectEdgeChanks, io) => {
    const objectUnderAttack = {};
    const chanksUnderAttack = [];
    // const attackAreaCoords = () => {
    //   // для игрока
    //   if (!game.users[attackObjectID].NPCViewDirection) {
    //     if (game.users[attackObjectID].moveDirection === UserMoveDirections.up) {
    //     }
    //   }
    //   // для NPC
    // };
    // attackAreaCoords();
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
                const deleteObjectFromSectors = (objectID) => {
                    const objectoords = (0, moveObjectsFunctions_1.getObjectCoords)(objectID);
                    delete gameObject_1.game.sectors[`${Math.floor(objectoords.topLeftYCoord / (20 * 8))}${Math.floor(objectoords.topLeftXCoord / (20 * 8))}`].objectsID[underAttackObjectID];
                    delete gameObject_1.game.sectors[`${Math.floor(objectoords.topRightYCoord / (20 * 8))}${Math.floor(objectoords.topRightXCoord / (20 * 8))}`].objectsID[underAttackObjectID];
                    delete gameObject_1.game.sectors[`${Math.floor(objectoords.bottomLeftYCoord / (20 * 8))}${Math.floor(objectoords.bottomLeftXCoord / (20 * 8))}`].objectsID[underAttackObjectID];
                    delete gameObject_1.game.sectors[`${Math.floor(objectoords.bottomRightYCoord / (20 * 8))}${Math.floor(objectoords.bottomRightXCoord / (20 * 8))}`].objectsID[underAttackObjectID];
                };
                deleteObjectFromSectors(underAttackObjectID);
                // const getDeletedObjectCurrentChanks = (underAttackObjectID: string) => {
                //   const topLeftXChank = Math.floor(
                //     game.users[underAttackObjectID].square.currentCoord.topLeft.x / 8
                //   );
                //   const topLeftYChank = Math.floor(
                //     game.users[underAttackObjectID].square.currentCoord.topLeft.y / 8
                //   );
                //   const deletedObjectType = game.users[underAttackObjectID].objectType;
                //   for (let i = 0; i <= NPCOrGamerObjectsData[deletedObjectType].widthChanks; i++) {
                //     for (let j = 0; j <= NPCOrGamerObjectsData[deletedObjectType].heightChanks; j++) {
                //       if (
                //         game.gameField[topLeftYChank + j][topLeftXChank + i].objectDataChank.objectID ===
                //         underAttackObjectID
                //       ) {
                //         game.gameField[topLeftYChank + j][topLeftXChank + i].objectDataChank = {
                //           objectID: undefined,
                //           isObjectChank: false,
                //           isGamerChank: null,
                //         };
                //       }
                //     }
                //   }
                // };
                // getDeletedObjectCurrentChanks(underAttackObjectID);
                // добавляем опыта тому игроку, который убил NPC
                const increaseUserXP = (XP) => {
                    const increaseLVLXP = (XP) => {
                        if (gameObject_1.game.statObj.gamers[attackObjectID].currentLVLMaxPoint -
                            gameObject_1.game.statObj.gamers[attackObjectID].currentLVLUserPoint <
                            XP) {
                            gameObject_1.game.statObj.gamers[attackObjectID].currentLVL =
                                gameObject_1.game.statObj.gamers[attackObjectID].currentLVL + 1;
                            gameObject_1.game.statObj.gamers[attackObjectID].currentLVLMaxPoint =
                                gameObject_1.game.statObj.gamers[attackObjectID].currentLVLMaxPoint * 2;
                            gameObject_1.game.statObj.gamers[attackObjectID].currentLVLUserPoint = 0;
                            increaseLVLXP(Math.abs(XP -
                                (gameObject_1.game.statObj.gamers[attackObjectID].currentLVLMaxPoint / 2 -
                                    gameObject_1.game.statObj.gamers[attackObjectID].currentLVLUserPoint)));
                            return;
                        }
                        gameObject_1.game.statObj.gamers[attackObjectID].currentLVLUserPoint =
                            gameObject_1.game.statObj.gamers[attackObjectID].currentLVLUserPoint + XP;
                        return;
                    };
                    increaseLVLXP(XP);
                };
                increaseUserXP(gameObject_1.game.statObj.NPC[underAttackObjectID].XP);
                io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverIncreaseUserXP", {
                    userID: attackObjectID,
                    userStat: gameObject_1.game.statObj.gamers[attackObjectID],
                });
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
                if (!gameObject_1.game.users[underAttackObjectID])
                    return;
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
