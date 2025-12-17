import { game } from "../gameObject/gameObject";

export const getDownMOveIntersectionObjects = (
  inSectorObjectID: string,
  shiftUserPixels: number,
  objectCoords: {
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
  // нихняя левая координата

  if (!game.users[inSectorObjectID]) {
    return true;
  }

  if (
    objectCoords.bottomLeftYCoord + shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.bottomLeftYCoord + shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
    objectCoords.bottomLeftXCoord > game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.bottomLeftXCoord < game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }

  //середина объекта

  if (
    objectCoords.bottomLeftYCoord + shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.bottomLeftYCoord + shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
    Math.floor((objectCoords.bottomLeftXCoord + objectCoords.bottomRightXCoord) / 2) >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    Math.floor((objectCoords.bottomLeftXCoord + objectCoords.bottomRightXCoord) / 2) <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }

  // нихняя правая координата

  if (
    objectCoords.bottomRightYCoord + shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.bottomRightYCoord + shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
    objectCoords.bottomRightXCoord > game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.bottomRightXCoord < game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }
  return true;
};

export const getUpMoveIntersectionObjects = (
  inSectorObjectID: string,
  shiftUserPixels: number,
  objectCoords: {
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
  if (!game.users[inSectorObjectID]) {
    return true;
  }

  // верхняя левая координата
  if (
    objectCoords.topLeftYCoord - shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.topLeftYCoord - shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
    objectCoords.topLeftXCoord > game.users[inSectorObjectID].square.currentCoord.bottomLeft.x &&
    objectCoords.topLeftXCoord < game.users[inSectorObjectID].square.currentCoord.bottomRight.x
  ) {
    return false;
  }

  //середина объекта

  if (
    objectCoords.topRightYCoord - shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.topRightYCoord - shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
    Math.floor((objectCoords.topLeftXCoord + objectCoords.topRightXCoord) / 2) >
      game.users[inSectorObjectID].square.currentCoord.bottomLeft.x &&
    Math.floor((objectCoords.topLeftXCoord + objectCoords.topRightXCoord) / 2) <
      game.users[inSectorObjectID].square.currentCoord.bottomRight.x
  ) {
    return false;
  }

  // // верхняя правая координата

  if (
    objectCoords.topRightYCoord - shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.topRightYCoord - shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
    objectCoords.topRightXCoord > game.users[inSectorObjectID].square.currentCoord.bottomLeft.x &&
    objectCoords.topRightXCoord < game.users[inSectorObjectID].square.currentCoord.bottomRight.x
  ) {
    return false;
  }
  return true;
};

export const getLeftMoveIntersectionObjects = (
  inSectorObjectID: string,
  shiftUserPixels: number,
  objectCoords: {
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
  if (!game.users[inSectorObjectID]) {
    return true;
  }
  // верхняя левая координата
  if (
    objectCoords.topLeftYCoord > game.users[inSectorObjectID].square.currentCoord.topRight.y &&
    objectCoords.topLeftYCoord < game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
    objectCoords.topLeftXCoord - shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.topLeftXCoord - shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }

  //середина объекта

  if (
    Math.floor((objectCoords.topLeftYCoord + objectCoords.bottomLeftYCoord) / 2) >
      game.users[inSectorObjectID].square.currentCoord.topRight.y &&
    Math.floor((objectCoords.topLeftYCoord + objectCoords.bottomLeftYCoord) / 2) <
      game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
    objectCoords.topLeftXCoord - shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.topLeftXCoord - shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }

  // нижняя левая координата

  if (
    objectCoords.bottomLeftYCoord > game.users[inSectorObjectID].square.currentCoord.topRight.y &&
    objectCoords.bottomLeftYCoord <
      game.users[inSectorObjectID].square.currentCoord.bottomRight.y &&
    objectCoords.bottomLeftXCoord - shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.bottomLeftXCoord - shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }
  return true;
};

export const getRightMoveIntersectionObjects = (
  inSectorObjectID: string,
  shiftUserPixels: number,
  objectCoords: {
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
  if (!game.users[inSectorObjectID]) {
    return true;
  }
  // верхняя левая координата
  if (
    objectCoords.topRightYCoord > game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.topRightYCoord < game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
    objectCoords.topRightXCoord + shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.topRightXCoord + shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }

  //середина объекта

  if (
    Math.floor((objectCoords.topRightYCoord + objectCoords.bottomRightYCoord) / 2) >
      game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    Math.floor((objectCoords.topRightYCoord + objectCoords.bottomRightYCoord) / 2) <
      game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
    objectCoords.topLeftXCoord + shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.topLeftXCoord + shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }

  // нижняя левая координата

  if (
    objectCoords.bottomRightYCoord > game.users[inSectorObjectID].square.currentCoord.topLeft.y &&
    objectCoords.bottomRightYCoord <
      game.users[inSectorObjectID].square.currentCoord.bottomLeft.y &&
    objectCoords.bottomRightXCoord + shiftUserPixels >
      game.users[inSectorObjectID].square.currentCoord.topLeft.x &&
    objectCoords.bottomRightXCoord + shiftUserPixels <
      game.users[inSectorObjectID].square.currentCoord.topRight.x
  ) {
    return false;
  }
  return true;
};
