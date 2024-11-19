import { Router } from "express";
import { createAdminAuthGuardMiddleware } from "../../middlewares/admin";
import { createAuthMiddleware } from "../../middlewares/auth";
import { createUserInjectionMiddleware } from "../../middlewares/user";
import { analytics, createDevice, deviceAdminUpdate, getDevice, getDevices, getDevicesByAdmin } from "./controller";

export const DeviceRouter = Router();

const authGuard = createAuthMiddleware();

const adminAuthGuard = createAdminAuthGuardMiddleware();

const userInjectionMiddleware = createUserInjectionMiddleware();

DeviceRouter.use(authGuard, userInjectionMiddleware);

//TODO add authorization for permission validations.

DeviceRouter.get("/devices/:farmId", getDevices);

DeviceRouter.get("/devices/:farmId/:deviceId", getDevice);

DeviceRouter.get("/devices/:farmId/:deviceId/analytics", analytics);

DeviceRouter.get("/admin/devices", adminAuthGuard, getDevicesByAdmin);

DeviceRouter.put("/admin/devices/:deviceId", adminAuthGuard, deviceAdminUpdate);

DeviceRouter.post("/admin/devices/", adminAuthGuard, createDevice);
