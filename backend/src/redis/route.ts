import { Router } from "express";
import { redis } from "./index.ts";

const redisRouter: Router = Router();

redisRouter.get("/all", async (req, res) => {
  try {
    const keys = await redis.keys("*"); // Get all keys

    console.log(keys);
    let entries = {};
    for (const key of keys) {
      const value = await redis.get(key); // Determine key type
      entries = {
        ...entries,
        [key]: JSON.parse(value as string),
      };
    }

    res.json({
      results: entries,
    });
  } catch (error) {
    console.error("Error retrieving Redis entries:", error);
    res.status(500).send("Error retrieving Redis entries");
  }
});

export default redisRouter;
