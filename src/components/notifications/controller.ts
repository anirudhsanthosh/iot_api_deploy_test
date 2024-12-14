import { NextFunction, Request, Response } from "express";

import { NotificationService } from "./service";

export async function createNotification(request: Request, response: Response, next: NextFunction) {
	const notification = await new NotificationService().create(request.body);

	response.json(notification);
}

export async function markAllAsRead(request: Request, response: Response, next: NextFunction) {
	const notification = await new NotificationService().markAllAsRead(request.body.user_id);

	response.json(notification);
}

export async function markAsRead(request: Request, response: Response, next: NextFunction) {
	const notification = await new NotificationService().markAsRead(request.params.notificationId);

	response.json(notification);
}

export async function getNotifications(request: Request, response: Response, next: NextFunction) {
	const notifications = await new NotificationService().getAll(request.user?._id!?.toHexString());

	response.json(notifications);
}

export async function deleteNotification(request: Request, response: Response, next: NextFunction) {
	const notification = await new NotificationService().delete(request.params.notificationId);

	response.json(notification);
}

export async function deleteAllNotifications(request: Request, response: Response, next: NextFunction) {
	const notification = await new NotificationService().deleteAll(request.user?._id!?.toHexString());

	response.json(notification);
}
