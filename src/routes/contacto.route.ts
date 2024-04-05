import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { enviarFormularioContacto } from "../controllers/contacto.controller";

const router = Router();
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("mensaje", "El mensaje es obligatorio").not().isEmpty(),
    validateFields,
  ],
  enviarFormularioContacto
);

export default router;