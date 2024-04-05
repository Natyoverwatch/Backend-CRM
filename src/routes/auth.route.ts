// esta ruta toma el path de auth (Path: /api/v1/user)

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  existLogin,
  login,
  renewToken,
  updateNewPassword,
} from "../controllers/auth.controller";
import validateJWT, { validateJWTpass } from "../middlewares/validate-jwt";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  [
    check("login", "El login es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

router.get("/", validateJWT, renewToken);

router.post(
  "/validate",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("numeroDocumento", "El numeroDocumento es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  existLogin
);

router.put(
  "/validate",
  validateJWTpass,
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  updateNewPassword
);

export default router;
