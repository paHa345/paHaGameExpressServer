import { DefaultEventsMap, Server } from "socket.io";
import { game } from "../gameObject/gameObject";

let checkDropNearUserInterval: any;

const usersCurrentChanks: {
  [socketID: string]: {
    chank: string;
  };
} = {};

export const checkDropNearUser = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socketID: string
) => {
  checkDropNearUserInterval = setInterval(() => {
    for (const userID in game.users) {
      if (game.users[userID].type === "NPC") continue;

      const currentUserBottomLeftChanks = game.users[userID].square.currentCoord.bottomLeft;

      if (!usersCurrentChanks[userID]) {
        !usersCurrentChanks[
          `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(
            currentUserBottomLeftChanks.y / 8
          )}`
        ];
      }

      if (
        usersCurrentChanks[userID]?.chank !==
        `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(
          currentUserBottomLeftChanks.y / 8
        )}`
      ) {
        usersCurrentChanks[userID] = {
          chank: `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(
            currentUserBottomLeftChanks.y / 8
          )}`,
        };
      } else {
        continue;
      }

      // сектор в котором находится игрок

      const curreUserBottonLeftSector = {
        sectorID: `${Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20)}:${Math.floor(
          Math.floor(currentUserBottomLeftChanks.x / 8) / 20
        )}`,
        sectorXValue: Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20),
        sectorYValue: Math.floor(Math.floor(currentUserBottomLeftChanks.x / 8) / 20),
      };

      // console.log(curreUserBottonLeftSector);
      // смотрим шесть секторов рядом
      // и проверяем в них объекты дропа

      // console.log(
      //   `User chanks: ${Math.floor(currentUserBottomLeftChanks.y / 8)}: ${Math.floor(
      //     currentUserBottomLeftChanks.x / 8
      //   )}`
      // );

      let isDropNearUser = false;

      for (
        let i = curreUserBottonLeftSector.sectorXValue;
        i < curreUserBottonLeftSector.sectorXValue + 2;
        i++
      ) {
        if (isDropNearUser) break;
        if (i > Math.floor(game.mapSize / 20) - 1) continue;
        for (
          let j = curreUserBottonLeftSector.sectorYValue - 1;
          j < curreUserBottonLeftSector.sectorYValue + 2;
          j++
        ) {
          if (isDropNearUser) break;

          if (j < 0 || j > Math.floor(game.mapSize / 20) - 1) continue;
          if (!game.dropObject.dropObjectSectors[`${i}:${j}`]) continue;
          // console.log(game.dropObject.dropObjectSectors[`${i}:${j}`]);
          game.dropObject.dropObjectSectors[`${i}:${j}`].forEach((dropSectorEl) => {
            if (
              Math.pow(dropSectorEl.XChank - Math.floor(currentUserBottomLeftChanks.y / 8), 2) <
                25 &&
              Math.pow(dropSectorEl.YChank - Math.floor(currentUserBottomLeftChanks.x / 8), 2) < 25
            ) {
              // console.log(`Drop near`);
              isDropNearUser = true;
            }
          });
        }
      }
      if (!isDropNearUser) {
        io.to(socketID).emit("showPickUpDropButtonStatus", {
          showButtonStatus: false,
          XButtonImageCoord: 0,
          YButtonImageCoord: 0,
        });
      } else {
        io.to(socketID).emit("showPickUpDropButtonStatus", {
          showButtonStatus: true,
          XButtonImageCoord: 0,
          YButtonImageCoord: 0,
        });
      }
    }
  }, 1000);
};

export const clearCheckDropNearUserInterval = () => {
  clearInterval(checkDropNearUserInterval);
  checkDropNearUserInterval = null;
};

export const pickUpDropNearUser = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socketID: string
) => {
  console.log(`Pick Up Loot User ${socketID}`);

  //находим чанк, в котором находится конкретный игрок
  // сектор, в котором он находится

  const currentUserBottomLeftChanks = game.users[socketID].square.currentCoord.bottomLeft;

  console.log(
    `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(
      currentUserBottomLeftChanks.y / 8
    )}`
  );

  const curreUserBottonLeftSector = {
    sectorID: `${Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20)}:${Math.floor(
      Math.floor(currentUserBottomLeftChanks.x / 8) / 20
    )}`,
    sectorXValue: Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20),
    sectorYValue: Math.floor(Math.floor(currentUserBottomLeftChanks.x / 8) / 20),
  };

  console.log(curreUserBottonLeftSector);

  // смотрим 3 сектора рядом и 3 секи=тора ниже
  // находим в них объекты дропа, которые находятся в чанках рядом с игроком

  for (
    let i = curreUserBottonLeftSector.sectorXValue;
    i < curreUserBottonLeftSector.sectorXValue + 2;
    i++
  ) {
    if (i > Math.floor(game.mapSize / 20) - 1) continue;
    for (
      let j = curreUserBottonLeftSector.sectorYValue - 1;
      j < curreUserBottonLeftSector.sectorYValue + 2;
      j++
    ) {
      if (j < 0 || j > Math.floor(game.mapSize / 20) - 1) continue;
      if (!game.dropObject.dropObjectSectors[`${i}:${j}`]) continue;
      game.dropObject.dropObjectSectors[`${i}:${j}`].forEach((dropSectorEl, index) => {
        if (
          Math.pow(dropSectorEl.XChank - Math.floor(currentUserBottomLeftChanks.y / 8), 2) < 25 &&
          Math.pow(dropSectorEl.YChank - Math.floor(currentUserBottomLeftChanks.x / 8), 2) < 25
        ) {
          // console.log(`Drop near`);
          // console.log(dropSectorEl);
          // console.log(index);

          const dropObject =
            game.dropObject.objectData[
              `${game.dropObject.dropObjectSectors[`${i}:${j}`][index].XChank}:${
                game.dropObject.dropObjectSectors[`${i}:${j}`][index].YChank
              }`
            ];

          // game.users[socketID].inventory.push({
          //   imageName: dropObject.
          // })
          delete game.dropObject.objectData[
            `${game.dropObject.dropObjectSectors[`${i}:${j}`][index].XChank}:${
              game.dropObject.dropObjectSectors[`${i}:${j}`][index].YChank
            }`
          ];
          game.dropObject.dropObjectSectors[`${i}:${j}`].splice(index, 1);
        }
      });
    }
  }

  io.to(socketID).emit("getDropObjectFromServer", game.dropObject.objectData);
};
