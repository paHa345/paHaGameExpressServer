"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameField = void 0;
const src_1 = require("../../src");
const addObjectsMain_1 = require("../AddObjects/addObjectsMain");
const gameObject_1 = require("../gameObject/gameObject");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
src_1.io;
const createGameField = (socketID) => {
    if (!gameObject_1.game.gameField[0]) {
        console.log("Create game field");
        for (let i = 0; i < gameObject_1.game.mapSize; i++) {
            const gameFieldCreatedObjRow = {};
            for (let j = 0; j < gameObject_1.game.mapSize; j++) {
                gameFieldCreatedObjRow[j] = {
                    objectDataChank: {
                        isObjectChank: false,
                    },
                };
            }
            gameObject_1.game.gameField[i] = gameFieldCreatedObjRow;
        }
        const createGameFieldSectors = () => {
            for (let i = 0; i < gameObject_1.game.mapSize / 20; i++) {
                for (let j = 0; j < gameObject_1.game.mapSize / 20; j++) {
                    gameObject_1.game.sectors[`${i}${j}`] = {
                        objectsID: {},
                    };
                }
            }
        };
        createGameFieldSectors();
        const createBackgroundObjectTextureHomogenous = (XChank, YChank, XSpriteCoord, YSpriteCoord, sourceX, sourceY, heightChanks, widthChanks, objectType, imageName, impenetrableStatus) => {
            gameObject_1.game.gameField[XChank][YChank].textureObj = {};
            gameObject_1.game.gameField[XChank][YChank].textureObj.imageName = imageName;
            gameObject_1.game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
            gameObject_1.game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
            gameObject_1.game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;
            for (let i = 0; i < widthChanks; i++) {
                for (let j = 0; j < heightChanks; j++) {
                    gameObject_1.game.gameField[XChank + i][YChank + j].type = objectType;
                    gameObject_1.game.gameField[XChank + i][YChank + j].notMove = impenetrableStatus;
                    gameObject_1.game.gameField[XChank + i][YChank + j].coord = {
                        topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
                        topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
                        bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
                        bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
                    };
                }
            }
        };
        createBackgroundObjectTextureHomogenous(10, 10, 0, 0, 64, 64, 4, 4, "stone", "rocksAndStones", true);
        createBackgroundObjectTextureHomogenous(14, 10, 0, 0, 64, 64, 4, 4, "stone", "rocksAndStones", true);
        createBackgroundObjectTextureHomogenous(18, 10, 64, 0, 64, 64, 4, 4, "stone", "rocksAndStones", true);
        createBackgroundObjectTextureHomogenous(18, 14, 0, 64, 64, 64, 4, 4, "stone", "rocksAndStones", true);
        createBackgroundObjectTextureHomogenous(18, 18, 0, 64, 64, 64, 4, 4, "stone", "rocksAndStones", true);
        createBackgroundObjectTextureHomogenous(18, 22, 0, 64, 64, 64, 4, 4, "stone", "rocksAndStones", true);
        createBackgroundObjectTextureHomogenous(30, 30, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(30, 34, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(30, 38, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(30, 42, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(30, 46, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(30, 50, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(31, 54, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(32, 58, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(34, 62, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(36, 66, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(40, 66, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(44, 66, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(48, 66, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(52, 66, 8, 135, 24, 24, 4, 4, "road", "roadTile", false);
        createBackgroundObjectTextureHomogenous(50, 100, 0, 497, 35, 35, 5, 5, "pit", "exterior", true);
        createBackgroundObjectTextureHomogenous(45, 100, 101, 517, 25, 25, 3, 3, "mushroom", "exterior", true);
        const createBackgroundObjectTreeTexture = (XChank, YChank, XSpriteCoord, YSpriteCoord, sourceX, sourceY, heightChanks, widthChanks, objectType, imageName) => {
            gameObject_1.game.gameField[XChank][YChank].textureObj = {};
            gameObject_1.game.gameField[XChank][YChank].textureObj.imageName = imageName;
            gameObject_1.game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
            gameObject_1.game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
            gameObject_1.game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;
            if (objectType === "tree" || objectType === "tree") {
                for (let i = 0; i < widthChanks; i++) {
                    for (let j = 0; j < heightChanks; j++) {
                        gameObject_1.game.gameField[XChank + i][YChank + j].type = objectType;
                        if (j >= 1 && j <= 5 && i >= 6) {
                            gameObject_1.game.gameField[XChank + i][YChank + j].notMove = true;
                        }
                        gameObject_1.game.gameField[XChank + i][YChank + j].coord = {
                            topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
                            topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
                            bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
                            bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
                        };
                    }
                }
                return;
            }
            if (objectType === "playersHouse") {
                for (let i = 0; i < widthChanks; i++) {
                    for (let j = 0; j < heightChanks; j++) {
                        gameObject_1.game.gameField[XChank + i][YChank + j].type = objectType;
                        if (i >= 8) {
                            gameObject_1.game.gameField[XChank + i][YChank + j].notMove = true;
                        }
                        gameObject_1.game.gameField[XChank + i][YChank + j].coord = {
                            topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
                            topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
                            bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
                            bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
                        };
                    }
                }
                return;
            }
        };
        createBackgroundObjectTreeTexture(40, 30, 191, 0, 64, 80, 8, 10, "tree", "trees");
        createBackgroundObjectTreeTexture(40, 10, 191, 0, 64, 80, 8, 10, "tree", "trees");
        createBackgroundObjectTreeTexture(40, 80, 12, 0, 132, 128, 17, 16, "playersHouse", "exterior");
        createBackgroundObjectTreeTexture(75, 100, 4, 545, 55, 65, 8, 10, "scarecrow", "exterior");
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#1", 100, 0.1, 20, 200, 200);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#2", 100, 0.1, 20, 350, 200);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#3", 100, 0.1, 20, 350, 350);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#4", 100, 0.1, 20, 450, 350);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#5", 100, 0.1, 20, 100, 260);
        (0, moveObjectsMain_1.moveNPCMain)(src_1.io);
    }
    console.log("Update game field");
    (0, addObjectsMain_1.addGamerOrNPC)("gamer", "gamer", socketID, 100, 0.2, 10, 10, 10);
    gameObject_1.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
