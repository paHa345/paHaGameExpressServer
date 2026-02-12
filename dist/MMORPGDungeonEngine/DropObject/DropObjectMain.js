"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipUserObject = exports.pickUpDropNearUser = exports.clearCheckDropNearUserInterval = exports.checkDropNearUser = void 0;
const gameObject_1 = require("../gameObject/gameObject");
let checkDropNearUserInterval;
const usersCurrentChanks = {};
const checkDropNearUser = (io, socketID) => {
    checkDropNearUserInterval = setInterval(() => {
        var _a;
        for (const userID in gameObject_1.game.users) {
            if (gameObject_1.game.users[userID].type === "NPC")
                continue;
            const currentUserBottomLeftChanks = gameObject_1.game.users[userID].square.currentCoord.bottomLeft;
            if (!usersCurrentChanks[userID]) {
                !usersCurrentChanks[`${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(currentUserBottomLeftChanks.y / 8)}`];
            }
            if (((_a = usersCurrentChanks[userID]) === null || _a === void 0 ? void 0 : _a.chank) !==
                `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(currentUserBottomLeftChanks.y / 8)}`) {
                usersCurrentChanks[userID] = {
                    chank: `${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(currentUserBottomLeftChanks.y / 8)}`,
                };
            }
            else {
                continue;
            }
            // сектор в котором находится игрок
            const curreUserBottonLeftSector = {
                sectorID: `${Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20)}:${Math.floor(Math.floor(currentUserBottomLeftChanks.x / 8) / 20)}`,
                sectorXValue: Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20),
                sectorYValue: Math.floor(Math.floor(currentUserBottomLeftChanks.x / 8) / 20),
            };
            // console.log(curreUserBottonLeftSector);
            // смотрим шесть секторов рядом
            // и проверяем в них объекты дропа
            // console.log(
            //   `User chanks: ${Math.floor(currentUserBottomLeftChanks.y / 8)}: ${Math.floor(
            //     currentUserBottomLeftChanks.x / 8
            //   )}`
            // );
            let isDropNearUser = false;
            for (let i = curreUserBottonLeftSector.sectorXValue; i < curreUserBottonLeftSector.sectorXValue + 2; i++) {
                if (isDropNearUser)
                    break;
                if (i > Math.floor(gameObject_1.game.mapSize / 20) - 1)
                    continue;
                for (let j = curreUserBottonLeftSector.sectorYValue - 1; j < curreUserBottonLeftSector.sectorYValue + 2; j++) {
                    if (isDropNearUser)
                        break;
                    if (j < 0 || j > Math.floor(gameObject_1.game.mapSize / 20) - 1)
                        continue;
                    if (!gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`])
                        continue;
                    // console.log(game.dropObject.dropObjectSectors[`${i}:${j}`]);
                    gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`].forEach((dropSectorEl) => {
                        if (Math.pow(dropSectorEl.XChank - Math.floor(currentUserBottomLeftChanks.y / 8), 2) <
                            25 &&
                            Math.pow(dropSectorEl.YChank - Math.floor(currentUserBottomLeftChanks.x / 8), 2) < 25) {
                            // console.log(`Drop near`);
                            isDropNearUser = true;
                        }
                    });
                }
            }
            if (!isDropNearUser) {
                io.to(socketID).emit("showPickUpDropButtonStatus", {
                    showButtonStatus: false,
                    XButtonImageCoord: 0,
                    YButtonImageCoord: 0,
                });
            }
            else {
                io.to(socketID).emit("showPickUpDropButtonStatus", {
                    showButtonStatus: true,
                    XButtonImageCoord: 0,
                    YButtonImageCoord: 0,
                });
            }
        }
    }, 1000);
};
exports.checkDropNearUser = checkDropNearUser;
const clearCheckDropNearUserInterval = () => {
    clearInterval(checkDropNearUserInterval);
    checkDropNearUserInterval = null;
};
exports.clearCheckDropNearUserInterval = clearCheckDropNearUserInterval;
const pickUpDropNearUser = (io, socketID, roomID) => {
    console.log(`Pick Up Loot User ${socketID}`);
    //находим чанк, в котором находится конкретный игрок
    // сектор, в котором он находится
    const currentUserBottomLeftChanks = gameObject_1.game.users[socketID].square.currentCoord.bottomLeft;
    console.log(`${Math.floor(currentUserBottomLeftChanks.x / 8)}:${Math.floor(currentUserBottomLeftChanks.y / 8)}`);
    const curreUserBottonLeftSector = {
        sectorID: `${Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20)}:${Math.floor(Math.floor(currentUserBottomLeftChanks.x / 8) / 20)}`,
        sectorXValue: Math.floor(Math.floor(currentUserBottomLeftChanks.y / 8) / 20),
        sectorYValue: Math.floor(Math.floor(currentUserBottomLeftChanks.x / 8) / 20),
    };
    console.log(curreUserBottonLeftSector);
    // смотрим 3 сектора рядом и 3 секи=тора ниже
    // находим в них объекты дропа, которые находятся в чанках рядом с игроком
    for (let i = curreUserBottonLeftSector.sectorXValue; i < curreUserBottonLeftSector.sectorXValue + 2; i++) {
        if (i > Math.floor(gameObject_1.game.mapSize / 20) - 1)
            continue;
        for (let j = curreUserBottonLeftSector.sectorYValue - 1; j < curreUserBottonLeftSector.sectorYValue + 2; j++) {
            if (j < 0 || j > Math.floor(gameObject_1.game.mapSize / 20) - 1)
                continue;
            if (!gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`])
                continue;
            gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`].forEach((dropSectorEl, index) => {
                if (Math.pow(dropSectorEl.XChank - Math.floor(currentUserBottomLeftChanks.y / 8), 2) < 25 &&
                    Math.pow(dropSectorEl.YChank - Math.floor(currentUserBottomLeftChanks.x / 8), 2) < 25) {
                    // console.log(`Drop near`);
                    // console.log(dropSectorEl);
                    // console.log(index);
                    const dropObject = gameObject_1.game.dropObject.objectData[`${gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`][index].XChank}:${gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`][index].YChank}`];
                    dropObject.forEach((dropObj) => {
                        gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push({
                            id: dropObj.id,
                            type: dropObj.type,
                            imageName: dropObj.imageName,
                            XSpriteCoord: dropObj.XSpriteCoord,
                            YSpriteCoord: dropObj.YSpriteCoord,
                            sourceXLength: dropObj.sourceX,
                            sourceYLength: dropObj.sourceY,
                        });
                    });
                    io.to(socketID).emit("setUserEquipmentAndInventoryFromServer", {
                        inventory: gameObject_1.game.usersInventoryAndEquipment[socketID].inventory,
                        equipment: gameObject_1.game.usersInventoryAndEquipment[socketID].equipment,
                    });
                    delete gameObject_1.game.dropObject.objectData[`${gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`][index].XChank}:${gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`][index].YChank}`];
                    gameObject_1.game.dropObject.dropObjectSectors[`${i}:${j}`].splice(index, 1);
                }
            });
        }
    }
    // io.to(socketID).emit("getDropObjectFromServer", game.dropObject.objectData);
    io.of("/").to(roomID).emit("getDropObjectFromServer", gameObject_1.game.dropObject.objectData);
};
exports.pickUpDropNearUser = pickUpDropNearUser;
const equipUserObject = (io, socketID, objectID) => {
    console.log(`Equip ${objectID} object to user ${socketID}`);
    // найти данный объект у конкретного пользователя
    // если его нет, то не продолжаем выполнять функцию
    const equipedObj = {
        index: -1,
        objectType: "",
    };
    for (let i = 0; i < gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.length; i++) {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[i].id === objectID) {
            equipedObj.index = i;
            equipedObj.objectType = gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[i].type;
            break;
        }
    }
    if (equipedObj.index < 0)
        return;
    console.log(equipedObj);
    // добавляем объект в экипировку в соответствующую ячейку
    if (equipedObj.objectType === "helmet") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.helmet.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.helmet[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.helmet[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    if (equipedObj.objectType === "weapon") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.weapon.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.weapon[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.weapon[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    if (equipedObj.objectType === "shield") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.shield.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.shield[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.shield[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    if (equipedObj.objectType === "armour") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.armour.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.armour[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.armour[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    if (equipedObj.objectType === "boots") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.boots.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.boots[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.boots[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    if (equipedObj.objectType === "ring") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.ring.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.ring[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.ring[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    if (equipedObj.objectType === "amulet") {
        if (gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.amulet.length > 0) {
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.push(gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.amulet[0]);
        }
        gameObject_1.game.usersInventoryAndEquipment[socketID].equipment.amulet[0] =
            gameObject_1.game.usersInventoryAndEquipment[socketID].inventory[equipedObj.index];
    }
    // удаляем объект из яцейки инвентаря
    gameObject_1.game.usersInventoryAndEquipment[socketID].inventory.splice(equipedObj.index, 1);
    io.to(socketID).emit("setUserEquipmentAndInventoryFromServer", {
        inventory: gameObject_1.game.usersInventoryAndEquipment[socketID].inventory,
        equipment: gameObject_1.game.usersInventoryAndEquipment[socketID].equipment,
    });
};
exports.equipUserObject = equipUserObject;
