import { Router } from "express";
import { getAnalytics } from "./controller";

export const AnalyticsRouter = Router();

AnalyticsRouter.get("/analytics/:deviceId", getAnalytics);
