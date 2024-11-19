import { Router } from "express";
import { createAdminAuthGuardMiddleware } from "../../middlewares";
import { createAuthMiddleware } from "../../middlewares/auth";
import { createUserInjectionMiddleware } from "../../middlewares/user";
import { getUser } from "./controller";

export const UserRouter = Router();

const authGuard = createAuthMiddleware();

const adminAuthGuard = createAdminAuthGuardMiddleware();

const userInjectionMiddleware = createUserInjectionMiddleware();

UserRouter.use(authGuard);

UserRouter.get("/user", getUser);

UserRouter.use(userInjectionMiddleware);

UserRouter.get("/admin/users", adminAuthGuard);
