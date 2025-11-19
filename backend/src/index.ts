// src/index.ts
import express, { type Request, type Response } from "express";
import customerRouter from "./customers/route.ts";
import { idempotencyMiddleware } from "./idempotent/index.ts";
import redisRouter from "./redis/route.ts";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the TypeScript Express Server!");
});

app.use("/customers", idempotencyMiddleware);

app.use("/customers", customerRouter);

app.use("/redis", redisRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
