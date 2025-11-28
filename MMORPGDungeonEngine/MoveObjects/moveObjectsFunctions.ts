import { game, UserMoveDirections } from "../gameObject/gameObject";

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

export const deleteObjectsFromSectors = (
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
  const isChangeSectors = [];

  if (
    `${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(
      prevCoords.topLeftXCoord / (20 * 8)
    )}` !==
    `${Math.floor(coordsAfterMove.topLeftYCoord / (20 * 8))}${Math.floor(
      coordsAfterMove.topLeftXCoord / (20 * 8)
    )}`
  ) {
    isChangeSectors.push(
      `${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(
        prevCoords.topLeftXCoord / (20 * 8)
      )}`
    );
  }

  if (
    `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(
      prevCoords.topRightXCoord / (20 * 8)
    )}` !==
    `${Math.floor(coordsAfterMove.topRightYCoord / (20 * 8))}${Math.floor(
      coordsAfterMove.topRightXCoord / (20 * 8)
    )}`
  ) {
    isChangeSectors.push(
      `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(
        prevCoords.topRightXCoord / (20 * 8)
      )}`
    );
  }

  if (
    `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
      prevCoords.bottomLeftXCoord / (20 * 8)
    )}` !==
    `${Math.floor(coordsAfterMove.bottomLeftYCoord / (20 * 8))}${Math.floor(
      coordsAfterMove.bottomLeftXCoord / (20 * 8)
    )}`
  ) {
    isChangeSectors.push(
      `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
        prevCoords.bottomLeftXCoord / (20 * 8)
      )}`
    );
  }

  if (
    `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
      prevCoords.bottomRightXCoord / (20 * 8)
    )}` !==
    `${Math.floor(coordsAfterMove.bottomRightYCoord / (20 * 8))}${Math.floor(
      coordsAfterMove.bottomRightXCoord / (20 * 8)
    )}`
  ) {
    isChangeSectors.push(
      `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
        prevCoords.bottomRightXCoord / (20 * 8)
      )}`
    );
  }

  if (game.users[objectID].type === "gamer") {
    // console.log(prevCoords);
    console.log(isChangeSectors);
  }

  // const sectorsBeforeMove = {
  //     topLeft:`${Math.floor(prevCoords.topLeftYCoord / (20 * 8))}${Math.floor(
  //   prevCoords.topLeftXCoord / (20 * 8)
  // )}`,
  //     topRight: `${Math.floor(prevCoords.topRightYCoord / (20 * 8))}${Math.floor(
  //   prevCoords.topRightXCoord / (20 * 8)
  // )}`,
  //     bottomLeft: `${Math.floor(prevCoords.bottomLeftYCoord / (20 * 8))}${Math.floor(
  //   prevCoords.bottomLeftXCoord / (20 * 8)
  // )}`,
  //       bottomRight: `${Math.floor(prevCoords.bottomRightYCoord / (20 * 8))}${Math.floor(
  //     prevCoords.bottomRightXCoord / (20 * 8)
  //   )}`
  //   // }
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
  if (moveStatus) setMoveCoord(clientData, objectID, objectCoords);

  const objectCoordsAfterMove = getObjectCoords(objectID);

  //   if (game.users[objectID].type === "gamer") {
  //     console.log(objectCoords);
  //     console.log(objectCoordsAfterMove);
  //   }

  // после изменения координат, удаляем объект из секторов
  // которые покинул объект

  //   смотрим старыет(objectCoords) и новые (objectCoordsAfterMove) координаты

  deleteObjectsFromSectors(objectCoords, objectCoordsAfterMove, objectID);

  // после изменения координат, записываем объект в соответствующие сектора
  setObjectInSectors(objectCoordsAfterMove, objectID);

  //   console.log(game.sectors);
};
