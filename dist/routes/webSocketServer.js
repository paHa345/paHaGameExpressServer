"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ws_1 = require("ws");
var net = require("net");
var server = net.createServer();
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wss = new ws_1.WebSocketServer({ port: 8080 });
        wss.on("connection", (ws) => {
            console.log("Новый клиент подключился!");
            ws.on("message", (message) => {
                console.log(`Получено сообщение: ${message}`);
                ws.send("Сообщение получено!");
            });
            ws.on("close", () => {
                console.log("Клиент отключился");
            });
        });
        res.send("server ready");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    console.log("Сервер запущен на 8080 порту");
}));
exports.default = router;
