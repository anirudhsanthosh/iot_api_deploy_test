import { Router } from "express";
import { createAuthMiddleware } from "../../middlewares/auth";
import { createUserInjectionMiddleware } from "../../middlewares/user";
import { getUser } from "./controller";

export const UserRouter = Router();

UserRouter.use(createAuthMiddleware());

UserRouter.get("/", getUser);

UserRouter.use(createUserInjectionMiddleware());
