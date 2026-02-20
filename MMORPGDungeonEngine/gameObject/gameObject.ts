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

export interface IUserInventoryObj {
  id: string | undefined;
  type: string | undefined;
  imageName: string | undefined;
  XSpriteCoord: number | undefined;
  YSpriteCoord: number | undefined;
  sourceXLength: number | undefined;
  sourceYLength: number | undefined;
}

export interface IGameMain {
  gameIsstarted: boolean;
  goodPlayer?: string;
  mapSize: number;
  sectors: {
    [sectorID: string]: {
      objectsID: {
        [id: string]: {
          objectType: string;
        };
      };
    };
  };
  gameField: {
    [row: number]: {
      [col: number]: {
        // isUserChank: boolean;
        objectDataChank: {
          objectID?: string;
          isObjectChank: boolean;
          isGamerChank: boolean | null;
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
        textureObj?: {
          imageName?: string;
          XSpriteCoord?: number;
          YSpriteCoord?: number;
          sourceX?: number;
          sourceY?: number;
          heigthChanks?: number;
          widthChanks?: number;
        };
      };
    };
  };
  dropObject: {
    objectData: {
      [chanks: string]: {
        id: string;
        type: string;
        XChank?: number;
        YChank?: number;
        imageName?: string;
        XSpriteCoord?: number;
        YSpriteCoord?: number;
        sourceX?: number;
        sourceY?: number;
        heigthChanks?: number;
        widthChanks?: number;
      }[];
    };
    dropObjectSectors: {
      [sectorID: string]: {
        dropChankID: string;
        XChank: number;
        YChank: number;
      }[];
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
        XP: number;
      };
    };
    gamers: {
      [objectID: string]: {
        currentHP: number;
        baseHP: number;
        currentArmour: number;
        currentDamage: number;
        percentHP: number;
        currentLVL: number;
        currentLVLUserPoint: number;
        currentLVLMaxPoint: number;
        levelPoints: number;
      };
    };
  };

  NPCViewAreaCoord: {
    [NPCID: string]: {
      viewAreaCoord: {
        topLeft: { x: number; y: number };
        topRight: { x: number; y: number };
        bottomLeft: { x: number; y: number };
        bottomRight: { x: number; y: number };
      };
    };
  };

  NPCDataObj: {
    [NPCID: string]: {
      timeMoveDirection: number;
      timeViewCheck: number;
      NPCID: string;
      directionPointer: number;
      NPCCondition: {
        type: "observation" | "aggression";
        moveDirercion: number;
        viewDirection: number;
      };
      NPCPrepareToAttackStatus: boolean;
      aggressionGamerObj?: string;
    };
  };
  NPCUnderAttackChanksObj: {
    [NPCID: string]: {
      underAttackArea: {
        baseChankX: number;
        baseChankY: number;
        heightChanksNum: number;
        widthChanksNum: number;
      };
    };
  };

  usersInventoryAndEquipment: IGameUserMain<{
    inventory: IUserInventoryObj[];

    equipment: {
      helmet: IUserInventoryObj[];
      weapon: IUserInventoryObj[];
      shield: IUserInventoryObj[];
      armour: IUserInventoryObj[];
      boots: IUserInventoryObj[];
      ring: IUserInventoryObj[];
      amulet: IUserInventoryObj[];
    };
  }>;

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
    NPCViewDirection?: UserMoveDirections;
  }>;

  dropUsersCurrentChanks: {
    [socketID: string]: {
      chank: string;
    };
  };
}

export const game: IGameMain = {
  sectors: {},
  statObj: { NPC: {}, gamers: {} },
  gameIsstarted: false,
  usersInventoryAndEquipment: {},
  users: {},
  mapSize: 140,
  gameField: {},
  dropObject: {
    objectData: {},
    dropObjectSectors: {},
  },
  attackStatusObj: {},
  NPCUnderAttackChanksObj: {},
  NPCDataObj: {},
  NPCViewAreaCoord: {},
  frameObj: {
    mainFrame: 0,
    objects: {},
  },
  dropUsersCurrentChanks: {},
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
