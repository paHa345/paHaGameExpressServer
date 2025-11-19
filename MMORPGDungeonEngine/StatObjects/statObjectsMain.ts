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
export const reduceGamerHP = (underAttackObjectID: string, attackObjectID: string) => {
  if (!game.statObj.NPC[attackObjectID]) return;
  game.statObj.gamers[underAttackObjectID].currentHP =
    game.statObj.gamers[underAttackObjectID].currentHP -
    (1 - game.statObj.gamers[underAttackObjectID].currentArmour) *
      game.statObj.NPC[attackObjectID].currentDamage;

  game.statObj.gamers[underAttackObjectID].percentHP =
    (game.statObj.gamers[underAttackObjectID].currentHP /
      game.statObj.gamers[underAttackObjectID].baseHP) *
    100;

  console.log("Gamer Stat");
  console.log(game.statObj.gamers[underAttackObjectID].currentHP);
};
