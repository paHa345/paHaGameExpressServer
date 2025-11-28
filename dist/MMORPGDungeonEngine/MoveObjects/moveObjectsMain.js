"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMoveNPCInterval = exports.moveNPCMain = exports.setClientCoordinates = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const NPCViewMain_1 = require("../NPCView/NPCViewMain");
const moveObjectsFunctions_1 = require("./moveObjectsFunctions");
// export const setUserCurrentChanks = (
//   chanksQuantity: { width: number; height: number },
//   objectID: string,
//   direction?: UserMoveDirections
// ) => {
//   if (!game.users[objectID]) {
//     return;
//   }
//   const prevTopLeftXChank = Math.floor(game.users[objectID].square.prevCoord.topLeft.x / 8);
//   const prevTopLeftYChank = Math.floor(game.users[objectID].square.prevCoord.topLeft.y / 8);
//   const prevBottomLeftXChank = Math.floor(game.users[objectID].square.prevCoord.bottomLeft.x / 8);
//   const prevBottomLeftYChank = Math.floor(game.users[objectID].square.prevCoord.bottomLeft.y / 8);
//   const prevTopRightXChank = Math.floor(game.users[objectID].square.prevCoord.topRight.x / 8);
//   const prevTopRightYChank = Math.floor(game.users[objectID].square.prevCoord.topRight.y / 8);
//   const topLeftXChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8);
//   const topLeftYChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8);
//   const bottomLeftXChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8);
//   const bottomLeftYChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8);
//   const topRightXChank = Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8);
//   const topRightYChank = Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8);
//   const isGamer = game.users[objectID].type === "gamer";
//   for (let i = 0; i <= chanksQuantity.width; i++) {
//     if (direction === UserMoveDirections.down) {
//       game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//     }
//     game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//     if (direction === UserMoveDirections.up) {
//       game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//     }
//     game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//   }
//   for (let i = 0; i < chanksQuantity.height; i++) {
//     game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//     if (direction === UserMoveDirections.right) {
//       game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//     }
//     game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//     if (direction === UserMoveDirections.left) {
//       game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//       game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
//         objectID: objectID,
//         isObjectChank: true,
//         isGamerChank: isGamer,
//       };
//     }
//   }
// };
const setClientCoordinates = (objectType, objectID, clientData) => {
    if (gameObject_1.game.users[objectID]) {
        gameObject_1.game.users[objectID].square.prevCoord = JSON.parse(JSON.stringify(gameObject_1.game.users[objectID].square.currentCoord));
    }
    (0, moveObjectsFunctions_1.setCurrentCoord)(clientData, objectID);
    // setUserCurrentChanks(
    //   {
    //     height: NPCOrGamerObjectsData[objectType].heightChanks,
    //     width: NPCOrGamerObjectsData[objectType].widthChanks,
    //   },
    //   objectID,
    //   clientData.direction
    // );
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
    for (const objectID in gameObject_1.game.users) {
        gameObject_1.game.NPCDataObj[objectID] = {
            timeMoveDirection: Date.now(),
            timeViewCheck: Date.now(),
            NPCID: objectID,
            directionPointer: 0,
            NPCCondition: {
                type: "observation",
                moveDirercion: 0,
                viewDirection: 0,
            },
            NPCPrepareToAttackStatus: false,
        };
    }
    moveNPCInterval = setInterval(() => {
        var _a, _b, _c, _d, _e, _f;
        for (const NPCID in gameObject_1.game.NPCDataObj) {
            if (!gameObject_1.game.users[NPCID]) {
                delete gameObject_1.game.NPCDataObj[NPCID];
                return;
            }
            if (gameObject_1.game.NPCDataObj[NPCID].NPCPrepareToAttackStatus) {
                return;
            }
            if ((_a = gameObject_1.game.attackStatusObj[NPCID]) === null || _a === void 0 ? void 0 : _a.isActive)
                return;
            if (Date.now() - gameObject_1.game.NPCDataObj[NPCID].timeViewCheck > 250) {
                (0, NPCViewMain_1.NPCViewMain)(gameObject_1.game.NPCDataObj[NPCID], gameObject_1.game.NPCDataObj[NPCID].NPCID, io);
                gameObject_1.game.NPCDataObj[NPCID].timeViewCheck = Date.now();
            }
            if (Date.now() - gameObject_1.game.NPCDataObj[NPCID].timeMoveDirection > 5000) {
                const getRandomNumber = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };
                gameObject_1.game.NPCDataObj[NPCID].directionPointer = getRandomNumber(0, 4);
                gameObject_1.game.NPCDataObj[NPCID].timeMoveDirection = Date.now();
            }
            if ((_b = gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID]) === null || _b === void 0 ? void 0 : _b.deathAnimationStatus) {
                return;
            }
            if (gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type === "observation" &&
                (!((_c = gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID]) === null || _c === void 0 ? void 0 : _c.getDamageStatus) ||
                    !((_d = gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID]) === null || _d === void 0 ? void 0 : _d.deathAnimationStatus))) {
                gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID].NPCViewDirection =
                    directions[gameObject_1.game.NPCDataObj[NPCID].directionPointer];
                (0, exports.setClientCoordinates)(gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID].objectType, gameObject_1.game.NPCDataObj[NPCID].NPCID, {
                    direction: directions[gameObject_1.game.NPCDataObj[NPCID].directionPointer],
                    roomID: "asdasd",
                    shiftUserPixels: 1,
                });
            }
            if (gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type === "aggression" &&
                (!((_e = gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID]) === null || _e === void 0 ? void 0 : _e.getDamageStatus) ||
                    !((_f = gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID]) === null || _f === void 0 ? void 0 : _f.deathAnimationStatus))) {
                (0, exports.setClientCoordinates)(gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].NPCID].objectType, gameObject_1.game.NPCDataObj[NPCID].NPCID, {
                    direction: directions[gameObject_1.game.NPCDataObj[NPCID].directionPointer],
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
