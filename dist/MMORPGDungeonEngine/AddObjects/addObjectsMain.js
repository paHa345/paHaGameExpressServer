"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGamerOrNPC = void 0;
const types_1 = require("../../types");
const gameObject_1 = require("../gameObject/gameObject");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
const addGamerOrNPC = (addedElType, objectType, addedElID, hp, armour, damage, XCoord, YCoord) => {
    const numberOfGamers = addedElType === "NPC" ? 5 : Object.keys(gameObject_1.game.users).length;
    if (addedElType === "gamer") {
        gameObject_1.game.statObj.gamers[addedElID] = {
            baseHP: hp,
            currentHP: hp,
            currentArmour: armour,
            currentDamage: damage,
            percentHP: 100,
        };
    }
    else {
        gameObject_1.game.statObj.NPC[addedElID] = {
            baseHP: hp,
            currentHP: hp,
            currentArmour: armour,
            currentDamage: damage,
            percentHP: 100,
        };
    }
    gameObject_1.game.users[addedElID] = {
        type: addedElType,
        objectType: objectType,
        getDamageStatus: false,
        imgName: `${objectType}WalkImage`,
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
                    x: XCoord ? XCoord : 8 + numberOfGamers * 40,
                    y: YCoord ? YCoord : 8,
                },
                topRight: {
                    x: XCoord
                        ? XCoord + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: YCoord ? YCoord : 8,
                },
                bottomLeft: {
                    x: XCoord ? XCoord : 8 + numberOfGamers * 40,
                    y: YCoord
                        ? YCoord + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
                bottomRight: {
                    x: XCoord
                        ? XCoord + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: YCoord ? YCoord : 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
            },
            currentCoord: {
                topLeft: {
                    x: XCoord ? XCoord : 8 + numberOfGamers * 40,
                    y: YCoord ? YCoord : 8,
                },
                topRight: {
                    x: XCoord
                        ? XCoord + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: YCoord ? YCoord : 8,
                },
                bottomLeft: {
                    x: XCoord ? XCoord : 8 + numberOfGamers * 40,
                    y: YCoord
                        ? YCoord + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
                bottomRight: {
                    x: XCoord
                        ? XCoord + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
                    y: YCoord
                        ? YCoord + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8
                        : 8 + types_1.NPCOrGamerObjectsData[objectType].heightChanks * 8,
                },
            },
        },
        moveDirection: gameObject_1.UserMoveDirections.stop,
        userRole: numberOfGamers > 0 ? "creeper" : "steve",
    };
    (0, moveObjectsMain_1.setUserCurrentChanks)({
        width: types_1.NPCOrGamerObjectsData[objectType].widthChanks,
        height: types_1.NPCOrGamerObjectsData[objectType].heightChanks,
    }, addedElID);
    gameObject_1.game.frameObj.objects[addedElID] = { idFrame: 0 };
};
exports.addGamerOrNPC = addGamerOrNPC;
