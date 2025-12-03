"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRightMoveIntersectionObjects = exports.getLeftMoveIntersectionObjects = exports.getUpMoveIntersectionObjects = exports.getDownMOveIntersectionObjects = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const getDownMOveIntersectionObjects = (inSectorObjectID, shiftUserPixels, objectCoords) => {
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
const getUpMoveIntersectionObjects = (inSectorObjectID, shiftUserPixels, objectCoords) => {
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
const getLeftMoveIntersectionObjects = (inSectorObjectID, shiftUserPixels, objectCoords) => {
    // верхняя левая координата
    if (objectCoords.topLeftYCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.y &&
        objectCoords.topLeftYCoord < gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
        objectCoords.topLeftXCoord - shiftUserPixels >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.topLeftXCoord - shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    //середина объекта
    if (Math.floor((objectCoords.topLeftYCoord + objectCoords.bottomLeftYCoord) / 2) >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.y &&
        Math.floor((objectCoords.topLeftYCoord + objectCoords.bottomLeftYCoord) / 2) <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
        objectCoords.topLeftXCoord - shiftUserPixels >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.topLeftXCoord - shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    // нижняя левая координата
    if (objectCoords.bottomLeftYCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.y &&
        objectCoords.bottomLeftYCoord <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
        objectCoords.bottomLeftXCoord - shiftUserPixels >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.bottomLeftXCoord - shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    return true;
};
exports.getLeftMoveIntersectionObjects = getLeftMoveIntersectionObjects;
const getRightMoveIntersectionObjects = (inSectorObjectID, shiftUserPixels, objectCoords) => {
    // верхняя левая координата
    if (objectCoords.topRightYCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.topRightYCoord < gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
        objectCoords.topRightXCoord + shiftUserPixels >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.topRightXCoord + shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    //середина объекта
    if (Math.floor((objectCoords.topRightYCoord + objectCoords.bottomRightYCoord) / 2) >
        gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        Math.floor((objectCoords.topRightYCoord + objectCoords.bottomRightYCoord) / 2) <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
        objectCoords.topLeftXCoord + shiftUserPixels >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.topLeftXCoord + shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    // нижняя левая координата
    if (objectCoords.bottomRightYCoord > gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
        objectCoords.bottomRightYCoord <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
        objectCoords.bottomRightXCoord + shiftUserPixels >
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
        objectCoords.bottomRightXCoord + shiftUserPixels <
            gameObject_1.game.users[inSectorObjectID].square.currentCoord.topRight.x) {
        return false;
    }
    return true;
};
exports.getRightMoveIntersectionObjects = getRightMoveIntersectionObjects;
