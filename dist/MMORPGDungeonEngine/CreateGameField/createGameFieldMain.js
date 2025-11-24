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
        const createStoneTexture = (XChank, YChank, XSpriteCoord, YSpriteCoord, sourceX, sourceY, heightChanks, widthChanks) => {
            gameObject_1.game.gameField[XChank][YChank].textureObj = {};
            gameObject_1.game.gameField[XChank][YChank].textureObj.imageName = "rocksAndStones";
            gameObject_1.game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
            gameObject_1.game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
            gameObject_1.game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    gameObject_1.game.gameField[XChank + i][YChank + j].type = "stone";
                    gameObject_1.game.gameField[XChank + i][YChank + j].notMove = true;
                    gameObject_1.game.gameField[XChank + i][YChank + j].coord = {
                        topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
                        topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
                        bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
                        bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
                    };
                }
            }
        };
        createStoneTexture(10, 10, 0, 0, 64, 64, 4, 4);
        createStoneTexture(14, 10, 0, 0, 64, 64, 4, 4);
        createStoneTexture(18, 10, 64, 0, 64, 64, 4, 4);
        createStoneTexture(18, 14, 0, 64, 64, 64, 4, 4);
        createStoneTexture(18, 18, 0, 64, 64, 64, 4, 4);
        createStoneTexture(18, 22, 0, 64, 64, 64, 4, 4);
        const createRoadTileTexture = (XChank, YChank, XSpriteCoord, YSpriteCoord, sourceX, sourceY, heightChanks, widthChanks) => {
            gameObject_1.game.gameField[XChank][YChank].textureObj = {};
            gameObject_1.game.gameField[XChank][YChank].textureObj.imageName = "roadTile";
            gameObject_1.game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
            gameObject_1.game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
            gameObject_1.game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    gameObject_1.game.gameField[XChank + i][YChank + j].type = "road";
                    gameObject_1.game.gameField[XChank + i][YChank + j].notMove = false;
                    gameObject_1.game.gameField[XChank + i][YChank + j].coord = {
                        topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
                        topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
                        bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
                        bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
                    };
                }
            }
        };
        createRoadTileTexture(30, 30, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(30, 34, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(30, 38, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(30, 42, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(30, 46, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(30, 50, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(31, 54, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(32, 58, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(34, 62, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(36, 66, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(40, 66, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(44, 66, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(48, 66, 8, 135, 24, 24, 4, 4);
        createRoadTileTexture(52, 66, 8, 135, 24, 24, 4, 4);
        const createTreeTexture = (XChank, YChank, XSpriteCoord, YSpriteCoord, sourceX, sourceY, heightChanks, widthChanks) => {
            gameObject_1.game.gameField[XChank][YChank].textureObj = {};
            gameObject_1.game.gameField[XChank][YChank].textureObj.imageName = "trees";
            gameObject_1.game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
            gameObject_1.game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
            gameObject_1.game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
            gameObject_1.game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 10; j++) {
                    gameObject_1.game.gameField[XChank + i][YChank + j].type = "tree";
                    gameObject_1.game.gameField[XChank + i][YChank + j].notMove = true;
                    gameObject_1.game.gameField[XChank + i][YChank + j].coord = {
                        topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
                        topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
                        bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
                        bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
                    };
                }
            }
        };
        createTreeTexture(40, 30, 191, 0, 64, 80, 8, 10);
        createTreeTexture(40, 10, 191, 0, 64, 80, 8, 10);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#1", 100, 0.1, 20, 160, 240);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#2", 100, 0.1, 20, 350, 200);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#3", 100, 0.1, 20, 350, 350);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#4", 100, 0.1, 20, 450, 350);
        (0, moveObjectsMain_1.moveNPCMain)(src_1.io);
        // moveNPC("ORC#1", "orc3");
        // moveNPC("ORC#2", "orc3");
        // moveNPC("ORC#3", "orc3");
        // moveNPC("ORC#4", "orc3");
        // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
        // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
    }
    (0, addObjectsMain_1.addGamerOrNPC)("gamer", "gamer", socketID, 100, 0.2, 10);
    gameObject_1.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
