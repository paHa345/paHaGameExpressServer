"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRightAttackAreaCoords = exports.getLeftAttackAreaCoords = exports.getDownAttackAreaCoords = exports.getUpAttackAreaCoords = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const getUpAttackAreaCoords = (attackObjectCoords, attackAreaDeep, attackAreaCoord) => {
    attackAreaCoord["topLeftCoords"] = {
        x: attackObjectCoords.topLeftXCoord,
        y: attackObjectCoords.topLeftYCoord - attackAreaDeep < 0
            ? 0
            : attackObjectCoords.topLeftYCoord - attackAreaDeep,
    };
    attackAreaCoord["topRightCoords"] = {
        x: attackObjectCoords.topRightXCoord,
        y: attackObjectCoords.topRightYCoord - attackAreaDeep < 0
            ? 0
            : attackObjectCoords.topRightYCoord - attackAreaDeep,
    };
    attackAreaCoord["bottomLeftCoords"] = {
        x: attackObjectCoords.topLeftXCoord,
        y: attackObjectCoords.topLeftYCoord + 5,
    };
    attackAreaCoord["bottomRightCoords"] = {
        x: attackObjectCoords.topRightXCoord,
        y: attackObjectCoords.topRightYCoord + 5,
    };
};
exports.getUpAttackAreaCoords = getUpAttackAreaCoords;
const getDownAttackAreaCoords = (attackObjectCoords, attackAreaDeep, attackAreaCoord) => {
    attackAreaCoord["topLeftCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord,
        y: attackObjectCoords.bottomLeftYCoord - 5,
    };
    attackAreaCoord["topRightCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord,
        y: attackObjectCoords.bottomLeftYCoord - 5,
    };
    attackAreaCoord["bottomLeftCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord,
        y: attackObjectCoords.bottomLeftYCoord + attackAreaDeep > (gameObject_1.game.mapSize - 1) * 8
            ? (gameObject_1.game.mapSize - 1) * 8
            : attackObjectCoords.bottomLeftYCoord + attackAreaDeep,
    };
    attackAreaCoord["bottomRightCoords"] = {
        x: attackObjectCoords.bottomRightXCoord,
        y: attackObjectCoords.bottomRightYCoord + attackAreaDeep > (gameObject_1.game.mapSize - 1) * 8
            ? (gameObject_1.game.mapSize - 1) * 8
            : attackObjectCoords.bottomRightYCoord + attackAreaDeep,
    };
};
exports.getDownAttackAreaCoords = getDownAttackAreaCoords;
const getLeftAttackAreaCoords = (attackObjectCoords, attackAreaDeep, attackAreaCoord) => {
    attackAreaCoord["topRightCoords"] = {
        x: attackObjectCoords.topLeftXCoord + 5,
        y: attackObjectCoords.topLeftYCoord,
    };
    attackAreaCoord["bottomRightCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord + 5,
        y: attackObjectCoords.bottomLeftYCoord,
    };
    attackAreaCoord["topLeftCoords"] = {
        x: attackObjectCoords.topLeftXCoord - attackAreaDeep < 0
            ? 0
            : attackObjectCoords.topLeftXCoord - attackAreaDeep,
        y: attackObjectCoords.topLeftYCoord,
    };
    attackAreaCoord["bottomLeftCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord - attackAreaDeep < 0
            ? 0
            : attackObjectCoords.bottomLeftXCoord - attackAreaDeep,
        y: attackObjectCoords.bottomLeftYCoord,
    };
};
exports.getLeftAttackAreaCoords = getLeftAttackAreaCoords;
const getRightAttackAreaCoords = (attackObjectCoords, attackAreaDeep, attackAreaCoord) => {
    attackAreaCoord["topRightCoords"] = {
        x: attackObjectCoords.topLeftXCoord + 5,
        y: attackObjectCoords.topLeftYCoord,
    };
    attackAreaCoord["bottomRightCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord + 5,
        y: attackObjectCoords.bottomLeftYCoord,
    };
    attackAreaCoord["topLeftCoords"] = {
        x: attackObjectCoords.topLeftXCoord - attackAreaDeep < 0
            ? 0
            : attackObjectCoords.topLeftXCoord - attackAreaDeep,
        y: attackObjectCoords.topLeftYCoord,
    };
    attackAreaCoord["bottomLeftCoords"] = {
        x: attackObjectCoords.bottomLeftXCoord - attackAreaDeep < 0
            ? 0
            : attackObjectCoords.bottomLeftXCoord - attackAreaDeep,
        y: attackObjectCoords.bottomLeftYCoord,
    };
};
exports.getRightAttackAreaCoords = getRightAttackAreaCoords;
