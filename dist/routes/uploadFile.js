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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
// const S3 = require("aws-sdk/clients/s3");
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CREDENTIAL = {
        accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY,
    };
    const s3Client = new client_s3_1.S3Client({
        region: "ru-1",
        credentials: CREDENTIAL,
        endpoint: "https://s3.timeweb.cloud",
        forcePathStyle: true,
        apiVersion: "latest",
    });
    const bucketParams = { Bucket: "f1525e96-2c5a759f-3888-4bd2-a52f-dbb62685b4bb" };
    const uploadParams = { Bucket: bucketParams.Bucket, Key: "", Body: "" };
    console.log("Создание клиента");
    const s3 = new s3_1.default({
        accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY,
        endpoint: "https://s3.timeweb.cloud",
        s3ForcePathStyle: true,
        region: "ru-1",
        apiVersion: "latest",
    });
    const runTest = () => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //   console.log("Список объектов в бакете");
        //   const res = await s3.listObjects(bucketParams).promise();
        //   console.log("Success", res);
        // } catch (e) {
        //   console.log("Error", e);
        // }
        try {
            console.log("Регион бакета");
            const res = yield s3.getBucketLocation(bucketParams).promise();
            console.log("Success", res);
        }
        catch (e) {
            console.log("Error", e);
        }
        try {
            console.log("Загрузка файла в бакет");
            const fs = require("fs");
            const fileStream = fs.createReadStream("./src/channels4_profile.jpg");
            fileStream.on("error", function (err) {
                console.log("File Error", err);
            });
            uploadParams.Body = fileStream;
            const path = require("path");
            uploadParams.Key = path.basename("./channels4_profile.jpg");
            const res = yield s3.upload(uploadParams).promise();
            console.log("Success", res);
        }
        catch (e) {
            console.log("Error", e);
        }
    });
    runTest()
        .then((_) => {
        console.log("Done");
    })
        .catch((e) => {
        console.log("Error", e);
    });
    // try {
    //   const fileStream = fs.createReadStream("./src/channels4_profile.jpg");
    //   console.log(s3Client);
    //   const params = {
    //     Bucket: "f1525e96-2c5a759f-3888-4bd2-a52f-dbb62685b4bb",
    //     Key: "app.ts", // Путь в хранилище
    //     Body: fileStream,
    //     ContentType: "image/jpeg",
    //   };
    //   const command = new PutObjectCommand(params);
    //   const response = await s3Client.send(command);
    //   console.log("Файл загружен:", response);
    // } catch (err) {
    //   console.error("Ошибка:", err);
    // }
    res.send("UploadFile to timeWeb");
}));
exports.default = router;
