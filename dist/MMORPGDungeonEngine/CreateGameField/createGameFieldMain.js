"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameField = void 0;
const addObjectsMain_1 = require("../AddObjects/addObjectsMain");
const gameObject_1 = require("../gameObject/gameObject");
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
        const createStoneTexture = (XChank, YChank, XSpriteCoord, YSpriteCoord) => {
            gameObject_1.game.gameField[XChank][YChank].textureObj = {};
            gameObject_1.game.gameField[XChank][YChank].textureObj.imageName = "rocksAndStones";
            gameObject_1.game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
            gameObject_1.game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
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
        createStoneTexture(10, 10, 0, 0);
        createStoneTexture(14, 10, 0, 0);
        createStoneTexture(18, 10, 64, 0);
        createStoneTexture(18, 14, 0, 64);
        createStoneTexture(18, 18, 0, 64);
        createStoneTexture(18, 22, 0, 64);
        // game.gameField[10][10].type = "stone";
        // game.gameField[10][10].notMove = true;
        // game.gameField[10][10].coord = {
        //   topLeft: { x: 8 * 10, y: 8 * 10 },
        //   topRight: { x: 8 * 10 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 10, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 10 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[10][11].type = "stone";
        // game.gameField[10][11].notMove = true;
        // game.gameField[10][11].coord = {
        //   topLeft: { x: 8 * 10, y: 8 * 11 },
        //   topRight: { x: 8 * 10 + 8, y: 8 * 11 },
        //   bottomLeft: { x: 8 * 10, y: 8 * 11 + 8 },
        //   bottomRight: { x: 8 * 10 + 8, y: 8 * 11 + 8 },
        // };
        // game.gameField[10][12].type = "stone";
        // game.gameField[10][12].notMove = true;
        // game.gameField[10][12].coord = {
        //   topLeft: { x: 8 * 10, y: 8 * 12 },
        //   topRight: { x: 8 * 10 + 8, y: 8 * 12 },
        //   bottomLeft: { x: 8 * 10, y: 8 * 12 + 8 },
        //   bottomRight: { x: 8 * 10 + 8, y: 8 * 12 + 8 },
        // };
        // game.gameField[10][13].type = "stone";
        // game.gameField[10][13].notMove = true;
        // game.gameField[10][13].coord = {
        //   topLeft: { x: 8 * 10, y: 8 * 13 },
        //   topRight: { x: 8 * 10 + 8, y: 8 * 13 },
        //   bottomLeft: { x: 8 * 10, y: 8 * 13 + 8 },
        //   bottomRight: { x: 8 * 10 + 8, y: 8 * 13 + 8 },
        // };
        // game.gameField[10][14].type = "stone";
        // game.gameField[10][14].notMove = true;
        // game.gameField[10][14].coord = {
        //   topLeft: { x: 8 * 10, y: 8 * 14 },
        //   topRight: { x: 8 * 10 + 8, y: 8 * 14 },
        //   bottomLeft: { x: 8 * 10, y: 8 * 14 + 8 },
        //   bottomRight: { x: 8 * 10 + 8, y: 8 * 14 + 8 },
        // };
        // game.gameField[10][15].type = "stone";
        // game.gameField[10][15].notMove = true;
        // game.gameField[10][15].coord = {
        //   topLeft: { x: 8 * 10, y: 8 * 15 },
        //   topRight: { x: 8 * 10 + 8, y: 8 * 15 },
        //   bottomLeft: { x: 8 * 10, y: 8 * 15 + 8 },
        //   bottomRight: { x: 8 * 10 + 8, y: 8 * 15 + 8 },
        // };
        // game.gameField[11][10].type = "stone";
        // game.gameField[11][10].notMove = true;
        // game.gameField[11][10].coord = {
        //   topLeft: { x: 8 * 11, y: 8 * 10 },
        //   topRight: { x: 8 * 11 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 11, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 11 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[12][10].type = "stone";
        // game.gameField[12][10].notMove = true;
        // game.gameField[12][10].coord = {
        //   topLeft: { x: 8 * 12, y: 8 * 10 },
        //   topRight: { x: 8 * 12 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 12, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 12 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[13][10].type = "stone";
        // game.gameField[13][10].notMove = true;
        // game.gameField[13][10].coord = {
        //   topLeft: { x: 8 * 13, y: 8 * 10 },
        //   topRight: { x: 8 * 13 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 13, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 13 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[14][10].type = "stone";
        // game.gameField[14][10].notMove = true;
        // game.gameField[14][10].coord = {
        //   topLeft: { x: 8 * 14, y: 8 * 10 },
        //   topRight: { x: 8 * 14 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 14, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 14 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[15][10].type = "stone";
        // game.gameField[15][10].notMove = true;
        // game.gameField[15][10].coord = {
        //   topLeft: { x: 8 * 15, y: 8 * 10 },
        //   topRight: { x: 8 * 15 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 15, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 15 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[16][10].type = "stone";
        // game.gameField[16][10].notMove = true;
        // game.gameField[16][10].coord = {
        //   topLeft: { x: 8 * 16, y: 8 * 10 },
        //   topRight: { x: 8 * 16 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 16, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 16 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[4][10].type = "stone";
        // game.gameField[4][10].notMove = true;
        // game.gameField[4][10].coord = {
        //   topLeft: { x: 8 * 4, y: 8 * 10 },
        //   topRight: { x: 8 * 4 + 8, y: 8 * 10 },
        //   bottomLeft: { x: 8 * 4, y: 8 * 10 + 8 },
        //   bottomRight: { x: 8 * 4 + 8, y: 8 * 10 + 8 },
        // };
        // game.gameField[4][11].type = "stone";
        // game.gameField[4][11].notMove = true;
        // game.gameField[4][11].coord = {
        //   topLeft: { x: 8 * 4, y: 8 * 11 },
        //   topRight: { x: 8 * 4 + 8, y: 8 * 11 },
        //   bottomLeft: { x: 8 * 4, y: 8 * 11 + 8 },
        //   bottomRight: { x: 8 * 4 + 8, y: 8 * 11 + 8 },
        // };
        // game.gameField[4][12].type = "stone";
        // game.gameField[4][12].notMove = true;
        // game.gameField[4][12].coord = {
        //   topLeft: { x: 8 * 4, y: 8 * 12 },
        //   topRight: { x: 8 * 4 + 8, y: 8 * 12 },
        //   bottomLeft: { x: 8 * 4, y: 8 * 12 + 8 },
        //   bottomRight: { x: 8 * 4 + 8, y: 8 * 12 + 8 },
        // };
        // game.gameField[4][13].type = "stone";
        // game.gameField[4][13].notMove = true;
        // game.gameField[4][13].coord = {
        //   topLeft: { x: 8 * 4, y: 8 * 13 },
        //   topRight: { x: 8 * 4 + 8, y: 8 * 13 },
        //   bottomLeft: { x: 8 * 4, y: 8 * 13 + 8 },
        //   bottomRight: { x: 8 * 4 + 8, y: 8 * 13 + 8 },
        // };
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#1", 100, 0.1, 20);
        // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
        // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
    }
    (0, addObjectsMain_1.addGamerOrNPC)("gamer", "gamer", socketID, 100, 0.2, 10);
    gameObject_1.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
