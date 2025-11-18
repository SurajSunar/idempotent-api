import type { NextFunction, Request, Response } from "express";
import { redis } from "../redis/index.ts";

export interface StoredResponse {
  status: number;
  body: any;
}

export const idempotencyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = String(req.header("Idempotency-Key") || "").trim();
    if (!key) {
      return res.status(400).json({ error: "Idempotency-Key header required" });
    }

    const redisKey = `idem:${key}`;
    const cached = await redis.get(redisKey);

    if (cached) {
      // return cached response
      const stored: StoredResponse = JSON.parse(cached);
      return res
        .status(stored.status)
        .json({ ...stored.body, idempotent: true });
    }

    res.locals.__saveIdempotencyResponse = async (stored: StoredResponse) => {
      const ttl = Number(process.env.IDEMPOTENCY_TTL_SECONDS ?? 86400);
      await redis.set(redisKey, JSON.stringify(stored), "EX", ttl);
    };

    next();
  } catch (err) {
    next(err);
  }
};
