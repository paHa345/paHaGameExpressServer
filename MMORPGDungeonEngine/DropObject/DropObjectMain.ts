import { DefaultEventsMap, Server } from "socket.io";
import { game } from "../gameObject/gameObject";

let checkDropNearUserInterval: any;
// const setDropUsersCurrentChanks: {
//   [socketID: string]: {
//     chank: string;
//   };
// } = {};

export const checkDropNearUser = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  // socketID: string
) => {
  checkDropNearUserInterval = setInterval(() => {
    for (const userID in game.users) {
      if (game.users[userID].type === "NPC") continue;

      const currentUserBottomLeftChanks = game.users[userID].square.currentCoord.bottomLeft;

      if (!game.dropUsersCurrentChanks[String(userID)]) {
        game.dropUsersCurrentChanks[String(userID)];
      }

      if (
        game.dropUsersCurrentChanks[String(userID)]?.chank !==
        `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(
          currentUserBottomLeftChanks.y / 8
        )}`
      ) {
        game.dropUsersCurrentChanks[String(userID)] = {
          chank: `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(
            currentUserBottomLeftChanks.y / 8
          )}`,
        };
      } else {
        continue;
      }

      // console.log(`User ${userID} move`);
      // console.log(game.dropUsersCurrentChanks);
      // сектор в котором находится игрок

      const curreUserBottomLeftSector = {
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
        let i = curreUserBottomLeftSector.sectorXValue;
        i < curreUserBottomLeftSector.sectorXValue + 2;
        i++
      ) {
        if (isDropNearUser) break;
        if (i > Math.floor(game.mapSize / 20) - 1) continue;
        for (
          let j = curreUserBottomLeftSector.sectorYValue - 1;
          j < curreUserBottomLeftSector.sectorYValue + 2;
          j++
        ) {
          if (isDropNearUser) break;

          if (j < 0 || j > Math.floor(game.mapSize / 20) - 1) continue;
          if (!game.dropObject.dropObjectSectors[`${i}:${j}`]) continue;

          game.dropObject.dropObjectSectors[`${i}:${j}`].forEach((dropSectorEl) => {
            if (
              Math.pow(dropSectorEl.XChank - Math.floor(currentUserBottomLeftChanks.y / 8), 2) <
                25 &&
              Math.pow(dropSectorEl.YChank - Math.floor(currentUserBottomLeftChanks.x / 8), 2) < 25
            ) {
              // console.log(`Drop near ${userID}`);
              isDropNearUser = true;
            }
          });
        }
      }
      // delete usersCurrentChanks[socketID];
      // console.log(`${socketID}: ${isDropNearUser}`);
      if (!isDropNearUser) {
        io.to(userID).emit("showPickUpDropButtonStatus", {
          showButtonStatus: false,
          XButtonImageCoord: 0,
          YButtonImageCoord: 0,
        });
      } else {
        io.to(userID).emit("showPickUpDropButtonStatus", {
          showButtonStatus: true,
          XButtonImageCoord: 0,
          YButtonImageCoord: 0,
        });
      }
      isDropNearUser = false;
    }
  }, 1000);
};

export const clearCheckDropNearUserInterval = () => {
  clearInterval(checkDropNearUserInterval);
  checkDropNearUserInterval = null;
};

export const pickUpDropNearUser = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socketID: string,
  roomID: string
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

          dropObject.forEach((dropObj) => {
            game.usersInventoryAndEquipment[socketID].inventory.push({
              id: dropObj.id,
              type: dropObj.type,
              imageName: dropObj.imageName,
              XSpriteCoord: dropObj.XSpriteCoord,
              YSpriteCoord: dropObj.YSpriteCoord,
              sourceXLength: dropObj.sourceX,
              sourceYLength: dropObj.sourceY,
            });
          });

          io.to(socketID).emit("setUserEquipmentAndInventoryFromServer", {
            inventory: game.usersInventoryAndEquipment[socketID].inventory,
            equipment: game.usersInventoryAndEquipment[socketID].equipment,
          });

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

  // io.to(socketID).emit("getDropObjectFromServer", game.dropObject.objectData);
  io.of("/").to(roomID).emit("getDropObjectFromServer", game.dropObject.objectData);
};

export const equipUserObject = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socketID: string,
  objectID: string
) => {
  console.log(`Equip ${objectID} object to user ${socketID}`);

  // найти данный объект у конкретного пользователя
  // если его нет, то не продолжаем выполнять функцию

  const equipedObj: { index: number; objectType: string | undefined } = {
    index: -1,
    objectType: "",
  };

  for (let i = 0; i < game.usersInventoryAndEquipment[socketID].inventory.length; i++) {
    if (game.usersInventoryAndEquipment[socketID].inventory[i].id === objectID) {
      equipedObj.index = i;
      equipedObj.objectType = game.usersInventoryAndEquipment[socketID].inventory[i].type;
      break;
    }
  }

  if (equipedObj.index < 0) return;
  console.log(equipedObj);

  // добавляем объект в экипировку в соответствующую ячейку
  if (equipedObj.objectType === "helmet") {
    if (game.usersInventoryAndEquipment[socketID].equipment.helmet.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.helmet[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.helmet[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }
  if (equipedObj.objectType === "weapon") {
    if (game.usersInventoryAndEquipment[socketID].equipment.weapon.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.weapon[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.weapon[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }
  if (equipedObj.objectType === "shield") {
    if (game.usersInventoryAndEquipment[socketID].equipment.shield.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.shield[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.shield[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }
  if (equipedObj.objectType === "armour") {
    if (game.usersInventoryAndEquipment[socketID].equipment.armour.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.armour[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.armour[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }
  if (equipedObj.objectType === "boots") {
    if (game.usersInventoryAndEquipment[socketID].equipment.boots.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.boots[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.boots[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }
  if (equipedObj.objectType === "ring") {
    if (game.usersInventoryAndEquipment[socketID].equipment.ring.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.ring[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.ring[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }
  if (equipedObj.objectType === "amulet") {
    if (game.usersInventoryAndEquipment[socketID].equipment.amulet.length > 0) {
      game.usersInventoryAndEquipment[socketID].inventory.push(
        game.usersInventoryAndEquipment[socketID].equipment.amulet[0]
      );
    }
    game.usersInventoryAndEquipment[socketID].equipment.amulet[0] =
      game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
  }

  // удаляем объект из яцейки инвентаря
  game.usersInventoryAndEquipment[socketID].inventory.splice(equipedObj.index, 1);

  io.to(socketID).emit("setUserEquipmentAndInventoryFromServer", {
    inventory: game.usersInventoryAndEquipment[socketID].inventory,
    equipment: game.usersInventoryAndEquipment[socketID].equipment,
  });
};
