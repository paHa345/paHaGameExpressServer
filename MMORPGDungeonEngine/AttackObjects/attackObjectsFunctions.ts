import { DefaultEventsMap, Server } from "socket.io";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { NPCOrGamerObjectsData } from "../../types";
import { reduceGamerHP, reduceNPCHP } from "../StatObjects/statObjectsMain";
import { setClientCoordinates } from "../MoveObjects/moveObjectsMain";

export const setAttackObjectStatus = (
  attackObjectID: string,
  attackObjectStatus: "gamer" | "NPC",
  attackObjectType: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
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
      clearInterval(cooldownInterval);
    }
  }, 100);
};

export const getChanksAndObjectsUnderAttack = (
  direction: UserMoveDirections,
  attackObjectID: string,
  attackAreaDeep: number,
  objectEdgeChanks: {
    topLeftXChank: number;
    topLeftYChank: number;
    bottomLeftXChank: number;
    bottomLeftYChank: number;
    topRightXChank: number;
    topRightYChank: number;
  },
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
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
      for (let j = 0; j < attackAreaDeep; j++) {
        if (objectEdgeChanks.topLeftYChank - 1 - j < 0) continue;
        game.gameField[objectEdgeChanks.topLeftYChank - 1 - j][
          objectEdgeChanks.topLeftXChank + i
        ].chankUnderAttack = true;
        addUnderAttackObjectsAndChunksArr(
          game.gameField[objectEdgeChanks.topLeftYChank - 1 - j][objectEdgeChanks.topLeftXChank + i]
            .objectDataChank.objectID,
          objectEdgeChanks.topLeftYChank - 1 - j,
          objectEdgeChanks.topLeftXChank + i
        );
      }
    }
  }
  if (direction === UserMoveDirections.down) {
    for (
      let i = 0;
      i <= NPCOrGamerObjectsData[game.users[attackObjectID].objectType].widthChanks;
      i++
    ) {
      for (let j = 0; j < attackAreaDeep; j++) {
        if (objectEdgeChanks.bottomLeftYChank + j > game.mapSize - 1) continue;

        game.gameField[objectEdgeChanks.bottomLeftYChank + j][
          objectEdgeChanks.bottomLeftXChank + i
        ].chankUnderAttack = true;
        addUnderAttackObjectsAndChunksArr(
          game.gameField[objectEdgeChanks.bottomLeftYChank + j][
            objectEdgeChanks.bottomLeftXChank + i
          ].objectDataChank.objectID,
          objectEdgeChanks.bottomLeftYChank + j,
          objectEdgeChanks.bottomLeftXChank + i
        );
      }
    }
  }
  if (direction === UserMoveDirections.left) {
    if (objectEdgeChanks.topLeftXChank - 1 < 0) {
      return;
    }
    for (
      let i = 0;
      i < NPCOrGamerObjectsData[game.users[attackObjectID].objectType].heightChanks;
      i++
    ) {
      for (let j = 0; j < attackAreaDeep; j++) {
        if (objectEdgeChanks.topLeftXChank - 1 - j < 0) continue;
        game.gameField[objectEdgeChanks.topLeftYChank + i][
          objectEdgeChanks.topLeftXChank - 1 - j
        ].chankUnderAttack = true;
        addUnderAttackObjectsAndChunksArr(
          game.gameField[objectEdgeChanks.topLeftYChank + i][objectEdgeChanks.topLeftXChank - 1 - j]
            .objectDataChank.objectID,
          objectEdgeChanks.topLeftYChank + i,
          objectEdgeChanks.topLeftXChank - 1 - j
        );
      }
    }
  }
  if (direction === UserMoveDirections.right) {
    for (
      let i = 0;
      i < NPCOrGamerObjectsData[game.users[attackObjectID].objectType].heightChanks;
      i++
    ) {
      for (let j = 0; j < attackAreaDeep; j++) {
        if (objectEdgeChanks.topRightXChank + 1 + j > game.mapSize - 1) continue;

        game.gameField[objectEdgeChanks.topRightYChank + i][
          objectEdgeChanks.topRightXChank + 1 + j
        ].chankUnderAttack = true;
        addUnderAttackObjectsAndChunksArr(
          game.gameField[objectEdgeChanks.topRightYChank + i][
            objectEdgeChanks.topRightXChank + 1 + j
          ].objectDataChank.objectID,
          objectEdgeChanks.topRightYChank + i,
          objectEdgeChanks.topRightXChank + 1 + j
        );
      }
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

    if (game.users[underAttackObjectID].type === "NPC") {
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
        underAttackObjectType: game.users[underAttackObjectID].type,
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

      console.log(game.users[underAttackObjectID].imgName);

      setTimeout(() => {
        game.users[underAttackObjectID].getDamageStatus = false;
        game.users[
          underAttackObjectID
        ].imgName = `${game.users[underAttackObjectID].objectType}WalkImage`;
      }, 900);
    }
    if (game.users[underAttackObjectID].type === "gamer") {
      reduceGamerHP(underAttackObjectID, attackObjectID);
      io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverUnderAttackObjectStat", {
        underAttackObjID: underAttackObjectID,
        underAttackObjectType: game.users[underAttackObjectID].type,
        underAttackObjStat: game.statObj.gamers[underAttackObjectID],
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
      }, 750);
    }
  }
};

export const NPCGetChanksUnderAttack = (
  objectEdgeChanks: {
    topLeftXChank: number;
    topLeftYChank: number;
    bottomLeftXChank: number;
    bottomLeftYChank: number;
    topRightXChank: number;
    topRightYChank: number;
  },
  attackObjectID: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  game.NPCDataObj[attackObjectID].NPCPrepareToAttackStatus = true;

  if (
    game.users[attackObjectID].NPCViewDirection === UserMoveDirections.up ||
    game.users[attackObjectID].NPCViewDirection === UserMoveDirections.stop
  ) {
    game.NPCUnderAttackChanksObj[attackObjectID] = {
      underAttackArea: {
        baseChankX: objectEdgeChanks.topLeftXChank,
        baseChankY: objectEdgeChanks.topLeftYChank - 3,
        heightChanksNum: 3,
        widthChanksNum: NPCOrGamerObjectsData[game.users[attackObjectID].objectType].widthChanks,
      },
    };

    io.of("/")
      .to("68a82c599d9ad19c1b4ec4d2")
      .emit("NPCChanksUnderAttack", game.NPCUnderAttackChanksObj);
  }
  if (game.users[attackObjectID].NPCViewDirection === UserMoveDirections.down) {
    game.NPCUnderAttackChanksObj[attackObjectID] = {
      underAttackArea: {
        baseChankX: objectEdgeChanks.bottomLeftXChank,
        baseChankY: objectEdgeChanks.bottomLeftYChank,
        heightChanksNum: 3,
        widthChanksNum: NPCOrGamerObjectsData[game.users[attackObjectID].objectType].widthChanks,
      },
    };

    io.of("/")
      .to("68a82c599d9ad19c1b4ec4d2")
      .emit("NPCChanksUnderAttack", game.NPCUnderAttackChanksObj);
  }
  if (game.users[attackObjectID].NPCViewDirection === UserMoveDirections.left) {
    game.NPCUnderAttackChanksObj[attackObjectID] = {
      underAttackArea: {
        baseChankX: objectEdgeChanks.topLeftXChank - 3,
        baseChankY: objectEdgeChanks.topLeftYChank,
        heightChanksNum: NPCOrGamerObjectsData[game.users[attackObjectID].objectType].heightChanks,
        widthChanksNum: 3,
      },
    };

    io.of("/")
      .to("68a82c599d9ad19c1b4ec4d2")
      .emit("NPCChanksUnderAttack", game.NPCUnderAttackChanksObj);
  }
  if (game.users[attackObjectID].NPCViewDirection === UserMoveDirections.right) {
    game.NPCUnderAttackChanksObj[attackObjectID] = {
      underAttackArea: {
        baseChankX: objectEdgeChanks.topRightXChank,
        baseChankY: objectEdgeChanks.topRightYChank,
        heightChanksNum: NPCOrGamerObjectsData[game.users[attackObjectID].objectType].heightChanks,
        widthChanksNum: 3,
      },
    };

    io.of("/")
      .to("68a82c599d9ad19c1b4ec4d2")
      .emit("NPCChanksUnderAttack", game.NPCUnderAttackChanksObj);
  }
};
