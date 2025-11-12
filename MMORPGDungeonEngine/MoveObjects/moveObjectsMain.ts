import { DefaultEventsMap, Server } from "socket.io";
import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";

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

  const NPCObj: {
    timeMoveDirection: number;
    timeViewCheck: number;
    NPCID: string;
    directionPointer: number;
    NPCCondition: {
      type: "observation" | "aggression";
      moveDirercion: number;
      viewDirection: number;
    };
  }[] = [];

  for (const objectID in game.users) {
    NPCObj.push({
      timeMoveDirection: Date.now(),
      timeViewCheck: Date.now(),
      NPCID: objectID,
      directionPointer: 0,
      NPCCondition: {
        type: "observation",
        moveDirercion: 0,
        viewDirection: 0,
      },
    });
  }

  moveNPCInterval = setInterval(() => {
    for (let i = 0; i < NPCObj.length; i++) {
      if (!game.users[NPCObj[i].NPCID]) {
        NPCObj.splice(i, 1);
        return;
      }

      if (Date.now() - NPCObj[i].timeViewCheck > 1500) {
        console.log(NPCObj[i].NPCCondition.type);
        NPCVisibleAreaMain(NPCObj[i], NPCObj[i].NPCID, io);
        NPCObj[i].timeViewCheck = Date.now();
      }

      if (Date.now() - NPCObj[i].timeMoveDirection > 5000) {
        const getRandomNumber = (min: number, max: number) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        NPCObj[i].directionPointer = getRandomNumber(0, 4);
        NPCObj[i].timeMoveDirection = Date.now();
      }
      if (game.users[NPCObj[i].NPCID]?.deathAnimationStatus) {
        return;
      }

      if (
        NPCObj[i].NPCCondition.type === "observation" &&
        (!game.users[NPCObj[i].NPCID]?.getDamageStatus ||
          !game.users[NPCObj[i].NPCID]?.deathAnimationStatus)
      ) {
        game.users[NPCObj[i].NPCID].NPCViewDirection = directions[NPCObj[i].directionPointer];
        // setClientCoordinates(game.users[NPCObj[i].NPCID].objectType, NPCObj[i].NPCID, {
        //   direction: directions[NPCObj[i].directionPointer],
        //   roomID: "asdasd",
        //   shiftUserPixels: 1,
        // });
      }

      if (
        NPCObj[i].NPCCondition.type === "aggression" &&
        (!game.users[NPCObj[i].NPCID]?.getDamageStatus ||
          !game.users[NPCObj[i].NPCID]?.deathAnimationStatus)
      ) {
        setClientCoordinates(game.users[NPCObj[i].NPCID].objectType, NPCObj[i].NPCID, {
          direction: directions[NPCObj[i].directionPointer],
          roomID: "asdasd",
          shiftUserPixels: 1,
        });
      }
    }
  }, 33);
};

export const clearMoveNPCInterval = () => {
  clearInterval(moveNPCInterval);
  moveNPCInterval = null;
};

export const NPCVisibleAreaMain = (
  NPCObj: {
    timeMoveDirection: number;
    timeViewCheck: number;
    NPCID: string;
    directionPointer: number;
    NPCCondition: {
      type: "observation" | "aggression";
      moveDirercion: number;
      viewDirection: number;
    };
  },
  NPCID: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  if (!game.users[NPCID]) return;
  const topLeftXChank = Math.floor(game.users[NPCID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[NPCID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(game.users[NPCID].square.currentCoord.bottomLeft.x / 8);
  const bottomLeftYChank = Math.floor(game.users[NPCID].square.currentCoord.bottomLeft.y / 8);
  const topRightXChank = Math.floor(game.users[NPCID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[NPCID].square.currentCoord.topRight.y / 8);
  const chanks = [];
  let baseNPCLevel: number;
  if (
    game.users[NPCID].NPCViewDirection === UserMoveDirections.up ||
    game.users[NPCID].NPCViewDirection === UserMoveDirections.stop
  ) {
    baseNPCLevel = topLeftXChank + 1;
    console.log(baseNPCLevel);

    //смотрим основную ось, есть ли на ней игрок
    for (let i = 0; i < 4; i++) {
      if (topLeftYChank - 1 - i < 0) break;
      if (
        game.gameField[topLeftYChank - 1 - i][baseNPCLevel].objectDataChank.isGamerChank === true &&
        i === 0
      ) {
        console.log("Игрок в зоне атаки. Атакую");
        NPCObj.NPCCondition.type = "aggression";

        return;
      }
      if (
        game.gameField[topLeftYChank - 1 - i][baseNPCLevel].objectDataChank.isGamerChank === true &&
        i > 0
      ) {
        NPCObj.NPCCondition.type = "aggression";
        NPCObj.directionPointer = 2;

        return;
      }
    }

    for (let i = 0; i < NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 6; i++) {
      if (topLeftXChank - 3 + i < 0 || topLeftXChank - 3 + i > game.mapSize - 1) continue;
      for (let j = 0; j < 4; j++) {
        if (topLeftYChank - 1 - j < 0) continue;
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 1) ||
          (i === 1 && j === 0) ||
          (i === NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 5 && j === 0) ||
          (i === NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 5 && j === 1) ||
          (i === NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 4 && j === 0)
        ) {
          continue;
        }

        if (
          game.gameField[topLeftYChank - 1 - j][topLeftXChank - 3 + i]?.objectDataChank
            ?.isGamerChank === true
        ) {
          console.log(`Вижу игрока: ${topLeftYChank - 1 - j}: ${topLeftXChank - 3 + i}.`);

          console.log(
            `Двигаюсь к нему ${topLeftXChank - 3 + i > baseNPCLevel ? " вправо" : " влево"}`
          );

          topLeftXChank - 3 + i > baseNPCLevel
            ? (NPCObj.directionPointer = 0)
            : (NPCObj.directionPointer = 3);
          NPCObj.NPCCondition.type = "aggression";

          return;
        }

        chanks.push({
          x: topLeftXChank - 3 + i,
          y: topLeftYChank - 1 - j,
        });
      }
    }

    NPCObj.NPCCondition.type = "observation";
    io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
  }
  if (game.users[NPCID].NPCViewDirection === UserMoveDirections.down) {
    baseNPCLevel = bottomLeftXChank + 1;

    for (let i = 0; i < 4; i++) {
      if (bottomLeftYChank + 1 + i > game.mapSize - 1) break;
      if (
        game.gameField[bottomLeftYChank + 1 + i][baseNPCLevel].objectDataChank.isGamerChank ===
          true &&
        i === 0
      ) {
        console.log("Игрок в зоне атаки. Атакую");
        NPCObj.NPCCondition.type = "aggression";

        return;
      }
      if (
        game.gameField[bottomLeftYChank + 1 + i][baseNPCLevel].objectDataChank.isGamerChank ===
          true &&
        i > 0
      ) {
        NPCObj.NPCCondition.type = "aggression";
        NPCObj.directionPointer = 2;

        return;
      }
    }

    for (let i = 0; i < NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 6; i++) {
      if (bottomLeftXChank - 3 + i < 0 || bottomLeftXChank - 3 + i > game.mapSize - 1) continue;
      for (let j = 0; j < 4; j++) {
        if (bottomLeftYChank + 1 + j > game.mapSize - 1 - 1) continue;
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 1) ||
          (i === 1 && j === 0) ||
          (i === NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 5 && j === 0) ||
          (i === NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 5 && j === 1) ||
          (i === NPCOrGamerObjectsData[game.users[NPCID].objectType].widthChanks + 4 && j === 1)
        ) {
          continue;
        }
        if (
          game.gameField[bottomLeftYChank + 1 + j][bottomLeftXChank - 3 + i]?.objectDataChank
            ?.isGamerChank === true
        ) {
          console.log(`Вижу игрока: ${bottomLeftYChank + 1 + j}: ${bottomLeftXChank - 3 + i}.`);

          console.log(
            `Двигаюсь к нему ${bottomLeftXChank - 3 + i > baseNPCLevel ? " вправо" : " влево"}`
          );

          bottomLeftXChank - 3 + i > baseNPCLevel
            ? (NPCObj.directionPointer = 0)
            : (NPCObj.directionPointer = 3);
          NPCObj.NPCCondition.type = "aggression";

          return;
        }

        chanks.push({
          x: bottomLeftXChank - 3 + i,
          y: bottomLeftYChank + 1 + j,
        });
      }
    }
    NPCObj.NPCCondition.type = "observation";

    io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
  }
  if (game.users[NPCID].NPCViewDirection === UserMoveDirections.left) {
    baseNPCLevel = topLeftYChank + 2;

    // console.log(baseNPCLevel);

    for (let i = 0; i < 4; i++) {
      if (topLeftXChank - 1 - i < 0) break;
      if (
        game.gameField[baseNPCLevel][topLeftXChank - 1 - i].objectDataChank.isGamerChank === true &&
        i === 0
      ) {
        console.log("Игрок в зоне атаки. Атакую");
        NPCObj.NPCCondition.type = "aggression";

        return;
      }
      if (
        game.gameField[baseNPCLevel][topLeftXChank - 1 - i].objectDataChank.isGamerChank === true &&
        i > 0
      ) {
        console.log("Игрок на оси атаки. Двигаюсь к нему");

        NPCObj.NPCCondition.type = "aggression";
        NPCObj.directionPointer = 3;

        return;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (topLeftXChank - 1 - i < 0) continue;
      for (
        let j = 0;
        j < NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 6;
        j++
      ) {
        if (topLeftYChank - 3 + j < 0 || topLeftYChank - 3 + j > game.mapSize - 1) {
          continue;
        }

        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 1) ||
          (i === 1 && j === 0) ||
          (j === NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 5 && i === 0) ||
          (j === NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 4 && i === 0) ||
          (j === NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 5 && i === 1)
        ) {
          continue;
        }

        if (
          game.gameField[topLeftYChank - 3 + j][topLeftXChank - 1 - i]?.objectDataChank
            ?.isGamerChank === true
        ) {
          console.log(`Вижу игрока: ${topLeftYChank - 3 + j}: ${topLeftXChank - 1 - i}.`);

          console.log(
            `Двигаюсь к нему ${topLeftYChank - 3 + j > baseNPCLevel ? " вниз" : " вверх"}`
          );

          topLeftYChank - 3 + j > baseNPCLevel
            ? (NPCObj.directionPointer = 1)
            : (NPCObj.directionPointer = 2);
          NPCObj.NPCCondition.type = "aggression";

          return;
        }
        chanks.push({
          x: topLeftXChank - 1 - i,
          y: topLeftYChank - 3 + j,
        });
      }
    }
    NPCObj.NPCCondition.type = "observation";

    io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
  }
  if (game.users[NPCID].NPCViewDirection === UserMoveDirections.right) {
    baseNPCLevel = topRightYChank + 2;

    for (let i = 0; i < 4; i++) {
      if (topRightYChank + 1 + i > game.mapSize - 1) break;
      if (
        game.gameField[baseNPCLevel][topRightYChank + 1 + i].objectDataChank.isGamerChank ===
          true &&
        i === 0
      ) {
        console.log("Игрок в зоне атаки. Атакую");
        NPCObj.NPCCondition.type = "aggression";

        return;
      }
      if (
        game.gameField[baseNPCLevel][topRightYChank + 1 + i].objectDataChank.isGamerChank ===
          true &&
        i > 0
      ) {
        console.log("Игрок на оси атаки. Двигаюсь к нему");

        NPCObj.NPCCondition.type = "aggression";
        NPCObj.directionPointer = 0;

        return;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (topRightXChank + 1 + i > game.mapSize - 1) continue;
      for (
        let j = 0;
        j < NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 6;
        j++
      ) {
        if (topRightYChank - 3 + j < 0 || topRightYChank - 3 + j > game.mapSize - 1) {
          continue;
        }

        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 1) ||
          (i === 1 && j === 0) ||
          (j === NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 5 && i === 0) ||
          (j === NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 4 && i === 0) ||
          (j === NPCOrGamerObjectsData[game.users[NPCID].objectType].heightChanks + 5 && i === 1)
        ) {
          continue;
        }

        if (
          game.gameField[topRightYChank - 3 + j][topRightXChank + 1 + i]?.objectDataChank
            ?.isGamerChank === true
        ) {
          console.log(`Вижу игрока: ${topRightYChank - 3 + j}: ${topRightXChank + 1 + i}.`);

          console.log(
            `Двигаюсь к нему ${topRightYChank - 3 + j > baseNPCLevel ? " вниз" : " вверх"}`
          );

          topRightYChank - 3 + j > baseNPCLevel
            ? (NPCObj.directionPointer = 1)
            : (NPCObj.directionPointer = 2);
          NPCObj.NPCCondition.type = "aggression";

          return;
        }

        // if (
        //   game.gameField[topRightYChank - 3 + j][topRightXChank + 1 + i]?.objectDataChank
        //     ?.isGamerChank === true
        // ) {
        //   console.log(`user detected: ${topRightYChank - 3 + j}: ${topRightXChank + 1 + i}`);

        //   return;
        // }

        chanks.push({
          x: topRightXChank + 1 + i,
          y: topRightYChank - 3 + j,
        });
      }
    }
    NPCObj.NPCCondition.type = "observation";

    io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCViewArea", chanks);
  }
};
