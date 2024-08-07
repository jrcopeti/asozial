import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});