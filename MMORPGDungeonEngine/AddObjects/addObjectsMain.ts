import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { setUserCurrentChanks } from "../MoveObjects/moveObjectsMain";

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

  setUserCurrentChanks(
    {
      width: NPCOrGamerObjectsData[objectType].widthChanks,
      height: NPCOrGamerObjectsData[objectType].heightChanks,
    },
    addedElID
  );

  game.frameObj.objects[addedElID] = { idFrame: 0 };
};
