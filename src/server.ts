import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import interactionRoutes from "./routes/interaction.route";
import oportunityRoutes from "./routes/oportunity.route";
import serviceRoutes from "./routes/service.route";
import contactoRoutes from "./routes/contacto.route"
import cors from "cors";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    user: "/api/v1/usuarioM",
    auth: "/api/v1/auth",
    interaction: "/api/v1/interaccion",
    oportunity: "/api/v1/oportunidad",
    service: "/api/v1/service",
    contacto: "/api/v1/contacto",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Base de datos
    dbConnection();

    // Métodos Iniciales
    this.middlewares();

    // Rutas
    this.routes();
  }

  miPrimeraApi() {
    this.app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ msg: "Information" })
    );
  }

  middlewares() {
    this.app.use(cors()); // para el intercambio de recursos, permisos para poder consumir mi API
    // Lectura del Body - conviente lo que se vaya a enviar a formato json
    this.app.use(express.json());

    this.miPrimeraApi();
  }

  routes(): void {
    this.app.use(this.apiPaths.user, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.interaction, interactionRoutes);
    this.app.use(this.apiPaths.oportunity, oportunityRoutes);
    this.app.use(this.apiPaths.service, serviceRoutes);
    this.app.use(this.apiPaths.contacto, contactoRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

export default Server;
