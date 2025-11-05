import { addGamerOrNPC } from "../AddObjects/addObjectsMain";
import { game } from "../gameObject/gameObject";
import { moveNPC } from "../MoveObjects/moveObjectsMain";

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

    const createStoneTexture = (
      XChank: number,
      YChank: number,
      XSpriteCoord: number,
      YSpriteCoord: number
    ) => {
      game.gameField[XChank][YChank].textureObj = {};
      game.gameField[XChank][YChank].textureObj.imageName = "rocksAndStones";
      game.gameField[XChank][YChank].textureObj.XSpriteCoord = XSpriteCoord;
      game.gameField[XChank][YChank].textureObj.YSpriteCoord = YSpriteCoord;

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          game.gameField[XChank + i][YChank + j].type = "stone";

          game.gameField[XChank + i][YChank + j].notMove = true;
          game.gameField[XChank + i][YChank + j].coord = {
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

    addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20, 200, 200);
    addGamerOrNPC("NPC", "orc3", "ORC#2", 100, 0.1, 20, 350, 200);
    addGamerOrNPC("NPC", "orc3", "ORC#3", 100, 0.1, 20, 350, 350);
    addGamerOrNPC("NPC", "orc3", "ORC#4", 100, 0.1, 20, 450, 350);
    moveNPC("ORC#1", "orc3");
    moveNPC("ORC#2", "orc3");
    moveNPC("ORC#3", "orc3");
    moveNPC("ORC#4", "orc3");
    // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
    // addGamerOrNPC("NPC", "orc3", "ORC#1", 100, 0.1, 20);
  }
  addGamerOrNPC("gamer", "gamer", socketID, 100, 0.2, 10);

  game.gameIsstarted = true;
};
