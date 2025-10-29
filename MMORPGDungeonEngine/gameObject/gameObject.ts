import { DefaultEventsMap, Server, Socket } from "socket.io";
import { ImageNames, NPCOrGamerObjectsData } from "../../types";

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
  statObj: {
    NPC: {
      [objectID: string]: {
        currentHP: number;
        baseHP: number;
        currentArmour: number;
        currentDamage: number;
        percentHP: number;
      };
    };
    gamers: {
      [objectID: string]: {
        currentHP: number;
        baseHP: number;
        currentArmour: number;
        currentDamage: number;
        percentHP: number;
      };
    };
  };
  users: IGameUserMain<{
    type: "gamer" | "NPC";
    objectType: string;
    getDamageStatus: boolean;
    imgName: string;
    deathAnimationStatus: boolean;

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
  statObj: { NPC: {}, gamers: {} },
  gameIsstarted: false,
  users: {},
  gameField: {},
  attackStatusObj: {},
  frameObj: {
    mainFrame: 0,
    objects: {},
  },
};

//функция перезаписи текущей позиции в чанки

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
