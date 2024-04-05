// esta ruta toma el path de cliente (Path: /api/v1/cliente)

import { Router } from "express";
import validateJWT from "../middlewares/validate-jwt";
import { createService, getService } from "../controllers/service.controller";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  validateJWT,
  /* [check("idNew", "El rol es obligatorio").not().isEmpty(), validateFields], */
  createService
);
router.get("/", validateJWT, getService);
export default router;
