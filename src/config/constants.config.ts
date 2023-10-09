import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const API_VERSION = process.env.API_VERSION;
const JWT_SECRET = process.env.JWT_SECRET;

const errors = {
  SessionCreationError: "SESSION_CREATION_ERROR",
  TokenGenerationError: "TOKEN_GENERATION_ERROR",
  UnauthorizedError: "UNAUTHORIZED_ERROR",
};

export { API_VERSION, DB_URI, JWT_SECRET, PORT, errors };
