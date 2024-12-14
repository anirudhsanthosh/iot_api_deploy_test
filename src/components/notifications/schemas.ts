import Joi from "joi";

export const notificationSchema = Joi.object({
	created_by: Joi.string().valid("admin", "system").required().messages({
		"any.only": `"created_by" must be either "admin" or "system"`,
		"any.required": `"created_by" is required`,
	}),

	message: Joi.string().min(1).max(500).required().messages({
		"string.base": `"message" must be a string`,
		"string.empty": `"message" cannot be empty`,
		"string.min": `"message" must be at least {#limit} character(s)`,
		"string.max": `"message" cannot exceed {#limit} characters`,
		"any.required": `"message" is required`,
	}),

	read: Joi.boolean().default(false).messages({
		"boolean.base": `"read" must be a boolean`,
		"any.required": `"read" is required`,
	}),

	user_id: Joi.string()
		.regex(/^[a-fA-F0-9]{24}$/) // Matches MongoDB ObjectId format
		.required()
		.messages({
			"string.pattern.base": `"user_id" must be a valid MongoDB ObjectId`,
			"any.required": `"user_id" is required`,
		}),
});
