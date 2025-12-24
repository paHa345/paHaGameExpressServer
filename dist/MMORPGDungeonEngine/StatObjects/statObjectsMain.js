"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceGamerHP = exports.reduceNPCHP = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const reduceNPCHP = (underAttackObjectID, attackObjectID) => {
    if (!gameObject_1.game.statObj.gamers[attackObjectID])
        return;
    gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP =
        gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP -
            (gameObject_1.game.statObj.gamers[attackObjectID].currentDamage -
                gameObject_1.game.statObj.NPC[underAttackObjectID].currentArmour);
    gameObject_1.game.statObj.NPC[underAttackObjectID].percentHP =
        (gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP /
            gameObject_1.game.statObj.NPC[underAttackObjectID].baseHP) *
            100;
};
exports.reduceNPCHP = reduceNPCHP;
const reduceGamerHP = (underAttackObjectID, attackObjectID) => {
    if (!gameObject_1.game.statObj.NPC[attackObjectID])
        return;
    gameObject_1.game.statObj.gamers[underAttackObjectID].currentHP =
        gameObject_1.game.statObj.gamers[underAttackObjectID].currentHP -
            (gameObject_1.game.statObj.NPC[attackObjectID].currentDamage -
                gameObject_1.game.statObj.gamers[underAttackObjectID].currentArmour);
    gameObject_1.game.statObj.gamers[underAttackObjectID].percentHP =
        (gameObject_1.game.statObj.gamers[underAttackObjectID].currentHP /
            gameObject_1.game.statObj.gamers[underAttackObjectID].baseHP) *
            100;
    console.log("Gamer Stat");
    console.log(gameObject_1.game.statObj.gamers[underAttackObjectID].currentHP);
};
exports.reduceGamerHP = reduceGamerHP;
