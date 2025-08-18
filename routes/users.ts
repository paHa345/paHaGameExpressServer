import express, { Express, NextFunction, Request, Response, Router } from "express";
import GTSGameAttempt from "../models/GTSGameAttemptModel";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const currentGTSGameAttemptTime = await GTSGameAttempt.find();
    console.log(currentGTSGameAttemptTime);
    res.send("usersPage");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    res.send("ALLusersPage");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default router;
