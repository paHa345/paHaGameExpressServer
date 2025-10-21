import { NPCOrGamerObjectsData } from "../types";

export enum UserMoveDirections {
  right = "right",
  down = "down",
  up = "up",
  left = "left",
  stop = "stop",
}

export interface IGameUserMain<T> {
  [socketID: string]: T;
}

export interface IGameMain {
  gameIsstarted: boolean;
  goodPlayer?: string;
  gameField: {
    [row: number]: {
      [col: number]: {
        // isUserChank: boolean;
        objectDataChank: {
          objectID?: string;
          isObjectChank: boolean;
        };
        type?: string;
        notMove: boolean;
        chankUnderAttack: boolean;
        coord?: {
          topLeft: { x: number; y: number };
          topRight: { x: number; y: number };
          bottomLeft: { x: number; y: number };
          bottomRight: { x: number; y: number };
        };
      };
    };
  };
  frameObj: {
    mainFrame: number;
    objects: {
      [id: string]: {
        idFrame: number;
      };
    };
  };
  attackStatusObj: {
    [objectID: string]: {
      time?: number | undefined;
      isCooldown: boolean;
      isActive: boolean;
    };
  };
  users: IGameUserMain<{
    type: "gamer" | "NPC";
    objectType: string;
    square: {
      prevCoord: {
        topLeft: {
          x: number;
          y: number;
        };
        topRight: {
          x: number;
          y: number;
        };
        bottomLeft: {
          x: number;
          y: number;
        };
        bottomRight: {
          x: number;
          y: number;
        };
      };
      currentCoord: {
        topLeft: {
          x: number;
          y: number;
        };
        topRight: {
          x: number;
          y: number;
        };
        bottomLeft: {
          x: number;
          y: number;
        };
        bottomRight: {
          x: number;
          y: number;
        };
      };
    };
    chanks: {
      topChanks?: { [coord: string]: { x: number; y: number } };
      bottomChanks?: { [coord: string]: { x: number; y: number } };
      rightChanks?: { [coord: string]: { x: number; y: number } };
      leftChanks?: { [coord: string]: { x: number; y: number } };
    };
    userRole: string;
    attackStatus: { time?: number; isCooldown: boolean };
    moveDirection: UserMoveDirections;
  }>;
}

export const game: IGameMain = {
  gameIsstarted: false,
  users: {},
  gameField: {},
  attackStatusObj: {},
  frameObj: {
    mainFrame: 0,
    objects: {},
  },
};

const addGamerOrNPC = (addedElType: "gamer" | "NPC", objectType: string, addedElID: string) => {
  const numberOfGamers = addedElType === "NPC" ? 5 : Object.keys(game.users).length;

  console.log(NPCOrGamerObjectsData[objectType].heightChanks);

  game.users[addedElID] = {
    type: addedElType,
    objectType: objectType,
    chanks: {
      topChanks: {},
      bottomChanks: {},
      rightChanks: {},
      leftChanks: {},
    },
    attackStatus: { isCooldown: false },
    square: {
      prevCoord: {
        topLeft: {
          x: 8 + numberOfGamers * 40,
          y: 8,
        },
        topRight: {
          x: 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: 8,
        },
        bottomLeft: {
          x: 8 + numberOfGamers * 40,
          y: 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
        bottomRight: {
          x: 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
      },

      currentCoord: {
        topLeft: {
          x: 8 + numberOfGamers * 40,
          y: 8,
        },
        topRight: {
          x: 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: 8,
        },
        bottomLeft: {
          x: 8 + numberOfGamers * 40,
          y: 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
        bottomRight: {
          x: 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
      },
    },
    moveDirection: UserMoveDirections.stop,
    userRole: numberOfGamers > 0 ? "creeper" : "steve",
  };

  setUserCurrentChanks(
    {
      width: NPCOrGamerObjectsData[objectType].widthChanks,
      height: NPCOrGamerObjectsData[objectType].heightChanks,
    },
    addedElID
  );

  game.frameObj.objects[addedElID] = { idFrame: 0 };
};

export const createGameField = (socketID: string) => {
  if (!game.gameField[0]) {
    for (let i = 0; i < 50; i++) {
      const gameFieldCreatedObjRow: any = {};
      for (let j = 0; j < 50; j++) {
        gameFieldCreatedObjRow[j] = {
          objectDataChank: {
            isObjectChank: false,
          },
        };
      }

      game.gameField[i] = gameFieldCreatedObjRow;
    }

    game.gameField[10][10].type = "stone";
    game.gameField[10][10].notMove = true;
    game.gameField[10][10].coord = {
      topLeft: { x: 8 * 10, y: 8 * 10 },
      topRight: { x: 8 * 10 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 10, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[10][11].type = "stone";
    game.gameField[10][11].notMove = true;

    game.gameField[10][11].coord = {
      topLeft: { x: 8 * 10, y: 8 * 11 },
      topRight: { x: 8 * 10 + 8, y: 8 * 11 },
      bottomLeft: { x: 8 * 10, y: 8 * 11 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 11 + 8 },
    };
    game.gameField[10][12].type = "stone";
    game.gameField[10][12].notMove = true;

    game.gameField[10][12].coord = {
      topLeft: { x: 8 * 10, y: 8 * 12 },
      topRight: { x: 8 * 10 + 8, y: 8 * 12 },
      bottomLeft: { x: 8 * 10, y: 8 * 12 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 12 + 8 },
    };
    game.gameField[10][13].type = "stone";
    game.gameField[10][13].notMove = true;

    game.gameField[10][13].coord = {
      topLeft: { x: 8 * 10, y: 8 * 13 },
      topRight: { x: 8 * 10 + 8, y: 8 * 13 },
      bottomLeft: { x: 8 * 10, y: 8 * 13 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 13 + 8 },
    };
    game.gameField[10][14].type = "stone";
    game.gameField[10][14].notMove = true;
    game.gameField[10][14].coord = {
      topLeft: { x: 8 * 10, y: 8 * 14 },
      topRight: { x: 8 * 10 + 8, y: 8 * 14 },
      bottomLeft: { x: 8 * 10, y: 8 * 14 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 14 + 8 },
    };
    game.gameField[10][15].type = "stone";
    game.gameField[10][15].notMove = true;
    game.gameField[10][15].coord = {
      topLeft: { x: 8 * 10, y: 8 * 15 },
      topRight: { x: 8 * 10 + 8, y: 8 * 15 },
      bottomLeft: { x: 8 * 10, y: 8 * 15 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 15 + 8 },
    };
    game.gameField[11][10].type = "stone";
    game.gameField[11][10].notMove = true;
    game.gameField[11][10].coord = {
      topLeft: { x: 8 * 11, y: 8 * 10 },
      topRight: { x: 8 * 11 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 11, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 11 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[12][10].type = "stone";
    game.gameField[12][10].notMove = true;
    game.gameField[12][10].coord = {
      topLeft: { x: 8 * 12, y: 8 * 10 },
      topRight: { x: 8 * 12 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 12, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 12 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[13][10].type = "stone";
    game.gameField[13][10].notMove = true;
    game.gameField[13][10].coord = {
      topLeft: { x: 8 * 13, y: 8 * 10 },
      topRight: { x: 8 * 13 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 13, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 13 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[14][10].type = "stone";
    game.gameField[14][10].notMove = true;
    game.gameField[14][10].coord = {
      topLeft: { x: 8 * 14, y: 8 * 10 },
      topRight: { x: 8 * 14 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 14, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 14 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[15][10].type = "stone";
    game.gameField[15][10].notMove = true;
    game.gameField[15][10].coord = {
      topLeft: { x: 8 * 15, y: 8 * 10 },
      topRight: { x: 8 * 15 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 15, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 15 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[16][10].type = "stone";
    game.gameField[16][10].notMove = true;
    game.gameField[16][10].coord = {
      topLeft: { x: 8 * 16, y: 8 * 10 },
      topRight: { x: 8 * 16 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 16, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 16 + 8, y: 8 * 10 + 8 },
    };

    game.gameField[4][10].type = "stone";
    game.gameField[4][10].notMove = true;
    game.gameField[4][10].coord = {
      topLeft: { x: 8 * 4, y: 8 * 10 },
      topRight: { x: 8 * 4 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 4, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[4][11].type = "stone";
    game.gameField[4][11].notMove = true;
    game.gameField[4][11].coord = {
      topLeft: { x: 8 * 4, y: 8 * 11 },
      topRight: { x: 8 * 4 + 8, y: 8 * 11 },
      bottomLeft: { x: 8 * 4, y: 8 * 11 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 11 + 8 },
    };
    game.gameField[4][12].type = "stone";
    game.gameField[4][12].notMove = true;
    game.gameField[4][12].coord = {
      topLeft: { x: 8 * 4, y: 8 * 12 },
      topRight: { x: 8 * 4 + 8, y: 8 * 12 },
      bottomLeft: { x: 8 * 4, y: 8 * 12 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 12 + 8 },
    };
    game.gameField[4][13].type = "stone";
    game.gameField[4][13].notMove = true;
    game.gameField[4][13].coord = {
      topLeft: { x: 8 * 4, y: 8 * 13 },
      topRight: { x: 8 * 4 + 8, y: 8 * 13 },
      bottomLeft: { x: 8 * 4, y: 8 * 13 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 13 + 8 },
    };

    addGamerOrNPC("NPC", "orc3", "ORC#1");
  }
  addGamerOrNPC("gamer", "gamer", socketID);

  game.gameIsstarted = true;
};

//функция перезаписи текущей позиции в чанки
export const setUserCurrentChanks = (
  chanksQuantity: { width: number; height: number },
  socketID: string,
  direction?: UserMoveDirections
) => {
  if (!game.users[socketID]) {
    return;
  }
  const prevTopLeftXChank = Math.floor(game.users[socketID].square.prevCoord.topLeft.x / 8);
  const prevTopLeftYChank = Math.floor(game.users[socketID].square.prevCoord.topLeft.y / 8);
  const prevBottomLeftXChank = Math.floor(game.users[socketID].square.prevCoord.bottomLeft.x / 8);
  const prevBottomLeftYChank = Math.floor(game.users[socketID].square.prevCoord.bottomLeft.y / 8);
  const prevTopRightXChank = Math.floor(game.users[socketID].square.prevCoord.topRight.x / 8);
  const prevTopRightYChank = Math.floor(game.users[socketID].square.prevCoord.topRight.y / 8);

  const topLeftXChank = Math.floor(game.users[socketID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[socketID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(game.users[socketID].square.currentCoord.bottomLeft.x / 8);
  const bottomLeftYChank = Math.floor(game.users[socketID].square.currentCoord.bottomLeft.y / 8);
  const topRightXChank = Math.floor(game.users[socketID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[socketID].square.currentCoord.topRight.y / 8);

  for (let i = 0; i <= chanksQuantity.width; i++) {
    if (direction === UserMoveDirections.down) {
      game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
    game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };
    if (direction === UserMoveDirections.up) {
      game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
    game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };
  }

  for (let i = 0; i < chanksQuantity.height; i++) {
    game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };

    if (direction === UserMoveDirections.right) {
      game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
    game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };
    if (direction === UserMoveDirections.left) {
      game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
  }
};

export const increaseFrameNumber = () => {
  if (game.frameObj.mainFrame === 5) {
    game.frameObj.mainFrame = 0;
    // for (const key in state.frameObj.objects) {
    //   state.frameObj.objects[key].idFrame = 0;
    // }
  } else {
    game.frameObj.mainFrame = game.frameObj.mainFrame + 1;
    // for (const key in state.frameObj.objects) {
    //   state.frameObj.objects[key].idFrame = state.frameObj.mainFrame;
    // }
  }
};

let moveClientSquare;

export const moveNPC = () => {
  let timeCurrent: any;
  let timePrev;

  moveClientSquare = setInterval(() => {
    if (!timeCurrent) {
      timeCurrent = Date.now();
      timePrev = Date.now() - 33;
    } else {
      timePrev = timeCurrent;
      timeCurrent = Date.now();
    }
    const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 20);
    // setClientCoordinates({ ...clientData, shiftUserPixels });
  }, 33);
};

export const setClientCoordinates = (
  objectType: string,
  objectID: string,
  clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  }
) => {
  if (game.users[objectID]) {
    game.users[objectID].square.prevCoord = JSON.parse(
      JSON.stringify(game.users[objectID].square.currentCoord)
    );
  }

  const setMoveCoord = () => {
    if (clientData.direction === UserMoveDirections.down) {
      game.users[objectID].square.currentCoord.bottomLeft.y =
        game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.y =
        game.users[objectID].square.currentCoord.bottomRight.y + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.y =
        game.users[objectID].square.currentCoord.topLeft.y + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.y =
        game.users[objectID].square.currentCoord.topRight.y + clientData.shiftUserPixels;
    }
    if (clientData.direction === UserMoveDirections.left) {
      game.users[objectID].square.currentCoord.bottomLeft.x =
        game.users[objectID].square.currentCoord.bottomLeft.x - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.x =
        game.users[objectID].square.currentCoord.bottomRight.x - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.x =
        game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.x =
        game.users[objectID].square.currentCoord.topRight.x - clientData.shiftUserPixels;
    }
    if (clientData.direction === UserMoveDirections.right) {
      game.users[objectID].square.currentCoord.bottomLeft.x =
        game.users[objectID].square.currentCoord.bottomLeft.x + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.x =
        game.users[objectID].square.currentCoord.bottomRight.x + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.x =
        game.users[objectID].square.currentCoord.topLeft.x + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.x =
        game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels;
    }
    if (clientData.direction === UserMoveDirections.up) {
      game.users[objectID].square.currentCoord.bottomLeft.y =
        game.users[objectID].square.currentCoord.bottomLeft.y - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.y =
        game.users[objectID].square.currentCoord.bottomRight.y - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.y =
        game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.y =
        game.users[objectID].square.currentCoord.topRight.y - clientData.shiftUserPixels;
    }
  };

  const setCurrentCoord = function (clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  }) {
    if (!game.users[objectID]) return;

    game.users[objectID].moveDirection = clientData.direction;
    if (clientData.direction === UserMoveDirections.down) {
      // смотрим чанки, на которые хотим встать

      game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels > 300 ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.bottomLeft.y =
            game.users[objectID].square.currentCoord.bottomLeft.y)
        : setMoveCoord();
    }
    if (clientData.direction === UserMoveDirections.left) {
      game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels < 0 ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topLeft.y + 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.bottomLeft.y - 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topLeft.x - 8) / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomLeft.x - 8) / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.topLeft.x =
            game.users[objectID].square.currentCoord.topLeft.x)
        : setMoveCoord();
    }
    if (clientData.direction === UserMoveDirections.right) {
      // console.log(
      //   game.gameField[Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8)][
      //     Math.floor((game.users[objectID].square.currentCoord.topRight.x + 8) / 8)
      //   ]?.objectDataChank.isObjectChank
      // );

      game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels > 300 ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topRight.y + 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.bottomRight.y - 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.bottomRight.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topRight.x + 8) / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomRight.x + 8) / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.topRight.x =
            game.users[objectID].square.currentCoord.topRight.x)
        : setMoveCoord();
    }
    if (clientData.direction === UserMoveDirections.up) {
      if (Math.floor((game.users[objectID].square.currentCoord.topLeft.y - 13) / 8) < 0) {
        return;
      }

      game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels < 0 ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topLeft.x + 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topRight.x - 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.topLeft.y =
            game.users[objectID].square.currentCoord.topLeft.y)
        : setMoveCoord();
    }
  };

  setCurrentCoord(clientData);

  setUserCurrentChanks(
    {
      height: NPCOrGamerObjectsData[objectType].heightChanks,
      width: NPCOrGamerObjectsData[objectType].widthChanks,
    },
    objectID,
    clientData.direction
  );

  // io.of("/").to(clientData.roomID).emit("serverMove", game.users);
};

export const getChanksUnderAttack = (direction: UserMoveDirections, objectID: string) => {
  const topLeftXChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8);
  const bottomLeftYChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8);
  const topRightXChank = Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8);

  const objectUnderAttack: { [objectID: string]: number } = {};

  const chanksUnderAttack: { row: number; col: number }[] = [];

  const addUnderAttackObjectsAndChunksArr = (
    underAttackChankObjectID: string | undefined,
    row: number,
    col: number
  ) => {
    chanksUnderAttack.push({ row: row, col: col });
    if (underAttackChankObjectID) {
      objectUnderAttack[underAttackChankObjectID] = 1;
    }
  };

  if (direction === UserMoveDirections.up || direction === UserMoveDirections.stop) {
    for (let i = 0; i <= NPCOrGamerObjectsData[game.users[objectID].objectType].widthChanks; i++) {
      game.gameField[topLeftYChank - 1][topLeftXChank + i].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[topLeftYChank - 1][topLeftXChank + i].objectDataChank.objectID,
        topLeftYChank - 1,
        topLeftXChank + i
      );
    }
  }
  if (direction === UserMoveDirections.down) {
    for (let i = 0; i <= NPCOrGamerObjectsData[game.users[objectID].objectType].widthChanks; i++) {
      game.gameField[bottomLeftYChank][bottomLeftXChank + i].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[bottomLeftYChank][bottomLeftXChank + i].objectDataChank.objectID,
        bottomLeftYChank,
        bottomLeftXChank + i
      );
    }
  }
  if (direction === UserMoveDirections.left) {
    for (let i = 0; i < NPCOrGamerObjectsData[game.users[objectID].objectType].heightChanks; i++) {
      game.gameField[topLeftYChank + i][topLeftXChank - 1].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[topLeftYChank + i][topLeftXChank - 1].objectDataChank.objectID,
        topLeftYChank + i,
        topLeftXChank - 1
      );
    }
  }
  if (direction === UserMoveDirections.right) {
    for (let i = 0; i < NPCOrGamerObjectsData[game.users[objectID].objectType].heightChanks; i++) {
      game.gameField[topRightYChank + i][topRightXChank + 1].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[topRightYChank + i][topRightXChank + 1].objectDataChank.objectID,
        topRightYChank + i,
        topRightXChank + 1
      );
    }
  }

  for (const objectID in objectUnderAttack) {
    console.log(objectID);
  }

  setTimeout(() => {
    chanksUnderAttack.map((chank) => {
      game.gameField[chank.row][chank.col].chankUnderAttack = false;
    });
  }, 600);
};
