import { current } from "@reduxjs/toolkit";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import {
  getDownMOveIntersectionObjects,
  getLeftMoveIntersectionObjects,
  getRightMoveIntersectionObjects,
  getUpMoveIntersectionObjects,
} from "./getIntersectionObjectsFunctions";

export const getObjectCoords = (objectID: string) => {
  return {
    bottomLeftXCoord: game.users[objectID].square.currentCoord.bottomLeft.x,
    bottomRightXCoord: game.users[objectID].square.currentCoord.bottomRight.x,
    topLeftXCoord: game.users[objectID].square.currentCoord.topLeft.x,
    topRightXCoord: game.users[objectID].square.currentCoord.topRight.x,
    bottomLeftYCoord: game.users[objectID].square.currentCoord.bottomLeft.y,
    topLeftYCoord: game.users[objectID].square.currentCoord.topLeft.y,
    topRightYCoord: game.users[objectID].square.currentCoord.topRight.y,
    bottomRightYCoord: game.users[objectID].square.currentCoord.bottomRight.y,
  };
};

export const setMoveCoord = (
  clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  },
  objectID: string,
  objectoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  }
) => {
  if (clientData.direction === UserMoveDirections.down) {
    game.users[objectID].square.currentCoord.bottomLeft.y =
      objectoords.bottomLeftYCoord + clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.bottomRight.y =
      objectoords.bottomRightYCoord + clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topLeft.y =
      objectoords.topLeftYCoord + clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topRight.y =
      objectoords.topRightYCoord + clientData.shiftUserPixels;
  }
  if (clientData.direction === UserMoveDirections.up) {
    game.users[objectID].square.currentCoord.bottomLeft.y =
      objectoords.bottomLeftYCoord - clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.bottomRight.y =
      objectoords.bottomRightYCoord - clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topLeft.y =
      objectoords.topLeftYCoord - clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topRight.y =
      objectoords.topRightYCoord - clientData.shiftUserPixels;
  }
  if (clientData.direction === UserMoveDirections.left) {
    game.users[objectID].square.currentCoord.bottomLeft.x =
      objectoords.bottomLeftXCoord - clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.bottomRight.x =
      objectoords.bottomRightXCoord - clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topLeft.x =
      objectoords.topLeftXCoord - clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topRight.x =
      objectoords.topRightXCoord - clientData.shiftUserPixels;
  }
  if (clientData.direction === UserMoveDirections.right) {
    game.users[objectID].square.currentCoord.bottomLeft.x =
      objectoords.bottomLeftXCoord + clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.bottomRight.x =
      objectoords.bottomRightXCoord + clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topLeft.x =
      objectoords.topLeftXCoord + clientData.shiftUserPixels;
    game.users[objectID].square.currentCoord.topRight.x =
      objectoords.topRightXCoord + clientData.shiftUserPixels;
  }
};

export const setObjectInSectors = (
  objectoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  objectID: string
) => {
  game.sectors[
    `${Math.floor(objectoords.topLeftYCoord / (20 * 8))}${Math.floor(
      objectoords.topLeftXCoord / (20 * 8)
    )}`
  ].objectsID[objectID] = {
    objectType: "object",
  };
  game.sectors[
    `${Math.floor(objectoords.topRightYCoord / (20 * 8))}${Math.floor(
      objectoords.topRightXCoord / (20 * 8)
    )}`
  ].objectsID[objectID] = {
    objectType: "object",
  };

  game.sectors[
    `${Math.floor(objectoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
      objectoords.bottomLeftXCoord / (20 * 8)
    )}`
  ].objectsID[objectID] = {
    objectType: "object",
  };

  game.sectors[
    `${Math.floor(objectoords.bottomRightYCoord / (20 * 8))}${Math.floor(
      objectoords.bottomRightXCoord / (20 * 8)
    )}`
  ].objectsID[objectID] = {
    objectType: "object",
  };
};

export const setAndDeleteObjectsFromSectors = (
  prevCoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  coordsAfterMove: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  objectID: string
) => {
  if (game.users[objectID].moveDirection === UserMoveDirections.right) {
    // смотрим правые точки X координаты

    if (
      `${Math.floor(prevCoords.topRightXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topRightXCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.topRightXCoord / (20 * 8)
        )}`
      ].objectsID[objectID] = { objectType: `${objectID}` };
    }

    if (
      `${Math.floor(prevCoords.bottomRightXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomRightXCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.bottomRightXCoord / (20 * 8)
        )}`
      ].objectsID[objectID] = { objectType: `${objectID}` };
    }

    // смотрим левые точки X координаты

    if (
      `${Math.floor(prevCoords.topLeftXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topLeftXCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(
          prevCoords.topLeftXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    if (
      `${Math.floor(prevCoords.bottomLeftXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomLeftXCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
          prevCoords.bottomLeftXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    return;
  }

  if (game.users[objectID].moveDirection === UserMoveDirections.left) {
    // смотрим левые точки X координаты

    if (
      `${Math.floor(prevCoords.topLeftXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topLeftXCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.topLeftXCoord / (20 * 8)
        )}`
      ].objectsID[`${objectID}`] = { objectType: `${objectID}` };
    }

    if (
      `${Math.floor(prevCoords.bottomLeftXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomLeftXCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.bottomLeftXCoord / (20 * 8)
        )}`
      ].objectsID[`${objectID}`] = { objectType: `${objectID}` };
    }
    // смотрим правые точки X координаты

    if (
      `${Math.floor(prevCoords.topRightXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topRightXCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(
          prevCoords.topRightXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    if (
      `${Math.floor(prevCoords.bottomRightXCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomRightXCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
          prevCoords.bottomRightXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    return;
  }

  if (game.users[objectID].moveDirection === UserMoveDirections.up) {
    // смотрим верхние точки Y координаты

    if (
      `${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.topLeftXCoord / (20 * 8)
        )}`
      ].objectsID[`${objectID}`] = { objectType: `${objectID}` };
    }

    if (
      `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.topRightXCoord / (20 * 8)
        )}`
      ].objectsID[`${objectID}`] = { objectType: `${objectID}` };
    }
    // смотрим нижние точки Y координаты

    if (
      `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
          prevCoords.bottomLeftXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    if (
      `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
          prevCoords.bottomRightXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    return;
  }

  if (game.users[objectID].moveDirection === UserMoveDirections.down) {
    // смотрим нижние точки Y координаты
    if (
      `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.bottomLeftXCoord / (20 * 8)
        )}`
      ].objectsID[`${objectID}`] = { objectType: `${objectID}` };
    }

    if (
      `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}`
    ) {
      game.sectors[
        `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}${Math.floor(
          coordsAfterMove.bottomRightXCoord / (20 * 8)
        )}`
      ].objectsID[`${objectID}`] = { objectType: `${objectID}` };
    }

    // смотрим верхние точки Y координаты

    if (
      `${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(
          prevCoords.topLeftXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    if (
      `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}` !==
      `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}`
    ) {
      delete game.sectors[
        `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(
          prevCoords.topRightXCoord / (20 * 8)
        )}`
      ].objectsID[objectID];
    }

    return;
  }
};

export const setCurrentCoord = function (
  clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  },
  objectID: string
) {
  if (!game.users[objectID]) return;

  game.users[objectID].moveDirection = clientData.direction;
  let moveStatus = true;

  const objectCoords = getObjectCoords(objectID);

  if (clientData.direction === UserMoveDirections.down) {
    if (objectCoords.bottomLeftYCoord + clientData.shiftUserPixels >= (game.mapSize - 1) * 8) {
      return;
    }
    const objectInChankStartPixel =
      game.users[objectID].square.currentCoord.bottomLeft.x % 8 === 0 ? true : false;

    for (
      let i = objectCoords.bottomLeftXCoord + 8;
      i <= objectCoords.bottomRightXCoord;
      i = i + 8
    ) {
      if (objectInChankStartPixel && i === objectCoords.bottomRightXCoord) {
        continue;
      }

      if (
        game.gameField[
          Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / 8)
        ][Math.floor(i / 8)].notMove ||
        game.gameField[
          Math.floor((objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / 8)
        ][Math.floor((i - 8) / 8)].notMove
      ) {
        moveStatus = false;
        break;
      }
    }
  }

  if (clientData.direction === UserMoveDirections.up) {
    const objectInChankStartPixel =
      game.users[objectID].square.currentCoord.topLeft.x % 8 === 0 ? true : false;

    if (objectCoords.topLeftYCoord - clientData.shiftUserPixels < 5) {
      return;
    }

    for (let i = objectCoords.topLeftXCoord + 8; i <= objectCoords.topRightXCoord; i = i + 8) {
      if (objectInChankStartPixel && i === objectCoords.topRightXCoord) {
        continue;
      }

      if (
        game.gameField[Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / 8)][
          Math.floor(i / 8)
        ].notMove ||
        game.gameField[Math.floor((objectCoords.topLeftYCoord - clientData.shiftUserPixels) / 8)][
          Math.floor((i - 8) / 8)
        ].notMove
      ) {
        moveStatus = false;
        break;
      }
    }
  }

  if (clientData.direction === UserMoveDirections.left) {
    const objectInChankStartPixel =
      game.users[objectID].square.currentCoord.topLeft.y % 8 === 0 ? true : false;

    if (objectCoords.topLeftXCoord - clientData.shiftUserPixels < 5) {
      return;
    }

    for (let i = objectCoords.topLeftYCoord + 8; i <= objectCoords.bottomLeftYCoord; i = i + 8) {
      if (objectInChankStartPixel && i === objectCoords.bottomLeftYCoord) {
        continue;
      }
      if (
        game.gameField[Math.floor(i / 8)][
          Math.floor((objectCoords.topLeftXCoord - clientData.shiftUserPixels) / 8)
        ].notMove ||
        game.gameField[Math.floor((i - 8) / 8)][
          Math.floor((objectCoords.topLeftXCoord - clientData.shiftUserPixels) / 8)
        ].notMove
      ) {
        moveStatus = false;
        break;
      }
    }
  }
  if (clientData.direction === UserMoveDirections.right) {
    const objectInChankStartPixel =
      game.users[objectID].square.currentCoord.topLeft.y % 8 === 0 ? true : false;

    if (objectCoords.topRightXCoord + clientData.shiftUserPixels > (game.mapSize - 1) * 8) {
      return;
    }

    for (let i = objectCoords.topRightYCoord + 8; i <= objectCoords.bottomRightYCoord; i = i + 8) {
      if (objectInChankStartPixel && i === objectCoords.bottomRightYCoord) {
        continue;
      }
      if (
        game.gameField[Math.floor(i / 8)][
          Math.floor((objectCoords.topRightXCoord + clientData.shiftUserPixels) / 8)
        ].notMove ||
        game.gameField[Math.floor((i - 8) / 8)][
          Math.floor((objectCoords.topRightXCoord + clientData.shiftUserPixels) / 8)
        ].notMove
      ) {
        moveStatus = false;
        break;
      }
    }
  }

  if (!moveStatus) return;

  const seeSectors = () => {
    // if (game.users[objectID].type !== "gamer") return;
    if (game.users[objectID].moveDirection === UserMoveDirections.down) {
      if (
        `${Math.floor(
          (objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / (20 * 8)
        )}${Math.floor(objectCoords.bottomLeftXCoord / (20 * 8))}` ===
        `${Math.floor(
          (objectCoords.bottomRightYCoord + clientData.shiftUserPixels) / (20 * 8)
        )}${Math.floor(objectCoords.bottomRightXCoord / (20 * 8))}`
      ) {
        //   console.log("Одинаковый сектор, смотрим только сектор нижней правой точки");

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(
            (objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / (20 * 8)
          )}${Math.floor(objectCoords.bottomLeftXCoord / (20 * 8))}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getDownMOveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      } else {
        // разные сектора, смотрим объекты в обеих секторах

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(
            (objectCoords.bottomLeftYCoord + clientData.shiftUserPixels) / (20 * 8)
          )}${Math.floor(objectCoords.bottomLeftXCoord / (20 * 8))}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getDownMOveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
        if (!moveStatus) return;

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(
            (objectCoords.bottomRightYCoord + clientData.shiftUserPixels) / (20 * 8)
          )}${Math.floor(objectCoords.bottomRightXCoord / (20 * 8))}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getDownMOveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      }
    }
    if (game.users[objectID].moveDirection === UserMoveDirections.up) {
      if (
        `${Math.floor(
          (objectCoords.topLeftYCoord - clientData.shiftUserPixels) / (20 * 8)
        )}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}` ===
        `${Math.floor(
          (objectCoords.topRightYCoord - clientData.shiftUserPixels) / (20 * 8)
        )}${Math.floor(objectCoords.topRightXCoord / (20 * 8))}`
      ) {
        // одинаковые сектора, смотрим в одном

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(
            (objectCoords.topLeftYCoord - clientData.shiftUserPixels) / (20 * 8)
          )}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getUpMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      } else {
        // разные сектора, смотрим в обоих

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(
            (objectCoords.topLeftYCoord - clientData.shiftUserPixels) / (20 * 8)
          )}${Math.floor(objectCoords.topLeftXCoord / (20 * 8))}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getUpMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }

        if (!moveStatus) return;

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(
            (objectCoords.topRightYCoord - clientData.shiftUserPixels) / (20 * 8)
          )}${Math.floor(objectCoords.topRightXCoord / (20 * 8))}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getUpMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      }
    }

    if (game.users[objectID].moveDirection === UserMoveDirections.left) {
      if (
        `${Math.floor(objectCoords.topLeftYCoord / (20 * 8))}${Math.floor(
          objectCoords.topLeftXCoord / (20 * 8)
        )}` ===
        `${Math.floor(
          (objectCoords.bottomLeftYCoord - clientData.shiftUserPixels) / (20 * 8)
        )}${Math.floor((objectCoords.bottomLeftXCoord - clientData.shiftUserPixels) / (20 * 8))}`
      ) {
        // одинаковые сектора, смотрим в одном

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(objectCoords.topLeftYCoord / (20 * 8))}${Math.floor(
            (objectCoords.topLeftXCoord - clientData.shiftUserPixels) / (20 * 8)
          )}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getLeftMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      } else {
        // разные сектора, смотрим в обоих

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(objectCoords.topLeftYCoord / (20 * 8))}${Math.floor(
            (objectCoords.topLeftXCoord - clientData.shiftUserPixels) / (20 * 8)
          )}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getLeftMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
        if (!moveStatus) return;

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(objectCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
            (objectCoords.bottomLeftXCoord - clientData.shiftUserPixels) / (20 * 8)
          )}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getLeftMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      }
    }

    if (game.users[objectID].moveDirection === UserMoveDirections.right) {
      if (
        `${Math.floor(objectCoords.topRightYCoord / (20 * 8))}${Math.floor(
          objectCoords.topLeftXCoord / (20 * 8)
        )}` ===
        `${Math.floor(objectCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
          (objectCoords.bottomLeftXCoord + clientData.shiftUserPixels) / (20 * 8)
        )}`
      ) {
        for (const inSectorObjectID in game.sectors[
          `${Math.floor(objectCoords.topRightYCoord / (20 * 8))}${Math.floor(
            (objectCoords.topLeftXCoord + clientData.shiftUserPixels) / (20 * 8)
          )}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getRightMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      } else {
        for (const inSectorObjectID in game.sectors[
          `${Math.floor(objectCoords.topRightYCoord / (20 * 8))}${Math.floor(
            (objectCoords.topLeftXCoord + clientData.shiftUserPixels) / (20 * 8)
          )}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getRightMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
        if (!moveStatus) return;

        for (const inSectorObjectID in game.sectors[
          `${Math.floor(objectCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
            (objectCoords.bottomLeftXCoord + clientData.shiftUserPixels) / (20 * 8)
          )}`
        ].objectsID) {
          if (inSectorObjectID === objectID) continue;

          moveStatus = getRightMoveIntersectionObjects(
            inSectorObjectID,
            clientData.shiftUserPixels,
            objectCoords
          );
          if (!moveStatus) return;
        }
      }
    }
  };

  seeSectors();

  if (!moveStatus) return;

  if (moveStatus) setMoveCoord(clientData, objectID, objectCoords);

  // смотрим сектора куда перемещаемся

  const objectCoordsAfterMove: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  } = getObjectCoords(objectID);

  // после изменения координат, удаляем объект из секторов
  // которые покинул объект

  //   смотрим старыет(objectCoords) и новые (objectCoordsAfterMove) координаты
  // после изменения координат, записываем объект в соответствующие сектора

  setAndDeleteObjectsFromSectors(objectCoords, objectCoordsAfterMove, objectID);
};
