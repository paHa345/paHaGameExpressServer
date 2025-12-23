"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGamerOrNPC = void 0;
const types_1 = require("../../types");
const gameObject_1 = require("../gameObject/gameObject");
const moveObjectsFunctions_1 = require("../MoveObjects/moveObjectsFunctions");
// import { setUserCurrentChanks } from "../MoveObjects/moveObjectsMain";
const addGamerOrNPC = (addedObjectData) => {
    const numberOfGamers = addedObjectData.addedElType === "NPC" ? 5 : Object.keys(gameObject_1.game.users).length;
    const statLVLMultiplicator = addedObjectData.level
        ? 1 + Math.sqrt(addedObjectData.level) / 10
        : 1;
    if (addedObjectData.addedElType === "gamer") {
        gameObject_1.game.statObj.gamers[addedObjectData.addedElID] = {
            baseHP: addedObjectData.hp ? addedObjectData.hp : types_1.NPCBaseStat[addedObjectData.objectType].HP,
            currentHP: addedObjectData.hp
                ? addedObjectData.hp
                : types_1.NPCBaseStat[addedObjectData.objectType].HP,
            currentArmour: addedObjectData.armour
                ? addedObjectData.armour
                : types_1.NPCBaseStat[addedObjectData.objectType].armour,
            currentDamage: addedObjectData.damage
                ? addedObjectData.damage
                : types_1.NPCBaseStat[addedObjectData.objectType].damage,
            percentHP: 100,
            currentLVL: 1,
            currentLVLUserPoint: 0,
            currentLVLMaxPoint: 10,
        };
    }
    else {
        gameObject_1.game.statObj.NPC[addedObjectData.addedElID] = {
            baseHP: addedObjectData.hp
                ? addedObjectData.hp * statLVLMultiplicator
                : types_1.NPCBaseStat[addedObjectData.objectType].HP * statLVLMultiplicator,
            currentHP: addedObjectData.hp
                ? addedObjectData.hp * statLVLMultiplicator
                : types_1.NPCBaseStat[addedObjectData.objectType].HP * statLVLMultiplicator,
            currentArmour: addedObjectData.armour
                ? addedObjectData.armour * statLVLMultiplicator
                : types_1.NPCBaseStat[addedObjectData.objectType].armour * statLVLMultiplicator,
            currentDamage: addedObjectData.damage
                ? addedObjectData.damage * statLVLMultiplicator
                : types_1.NPCBaseStat[addedObjectData.objectType].damage * statLVLMultiplicator,
            percentHP: 100,
            XP: types_1.NPCBaseStat[addedObjectData.objectType].XP * statLVLMultiplicator,
        };
        gameObject_1.game.NPCViewAreaCoord[addedObjectData.addedElID] = {
            viewAreaCoord: {
                topLeft: { x: 0, y: 0 },
                topRight: { x: 0, y: 0 },
                bottomLeft: { x: 0, y: 0 },
                bottomRight: { x: 0, y: 0 },
            },
        };
    }
    gameObject_1.game.users[addedObjectData.addedElID] = {
        type: addedObjectData.addedElType,
        objectType: addedObjectData.objectType,
        getDamageStatus: false,
        imgName: `${addedObjectData.objectType}WalkImage`,
        deathAnimationStatus: false,
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
                    x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
                    y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
                },
                topRight: {
                    x: addedObjectData.XCoord
                        ? addedObjectData.XCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
                        : 8 +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
                            numberOfGamers * 40,
                    y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
                },
                bottomLeft: {
                    x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
                    y: addedObjectData.YCoord
                        ? addedObjectData.YCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
                },
                bottomRight: {
                    x: addedObjectData.XCoord
                        ? addedObjectData.XCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
                        : 8 +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
                            numberOfGamers * 40,
                    y: addedObjectData.YCoord
                        ? addedObjectData.YCoord
                        : 8 + types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
                },
            },
            currentCoord: {
                topLeft: {
                    x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
                    y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
                },
                topRight: {
                    x: addedObjectData.XCoord
                        ? addedObjectData.XCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
                        : 8 +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
                            numberOfGamers * 40,
                    y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
                },
                bottomLeft: {
                    x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
                    y: addedObjectData.YCoord
                        ? addedObjectData.YCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
                },
                bottomRight: {
                    x: addedObjectData.XCoord
                        ? addedObjectData.XCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
                        : 8 +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
                            numberOfGamers * 40,
                    y: addedObjectData.YCoord
                        ? addedObjectData.YCoord +
                            types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
                },
            },
        },
        moveDirection: gameObject_1.UserMoveDirections.stop,
        userRole: numberOfGamers > 0 ? "creeper" : "steve",
    };
    if (addedObjectData.addedElType === "NPC") {
        gameObject_1.game.users[addedObjectData.addedElID].NPCViewDirection = gameObject_1.UserMoveDirections.up;
    }
    // setUserCurrentChanks(
    //   {
    //     width: NPCOrGamerObjectsData[objectType].widthChanks,
    //     height: NPCOrGamerObjectsData[objectType].heightChanks,
    //   },
    //   addedElID
    // );
    // const bottomLeftXCoord = game.users[addedElID].square.currentCoord.bottomLeft.x;
    // const bottomRightXCoord = game.users[addedElID].square.currentCoord.bottomRight.x;
    // const topLeftXCoord = game.users[addedElID].square.currentCoord.topLeft.x;
    // const topRightXCoord = game.users[addedElID].square.currentCoord.topRight.x;
    // const bottomLeftYCoord = game.users[addedElID].square.currentCoord.bottomLeft.y;
    // const topLeftYCoord = game.users[addedElID].square.currentCoord.topLeft.y;
    // const topRightYCoord = game.users[addedElID].square.currentCoord.topRight.y;
    // const bottomRightYCoord = game.users[addedElID].square.currentCoord.bottomRight.y;
    // для каждой точки определяем в каком секторе она находится
    const objectCoords = (0, moveObjectsFunctions_1.getObjectCoords)(addedObjectData.addedElID);
    (0, moveObjectsFunctions_1.setObjectInSectors)(objectCoords, addedObjectData.addedElID);
    gameObject_1.game.frameObj.objects[addedObjectData.addedElID] = { idFrame: 0 };
};
exports.addGamerOrNPC = addGamerOrNPC;
