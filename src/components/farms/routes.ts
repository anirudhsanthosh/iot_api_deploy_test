import { Router } from "express";
import { createAdminAuthGuardMiddleware } from "../../middlewares/admin";
import { createAuthMiddleware } from "../../middlewares/auth";
import { createUserInjectionMiddleware } from "../../middlewares/user";
import { createFarm, farmAdminUpdate, getAdminFarms, getFarm, getFarms } from "./controller";

export const FarmRouter = Router();

const authGuard = createAuthMiddleware();

const adminAuthGuard = createAdminAuthGuardMiddleware();

const userInjectionMiddleware = createUserInjectionMiddleware();

FarmRouter.use(authGuard, userInjectionMiddleware);

FarmRouter.get("/farms/:farmId/", getFarm);

FarmRouter.get("/farms", getFarms);

FarmRouter.post("/farms", createFarm);

FarmRouter.get("/admin/farms/", adminAuthGuard, getAdminFarms);

FarmRouter.put("/admin/farms/", adminAuthGuard, farmAdminUpdate);
