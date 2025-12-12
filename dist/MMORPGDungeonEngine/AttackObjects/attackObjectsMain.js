"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackObjectMainMechanism = exports.getObjectEdgeChanks = void 0;
const gameObject_1 = require("../gameObject/gameObject");
const attackObjectsFunctions_1 = require("./attackObjectsFunctions");
const getObjectEdgeChanks = (objectID) => {
    const topLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.x / 8);
    const topLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topLeft.y / 8);
    const bottomLeftXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.x / 8);
    const bottomLeftYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.bottomLeft.y / 8);
    const topRightXChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.x / 8);
    const topRightYChank = Math.floor(gameObject_1.game.users[objectID].square.currentCoord.topRight.y / 8);
    return {
        topLeftXChank: topLeftXChank,
        topLeftYChank: topLeftYChank,
        bottomLeftXChank: bottomLeftXChank,
        bottomLeftYChank: bottomLeftYChank,
        topRightXChank: topRightXChank,
        topRightYChank: topRightYChank,
    };
};
exports.getObjectEdgeChanks = getObjectEdgeChanks;
const attackObjectMainMechanism = (attackObjectID, direction, attackObjectStatus, attackObjectType, io) => {
    var _a, _b;
    const startAttack = Date.now();
    if ((_a = gameObject_1.game.attackStatusObj[attackObjectID]) === null || _a === void 0 ? void 0 : _a.isCooldown) {
        return;
    }
    if ((_b = gameObject_1.game.attackStatusObj[attackObjectID]) === null || _b === void 0 ? void 0 : _b.isActive) {
        return;
    }
    //тут разделение на мехиники атаки NPC или игрока
    const objectEdgeChanks = (0, exports.getObjectEdgeChanks)(attackObjectID);
    if (attackObjectStatus === "gamer") {
        (0, attackObjectsFunctions_1.setAttackObjectStatus)(attackObjectID, attackObjectStatus, attackObjectType, io);
        const areaAndObjectsUnderAttack = (0, attackObjectsFunctions_1.getAreaAndObjectsUnderAttack)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, 8);
        // const chanksAndObjectsUnderAttack = getChanksAndObjectsUnderAttack(
        //   game.users[attackObjectID].moveDirection,
        //   attackObjectID,
        //   1,
        //   objectEdgeChanks,
        //   io
        // );
        if (areaAndObjectsUnderAttack === null || areaAndObjectsUnderAttack === void 0 ? void 0 : areaAndObjectsUnderAttack.objectsUnderAttack) {
            (0, attackObjectsFunctions_1.calculateDamage)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, io, areaAndObjectsUnderAttack === null || areaAndObjectsUnderAttack === void 0 ? void 0 : areaAndObjectsUnderAttack.objectsUnderAttack);
        }
    }
    if (attackObjectStatus === "NPC") {
        // сначала определяем  чанки, по которым будут проходить удары
        // отправляем их на клиент
        // NPC останавливается
        // и через 2000 мс выполняется атака
        //рассчитаем чанки, по которым пройдёт удар
        const NPCAttack = () => {
            (0, attackObjectsFunctions_1.NPCGetChanksUnderAttack)(objectEdgeChanks, attackObjectID, io);
            setTimeout(() => {
                delete gameObject_1.game.NPCUnderAttackChanksObj[attackObjectID];
                if (gameObject_1.game.NPCDataObj[attackObjectID]) {
                    gameObject_1.game.NPCDataObj[attackObjectID].NPCPrepareToAttackStatus = false;
                }
                io.of("/")
                    .to("68a82c599d9ad19c1b4ec4d2")
                    .emit("NPCChanksUnderAttack", gameObject_1.game.NPCUnderAttackChanksObj);
                if (!gameObject_1.game.users[attackObjectID])
                    return;
                // const chanksAndObjectsUnderAttack = getChanksAndObjectsUnderAttack(
                //   game.users[attackObjectID].moveDirection,
                //   attackObjectID,
                //   4,
                //   objectEdgeChanks,
                //   io
                // );
                const areaAndObjectsUnderAttack = (0, attackObjectsFunctions_1.getAreaAndObjectsUnderAttack)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, 8);
                if (areaAndObjectsUnderAttack === null || areaAndObjectsUnderAttack === void 0 ? void 0 : areaAndObjectsUnderAttack.objectsUnderAttack) {
                    (0, attackObjectsFunctions_1.calculateDamage)(gameObject_1.game.users[attackObjectID].moveDirection, attackObjectID, io, areaAndObjectsUnderAttack === null || areaAndObjectsUnderAttack === void 0 ? void 0 : areaAndObjectsUnderAttack.objectsUnderAttack);
                }
            }, 3000);
        };
        NPCAttack();
    }
    const finishAttack = Date.now();
    console.log(`Attack ${finishAttack - startAttack}`);
};
exports.attackObjectMainMechanism = attackObjectMainMechanism;
