"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameField = void 0;
const addObjectsMain_1 = require("../AddObjects/addObjectsMain");
const gameObject_1 = require("../gameObject/gameObject");
const moveObjectsMain_1 = require("../MoveObjects/moveObjectsMain");
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
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#1", 100, 0.1, 20, 200, 200);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#2", 100, 0.1, 20, 350, 200);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#3", 100, 0.1, 20, 350, 350);
        (0, addObjectsMain_1.addGamerOrNPC)("NPC", "orc3", "ORC#4", 100, 0.1, 20, 450, 350);
        (0, moveObjectsMain_1.moveNPC)("ORC#1", "orc3");
        (0, moveObjectsMain_1.moveNPC)("ORC#2", "orc3");
        (0, moveObjectsMain_1.moveNPC)("ORC#3", "orc3");
        (0, moveObjectsMain_1.moveNPC)("ORC#4", "orc3");
        // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
        // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
    }
    (0, addObjectsMain_1.addGamerOrNPC)("gamer", "gamer", socketID, 100, 0.2, 10);
    gameObject_1.game.gameIsstarted = true;
};
exports.createGameField = createGameField;
