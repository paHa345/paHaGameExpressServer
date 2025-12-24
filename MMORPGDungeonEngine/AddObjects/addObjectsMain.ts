import { NPCBaseStat, NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { getObjectCoords, setObjectInSectors } from "../MoveObjects/moveObjectsFunctions";
// import { setUserCurrentChanks } from "../MoveObjects/moveObjectsMain";

export const addGamerOrNPC = (addedObjectData: {
  addedElType: "gamer" | "NPC";
  objectType: "orc3" | "gamer";
  addedElID: string;
  hp?: number;
  armour?: number;
  damage?: number;
  XCoord?: number;
  YCoord?: number;
  level?: number;
}) => {
  const numberOfGamers = addedObjectData.addedElType === "NPC" ? 5 : Object.keys(game.users).length;
  const statLVLMultiplicator = addedObjectData.level ? addedObjectData.level : 1;

  if (addedObjectData.addedElType === "gamer") {
    game.statObj.gamers[addedObjectData.addedElID] = {
      baseHP: addedObjectData.hp ? addedObjectData.hp : NPCBaseStat[addedObjectData.objectType].HP,
      currentHP: addedObjectData.hp
        ? addedObjectData.hp
        : NPCBaseStat[addedObjectData.objectType].HP,
      currentArmour: addedObjectData.armour
        ? addedObjectData.armour
        : NPCBaseStat[addedObjectData.objectType].armour,
      currentDamage: addedObjectData.damage
        ? addedObjectData.damage
        : NPCBaseStat[addedObjectData.objectType].damage,
      percentHP: 100,
      currentLVL: 1,
      currentLVLUserPoint: 0,
      currentLVLMaxPoint: 10,
      levelPoints: 0,
    };
  } else {
    game.statObj.NPC[addedObjectData.addedElID] = {
      baseHP: addedObjectData.hp
        ? addedObjectData.hp + statLVLMultiplicator * 10
        : NPCBaseStat[addedObjectData.objectType].HP + statLVLMultiplicator * 10,
      currentHP: addedObjectData.hp
        ? addedObjectData.hp + statLVLMultiplicator * 10
        : NPCBaseStat[addedObjectData.objectType].HP + statLVLMultiplicator * 10,
      currentArmour: addedObjectData.armour
        ? addedObjectData.armour + statLVLMultiplicator
        : NPCBaseStat[addedObjectData.objectType].armour + statLVLMultiplicator,
      currentDamage: addedObjectData.damage
        ? addedObjectData.damage * statLVLMultiplicator
        : NPCBaseStat[addedObjectData.objectType].damage + statLVLMultiplicator,
      percentHP: 100,
      XP: NPCBaseStat[addedObjectData.objectType].XP + statLVLMultiplicator * 5,
    };

    game.NPCViewAreaCoord[addedObjectData.addedElID] = {
      viewAreaCoord: {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 0, y: 0 },
        bottomLeft: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 },
      },
    };
  }

  game.users[addedObjectData.addedElID] = {
    type: addedObjectData.addedElType,
    objectType: addedObjectData.objectType,
    getDamageStatus: false,
    imgName: `${addedObjectData.objectType}WalkImage`,
    deathAnimationStatus: false,
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
          x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
          y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
        },
        topRight: {
          x: addedObjectData.XCoord
            ? addedObjectData.XCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
            : 8 +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
              numberOfGamers * 40,
          y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
        },
        bottomLeft: {
          x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
          y: addedObjectData.YCoord
            ? addedObjectData.YCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8
            : 8 + NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
        },
        bottomRight: {
          x: addedObjectData.XCoord
            ? addedObjectData.XCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
            : 8 +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
              numberOfGamers * 40,
          y: addedObjectData.YCoord
            ? addedObjectData.YCoord
            : 8 + NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
        },
      },

      currentCoord: {
        topLeft: {
          x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
          y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
        },
        topRight: {
          x: addedObjectData.XCoord
            ? addedObjectData.XCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
            : 8 +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
              numberOfGamers * 40,
          y: addedObjectData.YCoord ? addedObjectData.YCoord : 8,
        },
        bottomLeft: {
          x: addedObjectData.XCoord ? addedObjectData.XCoord : 8 + numberOfGamers * 40,
          y: addedObjectData.YCoord
            ? addedObjectData.YCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8
            : 8 + NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
        },
        bottomRight: {
          x: addedObjectData.XCoord
            ? addedObjectData.XCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8
            : 8 +
              NPCOrGamerObjectsData[addedObjectData.objectType].widthChanks * 8 +
              numberOfGamers * 40,
          y: addedObjectData.YCoord
            ? addedObjectData.YCoord +
              NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8
            : 8 + NPCOrGamerObjectsData[addedObjectData.objectType].heightChanks * 8,
        },
      },
    },
    moveDirection: UserMoveDirections.stop,
    userRole: numberOfGamers > 0 ? "creeper" : "steve",
  };

  if (addedObjectData.addedElType === "NPC") {
    game.users[addedObjectData.addedElID].NPCViewDirection = UserMoveDirections.up;
  }

  // setUserCurrentChanks(
  //   {
  //     width: NPCOrGamerObjectsData[objectType].widthChanks,
  //     height: NPCOrGamerObjectsData[objectType].heightChanks,
  //   },
  //   addedElID
  // );

  // const bottomLeftXCoord = game.users[addedElID].square.currentCoord.bottomLeft.x;
  // const bottomRightXCoord = game.users[addedElID].square.currentCoord.bottomRight.x;
  // const topLeftXCoord = game.users[addedElID].square.currentCoord.topLeft.x;
  // const topRightXCoord = game.users[addedElID].square.currentCoord.topRight.x;
  // const bottomLeftYCoord = game.users[addedElID].square.currentCoord.bottomLeft.y;
  // const topLeftYCoord = game.users[addedElID].square.currentCoord.topLeft.y;
  // const topRightYCoord = game.users[addedElID].square.currentCoord.topRight.y;
  // const bottomRightYCoord = game.users[addedElID].square.currentCoord.bottomRight.y;

  // для каждой точки определяем в каком секторе она находится

  const objectCoords = getObjectCoords(addedObjectData.addedElID);

  setObjectInSectors(objectCoords, addedObjectData.addedElID);

  game.frameObj.objects[addedObjectData.addedElID] = { idFrame: 0 };
};
