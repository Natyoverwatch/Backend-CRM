import dotenv from "dotenv";
import Server from "./src/server";

// configuración de las variables de entorno .env
dotenv.config();

const server = new Server();
server.listen();
