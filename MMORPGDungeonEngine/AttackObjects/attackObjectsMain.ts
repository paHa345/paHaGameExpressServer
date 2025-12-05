import { DefaultEventsMap, Server } from "socket.io";
import { game, UserMoveDirections } from "../gameObject/gameObject";
import { NPCOrGamerObjectsData } from "../../types";
import { setClientCoordinates } from "../MoveObjects/moveObjectsMain";
import { reduceGamerHP, reduceNPCHP } from "../StatObjects/statObjectsMain";
import {
  calculateDamage,
  getAreaAndObjectsUnderAttack,
  getChanksAndObjectsUnderAttack,
  NPCGetChanksUnderAttack,
  setAttackObjectStatus,
} from "./attackObjectsFunctions";

export const getObjectEdgeChanks = (objectID: string) => {
  const topLeftXChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.x / 8);
  const topLeftYChank = Math.floor(game.users[objectID].square.currentCoord.topLeft.y / 8);
  const bottomLeftXChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.x / 8);
  const bottomLeftYChank = Math.floor(game.users[objectID].square.currentCoord.bottomLeft.y / 8);
  const topRightXChank = Math.floor(game.users[objectID].square.currentCoord.topRight.x / 8);
  const topRightYChank = Math.floor(game.users[objectID].square.currentCoord.topRight.y / 8);

  return {
    topLeftXChank: topLeftXChank,
    topLeftYChank: topLeftYChank,
    bottomLeftXChank: bottomLeftXChank,
    bottomLeftYChank: bottomLeftYChank,
    topRightXChank: topRightXChank,
    topRightYChank: topRightYChank,
  };
};

export const attackObjectMainMechanism = (
  attackObjectID: string,
  direction: UserMoveDirections,
  attackObjectStatus: "gamer" | "NPC",
  attackObjectType: string,

  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const startAttack = Date.now();
  if (game.attackStatusObj[attackObjectID]?.isCooldown) {
    return;
  }
  if (game.attackStatusObj[attackObjectID]?.isActive) {
    return;
  }

  //тут разделение на мехиники атаки NPC или игрока
  const objectEdgeChanks = getObjectEdgeChanks(attackObjectID);

  if (attackObjectStatus === "gamer") {
    setAttackObjectStatus(attackObjectID, attackObjectStatus, attackObjectType, io);

    const areaAndObjectsUnderAttack = getAreaAndObjectsUnderAttack(
      game.users[attackObjectID].moveDirection,
      attackObjectID,
      24
    );

    // const chanksAndObjectsUnderAttack = getChanksAndObjectsUnderAttack(
    //   game.users[attackObjectID].moveDirection,
    //   attackObjectID,
    //   1,
    //   objectEdgeChanks,
    //   io
    // );

    if (areaAndObjectsUnderAttack?.objectsUnderAttack) {
      calculateDamage(
        game.users[attackObjectID].moveDirection,
        attackObjectID,
        io,
        areaAndObjectsUnderAttack?.objectsUnderAttack
      );
    }
  }

  if (attackObjectStatus === "NPC") {
    // сначала определяем  чанки, по которым будут проходить удары
    // отправляем их на клиент
    // NPC останавливается
    // и через 2000 мс выполняется атака

    //рассчитаем чанки, по которым пройдёт удар

    const NPCAttack = () => {
      NPCGetChanksUnderAttack(objectEdgeChanks, attackObjectID, io);
      setTimeout(() => {
        delete game.NPCUnderAttackChanksObj[attackObjectID];
        if (game.NPCDataObj[attackObjectID]) {
          game.NPCDataObj[attackObjectID].NPCPrepareToAttackStatus = false;
        }
        io.of("/")
          .to("68a82c599d9ad19c1b4ec4d2")
          .emit("NPCChanksUnderAttack", game.NPCUnderAttackChanksObj);
        if (!game.users[attackObjectID]) return;
        const chanksAndObjectsUnderAttack = getChanksAndObjectsUnderAttack(
          game.users[attackObjectID].moveDirection,
          attackObjectID,
          4,
          objectEdgeChanks,
          io
        );

        setAttackObjectStatus(attackObjectID, attackObjectStatus, attackObjectType, io);

        if (chanksAndObjectsUnderAttack?.objectUnderAttack) {
          calculateDamage(
            game.users[attackObjectID].moveDirection,
            attackObjectID,
            io,
            chanksAndObjectsUnderAttack?.objectUnderAttack
          );
        }
      }, 3000);
    };

    NPCAttack();
  }
  const finishAttack = Date.now();

  console.log(`Attack ${finishAttack - startAttack}`);
};
