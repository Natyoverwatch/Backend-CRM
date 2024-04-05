// esta ruta toma el path de cliente (Path: /api/v1/cliente)

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateJWT from "../middlewares/validate-jwt";
import {
  createInteraction,
  deleteInteraccion,
  getInteraction,
  getInteractionsByOpportunityId,
  getaInteraction,
  updateInteraccion,
} from "../controllers/interactions.controller";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  validateJWT,
  [
    check("descriptionInteraction", "La descripción es obligatoria")
      .not()
      .isEmpty(),
    check("actionInteraction", "La acción es obligatoria").not().isEmpty(),
    check("refOportunity", "La referencia es obligatoria").not().isEmpty(),
    validateFields,
  ],
  createInteraction
);
router.get("/", validateJWT, getInteraction);
router.get("/:id", validateJWT, getaInteraction);
router.get("/oportunidad/:id", validateJWT, getInteractionsByOpportunityId);
router.put("/:id", validateJWT, updateInteraccion);
router.delete("/:id", validateJWT, deleteInteraccion);

export default router;
