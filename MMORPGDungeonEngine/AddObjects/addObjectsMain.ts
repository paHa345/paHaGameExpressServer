import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { setUserCurrentChanks } from "../MoveObjects/moveObjectsMain";

export const addGamerOrNPC = (
  addedElType: "gamer" | "NPC",
  objectType: string,
  addedElID: string,
  hp: number,
  armour: number,
  damage: number
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
