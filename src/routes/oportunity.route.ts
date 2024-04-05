// esta ruta toma el path de cliente (Path: /api/v1/oporunity)

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateJWT from "../middlewares/validate-jwt";
import {
  addGestorOportunity,
  createOportunity,
  deleteOportunity,
  getOportunity,
  getSinGestorOportuniy,
  getAnOportuniy,
  updateOportunity,
} from "../controllers/oportunity.controller";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  validateJWT,
  [
    check("nameOportunity", "El nombre es obligatorio").not().isEmpty(),
    check("descriptionOportunity", "La descripción es obligatoria")
      .not()
      .isEmpty(),
    validateFields,
  ],
  createOportunity
);
router.get("/", validateJWT, getOportunity);
router.get("/sin-gestor", validateJWT, getSinGestorOportuniy);
router.get("/:id", validateJWT, getAnOportuniy);
router.put("/asignar/:id", validateJWT, addGestorOportunity);
router.put("/:id", validateJWT, updateOportunity);
router.delete("/:id", validateJWT, deleteOportunity);

export default router;
