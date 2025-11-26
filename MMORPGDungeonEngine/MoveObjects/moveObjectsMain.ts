import { DefaultEventsMap, Server } from "socket.io";
import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { NPCViewMain } from "../NPCView/NPCViewMain";

export const setUserCurrentChanks = (
  chanksQuantity: { width: number; height: number },
  objectID: string,
  direction?: UserMoveDirections
) => {
  if (!game.users[objectID]) {
    return;
  }
  const prevTopLeftXChank = Math.floor(game.users[objectID].square.prevCoord.topLeft.x / 8);
  const prevTopLeftYChank = Math.floor(game.users[objectID].square.prevCoord.topLeft.y / 8);
  const prevBottomLeftXChank = Math.floor(game.users[objectID].square.prevCoord.bottomLeft.x / 8);
  const prevBottomLeftYChank = Math.floor(game.users[objectID].square.prevCoord.bottomLeft.y / 8);
  const prevTopRightXChank = Math.floor(game.users[objectID].square.prevCoord.topRight.x / 8);
  const prevTopRightYChank = Math.floor(game.users[objectID].square.prevCoord.topRight.y / 8);

  const topLeftXChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8);
  const bottomLeftYChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8);
  const topRightXChank = Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8);

  const isGamer = game.users[objectID].type === "gamer";

  for (let i = 0; i <= chanksQuantity.width; i++) {
    if (direction === UserMoveDirections.down) {
      game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
        isGamerChank: null,
      };
    }

    game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
      objectID: objectID,
      isObjectChank: true,
      isGamerChank: isGamer,
    };
    if (direction === UserMoveDirections.up) {
      game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
        isGamerChank: null,
      };
    }
    game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
      objectID: objectID,
      isObjectChank: true,
      isGamerChank: isGamer,
    };
  }

  for (let i = 0; i < chanksQuantity.height; i++) {
    game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
      objectID: objectID,
      isObjectChank: true,
      isGamerChank: isGamer,
    };

    if (direction === UserMoveDirections.right) {
      game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
        isGamerChank: null,
      };
    }
    game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
      objectID: objectID,
      isObjectChank: true,
      isGamerChank: isGamer,
    };
    if (direction === UserMoveDirections.left) {
      game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
        objectID: undefined,
        isObjectChank: false,
        isGamerChank: null,
      };
      game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
        objectID: objectID,
        isObjectChank: true,
        isGamerChank: isGamer,
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

      // const widthPX =
      //   game.users[objectID].square.currentCoord.bottomRight.x -
      //   game.users[objectID].square.currentCoord.bottomLeft.x;

      const objectInChankStartPixel =
        game.users[objectID].square.currentCoord.bottomLeft.x % 8 === 0 ? true : false;

      console.log(objectInChankStartPixel);

      for (
        let i = game.users[objectID].square.currentCoord.bottomLeft.x + 8;
        i <= game.users[objectID].square.currentCoord.bottomRight.x;
        i = i + 8
      ) {
        if (
          objectInChankStartPixel &&
          i === game.users[objectID].square.currentCoord.bottomRight.x
        ) {
          continue;
        }

        // console.log(
        //   game.gameField[
        //     Math.floor(
        //       (game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels) /
        //         8
        //     )
        //   ][Math.floor(i / 8)].notMove
        // );

        // console.log(
        //   game.gameField[
        //     Math.floor(
        //       (game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels) /
        //         8
        //     )
        //   ][Math.floor((i - 8) / 8)].notMove
        // );

        // chanks[Math.floor(i / 8)] = {
        //   x: Math.floor(i / 8),
        //   y: Math.floor(
        //     (game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels) / 8
        //   ),
        //   notMoveStatus:
        //     game.gameField[
        //       Math.floor(
        //         (game.users[objectID].square.currentCoord.bottomLeft.y +
        //           clientData.shiftUserPixels) /
        //           8
        //       )
        //     ][Math.floor(i / 8)].notMove,
        // };
        // chanks[Math.floor((i - 8) / 8)] = {
        //   x: Math.floor((i - 8) / 8),
        //   y: Math.floor(
        //     (game.users[objectID].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels) / 8
        //   ),
        //   notMoveStatus:
        //     game.gameField[
        //       Math.floor(
        //         (game.users[objectID].square.currentCoord.bottomLeft.y +
        //           clientData.shiftUserPixels) /
        //           8
        //       )
        //     ][Math.floor((i - 8) / 8)].notMove,
        // };
        // смотрим чанки
      }

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
        (game.mapSize - 2) * 8 ||
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

let moveNPCInterval: any;
export const moveNPCMain = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const directions = [
    UserMoveDirections.right,
    UserMoveDirections.down,
    UserMoveDirections.up,
    UserMoveDirections.left,
    UserMoveDirections.stop,
  ];

  for (const objectID in game.users) {
    game.NPCDataObj[objectID] = {
      timeMoveDirection: Date.now(),
      timeViewCheck: Date.now(),
      NPCID: objectID,
      directionPointer: 0,
      NPCCondition: {
        type: "observation",
        moveDirercion: 0,
        viewDirection: 0,
      },
      NPCPrepareToAttackStatus: false,
    };
  }

  moveNPCInterval = setInterval(() => {
    for (const NPCID in game.NPCDataObj) {
      if (!game.users[NPCID]) {
        delete game.NPCDataObj[NPCID];
        return;
      }

      if (game.NPCDataObj[NPCID].NPCPrepareToAttackStatus) {
        return;
      }

      if (game.attackStatusObj[NPCID]?.isActive) return;

      if (Date.now() - game.NPCDataObj[NPCID].timeViewCheck > 250) {
        NPCViewMain(game.NPCDataObj[NPCID], game.NPCDataObj[NPCID].NPCID, io);
        game.NPCDataObj[NPCID].timeViewCheck = Date.now();
      }

      if (Date.now() - game.NPCDataObj[NPCID].timeMoveDirection > 5000) {
        const getRandomNumber = (min: number, max: number) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        game.NPCDataObj[NPCID].directionPointer = getRandomNumber(0, 4);
        game.NPCDataObj[NPCID].timeMoveDirection = Date.now();
      }
      if (game.users[game.NPCDataObj[NPCID].NPCID]?.deathAnimationStatus) {
        return;
      }

      if (
        game.NPCDataObj[NPCID].NPCCondition.type === "observation" &&
        (!game.users[game.NPCDataObj[NPCID].NPCID]?.getDamageStatus ||
          !game.users[game.NPCDataObj[NPCID].NPCID]?.deathAnimationStatus)
      ) {
        game.users[game.NPCDataObj[NPCID].NPCID].NPCViewDirection =
          directions[game.NPCDataObj[NPCID].directionPointer];
        setClientCoordinates(
          game.users[game.NPCDataObj[NPCID].NPCID].objectType,
          game.NPCDataObj[NPCID].NPCID,
          {
            direction: directions[game.NPCDataObj[NPCID].directionPointer],
            roomID: "asdasd",
            shiftUserPixels: 1,
          }
        );
      }

      if (
        game.NPCDataObj[NPCID].NPCCondition.type === "aggression" &&
        (!game.users[game.NPCDataObj[NPCID].NPCID]?.getDamageStatus ||
          !game.users[game.NPCDataObj[NPCID].NPCID]?.deathAnimationStatus)
      ) {
        setClientCoordinates(
          game.users[game.NPCDataObj[NPCID].NPCID].objectType,
          game.NPCDataObj[NPCID].NPCID,
          {
            direction: directions[game.NPCDataObj[NPCID].directionPointer],
            roomID: "asdasd",
            shiftUserPixels: 1,
          }
        );
      }
    }
  }, 33);
};

export const clearMoveNPCInterval = () => {
  clearInterval(moveNPCInterval);
  moveNPCInterval = null;
};
