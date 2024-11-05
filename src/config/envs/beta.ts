import { DefaultConfig } from "./base";

const config: Config.ENV = {
	ENV: "development",
	API_URL: "http://localhost:5000",
	CLERK_PUBLIC_KEY: "pk_test_bmF0dXJhbC1zdHVyZ2Vvbi0zNS5jbGVyay5hY2NvdW50cy5kZXYk",
	CLERK_PUBLIC_CERTIFICATE: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAymaoWZtzPa4SZlckgCtj
hl6G4aaIlfSR0iMFRZQtHT8DebkM2JIxB7uOWuPYWK44LnKDkpRJbsJrM7Ug6zUL
d2V8ZNRvI4+iDSRmXRxTp1yrMNHBA+dRMHFSgdhqNDmas/1fqxcoUH2uCCYozmKD
UBy4paMl/X1YV8hzbD58giwzPQVAW5GDT5iThpJG7CFCoSs6AmJGOaLLPPOwN0XI
cP9yQsEzziNWouNTXrSLvWAcvkmeNDYEg6rTtUMVq93VJXYRnIqFfW8Rbuzr1RxG
hRgpOHToESgCdVragyoK0BFB5qluiYwIngZbfo2eTAAy4v97EnXvT6wV8pe1v6nW
hwIDAQAB
-----END PUBLIC KEY-----`,
};

export const BetaConfig = Object.freeze({ ...DefaultConfig, ...config });
