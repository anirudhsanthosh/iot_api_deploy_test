import "express";

declare module "express" {
	interface Request {
		auth?: Auth;
		user?: Users.user;
	}
}

export interface Auth {
	sessionClaims: Claims;
	sessionId: string;
	userId: string;
	__experimental_factorVerificationAge: null;
	claims: Claims;
}

export interface Claims {
	azp: string;
	email: string;
	email_verified: boolean;
	exp: number;
	first_name: string;
	iat: number;
	iss: string;
	jti: string;
	last_name: string;
	nbf: number;
	sid: string;
	sub: string;
	user_id: string;
	version: number;
}
