import express, { Request, Response, NextFunction } from "express";
import User from "../models/User.models";
import { verifyJWT } from "../middleware/jwt.middleware";

const accountRouter = express.Router();

accountRouter.get("/", (req: Request, res: Response) => {
  console.log(req.headers);
  const accessToken = req.headers.authorization?.split(" ")[1];
  console.log("this is the access token", accessToken);
  if (!accessToken) {
    res.status(401).send("Unauthorized");
    return;
  }
  console.log(res);
  return res.status(200).send("Authorized");
});

export default accountRouter;
