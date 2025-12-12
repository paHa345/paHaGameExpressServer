"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveNPCToAggrObject = exports.moveBaseAxiosToObject = exports.getObjectsInViewArea = exports.getCollision = exports.getViewAreaSectorsAndObjects = exports.createNPCViewArea = void 0;
const attackObjectsMain_1 = require("../AttackObjects/attackObjectsMain");
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
            if (!gameObject_1.game.users[viewAreaObject])
                return;
            if (underAttackSectorsAndObjects.objects[viewAreaObject])
                continue;
            if (viewAreaObject === NPCID)
                continue;
            if (gameObject_1.game.users[viewAreaObject].type === "NPC")
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
        if ((0, exports.getCollision)(gameObject_1.game.users[objectID].square.currentCoord, gameObject_1.game.NPCViewAreaCoord[NPCID].viewAreaCoord)) {
            //   console.log("Get collision");
            //   console.log(Date.now());
            gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj = objectID;
            return;
        }
    }
    gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj = undefined;
};
exports.getObjectsInViewArea = getObjectsInViewArea;
const moveBaseAxiosToObject = () => { };
exports.moveBaseAxiosToObject = moveBaseAxiosToObject;
const moveNPCToAggrObject = (NPCID, io) => {
    if (!gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj)
        return;
    if (!gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj])
        return;
    const checkObjectInMainAxes = () => {
        if (!gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj)
            return false;
        if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.up ||
            gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.stop ||
            gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.down) {
            if (gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.x -
                8 >
                Math.floor((gameObject_1.game.users[NPCID].square.currentCoord.topRight.x +
                    gameObject_1.game.users[NPCID].square.currentCoord.topLeft.x) /
                    2) &&
                gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomLeft.x + 8 <
                    Math.floor((gameObject_1.game.users[NPCID].square.currentCoord.topRight.x +
                        gameObject_1.game.users[NPCID].square.currentCoord.topLeft.x) /
                        2)) {
                gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.up
                    ? (gameObject_1.game.NPCDataObj[NPCID].directionPointer = 2)
                    : (gameObject_1.game.NPCDataObj[NPCID].directionPointer = 1);
                return true;
            }
            return false;
        }
        if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left ||
            gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
            if (gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.topRight.y + 8 <
                Math.floor((gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.y +
                    gameObject_1.game.users[NPCID].square.currentCoord.topLeft.y) /
                    2) &&
                gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.y -
                    8 >
                    Math.floor((gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.y +
                        gameObject_1.game.users[NPCID].square.currentCoord.topLeft.y) /
                        2)) {
                gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left
                    ? (gameObject_1.game.NPCDataObj[NPCID].directionPointer = 3)
                    : (gameObject_1.game.NPCDataObj[NPCID].directionPointer = 0);
                return true;
            }
            return false;
        }
    };
    const checkObjectIsNearWithNPC = () => {
        if (!gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj)
            return false;
        let result = false;
        if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.up ||
            gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.stop) {
            gameObject_1.game.users[NPCID].square.currentCoord.topRight.y -
                gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.y <
                4
                ? (result = true)
                : (result = false);
            return result;
        }
        if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.down) {
            gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.topLeft.y -
                gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.y <
                4
                ? (result = true)
                : (result = false);
            return result;
        }
        if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left) {
            gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.x -
                gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.x <
                4
                ? (result = true)
                : (result = false);
            return result;
        }
        if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
            gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomLeft.x -
                gameObject_1.game.users[NPCID].square.currentCoord.bottomRight.x <
                4
                ? (result = true)
                : (result = false);
            return result;
        }
    };
    if (checkObjectInMainAxes() && checkObjectIsNearWithNPC()) {
        console.log(`Игрок в зоне атаки. Атакую ${NPCID}`);
        if (!gameObject_1.game.users[NPCID].NPCViewDirection)
            return;
        gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
        (0, attackObjectsMain_1.attackObjectMainMechanism)(NPCID, gameObject_1.game.users[NPCID].NPCViewDirection, "NPC", "orc3", io);
        return;
    }
    if (checkObjectInMainAxes()) {
        console.log("Игрок на основной оси, приближаюсь к нему");
        gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
        return;
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.up ||
        gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.stop) {
        if (gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.x <
            gameObject_1.game.users[NPCID].square.currentCoord.topRight.x) {
            console.log("Вижу игрока. Двигаюсь влево");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 3;
            return;
        }
        else {
            console.log("Вижу игрока. Двигаюсь вправо");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 0;
            return;
        }
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.down) {
        if (gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.x <
            gameObject_1.game.users[NPCID].square.currentCoord.topRight.x) {
            console.log("Вижу игрока. Двигаюсь влево");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 3;
            return;
        }
        else {
            console.log("Вижу игрока. Двигаюсь вправо");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 0;
            return;
        }
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.left) {
        if (gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.y <
            gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.y) {
            console.log("Вижу игрока. Двигаюсь вверх");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 2;
            return;
        }
        else {
            console.log("Вижу игрока. Двигаюсь вниз");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 1;
            return;
        }
    }
    if (gameObject_1.game.users[NPCID].NPCViewDirection === gameObject_1.UserMoveDirections.right) {
        if (gameObject_1.game.users[gameObject_1.game.NPCDataObj[NPCID].aggressionGamerObj].square.currentCoord.bottomRight.y <
            gameObject_1.game.users[NPCID].square.currentCoord.bottomLeft.y) {
            console.log("Вижу игрока. Двигаюсь вверх");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 2;
            return;
        }
        else {
            console.log("Вижу игрока. Двигаюсь вниз");
            gameObject_1.game.NPCDataObj[NPCID].NPCCondition.type = "aggression";
            gameObject_1.game.NPCDataObj[NPCID].directionPointer = 1;
            return;
        }
    }
};
exports.moveNPCToAggrObject = moveNPCToAggrObject;
