"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpMoveIntersectionObjects = exports.getDownMOveIntersectionObjects = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const getDownMOveIntersectionObjects = (inSectorObjectID, shiftUserPixels, moveStatus, objectCoords) => {
    // нихняя левая координата
    if (objectCoords.bottomLeftYCoord + shiftUserPixels >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.bottomLeftYCoord + shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
        objectCoords.bottomLeftXCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.bottomLeftXCoord < gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    //середина объекта
    if (objectCoords.bottomLeftYCoord + shiftUserPixels >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.bottomLeftYCoord + shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
        Math.floor((objectCoords.bottomLeftXCoord + objectCoords.bottomRightXCoord) / 2) >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        Math.floor((objectCoords.bottomLeftXCoord + objectCoords.bottomRightXCoord) / 2) <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    // нихняя правая координата
    if (objectCoords.bottomRightYCoord + shiftUserPixels >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.bottomRightYCoord + shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
        objectCoords.bottomRightXCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.bottomRightXCoord < gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    return true;
};
exports.getDownMOveIntersectionObjects = getDownMOveIntersectionObjects;
const getUpMoveIntersectionObjects = (inSectorObjectID, shiftUserPixels, moveStatus, objectCoords) => {
    // верхняя левая координата
    if (objectCoords.topLeftYCoord - shiftUserPixels >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.topLeftYCoord - shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
        objectCoords.topLeftXCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.x &&
        objectCoords.topLeftXCoord < gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.x) {
        return false;
    }
    //середина объекта
    if (objectCoords.topRightYCoord - shiftUserPixels >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.topRightYCoord - shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
        Math.floor((objectCoords.topLeftXCoord + objectCoords.topRightXCoord) / 2) >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.x &&
        Math.floor((objectCoords.topLeftXCoord + objectCoords.topRightXCoord) / 2) <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.x) {
        return false;
    }
    // // верхняя правая координата
    if (objectCoords.topRightYCoord - shiftUserPixels >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.topRightYCoord - shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
        objectCoords.topRightXCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.x &&
        objectCoords.topRightXCoord < gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.x) {
        return false;
    }
    return true;
};
exports.getUpMoveIntersectionObjects = getUpMoveIntersectionObjects;
