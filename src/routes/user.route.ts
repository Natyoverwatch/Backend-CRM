// esta ruta toma el path de user (Path: /api/v1/user)

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getaUserRol,
  getaUserId,
  updateStateUser,
  updateUser,
} from "../controllers/user.controller";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("celular", "El nombre es obligatorio").not().isEmpty(),
    check("direccion", "La direccion es obligatoria").not().isEmpty(),
    check("tipoDocumento", "El tipo de documento es obligatorio")
      .not()
      .isEmpty(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    check("login", "El login es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.get("/", validateJWT, getAllUsers); // se comenta la validacion por la conexion con el frontend
router.get("/usuario/:id", validateJWT, getaUserId);
/* router.get("/:rol", validateJWT, getaUserRol); */
router.get("/:rol", validateJWT, getaUserRol);
router.put("/:id", validateJWT, updateUser);
router.put("/cambiarEstado/:id", validateJWT, updateStateUser);
router.delete("/:id", validateJWT, deleteUser);
export default router;
