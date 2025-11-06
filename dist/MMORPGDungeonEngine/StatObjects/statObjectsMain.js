"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceNPCHP = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const reduceNPCHP = (underAttackObjectID, attackObjectID) => {
    if (!gameObject_1.game.statObj.gamers[attackObjectID])
        return;
    gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP =
        gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP -
            (1 - gameObject_1.game.statObj.NPC[underAttackObjectID].currentArmour) *
                gameObject_1.game.statObj.gamers[attackObjectID].currentDamage;
    gameObject_1.game.statObj.NPC[underAttackObjectID].percentHP =
        (gameObject_1.game.statObj.NPC[underAttackObjectID].currentHP /
            gameObject_1.game.statObj.NPC[underAttackObjectID].baseHP) *
            100;
};
exports.reduceNPCHP = reduceNPCHP;
