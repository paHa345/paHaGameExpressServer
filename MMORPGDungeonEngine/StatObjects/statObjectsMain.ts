import { game } from "../gameObject/gameObject";

export const reduceNPCHP = (underAttackObjectID: string, attackObjectID: string) => {
  game.statObj.NPC[underAttackObjectID].currentHP =
    game.statObj.NPC[underAttackObjectID].currentHP -
    (1 - game.statObj.NPC[underAttackObjectID].currentArmour) *
      game.statObj.gamers[attackObjectID].currentDamage;

  game.statObj.NPC[underAttackObjectID].percentHP =
    (game.statObj.NPC[underAttackObjectID].currentHP /
      game.statObj.NPC[underAttackObjectID].baseHP) *
    100;
};
