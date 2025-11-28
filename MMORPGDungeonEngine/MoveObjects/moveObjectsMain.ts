import { DefaultEventsMap, Server } from "socket.io";
import { NPCOrGamerObjectsData } from "../../types";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { NPCViewMain } from "../NPCView/NPCViewMain";
import { setCurrentCoord, setMoveCoord } from "./moveObjectsFunctions";

// export const setUserCurrentChanks = (
//   chanksQuantity: { width: number; height: number },
//   objectID: string,
//   direction?: UserMoveDirections
// ) => {
//   if (!game.users[objectID]) {
//     return;
//   }
//   const prevTopLeftXChank = Math.floor(game.users[objectID].square.prevCoord.topLeft.x / 8);
//   const prevTopLeftYChank = Math.floor(game.users[objectID].square.prevCoord.topLeft.y / 8);
//   const prevBottomLeftXChank = Math.floor(game.users[objectID].square.prevCoord.bottomLeft.x / 8);
//   const prevBottomLeftYChank = Math.floor(game.users[objectID].square.prevCoord.bottomLeft.y / 8);
//   const prevTopRightXChank = Math.floor(game.users[objectID].square.prevCoord.topRight.x / 8);
//   const prevTopRightYChank = Math.floor(game.users[objectID].square.prevCoord.topRight.y / 8);

//   const topLeftXChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8);
//   const topLeftYChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8);
//   const bottomLeftXChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8);
//   const bottomLeftYChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8);
//   const topRightXChank = Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8);
//   const topRightYChank = Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8);

//   const isGamer = game.users[objectID].type === "gamer";

//   for (let i = 0; i <= chanksQuantity.width; i++) {
//     if (direction === UserMoveDirections.down) {
//       game.gameField[prevTopLeftYChank][prevTopLeftXChank + i].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//     }

//     game.gameField[topLeftYChank][topLeftXChank + i].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//     if (direction === UserMoveDirections.up) {
//       game.gameField[prevBottomLeftYChank - 1][prevBottomLeftXChank + i].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//     }
//     game.gameField[bottomLeftYChank - 1][bottomLeftXChank + i].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//   }

//   for (let i = 0; i < chanksQuantity.height; i++) {
//     game.gameField[topLeftYChank + i][topLeftXChank].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };

//     if (direction === UserMoveDirections.right) {
//       game.gameField[prevTopLeftYChank + i][prevTopLeftXChank].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//     }
//     game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
//       objectID: objectID,
//       isObjectChank: true,
//       isGamerChank: isGamer,
//     };
//     if (direction === UserMoveDirections.left) {
//       game.gameField[prevTopRightYChank + i][prevTopRightXChank].objectDataChank = {
//         objectID: undefined,
//         isObjectChank: false,
//         isGamerChank: null,
//       };
//       game.gameField[topRightYChank + i][topRightXChank].objectDataChank = {
//         objectID: objectID,
//         isObjectChank: true,
//         isGamerChank: isGamer,
//       };
//     }
//   }
// };

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

  setCurrentCoord(clientData, objectID);

  // setUserCurrentChanks(
  //   {
  //     height: NPCOrGamerObjectsData[objectType].heightChanks,
  //     width: NPCOrGamerObjectsData[objectType].widthChanks,
  //   },
  //   objectID,
  //   clientData.direction
  // );

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
