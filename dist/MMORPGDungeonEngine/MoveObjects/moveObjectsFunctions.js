"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentCoord = exports.setAndDeleteObjectsFromSectors = exports.setObjectInSectors = exports.setMoveCoord = exports.getObjectCoords = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const getIntersectionObjectsFunctions_1 = require("./getIntersectionObjectsFunctions");
const getObjectCoords = (objectID) => {
    return {
        bottomLeftXCoord: gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x,
        bottomRightXCoord: gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x,
        topLeftXCoord: gameObject_1.game.users[objectID].square.currentCoord.topLeft.x,
        topRightXCoord: gameObject_1.game.users[objectID].square.currentCoord.topRight.x,
        bottomLeftYCoord: gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y,
        topLeftYCoord: gameObject_1.game.users[objectID].square.currentCoord.topLeft.y,
        topRightYCoord: gameObject_1.game.users[objectID].square.currentCoord.topRight.y,
        bottomRightYCoord: gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y,
    };
};
exports.getObjectCoords = getObjectCoords;
const setMoveCoord = (clientData, objectID, objectoords) => {
    if (clientData.direction === gameObject_1.UserMoveDirections.down) {
        gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y =
            objectoords.bottomLeftYCoord + clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y =
            objectoords.bottomRightYCoord + clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topLeft.y =
            objectoords.topLeftYCoord + clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topRight.y =
            objectoords.topRightYCoord + clientData.shiftUserPixels;
    }
    if (clientData.direction === gameObject_1.UserMoveDirections.up) {
        gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y =
            objectoords.bottomLeftYCoord - clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.bottomRight.y =
            objectoords.bottomRightYCoord - clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topLeft.y =
            objectoords.topLeftYCoord - clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topRight.y =
            objectoords.topRightYCoord - clientData.shiftUserPixels;
    }
    if (clientData.direction === gameObject_1.UserMoveDirections.left) {
        gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x =
            objectoords.bottomLeftXCoord - clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x =
            objectoords.bottomRightXCoord - clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topLeft.x =
            objectoords.topLeftXCoord - clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topRight.x =
            objectoords.topRightXCoord - clientData.shiftUserPixels;
    }
    if (clientData.direction === gameObject_1.UserMoveDirections.right) {
        gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x =
            objectoords.bottomLeftXCoord + clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.bottomRight.x =
            objectoords.bottomRightXCoord + clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topLeft.x =
            objectoords.topLeftXCoord + clientData.shiftUserPixels;
        gameObject_1.game.users[objectID].square.currentCoord.topRight.x =
            objectoords.topRightXCoord + clientData.shiftUserPixels;
    }
};
exports.setMoveCoord = setMoveCoord;
const setObjectInSectors = (objectoords, objectID) => {
    gameObject_1.game.sectors[`${Math.floor(objectoords.topLeftYCoord / (20 * 8))}${Math.floor(objectoords.topLeftXCoord / (20 * 8))}`].objectsID[objectID] = {
        objectType: "object",
    };
    gameObject_1.game.sectors[`${Math.floor(objectoords.topRightYCoord / (20 * 8))}${Math.floor(objectoords.topRightXCoord / (20 * 8))}`].objectsID[objectID] = {
        objectType: "object",
    };
    gameObject_1.game.sectors[`${Math.floor(objectoords.bottomLeftYCoord / (20 * 8))}${Math.floor(objectoords.bottomLeftXCoord / (20 * 8))}`].objectsID[objectID] = {
        objectType: "object",
    };
    gameObject_1.game.sectors[`${Math.floor(objectoords.bottomRightYCoord / (20 * 8))}${Math.floor(objectoords.bottomRightXCoord / (20 * 8))}`].objectsID[objectID] = {
        objectType: "object",
    };
};
exports.setObjectInSectors = setObjectInSectors;
const setAndDeleteObjectsFromSectors = (prevCoords, coordsAfterMove, objectID) => {
    if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.right) {
        // смотрим правые точки X координаты
        if (`${Math.floor(prevCoords.topRightXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topRightXCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}${Math.floor(coordsAfterMove.topRightXCoord / (20 * 8))}`].objectsID[objectID] = { objectType: `${objectID}` };
        }
        if (`${Math.floor(prevCoords.bottomRightXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomRightXCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}${Math.floor(coordsAfterMove.bottomRightXCoord / (20 * 8))}`].objectsID[objectID] = { objectType: `${objectID}` };
        }
        // смотрим левые точки X координаты
        if (`${Math.floor(prevCoords.topLeftXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topLeftXCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(prevCoords.topLeftXCoord / (20 * 8))}`].objectsID[objectID];
        }
        if (`${Math.floor(prevCoords.bottomLeftXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomLeftXCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(prevCoords.bottomLeftXCoord / (20 * 8))}`].objectsID[objectID];
        }
        return;
    }
    if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.left) {
        // смотрим левые точки X координаты
        if (`${Math.floor(prevCoords.topLeftXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topLeftXCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}${Math.floor(coordsAfterMove.topLeftXCoord / (20 * 8))}`].objectsID[`${objectID}`] = { objectType: `${objectID}` };
        }
        if (`${Math.floor(prevCoords.bottomLeftXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomLeftXCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}${Math.floor(coordsAfterMove.bottomLeftXCoord / (20 * 8))}`].objectsID[`${objectID}`] = { objectType: `${objectID}` };
        }
        // смотрим правые точки X координаты
        if (`${Math.floor(prevCoords.topRightXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topRightXCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(prevCoords.topRightXCoord / (20 * 8))}`].objectsID[objectID];
        }
        if (`${Math.floor(prevCoords.bottomRightXCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomRightXCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(prevCoords.bottomRightXCoord / (20 * 8))}`].objectsID[objectID];
        }
        return;
    }
    if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.up) {
        // смотрим верхние точки Y координаты
        if (`${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}${Math.floor(coordsAfterMove.topLeftXCoord / (20 * 8))}`].objectsID[`${objectID}`] = { objectType: `${objectID}` };
        }
        if (`${Math.floor(prevCoords.topRightYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}${Math.floor(coordsAfterMove.topRightXCoord / (20 * 8))}`].objectsID[`${objectID}`] = { objectType: `${objectID}` };
        }
        // смотрим нижние точки Y координаты
        if (`${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(prevCoords.bottomLeftXCoord / (20 * 8))}`].objectsID[objectID];
        }
        if (`${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(prevCoords.bottomRightXCoord / (20 * 8))}`].objectsID[objectID];
        }
        return;
    }
    if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.down) {
        // смотрим нижние точки Y координаты
        if (`${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}${Math.floor(coordsAfterMove.bottomLeftXCoord / (20 * 8))}`].objectsID[`${objectID}`] = { objectType: `${objectID}` };
        }
        if (`${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}`) {
            gameObject_1.game.sectors[`${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}${Math.floor(coordsAfterMove.bottomRightXCoord / (20 * 8))}`].objectsID[`${objectID}`] = { objectType: `${objectID}` };
        }
        // смотрим верхние точки Y координаты
        if (`${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(prevCoords.topLeftXCoord / (20 * 8))}`].objectsID[objectID];
        }
        if (`${Math.floor(prevCoords.topRightYCoord / (20 * 8))}` !==
            `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}`) {
            delete gameObject_1.game.sectors[`${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(prevCoords.topRightXCoord / (20 * 8))}`].objectsID[objectID];
        }
        return;
    }
};
exports.setAndDeleteObjectsFromSectors = setAndDeleteObjectsFromSectors;
const setCurrentCoord = function (clientData, objectID) {
    if (!gameObject_1.game.users[objectID])
        return;
    gameObject_1.game.users[objectID].moveDirection = clientData.direction;
    let moveStatus = true;
    const objectCoords = (0, exports.getObjectCoords)(objectID);
    if (clientData.direction === gameObject_1.UserMoveDirections.down) {
        if (objectCoords.bottomLeftYCoord + clientData.shiftUserPixels >= (gameObject_1.game.mapSize - 1) * 8) {
            return;
        }
        const objectInChankStartPixel = gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x % 8 === 0 ? true : false;
        for (let i = objectCoords.bottomLeftXCoord + 8; i <= objectCoords.bottomRightXCoord; i = i + 8) {
            if (objectInChankStartPixel && i === objectCoords.bottomRightXCoord) {
                continue;
            }
            if (gameObject_1.game.gameField[Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / 8)][Math.floor(i / 8)].notMove ||
                gameObject_1.game.gameField[Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / 8)][Math.floor((i - 8) / 8)].notMove) {
                moveStatus = false;
                break;
            }
        }
    }
    if (clientData.direction === gameObject_1.UserMoveDirections.up) {
        const objectInChankStartPixel = gameObject_1.game.users[objectID].square.currentCoord.topLeft.x % 8 === 0 ? true : false;
        if (objectCoords.topLeftYCoord - clientData.shiftUserPixels < 5) {
            return;
        }
        for (let i = objectCoords.topLeftXCoord + 8; i <= objectCoords.topRightXCoord; i = i + 8) {
            if (objectInChankStartPixel && i === objectCoords.topRightXCoord) {
                continue;
            }
            if (gameObject_1.game.gameField[Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / 8)][Math.floor(i / 8)].notMove ||
                gameObject_1.game.gameField[Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / 8)][Math.floor((i - 8) / 8)].notMove) {
                moveStatus = false;
                break;
            }
        }
    }
    if (clientData.direction === gameObject_1.UserMoveDirections.left) {
        const objectInChankStartPixel = gameObject_1.game.users[objectID].square.currentCoord.topLeft.y % 8 === 0 ? true : false;
        if (objectCoords.topLeftXCoord - clientData.shiftUserPixels < 5) {
            return;
        }
        for (let i = objectCoords.topLeftYCoord + 8; i <= objectCoords.bottomLeftYCoord; i = i + 8) {
            if (objectInChankStartPixel && i === objectCoords.bottomLeftYCoord) {
                continue;
            }
            if (gameObject_1.game.gameField[Math.floor(i / 8)][Math.floor((objectCoords.topLeftXCoord - clientData.shiftUserPixels) / 8)].notMove ||
                gameObject_1.game.gameField[Math.floor((i - 8) / 8)][Math.floor((objectCoords.topLeftXCoord - clientData.shiftUserPixels) / 8)].notMove) {
                moveStatus = false;
                break;
            }
        }
    }
    if (clientData.direction === gameObject_1.UserMoveDirections.right) {
        const objectInChankStartPixel = gameObject_1.game.users[objectID].square.currentCoord.topLeft.y % 8 === 0 ? true : false;
        if (objectCoords.topRightXCoord + clientData.shiftUserPixels > (gameObject_1.game.mapSize - 1) * 8) {
            return;
        }
        for (let i = objectCoords.topRightYCoord + 8; i <= objectCoords.bottomRightYCoord; i = i + 8) {
            if (objectInChankStartPixel && i === objectCoords.bottomRightYCoord) {
                continue;
            }
            if (gameObject_1.game.gameField[Math.floor(i / 8)][Math.floor((objectCoords.topRightXCoord + clientData.shiftUserPixels) / 8)].notMove ||
                gameObject_1.game.gameField[Math.floor((i - 8) / 8)][Math.floor((objectCoords.topRightXCoord + clientData.shiftUserPixels) / 8)].notMove) {
                moveStatus = false;
                break;
            }
        }
    }
    if (!moveStatus)
        return;
    const seeSectors = () => {
        // if (game.users[objectID].type !== "gamer") return;
        if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.down) {
            if (`${Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.bottomLeftXCoord / (20 * 8))}` ===
                `${Math.floor((objectCoords.bottomRightYCoord + clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.bottomRightXCoord / (20 * 8))}`) {
                //   console.log("Одинаковый сектор, смотрим только сектор нижней правой точки");
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.bottomLeftXCoord / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getDownMOveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
            else {
                // разные сектора, смотрим объекты в обеих секторах
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.bottomLeftXCoord / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getDownMOveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
                if (!moveStatus)
                    return;
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor((objectCoords.bottomRightYCoord + clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.bottomRightXCoord / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getDownMOveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
        }
        if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.up) {
            if (`${Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}` ===
                `${Math.floor((objectCoords.topRightYCoord - clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.topRightXCoord / (20 * 8))}`) {
                // одинаковые сектора, смотрим в одном
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getUpMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
            else {
                // разные сектора, смотрим в обоих
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getUpMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
                if (!moveStatus)
                    return;
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor((objectCoords.topRightYCoord - clientData.shiftUserPixels) / (20 * 8))}${Math.floor(objectCoords.topRightXCoord / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getUpMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
        }
        if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.left) {
            if (`${Math.floor(objectCoords.topLeftYCoord / (20 * 8))}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}` ===
                `${Math.floor(objectCoords.bottomLeftYCoord / (20 * 8))}${Math.floor((objectCoords.bottomLeftXCoord - clientData.shiftUserPixels) / (20 * 8))}`) {
                // одинаковые сектора, смотрим в одном
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor(objectCoords.topLeftYCoord / (20 * 8))}${Math.floor((objectCoords.topLeftXCoord - clientData.shiftUserPixels) / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getLeftMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
            else {
                // разные сектора, смотрим в обоих
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor(objectCoords.topLeftYCoord / (20 * 8))}${Math.floor((objectCoords.topLeftXCoord - clientData.shiftUserPixels) / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getLeftMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
                if (!moveStatus)
                    return;
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor(objectCoords.bottomLeftYCoord / (20 * 8))}${Math.floor((objectCoords.bottomLeftXCoord - clientData.shiftUserPixels) / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getLeftMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
        }
        if (gameObject_1.game.users[objectID].moveDirection === gameObject_1.UserMoveDirections.right) {
            if (`${Math.floor(objectCoords.topRightYCoord / (20 * 8))}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}` ===
                `${Math.floor(objectCoords.bottomRightYCoord / (20 * 8))}${Math.floor((objectCoords.bottomLeftXCoord + clientData.shiftUserPixels) / (20 * 8))}`) {
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor(objectCoords.topRightYCoord / (20 * 8))}${Math.floor((objectCoords.topLeftXCoord + clientData.shiftUserPixels) / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getRightMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
            else {
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor(objectCoords.topRightYCoord / (20 * 8))}${Math.floor((objectCoords.topLeftXCoord + clientData.shiftUserPixels) / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getRightMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
                if (!moveStatus)
                    return;
                for (const inSectorObjectID in gameObject_1.game.sectors[`${Math.floor(objectCoords.bottomRightYCoord / (20 * 8))}${Math.floor((objectCoords.bottomLeftXCoord + clientData.shiftUserPixels) / (20 * 8))}`].objectsID) {
                    if (inSectorObjectID === objectID)
                        continue;
                    moveStatus = (0, getIntersectionObjectsFunctions_1.getRightMoveIntersectionObjects)(inSectorObjectID, clientData.shiftUserPixels, objectCoords);
                    if (!moveStatus)
                        return;
                }
            }
        }
    };
    seeSectors();
    if (!moveStatus)
        return;
    if (moveStatus)
        (0, exports.setMoveCoord)(clientData, objectID, objectCoords);
    // смотрим сектора куда перемещаемся
    const objectCoordsAfterMove = (0, exports.getObjectCoords)(objectID);
    // после изменения координат, удаляем объект из секторов
    // которые покинул объект
    //   смотрим старыет(objectCoords) и новые (objectCoordsAfterMove) координаты
    // после изменения координат, записываем объект в соответствующие сектора
    (0, exports.setAndDeleteObjectsFromSectors)(objectCoords, objectCoordsAfterMove, objectID);
};
exports.setCurrentCoord = setCurrentCoord;
