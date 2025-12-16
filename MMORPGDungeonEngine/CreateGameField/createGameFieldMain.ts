import { io } from "../../src";
import { addGamerOrNPC } from "../AddObjects/addObjectsMain";
import { game } from "../gameObject/gameObject";
import { moveNPCMain } from "../MoveObjects/moveObjectsMain";
io;

export const createGameField = (socketID: string) => {
  if (!game.gameField[0]) {
    for (let i = 0; i < game.mapSize; i++) {
      const gameFieldCreatedObjRow: any = {};
      for (let j = 0; j < game.mapSize; j++) {
        gameFieldCreatedObjRow[j] = {
          objectDataChank: {
            isObjectChank: false,
          },
        };
      }

      game.gameField[i] = gameFieldCreatedObjRow;
    }

    const createGameFieldSectors = () => {
      for (let i = 0; i < game.mapSize / 20; i++) {
        for (let j = 0; j < game.mapSize / 20; j++) {
          game.sectors[`${i}${j}`] = {
            objectsID: {},
          };
        }
      }
    };

    createGameFieldSectors();

    const createBackgroundObjectTextureHomogenous = (
      XChank: number,
      YChank: number,
      XSpriteCoord: number,
      YSpriteCoord: number,
      sourceX: number,
      sourceY: number,
      heightChanks: number,
      widthChanks: number,
      objectType: string,
      imageName: string,
      impenetrableStatus: boolean
    ) => {
      game.gameField[XChank][YChank].textureObj = {};
      game.gameField[XChank][YChank].textureObj.imageName = imageName;
      game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
      game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
      game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
      game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
      game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
      game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;

      for (let i = 0; i < widthChanks; i++) {
        for (let j = 0; j < heightChanks; j++) {
          game.gameField[XChank + i][YChank + j].type = objectType;

          game.gameField[XChank + i][YChank + j].notMove = impenetrableStatus;

          game.gameField[XChank + i][YChank + j].coord = {
            topLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) },
            topRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) },
            bottomLeft: { x: 8 * (XChank + i), y: 8 * (YChank + j) + 8 },
            bottomRight: { x: 8 * (XChank + i) + 8, y: 8 * (YChank + j) + 8 },
          };
        }
      }
    };

    createBackgroundObjectTextureHomogenous(
      10,
      10,
      0,
      0,
      64,
      64,
      4,
      4,
      "stone",
      "rocksAndStones",
      true
    );
    createBackgroundObjectTextureHomogenous(
      14,
      10,
      0,
      0,
      64,
      64,
      4,
      4,
      "stone",
      "rocksAndStones",
      true
    );
    createBackgroundObjectTextureHomogenous(
      18,
      10,
      64,
      0,
      64,
      64,
      4,
      4,
      "stone",
      "rocksAndStones",
      true
    );
    createBackgroundObjectTextureHomogenous(
      18,
      14,
      0,
      64,
      64,
      64,
      4,
      4,
      "stone",
      "rocksAndStones",
      true
    );
    createBackgroundObjectTextureHomogenous(
      18,
      18,
      0,
      64,
      64,
      64,
      4,
      4,
      "stone",
      "rocksAndStones",
      true
    );
    createBackgroundObjectTextureHomogenous(
      18,
      22,
      0,
      64,
      64,
      64,
      4,
      4,
      "stone",
      "rocksAndStones",
      true
    );

    createBackgroundObjectTextureHomogenous(
      30,
      30,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      30,
      34,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      30,
      38,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      30,
      42,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      30,
      46,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      30,
      50,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      31,
      54,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      32,
      58,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      34,
      62,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      36,
      66,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      40,
      66,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      44,
      66,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      48,
      66,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );
    createBackgroundObjectTextureHomogenous(
      52,
      66,
      8,
      135,
      24,
      24,
      4,
      4,
      "road",
      "roadTile",
      false
    );

    createBackgroundObjectTextureHomogenous(50, 100, 0, 497, 35, 35, 5, 5, "pit", "exterior", true);
    createBackgroundObjectTextureHomogenous(
      45,
      100,
      101,
      517,
      25,
      25,
      3,
      3,
      "mushroom",
      "exterior",
      true
    );

    const createBackgroundObjectTreeTexture = (
      XChank: number,
      YChank: number,
      XSpriteCoord: number,
      YSpriteCoord: number,
      sourceX: number,
      sourceY: number,
      heightChanks: number,
      widthChanks: number,
      objectType: string,
      imageName: string
    ) => {
      game.gameField[XChank][YChank].textureObj = {};
      game.gameField[XChank][YChank].textureObj.imageName = imageName;
      game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
      game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;
      game.gameField[XChank][YChank].textureObj.sourceX = sourceX;
      game.gameField[XChank][YChank].textureObj.sourceY = sourceY;
      game.gameField[XChank][YChank].textureObj.heigthChanks = heightChanks;
      game.gameField[XChank][YChank].textureObj.widthChanks = widthChanks;

      if (objectType === "tree") {
        for (let i = 0; i < widthChanks; i++) {
          for (let j = 0; j < heightChanks; j++) {
            game.gameField[XChank + i][YChank + j].type = objectType;

            if (j >= 1 && j <= 5 && i >= 6) {
              game.gameField[XChank + i][YChank + j].notMove = true;
            }
            game.gameField[XChank + i][YChank + j].coord = {
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
            game.gameField[XChank + i][YChank + j].type = objectType;

            if (i >= 8) {
              game.gameField[XChank + i][YChank + j].notMove = true;
            }
            game.gameField[XChank + i][YChank + j].coord = {
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

    addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20, 200, 200);
    addGamerOrNPC("NPC", "orc3", "ORC#2", 100, 0.1, 20, 350, 200);
    addGamerOrNPC("NPC", "orc3", "ORC#3", 100, 0.1, 20, 350, 350);
    addGamerOrNPC("NPC", "orc3", "ORC#4", 100, 0.1, 20, 450, 350);
    addGamerOrNPC("NPC", "orc3", "ORC#5", 100, 0.1, 20, 100, 260);
    moveNPCMain(io);
    // moveNPC("ORC#1", "orc3");
    // moveNPC("ORC#2", "orc3");
    // moveNPC("ORC#3", "orc3");
    // moveNPC("ORC#4", "orc3");
    // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
    // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
  }
  addGamerOrNPC("gamer", "gamer", socketID, 100, 0.2, 10, 10, 10);

  game.gameIsstarted = true;
};
