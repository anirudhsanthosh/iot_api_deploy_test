import { Router } from "express";
import { createAdminAuthGuardMiddleware } from "../../middlewares/admin";
import { createAuthMiddleware } from "../../middlewares/auth";
import { validatePayload } from "../../middlewares/payload-validation";
import { createUserInjectionMiddleware } from "../../middlewares/user";
import {
	createNotification,
	deleteAllNotifications,
	deleteNotification,
	getNotifications,
	markAllAsRead,
	markAsRead,
} from "./controller";
import { notificationSchema } from "./schemas";

export const NotificationRouter = Router();

const authGuard = createAuthMiddleware();

const adminAuthGuard = createAdminAuthGuardMiddleware();

const userInjectionMiddleware = createUserInjectionMiddleware();

NotificationRouter.use(authGuard, userInjectionMiddleware);

//get all notifications
NotificationRouter.get("/notifications", getNotifications);

NotificationRouter.patch("/notifications/:notificationId/mark-as-read", markAsRead);

NotificationRouter.patch("/notifications/mark-all-as-read", markAllAsRead);

NotificationRouter.delete("/notifications/:notificationId", deleteNotification);

NotificationRouter.delete("/notifications", deleteAllNotifications);

NotificationRouter.post(
	"/admin/notifications",
	adminAuthGuard,
	validatePayload(notificationSchema),
	createNotification,
);
