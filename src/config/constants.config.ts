import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const API_VERSION = process.env.API_VERSION;

export { API_VERSION, DB_URI, PORT };
