import { Router } from "express";
import { createAdminAuthGuardMiddleware } from "../../middlewares/admin";
import { createAuthMiddleware } from "../../middlewares/auth";
import { createUserInjectionMiddleware } from "../../middlewares/user";
import { createFarm, farmAdminUpdate, getAdminFarms, getFarm, getFarms } from "./controller";

export const FarmRouter = Router();

FarmRouter.use(createAuthMiddleware());

FarmRouter.use(createUserInjectionMiddleware());

FarmRouter.get("/farms/:farmId/", getFarm);

FarmRouter.get("/farms", getFarms);

FarmRouter.get("/admin/farms/", createAdminAuthGuardMiddleware(), getAdminFarms);

FarmRouter.put("/admin/farms/", createAdminAuthGuardMiddleware(), farmAdminUpdate);

FarmRouter.post("/farms", createFarm);
