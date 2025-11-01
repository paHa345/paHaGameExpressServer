import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";

export const setUserCurrentChanks = (
  chanksQuantity: { width: number; height: number },
  socketID: string,
  direction?: UserMoveDirections
) => {
  if (!game.users[socketID]) {
    return;
  }
  const prevTopLeftXChank = Math.floor(game.users[socketID].square.prevCoord.topLeft.x / 8);
  const prevTopLeftYChank = Math.floor(game.users[socketID].square.prevCoord.topLeft.y / 8);
  const prevBottomLeftXChank = Math.floor(game.users[socketID].square.prevCoord.bottomLeft.x / 8);
  const prevBottomLeftYChank = Math.floor(game.users[socketID].square.prevCoord.bottomLeft.y / 8);
  const prevTopRightXChank = Math.floor(game.users[socketID].square.prevCoord.topRight.x / 8);
  const prevTopRightYChank = Math.floor(game.users[socketID].square.prevCoord.topRight.y / 8);

  const topLeftXChank = Math.floor(game.users[socketID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[socketID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(game.users[socketID].square.currentCoord.bottomLeft.x / 8);
  const bottomLeftYChank = Math.floor(game.users[socketID].square.currentCoord.bottomLeft.y / 8);
  const topRightXChank = Math.floor(game.users[socketID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[socketID].square.currentCoord.topRight.y / 8);

  for (let i = 0; i <= chanksQuantity.width; i++) {
    if (direction === UserMoveDirections.down) {
      game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }

    game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };
    if (direction === UserMoveDirections.up) {
      game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
    game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };
  }

  for (let i = 0; i < chanksQuantity.height; i++) {
    game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };

    if (direction === UserMoveDirections.right) {
      game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
    game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
      objectID: socketID,
      isObjectChank: true,
    };
    if (direction === UserMoveDirections.left) {
      game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
      };
    }
  }
};

export const setClientCoordinates = (
  objectType: string,
  objectID: string,
  clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  }
) => {
  if (game.users[objectID]) {
    game.users[objectID].square.prevCoord = JSON.parse(
      JSON.stringify(game.users[objectID].square.currentCoord)
    );
  }
  if (game.users[objectID] && game.attackStatusObj[objectID]) {
    game.users[objectID].getDamageStatus
      ? (game.users[objectID].imgName = `${objectType}GetDamageImage`)
      : (game.users[objectID].imgName = `${objectType}WalkImage`);
    game.attackStatusObj[objectID].isActive
      ? (game.users[objectID].imgName = `${objectType}AttackImage`)
      : (game.users[objectID].imgName = `${objectType}WalkImage`);
  }

  const setMoveCoord = () => {
    if (clientData.direction === UserMoveDirections.down) {
      game.users[objectID].square.currentCoord.bottomLeft.y =
        game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.y =
        game.users[objectID].square.currentCoord.bottomRight.y + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.y =
        game.users[objectID].square.currentCoord.topLeft.y + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.y =
        game.users[objectID].square.currentCoord.topRight.y + clientData.shiftUserPixels;
    }
    if (clientData.direction === UserMoveDirections.left) {
      game.users[objectID].square.currentCoord.bottomLeft.x =
        game.users[objectID].square.currentCoord.bottomLeft.x - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.x =
        game.users[objectID].square.currentCoord.bottomRight.x - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.x =
        game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.x =
        game.users[objectID].square.currentCoord.topRight.x - clientData.shiftUserPixels;
    }
    if (clientData.direction === UserMoveDirections.right) {
      game.users[objectID].square.currentCoord.bottomLeft.x =
        game.users[objectID].square.currentCoord.bottomLeft.x + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.x =
        game.users[objectID].square.currentCoord.bottomRight.x + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.x =
        game.users[objectID].square.currentCoord.topLeft.x + clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.x =
        game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels;
    }
    if (clientData.direction === UserMoveDirections.up) {
      game.users[objectID].square.currentCoord.bottomLeft.y =
        game.users[objectID].square.currentCoord.bottomLeft.y - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.bottomRight.y =
        game.users[objectID].square.currentCoord.bottomRight.y - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topLeft.y =
        game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels;
      game.users[objectID].square.currentCoord.topRight.y =
        game.users[objectID].square.currentCoord.topRight.y - clientData.shiftUserPixels;
    }
  };

  const setCurrentCoord = function (clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  }) {
    if (!game.users[objectID]) return;

    game.users[objectID].moveDirection = clientData.direction;
    if (clientData.direction === UserMoveDirections.down) {
      // смотрим чанки, на которые хотим встать

      game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels >
        (game.mapSize - 1) * 8 ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomLeft.x + 5) / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomRight.x - 5) / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.bottomLeft.y =
            game.users[objectID].square.currentCoord.bottomLeft.y)
        : setMoveCoord();
    }
    if (clientData.direction === UserMoveDirections.left) {
      game.users[objectID].square.currentCoord.topLeft.x - clientData.shiftUserPixels < 0 ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topLeft.y + 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.bottomLeft.y - 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topLeft.x - 8) / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomLeft.x - 8) / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.topLeft.x =
            game.users[objectID].square.currentCoord.topLeft.x)
        : setMoveCoord();
    }
    if (clientData.direction === UserMoveDirections.right) {
      game.users[objectID].square.currentCoord.topRight.x + clientData.shiftUserPixels >
        (game.mapSize - 1) * 8 ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topRight.y + 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.bottomRight.y - 5) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.bottomRight.x / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topRight.x + 8) / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.bottomRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.bottomRight.x + 8) / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.topRight.x =
            game.users[objectID].square.currentCoord.topRight.x)
        : setMoveCoord();
    }
    if (clientData.direction === UserMoveDirections.up) {
      if (Math.floor((game.users[objectID].square.currentCoord.topLeft.y - 13) / 8) < 0) {
        return;
      }

      game.users[objectID].square.currentCoord.topLeft.y - clientData.shiftUserPixels < 0 ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topLeft.x + 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8)][
        Math.floor((game.users[objectID].square.currentCoord.topRight.x - 5) / 8)
      ]?.notMove ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8)
      ]?.objectDataChank.isObjectChank ||
      game.gameField[Math.floor((game.users[objectID].square.currentCoord.topLeft.y - 8) / 8)][
        Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8)
      ]?.objectDataChank.isObjectChank
        ? (game.users[objectID].square.currentCoord.topLeft.y =
            game.users[objectID].square.currentCoord.topLeft.y)
        : setMoveCoord();
    }
  };

  setCurrentCoord(clientData);

  setUserCurrentChanks(
    {
      height: NPCOrGamerObjectsData[objectType].heightChanks,
      width: NPCOrGamerObjectsData[objectType].widthChanks,
    },
    objectID,
    clientData.direction
  );

  // io.of("/").to(clientData.roomID).emit("serverMove", game.users);
};
