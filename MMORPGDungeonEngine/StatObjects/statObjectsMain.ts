import { game } from "../gameObject/gameObject";

export const reduceNPCHP = (underAttackObjectID: string, attackObjectID: string) => {
  if (!game.statObj.gamers[attackObjectID]) return;
  // console.log(
  //   `Damage: ${
  //     game.statObj.gamers[attackObjectID].currentDamage *
  //     Math.sqrt(
  //       (game.statObj.gamers[attackObjectID].currentDamage +
  //         game.statObj.gamers[attackObjectID].equipmentDamage) /
  //         game.statObj.NPC[underAttackObjectID].currentArmour
  //     )
  //   }`
  // );
  game.statObj.NPC[underAttackObjectID].currentHP =
    game.statObj.NPC[underAttackObjectID].currentHP -
    game.statObj.gamers[attackObjectID].currentDamage *
      Math.sqrt(
        (game.statObj.gamers[attackObjectID].currentDamage +
          game.statObj.gamers[attackObjectID].equipmentDamage) /
          game.statObj.NPC[underAttackObjectID].currentArmour
      );

  game.statObj.NPC[underAttackObjectID].percentHP =
    (game.statObj.NPC[underAttackObjectID].currentHP /
      game.statObj.NPC[underAttackObjectID].baseHP) *
    100;
};
export const reduceGamerHP = (underAttackObjectID: string, attackObjectID: string) => {
  if (!game.statObj.NPC[attackObjectID]) return;

  // console.log(
  //   `Damage: ${
  //     game.statObj.NPC[attackObjectID].currentDamage *
  //     Math.sqrt(
  //       game.statObj.NPC[attackObjectID].currentDamage /
  //         (game.statObj.gamers[underAttackObjectID].currentArmour +
  //           game.statObj.gamers[underAttackObjectID].equipmentArmour)
  //     )
  //   }`
  // );

  game.statObj.gamers[underAttackObjectID].currentHP =
    game.statObj.gamers[underAttackObjectID].currentHP -
    game.statObj.NPC[attackObjectID].currentDamage *
      Math.sqrt(
        game.statObj.NPC[attackObjectID].currentDamage /
          (game.statObj.gamers[underAttackObjectID].currentArmour +
            game.statObj.gamers[underAttackObjectID].equipmentArmour)
      );
  // game.statObj.gamers[underAttackObjectID].currentArmour);

  game.statObj.gamers[underAttackObjectID].percentHP =
    (game.statObj.gamers[underAttackObjectID].currentHP /
      game.statObj.gamers[underAttackObjectID].baseHP) *
    100;
};
