import express, { Express, NextFunction, Request, Response, Router } from "express";
import GTSGameAttempt from "../models/GTSGameAttemptModel";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// const S3 = require("aws-sdk/clients/s3");
import S3 from "aws-sdk/clients/s3";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const CREDENTIAL = {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY as string,
  };
  const s3Client = new S3Client({
    region: "ru-1",
    credentials: CREDENTIAL,
    endpoint: "https://s3.timeweb.cloud",
    forcePathStyle: true,
    apiVersion: "latest",
  });

  const bucketParams = { Bucket: "f1525e96-2c5a759f-3888-4bd2-a52f-dbb62685b4bb" };
  const uploadParams = { Bucket: bucketParams.Bucket, Key: "", Body: "" };

  console.log("Создание клиента");

  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY as string,
    endpoint: "https://s3.timeweb.cloud",
    s3ForcePathStyle: true,
    region: "ru-1",
    apiVersion: "latest",
  });

  const runTest = async () => {
    // try {
    //   console.log("Список объектов в бакете");

    //   const res = await s3.listObjects(bucketParams).promise();
    //   console.log("Success", res);
    // } catch (e) {
    //   console.log("Error", e);
    // }

    try {
      console.log("Регион бакета");

      const res = await s3.getBucketLocation(bucketParams).promise();
      console.log("Success", res);
    } catch (e) {
      console.log("Error", e);
    }

    try {
      console.log("Загрузка файла в бакет");

      const fs = require("fs");
      const fileStream = fs.createReadStream("./src/channels4_profile.jpg");
      fileStream.on("error", function (err: any) {
        console.log("File Error", err);
      });
      uploadParams.Body = fileStream;
      const path = require("path");
      uploadParams.Key = path.basename("./channels4_profile.jpg");

      const res = await s3.upload(uploadParams).promise();
      console.log("Success", res);
    } catch (e) {
      console.log("Error", e);
    }
  };

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
});

export default router;
