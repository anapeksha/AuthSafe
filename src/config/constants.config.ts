import { config } from "dotenv";
config();

const API_VERSION = "v1";
const JWT_SECRET = process.env.JWT_SECRET;

const errors = {
  SessionCreationError: "SESSION_CREATION_ERROR",
  TokenGenerationError: "TOKEN_GENERATION_ERROR",
  UnauthorizedError: "UNAUTHORIZED_ERROR",
};

export { API_VERSION, JWT_SECRET, errors };
