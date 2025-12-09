"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectsInViewArea = exports.getCollision = exports.getViewAreaSectorsAndObjects = exports.createNPCViewArea = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const moveObjectsFunctions_1 = require("../MoveObjects/moveObjectsFunctions");
const createNPCViewArea = (NPCID) => {
    if (!gameObject_1.game.users[NPCID]) {
        return;
    }
    const NPCCoords = (0, moveObjectsFunctions_1.getObjectCoords)(NPCID);
    // create view area
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.up ||
        gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.stop) {
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
            x: NPCCoords.topLeftXCoord - 16 < 0 ? 0 : NPCCoords.topLeftXCoord - 16,
            y: NPCCoords.topLeftYCoord - 32 < 0 ? 0 : NPCCoords.topLeftYCoord - 32,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
            x: NPCCoords.topRightXCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.topRightXCoord + 16,
            y: NPCCoords.topRightYCoord - 32 < 0 ? 0 : NPCCoords.topRightYCoord - 32,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
            x: NPCCoords.bottomLeftXCoord - 16 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 16,
            y: NPCCoords.topLeftYCoord,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
            x: NPCCoords.bottomRightXCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomRightXCoord + 16,
            y: NPCCoords.topRightYCoord,
        };
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.down) {
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
            x: NPCCoords.bottomLeftXCoord - 16 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 16,
            y: NPCCoords.bottomLeftYCoord,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
            x: NPCCoords.bottomRightXCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomRightXCoord + 16,
            y: NPCCoords.bottomRightYCoord,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
            x: NPCCoords.bottomLeftXCoord - 16 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 16,
            y: NPCCoords.bottomLeftYCoord + 32 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomLeftYCoord + 32,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
            x: NPCCoords.bottomRightXCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomRightXCoord + 16,
            y: NPCCoords.bottomLeftYCoord + 32 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomLeftYCoord + 32,
        };
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left) {
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
            x: NPCCoords.topLeftXCoord - 32 < 0 ? 0 : NPCCoords.topLeftXCoord - 32,
            y: NPCCoords.topLeftYCoord - 16 < 0 ? 0 : NPCCoords.topLeftYCoord - 16,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
            x: NPCCoords.topLeftXCoord,
            y: NPCCoords.topLeftYCoord - 16 < 0 ? 0 : NPCCoords.topLeftYCoord - 16,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
            x: NPCCoords.bottomLeftXCoord - 32 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 32,
            y: NPCCoords.bottomLeftYCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomLeftYCoord + 16,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
            x: NPCCoords.bottomLeftXCoord,
            y: NPCCoords.bottomLeftYCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomLeftYCoord + 16,
        };
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
            x: NPCCoords.topRightXCoord,
            y: NPCCoords.topRightYCoord - 16 < 0 ? 0 : NPCCoords.topRightYCoord - 16,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
            x: NPCCoords.topRightXCoord + 32 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.topRightXCoord + 32,
            y: NPCCoords.topRightYCoord - 16 < 0 ? 0 : NPCCoords.topRightYCoord - 16,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
            x: NPCCoords.bottomRightXCoord,
            y: NPCCoords.bottomRightYCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomRightYCoord + 16,
        };
        gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
            x: NPCCoords.bottomRightXCoord + 32 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomRightXCoord + 32,
            y: NPCCoords.bottomRightYCoord + 16 > (gameObject_1.game.mapSize - 1) * 8
                ? (gameObject_1.game.mapSize - 1) * 8
                : NPCCoords.bottomRightYCoord + 16,
        };
    }
};
exports.createNPCViewArea = createNPCViewArea;
const getViewAreaSectorsAndObjects = (NPCID, underAttackSectorsAndObjects) => {
    for (const [key, coords] of Object.entries(gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord)) {
        // console.log(`${key}: ${value}`);
        if (underAttackSectorsAndObjects.sectors[`${Math.floor(coords.y / (20 * 8))}${Math.floor(coords.x / (20 * 8))}`])
            continue;
        underAttackSectorsAndObjects.sectors[`${Math.floor(coords.y / (20 * 8))}${Math.floor(coords.x / (20 * 8))}`] = { value: 1 };
        for (const viewAreaObject in gameObject_1.game.sectors[`${Math.floor(coords.y / (20 * 8))}${Math.floor(coords.x / (20 * 8))}`].objectsID) {
            if (underAttackSectorsAndObjects.objects[viewAreaObject])
                continue;
            if (viewAreaObject === NPCID)
                continue;
            underAttackSectorsAndObjects.objects[viewAreaObject] = { value: 1 };
        }
    }
};
exports.getViewAreaSectorsAndObjects = getViewAreaSectorsAndObjects;
const getCollision = (object1, object2) => {
    if (object1.topLeft.x < object2.topLeft.x + (object2.topRight.x - object2.topLeft.x) &&
        object1.topLeft.x + (object1.topRight.x - object1.topLeft.x) > object2.topLeft.x &&
        object1.topLeft.y < object2.topLeft.y + (object2.bottomLeft.y - object2.topLeft.y) &&
        object1.topLeft.y + (object1.bottomLeft.y - object1.topLeft.y) > object2.topLeft.y) {
        return true;
    }
    return false;
};
exports.getCollision = getCollision;
const getObjectsInViewArea = (underAttackSectorsAndObjects, NPCID) => {
    for (const objectID in underAttackSectorsAndObjects.objects) {
        // get collision object with view area
        console.log(gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord);
        if ((0, exports.getCollision)(gameObject_1.game.users[objectID].square.currentCoord, gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord)) {
            console.log("Get collision");
            console.log(Date.now());
        }
    }
};
exports.getObjectsInViewArea = getObjectsInViewArea;
