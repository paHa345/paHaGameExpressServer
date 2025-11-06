import { game } from "../gameObject/gameObject";

export const reduceNPCHP = (underAttackObjectID: string, attackObjectID: string) => {
  if (!game.statObj.gamers[attackObjectID]) return;
  game.statObj.NPC[underAttackObjectID].currentHP =
    game.statObj.NPC[underAttackObjectID].currentHP -
    (1 - game.statObj.NPC[underAttackObjectID].currentArmour) *
      game.statObj.gamers[attackObjectID].currentDamage;

  game.statObj.NPC[underAttackObjectID].percentHP =
    (game.statObj.NPC[underAttackObjectID].currentHP /
      game.statObj.NPC[underAttackObjectID].baseHP) *
    100;
};
