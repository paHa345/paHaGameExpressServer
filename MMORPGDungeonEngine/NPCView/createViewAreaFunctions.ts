import { game, UserMoveDirections } from "../gameObject/gameObject";
import { getObjectCoords } from "../MoveObjects/moveObjectsFunctions";

export const createNPCViewArea = (NPCID: string) => {
  if (!game.users[NPCID]) {
    return;
  }

  const NPCCoords = getObjectCoords(NPCID);
  // create view area

  if (
    game.users[NPCID].NPCViewDirection === UserMoveDirections.up ||
    game.users[NPCID].NPCViewDirection === UserMoveDirections.stop
  ) {
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
      x: NPCCoords.topLeftXCoord - 16 < 0 ? 0 : NPCCoords.topLeftXCoord - 16,
      y: NPCCoords.topLeftYCoord - 32 < 0 ? 0 : NPCCoords.topLeftYCoord - 32,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
      x:
        NPCCoords.topRightXCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.topRightXCoord + 16,
      y: NPCCoords.topRightYCoord - 32 < 0 ? 0 : NPCCoords.topRightYCoord - 32,
    };
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
      x: NPCCoords.bottomLeftXCoord - 16 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 16,
      y: NPCCoords.topLeftYCoord,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
      x:
        NPCCoords.bottomRightXCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomRightXCoord + 16,
      y: NPCCoords.topRightYCoord,
    };
  }
  if (game.users[NPCID].NPCViewDirection === UserMoveDirections.down) {
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
      x: NPCCoords.bottomLeftXCoord - 16 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 16,
      y: NPCCoords.bottomLeftYCoord,
    };
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
      x:
        NPCCoords.bottomRightXCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomRightXCoord + 16,

      y: NPCCoords.bottomRightYCoord,
    };
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
      x: NPCCoords.bottomLeftXCoord - 16 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 16,
      y:
        NPCCoords.bottomLeftYCoord + 32 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomLeftYCoord + 32,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
      x:
        NPCCoords.bottomRightXCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomRightXCoord + 16,
      y:
        NPCCoords.bottomLeftYCoord + 32 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomLeftYCoord + 32,
    };
  }

  if (game.users[NPCID].NPCViewDirection === UserMoveDirections.left) {
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
      x: NPCCoords.topLeftXCoord - 32 < 0 ? 0 : NPCCoords.topLeftXCoord - 32,
      y: NPCCoords.topLeftYCoord - 16 < 0 ? 0 : NPCCoords.topLeftYCoord - 16,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
      x: NPCCoords.topLeftXCoord,
      y: NPCCoords.topLeftYCoord - 16 < 0 ? 0 : NPCCoords.topLeftYCoord - 16,
    };
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
      x: NPCCoords.bottomLeftXCoord - 32 < 0 ? 0 : NPCCoords.bottomLeftXCoord - 32,
      y:
        NPCCoords.bottomLeftYCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomLeftYCoord + 16,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
      x: NPCCoords.bottomLeftXCoord,
      y:
        NPCCoords.bottomLeftYCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomLeftYCoord + 16,
    };
  }
  if (game.users[NPCID].NPCViewDirection === UserMoveDirections.right) {
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topLeft = {
      x: NPCCoords.topRightXCoord,
      y: NPCCoords.topRightYCoord - 16 < 0 ? 0 : NPCCoords.topRightYCoord - 16,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.topRight = {
      x:
        NPCCoords.topRightXCoord + 32 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.topRightXCoord + 32,
      y: NPCCoords.topRightYCoord - 16 < 0 ? 0 : NPCCoords.topRightYCoord - 16,
    };
    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomLeft = {
      x: NPCCoords.bottomRightXCoord,
      y:
        NPCCoords.bottomRightYCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomRightYCoord + 16,
    };

    game.NPCViewAreaCoord[NPCID].viewAreaCoord.bottomRight = {
      x:
        NPCCoords.bottomRightXCoord + 32 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomRightXCoord + 32,
      y:
        NPCCoords.bottomRightYCoord + 16 > (game.mapSize - 1) * 8
          ? (game.mapSize - 1) * 8
          : NPCCoords.bottomRightYCoord + 16,
    };
  }
};

export const getViewAreaSectorsAndObjects = (
  NPCID: string,
  underAttackSectorsAndObjects: {
    sectors: { [sectorName: string]: { value: number } };
    objects: {
      [id: string]: {
        value: number;
      };
    };
  }
) => {
  for (const [key, coords] of Object.entries(game.NPCViewAreaCoord[NPCID].viewAreaCoord)) {
    // console.log(`${key}: ${value}`);
    if (
      underAttackSectorsAndObjects.sectors[
        `${Math.floor(coords.y / (20 * 8))}${Math.floor(coords.x / (20 * 8))}`
      ]
    )
      continue;

    underAttackSectorsAndObjects.sectors[
      `${Math.floor(coords.y / (20 * 8))}${Math.floor(coords.x / (20 * 8))}`
    ] = { value: 1 };

    for (const viewAreaObject in game.sectors[
      `${Math.floor(coords.y / (20 * 8))}${Math.floor(coords.x / (20 * 8))}`
    ].objectsID) {
      if (underAttackSectorsAndObjects.objects[viewAreaObject]) continue;
      if (viewAreaObject === NPCID) continue;
      underAttackSectorsAndObjects.objects[viewAreaObject] = { value: 1 };
    }
  }
};

export const getCollision = (
  object1: {
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
  },
  object2: {
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
  }
) => {
  if (
    object1.topLeft.x < object2.topLeft.x + (object2.topRight.x - object2.topLeft.x) &&
    object1.topLeft.x + (object1.topRight.x - object1.topLeft.x) > object2.topLeft.x &&
    object1.topLeft.y < object2.topLeft.y + (object2.bottomLeft.y - object2.topLeft.y) &&
    object1.topLeft.y + (object1.bottomLeft.y - object1.topLeft.y) > object2.topLeft.y
  ) {
    return true;
  }
  return false;
};

export const getObjectsInViewArea = (
  underAttackSectorsAndObjects: {
    sectors: { [sectorName: string]: { value: number } };
    objects: {
      [id: string]: {
        value: number;
      };
    };
  },
  NPCID: string
) => {
  for (const objectID in underAttackSectorsAndObjects.objects) {
    // get collision object with view area
    console.log(game.NPCViewAreaCoord[NPCID].viewAreaCoord);
    if (
      getCollision(
        game.users[objectID].square.currentCoord,
        game.NPCViewAreaCoord[NPCID].viewAreaCoord
      )
    ) {
      console.log("Get collision");
      console.log(Date.now());
    }
  }
};
