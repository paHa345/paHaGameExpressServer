"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameField = void 0;
const src_1 = require("../../src");
const addObjectsMain_1 = require("../AddObjects/addObjectsMain");
const DropObjectMain_1 = require("../DropObject/DropObjectMain");
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
        const createDropObjectTexture = (XChank, YChank, XSpriteCoord, YSpriteCoord, sourceX, sourceY, heightChanks, widthChanks, objectType, imageName) => {
            if (gameObject_1.game.dropObject.objectData[`${XChank}:${YChank}`]) {
                gameObject_1.game.dropObject.objectData[`${XChank}:${YChank}`].push({
                    XChank: XChank,
                    YChank: YChank,
                    imageName: imageName,
                    XSpriteCoord: XSpriteCoord,
                    YSpriteCoord: YSpriteCoord,
                    sourceX: sourceX,
                    sourceY: sourceY,
                    heigthChanks: heightChanks,
                    widthChanks: widthChanks,
                });
            }
            else {
                gameObject_1.game.dropObject.objectData[`${XChank}:${YChank}`] = [
                    {
                        XChank: XChank,
                        YChank: YChank,
                        imageName: imageName,
                        XSpriteCoord: XSpriteCoord,
                        YSpriteCoord: YSpriteCoord,
                        sourceX: sourceX,
                        sourceY: sourceY,
                        heigthChanks: heightChanks,
                        widthChanks: widthChanks,
                    },
                ];
            }
            // console.log(
            //   `Added Drop Item Sector: ${Math.floor(XChank / 20)} : ${Math.floor(YChank / 20)}`
            // );
            const dropObjectSector = `${Math.floor(XChank / 20)}:${Math.floor(YChank / 20)}`;
            if (gameObject_1.game.dropObject.dropObjectSectors[dropObjectSector]) {
                gameObject_1.game.dropObject.dropObjectSectors[dropObjectSector].push({
                    dropChankID: `${XChank}:${YChank}`,
                    XChank: XChank,
                    YChank: YChank,
                });
            }
            else {
                gameObject_1.game.dropObject.dropObjectSectors[dropObjectSector] = [
                    { dropChankID: `${XChank}:${YChank}`, XChank: XChank, YChank: YChank },
                ];
            }
        };
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
        createBackgroundObjectTextureHomogenous(85, 110, 126, 774, 24, 16, 6, 4, "grass", "exterior", false);
        createBackgroundObjectTextureHomogenous(3, 3, 126, 774, 24, 16, 6, 4, "grass", "exterior", false);
        createDropObjectTexture(25, 16, 56, 63, 114, 107, 3, 3, "armour", "equipment");
        createDropObjectTexture(23, 23, 397, 57, 113, 112, 3, 3, "armour", "equipment");
        createDropObjectTexture(30, 30, 56, 63, 114, 107, 3, 3, "armour", "equipment");
        createDropObjectTexture(34, 34, 396, 396, 114, 107, 3, 3, "armour", "equipment");
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
            if (objectType === "tree") {
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
            if (objectType === "scarecrow") {
                for (let i = 0; i < widthChanks; i++) {
                    for (let j = 0; j < heightChanks; j++) {
                        gameObject_1.game.gameField[XChank + i][YChank + j].type = objectType;
                        if (j >= 2 && j <= 3 && i >= 7) {
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
        createBackgroundObjectTreeTexture(75, 100, 4, 545, 55, 65, 7, 8, "scarecrow", "exterior");
        //     createBackgroundObjectTreeTexture(
        //   85,
        //   110,
        //   126,
        //   774,
        //   24,
        //   16,
        //   6,
        //   4,
        //   "highGrass",
        //   "exterior"
        // );
        (0, addObjectsMain_1.addGamerOrNPC)({
            addedElType: "NPC",
            objectType: "orc3",
            addedElID: "ORC#1",
            XCoord: 200,
            YCoord: 200,
            level: 3,
        });
        (0, addObjectsMain_1.addGamerOrNPC)({
            addedElType: "NPC",
            objectType: "orc3",
            addedElID: "ORC#2",
            XCoord: 350,
            YCoord: 200,
            level: 3,
        });
        (0, addObjectsMain_1.addGamerOrNPC)({
            addedElType: "NPC",
            objectType: "orc3",
            addedElID: "ORC#3",
            XCoord: 350,
            YCoord: 350,
            level: 3,
        });
        (0, addObjectsMain_1.addGamerOrNPC)({
            addedElType: "NPC",
            objectType: "orc3",
            addedElID: "ORC#4",
            XCoord: 450,
            YCoord: 350,
            level: 3,
        });
        (0, addObjectsMain_1.addGamerOrNPC)({
            addedElType: "NPC",
            objectType: "orc3",
            addedElID: "ORC#5",
            XCoord: 100,
            YCoord: 260,
            level: 3,
        });
        // addGamerOrNPC("NPC", "orc3", "ORC#2", 100, 0.1, 20, 350, 200);
        // addGamerOrNPC("NPC", "orc3", "ORC#3", 100, 0.1, 20, 350, 350);
        // addGamerOrNPC("NPC", "orc3", "ORC#4", 100, 0.1, 20, 450, 350);
        // addGamerOrNPC("NPC", "orc3", "ORC#5", 100, 0.1, 20, 100, 260);
        (0, moveObjectsMain_1.moveNPCMain)(src_1.io);
    }
    console.log("Update game field");
    // console.log(game.dropObject);
    (0, addObjectsMain_1.addGamerOrNPC)({
        addedElType: "gamer",
        objectType: "gamer",
        addedElID: socketID,
        hp: 100,
        armour: 2,
        damage: 50,
        XCoord: 10,
        YCoord: 10,
    });
    gameObject_1.game.gameIsstarted = true;
    (0, DropObjectMain_1.checkDropNearUser)(src_1.io, socketID);
};
exports.createGameField = createGameField;
