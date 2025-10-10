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
        type?: string;
        notMove: boolean;
        coord: {
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

export const createGameField = (socketID: string) => {
  for (let i = 0; i < 25; i++) {
    const gameFieldCreatedObjRow: any = {};
    for (let j = 0; j < 50; j++) {
      gameFieldCreatedObjRow[j] = {};
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

  const numberOfGamers = Object.keys(game.users).length;

  game.users[socketID] = {
    attackStatus: { isCooldown: false },
    square: {
      prevCoord: {
        topLeft: {
          x: 10 + numberOfGamers * 40,
          y: 10,
        },
        topRight: {
          x: 10 + 32 + numberOfGamers * 40,
          y: 10,
        },
        bottomLeft: {
          x: 10 + numberOfGamers * 40,
          y: 10 + 32,
        },
        bottomRight: {
          x: 10 + 32 + numberOfGamers * 40,
          y: 10 + 32,
        },
      },

      currentCoord: {
        topLeft: {
          x: 10 + numberOfGamers * 40,
          y: 10,
        },
        topRight: {
          x: 10 + 32 + numberOfGamers * 40,
          y: 10,
        },
        bottomLeft: {
          x: 10 + numberOfGamers * 40,
          y: 10 + 32,
        },
        bottomRight: {
          x: 10 + 32 + numberOfGamers * 40,
          y: 10 + 32,
        },
      },
    },
    moveDirection: UserMoveDirections.stop,
    userRole: numberOfGamers > 0 ? "creeper" : "steve",
  };
  game.frameObj.objects[socketID] = { idFrame: 0 };
  game.gameIsstarted = true;
};
