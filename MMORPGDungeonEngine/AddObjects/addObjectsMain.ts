import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { getObjectCoords, setObjectInSectors } from "../MoveObjects/moveObjectsFunctions";
// import { setUserCurrentChanks } from "../MoveObjects/moveObjectsMain";

export const addGamerOrNPC = (
  addedElType: "gamer" | "NPC",
  objectType: string,
  addedElID: string,
  hp: number,
  armour: number,
  damage: number,
  XCoord?: number,
  YCoord?: number
) => {
  const numberOfGamers = addedElType === "NPC" ? 5 : Object.keys(game.users).length;

  if (addedElType === "gamer") {
    game.statObj.gamers[addedElID] = {
      baseHP: hp,
      currentHP: hp,
      currentArmour: armour,
      currentDamage: damage,
      percentHP: 100,
    };
  } else {
    game.statObj.NPC[addedElID] = {
      baseHP: hp,
      currentHP: hp,
      currentArmour: armour,
      currentDamage: damage,
      percentHP: 100,
    };
    game.NPCViewAreaCoord[addedElID] = {
      viewAreaCoord: {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 0, y: 0 },
        bottomLeft: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 },
      },
    };
  }

  game.users[addedElID] = {
    type: addedElType,
    objectType: objectType,
    getDamageStatus: false,
    imgName: `${objectType}WalkImage`,
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
          x: XCoord ? XCoord : 8 + numberOfGamers * 40,
          y: YCoord ? YCoord : 8,
        },
        topRight: {
          x: XCoord
            ? XCoord + NPCOrGamerObjectsData[objectType].widthChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: YCoord ? YCoord : 8,
        },
        bottomLeft: {
          x: XCoord ? XCoord : 8 + numberOfGamers * 40,
          y: YCoord
            ? YCoord + NPCOrGamerObjectsData[objectType].heightChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
        bottomRight: {
          x: XCoord
            ? XCoord + NPCOrGamerObjectsData[objectType].widthChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: YCoord ? YCoord : 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
      },

      currentCoord: {
        topLeft: {
          x: XCoord ? XCoord : 8 + numberOfGamers * 40,
          y: YCoord ? YCoord : 8,
        },
        topRight: {
          x: XCoord
            ? XCoord + NPCOrGamerObjectsData[objectType].widthChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: YCoord ? YCoord : 8,
        },
        bottomLeft: {
          x: XCoord ? XCoord : 8 + numberOfGamers * 40,
          y: YCoord
            ? YCoord + NPCOrGamerObjectsData[objectType].heightChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
        bottomRight: {
          x: XCoord
            ? XCoord + NPCOrGamerObjectsData[objectType].widthChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].widthChanks * 8 + numberOfGamers * 40,
          y: YCoord
            ? YCoord + NPCOrGamerObjectsData[objectType].heightChanks * 8
            : 8 + NPCOrGamerObjectsData[objectType].heightChanks * 8,
        },
      },
    },
    moveDirection: UserMoveDirections.stop,
    userRole: numberOfGamers > 0 ? "creeper" : "steve",
  };

  if (addedElType === "NPC") {
    game.users[addedElID].NPCViewDirection = UserMoveDirections.up;
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

  const objectCoords = getObjectCoords(addedElID);

  setObjectInSectors(objectCoords, addedElID);

  game.frameObj.objects[addedElID] = { idFrame: 0 };
};
