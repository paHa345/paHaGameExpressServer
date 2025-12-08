"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlePointIntersection = exports.secoundPointIntersection = exports.firstPointIntersection = exports.getRightAttackAreaCoords = exports.getLeftAttackAreaCoords = exports.getDownAttackAreaCoords = exports.getUpAttackAreaCoords = void 0;
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
        x: attackObjectCoords.topRightXCoord + attackAreaDeep < (gameObject_1.game.mapSize - 1) * 8
            ? (gameObject_1.game.mapSize - 1) * 8
            : attackObjectCoords.topRightXCoord + attackAreaDeep,
        y: attackObjectCoords.topRightYCoord,
    };
    attackAreaCoord["bottomRightCoords"] = {
        x: attackObjectCoords.bottomRightXCoord + attackAreaDeep < (gameObject_1.game.mapSize - 1) * 8
            ? (gameObject_1.game.mapSize - 1) * 8
            : attackObjectCoords.bottomRightXCoord + attackAreaDeep,
        y: attackObjectCoords.bottomRightYCoord,
    };
    attackAreaCoord["topLeftCoords"] = {
        x: attackObjectCoords.topRightXCoord - 5,
        y: attackObjectCoords.topRightYCoord,
        // x:
        //   attackObjectCoords.topLeftXCoord - attackAreaDeep < 0
        //     ? 0
        //     : attackObjectCoords.topLeftXCoord - attackAreaDeep,
        // y: attackObjectCoords.topLeftYCoord,
    };
    attackAreaCoord["bottomLeftCoords"] = {
        x: attackObjectCoords.bottomRightXCoord - 5,
        y: attackObjectCoords.bottomRightYCoord,
    };
};
exports.getRightAttackAreaCoords = getRightAttackAreaCoords;
const firstPointIntersection = (direction, objectID, attackAreaCoord) => {
    if (direction === gameObject_1.UserMoveDirections.up) {
        return (gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y <
                attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x >
                attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x < attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.down) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.y < attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x > attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x < attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.left) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x > attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x < attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.right) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.y < attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x > attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.x < attackAreaCoord["bottomRightCoords"].x);
    }
};
exports.firstPointIntersection = firstPointIntersection;
const secoundPointIntersection = (direction, objectID, attackAreaCoord) => {
    if (direction === gameObject_1.UserMoveDirections.up) {
        return (gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y <
                attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x >
                attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x <
                attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.down) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x > attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.x < attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.left) {
        return (gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y <
                attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x >
                attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x <
                attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.right) {
        return (gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y <
                attackAreaCoord["bottomLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x >
                attackAreaCoord["bottomLeftCoords"].x &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x < attackAreaCoord["bottomRightCoords"].x);
    }
};
exports.secoundPointIntersection = secoundPointIntersection;
const middlePointIntersection = (direction, objectID, attackAreaCoord) => {
    if (direction === gameObject_1.UserMoveDirections.up) {
        return (gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y <
                attackAreaCoord["bottomLeftCoords"].y &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x +
                gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x) /
                2) > attackAreaCoord["topLeftCoords"].x &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x +
                gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x) /
                2) < attackAreaCoord["topRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.down) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.x +
                gameObject_1.game.users[objectID].square.currentCoord.topRight.x) /
                2) > attackAreaCoord["bottomLeftCoords"].x &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.topLeft.x +
                gameObject_1.game.users[objectID].square.currentCoord.topRight.x) /
                2) < attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.left) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x +
                gameObject_1.game.users[objectID].square.currentCoord.topRight.x) /
                2) > attackAreaCoord["bottomLeftCoords"].x &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x +
                gameObject_1.game.users[objectID].square.currentCoord.topRight.x) /
                2) < attackAreaCoord["bottomRightCoords"].x);
    }
    if (direction === gameObject_1.UserMoveDirections.right) {
        return (gameObject_1.game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
            gameObject_1.game.users[objectID].square.currentCoord.topLeft.y < attackAreaCoord["bottomLeftCoords"].y &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x +
                gameObject_1.game.users[objectID].square.currentCoord.topLeft.x) /
                2) > attackAreaCoord["bottomLeftCoords"].x &&
            Math.floor((gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x +
                gameObject_1.game.users[objectID].square.currentCoord.topLeft.x) /
                2) < attackAreaCoord["bottomRightCoords"].x);
    }
};
exports.middlePointIntersection = middlePointIntersection;
