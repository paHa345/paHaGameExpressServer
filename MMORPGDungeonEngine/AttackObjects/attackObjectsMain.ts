import { DefaultEventsMap, Server } from "socket.io";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { NPCOrGamerObjectsData } from "../../types";
import { setClientCoordinates } from "../MoveObjects/moveObjectsMain";
import { reduceNPCHP } from "../StatObjects/statObjectsMain";

export const attackObjectMainMechanism = (
  attackObjectID: string,
  direction: UserMoveDirections,
  attackObjectStatus: "gamer" | "NPC",
  attackObjectType: string,

  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  if (game.attackStatusObj[attackObjectID]?.isCooldown) {
    return;
  }
  if (game.attackStatusObj[attackObjectID]?.isActive) {
    return;
  }

  //тут разделение на мехиники атаки NPC или игрока

  if (attackObjectStatus === "gamer") {
    setAttackObjectStatus(attackObjectID, attackObjectStatus, attackObjectType, io);
    const chanksAndObjectsUnderAttack = getChanksAndObjectsUnderAttack(
      game.users[attackObjectID].moveDirection,
      attackObjectID,
      io
    );

    if (chanksAndObjectsUnderAttack?.objectUnderAttack) {
      calculateDamage(
        game.users[attackObjectID].moveDirection,
        attackObjectID,
        io,
        chanksAndObjectsUnderAttack?.objectUnderAttack
      );
    }
  }

  if (attackObjectStatus === "NPC") {
    console.log("NPC Attack");
    // сначала определяем  чанки, по которым будут проходить удары
    // отправляем их на клиент
    // NPC останавливается
    // и через 1000 мс выполняется атака
  }
};

export const setAttackObjectStatus = (
  attackObjectID: string,
  attackObjectStatus: "gamer" | "NPC",
  attackObjectType: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  // if (attackObjectStatus === "NPC") {
  //   // вычисляем чанки под атакой, отправляем их на коиент
  //   // а через 1000 мс проходит атака

  //   const chanksUnderAttack = getChanksAndObjectsUnderAttack(
  //     game.users[attackObjectID].moveDirection,
  //     attackObjectID,
  //     io
  //   );
  //   io.of("/")
  //     .to("68a82c599d9ad19c1b4ec4d2")
  //     .emit("serverNPCAttackChanks", chanksUnderAttack?.chanksUnderAttack);

  //   setTimeout(() => {
  //     game.users[attackObjectID].imgName = `${attackObjectType}AttackImage`;
  //     const startAttackTimestamp = Date.now();
  //     game.attackStatusObj[attackObjectID] = {
  //       time: startAttackTimestamp,
  //       isCooldown: true,
  //       isActive: true,
  //     };

  //     io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverStartAttack", {
  //       attackObjectID: attackObjectID,
  //     });

  //     let stopAttackInterval: any;

  //     stopAttackInterval = setInterval(() => {
  //       if (Date.now() - startAttackTimestamp > 500) {
  //         game.attackStatusObj[attackObjectID].isActive = false;
  //         game.users[attackObjectID].imgName = `${game.users[attackObjectID].objectType}WalkImage`;
  //         clearInterval(stopAttackInterval);
  //       }
  //     }, 100);

  //     let cooldownInterval: any;

  //     cooldownInterval = setInterval(() => {
  //       if (Date.now() - startAttackTimestamp > 1000) {
  //         game.attackStatusObj[attackObjectID].isCooldown = false;
  //         clearInterval(cooldownInterval);
  //       }
  //     }, 100);
  //   }, 1000);
  // }
  game.users[attackObjectID].imgName = `${attackObjectType}AttackImage`;

  const startAttackTimestamp = Date.now();
  game.attackStatusObj[attackObjectID] = {
    time: startAttackTimestamp,
    isCooldown: true,
    isActive: true,
  };

  io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverStartAttack", {
    attackObjectID: attackObjectID,
  });

  let stopAttackInterval: any;

  stopAttackInterval = setInterval(() => {
    if (Date.now() - startAttackTimestamp > 500) {
      game.attackStatusObj[attackObjectID].isActive = false;
      game.users[attackObjectID].imgName = `${game.users[attackObjectID].objectType}WalkImage`;
      clearInterval(stopAttackInterval);
    }
  }, 100);

  let cooldownInterval: any;

  cooldownInterval = setInterval(() => {
    if (Date.now() - startAttackTimestamp > 1000) {
      game.attackStatusObj[attackObjectID].isCooldown = false;
      // io.of("/").to(clientData.roomID).emit("serverStopAttackCooldown", {
      //   // roomID: clientData.roomID,
      //   // socketID: attackObjectID,
      //   // attackStatus: game.users[attackObjectID].attackStatus,
      //   // isCooldown: false,
      // });
      // console.log("Stop interval");
      // increaseFrameNumber();

      // io.of("/").to(clientData.roomID).emit("serverResetCooldown", {
      //   attackStatusObj: game.attackStatusObj,
      // });

      clearInterval(cooldownInterval);
    }
  }, 100);
};

export const getChanksAndObjectsUnderAttack = (
  direction: UserMoveDirections,
  attackObjectID: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const topLeftXChank = Math.floor(game.users[attackObjectID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[attackObjectID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(
    game.users[attackObjectID].square.currentCoord.bottomLeft.x / 8
  );
  const bottomLeftYChank = Math.floor(
    game.users[attackObjectID].square.currentCoord.bottomLeft.y / 8
  );
  const topRightXChank = Math.floor(game.users[attackObjectID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[attackObjectID].square.currentCoord.topRight.y / 8);

  const objectUnderAttack: { [underAttackObjectID: string]: number } = {};

  const chanksUnderAttack: { row: number; col: number }[] = [];

  const addUnderAttackObjectsAndChunksArr = (
    underAttackChankObjectID: string | undefined,
    row: number,
    col: number
  ) => {
    chanksUnderAttack.push({ row: row, col: col });
    if (underAttackChankObjectID) {
      objectUnderAttack[underAttackChankObjectID] = 1;
    }
  };

  if (direction === UserMoveDirections.up || direction === UserMoveDirections.stop) {
    for (
      let i = 0;
      i <= NPCOrGamerObjectsData[game.users[attackObjectID].objectType].widthChanks;
      i++
    ) {
      game.gameField[topLeftYChank - 1][topLeftXChank + i].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[topLeftYChank - 1][topLeftXChank + i].objectDataChank.objectID,
        topLeftYChank - 1,
        topLeftXChank + i
      );
    }
  }
  if (direction === UserMoveDirections.down) {
    for (
      let i = 0;
      i <= NPCOrGamerObjectsData[game.users[attackObjectID].objectType].widthChanks;
      i++
    ) {
      game.gameField[bottomLeftYChank][bottomLeftXChank + i].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[bottomLeftYChank][bottomLeftXChank + i].objectDataChank.objectID,
        bottomLeftYChank,
        bottomLeftXChank + i
      );
    }
  }
  if (direction === UserMoveDirections.left) {
    if (topLeftXChank - 1 < 0) {
      return;
    }
    for (
      let i = 0;
      i < NPCOrGamerObjectsData[game.users[attackObjectID].objectType].heightChanks;
      i++
    ) {
      game.gameField[topLeftYChank + i][topLeftXChank - 1].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[topLeftYChank + i][topLeftXChank - 1].objectDataChank.objectID,
        topLeftYChank + i,
        topLeftXChank - 1
      );
    }
  }
  if (direction === UserMoveDirections.right) {
    for (
      let i = 0;
      i < NPCOrGamerObjectsData[game.users[attackObjectID].objectType].heightChanks;
      i++
    ) {
      game.gameField[topRightYChank + i][topRightXChank + 1].chankUnderAttack = true;
      addUnderAttackObjectsAndChunksArr(
        game.gameField[topRightYChank + i][topRightXChank + 1].objectDataChank.objectID,
        topRightYChank + i,
        topRightXChank + 1
      );
    }
  }

  setTimeout(() => {
    chanksUnderAttack.map((chank) => {
      game.gameField[chank.row][chank.col].chankUnderAttack = false;
    });
  }, 600);

  return {
    chanksUnderAttack: chanksUnderAttack,
    objectUnderAttack: objectUnderAttack,
  };
};

export const calculateDamage = (
  direction: UserMoveDirections,
  attackObjectID: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  objectUnderAttack: {
    [underAttackObjectID: string]: number;
  }
) => {
  for (const underAttackObjectID in objectUnderAttack) {
    if (!game.users[underAttackObjectID]) return;

    if (game.statObj.NPC[underAttackObjectID] === undefined) return;

    // отнимаем hp у лбъекта, по которому проходит урон

    reduceNPCHP(underAttackObjectID, attackObjectID);

    // если у объекта по которому проходит урон, не осталось hp, то запускается анимация
    //  и объект удаляется и очищаются занимаемые чанки
    if (game.statObj.NPC[underAttackObjectID].currentHP <= 0) {
      // находим чанки и очищаем их
      const getDeletedObjectCurrentChanks = (underAttackObjectID: string) => {
        const topLeftXChank = Math.floor(
          game.users[underAttackObjectID].square.currentCoord.topLeft.x / 8
        );
        const topLeftYChank = Math.floor(
          game.users[underAttackObjectID].square.currentCoord.topLeft.y / 8
        );

        const deletedObjectType = game.users[underAttackObjectID].objectType;

        for (let i = 0; i <= NPCOrGamerObjectsData[deletedObjectType].widthChanks; i++) {
          for (let j = 0; j <= NPCOrGamerObjectsData[deletedObjectType].heightChanks; j++) {
            if (
              game.gameField[topLeftYChank + j][topLeftXChank + i].objectDataChank.objectID ===
              underAttackObjectID
            ) {
              game.gameField[topLeftYChank + j][topLeftXChank + i].objectDataChank = {
                objectID: undefined,
                isObjectChank: false,
                isGamerChank: null,
              };
            }
          }
        }
      };

      getDeletedObjectCurrentChanks(underAttackObjectID);

      game.users[underAttackObjectID].deathAnimationStatus = true;
      game.users[
        underAttackObjectID
      ].imgName = `${game.users[underAttackObjectID].objectType}DeathImage`;

      io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverNPCDeathAnimationStatus", {
        underAttackObjectID: underAttackObjectID,
      });

      setTimeout(() => {
        delete game.users[underAttackObjectID];
      }, 1200);

      // setTimeout(() => {
      //   chanksUnderAttack.map((chank) => {
      //     game.gameField[chank.row][chank.col].chankUnderAttack = false;
      //   });
      // }, 600);

      return;
    }

    // отправляем всем клиентам данные о hp объекта,
    // по которому прошёл урон

    io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverUnderAttackObjectStat", {
      underAttackObjID: underAttackObjectID,
      underAttackObjStat: game.statObj.NPC[underAttackObjectID],
    });

    setClientCoordinates(game.users[underAttackObjectID].objectType, underAttackObjectID, {
      direction: direction,
      roomID: "asdasd",
      shiftUserPixels: 4,
    });
    game.users[underAttackObjectID].getDamageStatus = true;
    game.users[
      underAttackObjectID
    ].imgName = `${game.users[underAttackObjectID].objectType}GetDamageImage`;

    setTimeout(() => {
      game.users[underAttackObjectID].getDamageStatus = false;
      game.users[
        underAttackObjectID
      ].imgName = `${game.users[underAttackObjectID].objectType}WalkImage`;
    }, 900);
  }
};
