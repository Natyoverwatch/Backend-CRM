import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";

export const login = async (req: Request, res: Response) => {
  const { login: loginUser, password } = req.body;

  try {
    // verificar el login
    const usuario = await UserModel.findOne({ login: loginUser });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son validas",
      });
    }

    // verificar el password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son validas",
      });
    }
    // generar token
    const token = await generateJWT(usuario._id.toString(), usuario.login);

    res.status(200).json({
      ok: true,
      usuario: usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const renewToken = async (req: CustomRequest, res: Response) => {
  const id = req._id;

  try {
    if (typeof id === "undefined") {
      throw new Error("No existe un id");
    }
    const usuario = await UserModel.findById(id);

    // Generar el Token
    const token = await generateJWT(id.toString());

    res.json({
      ok: true,
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const existLogin = async (req: Request, res: Response) => {
  const { email, numeroDocumento } = req.body;

  try {
    // verificar el login
    const existEmailAndNoDocument = await UserModel.findOne({
      email,
      numeroDocumento,
    });

    if (!existEmailAndNoDocument) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son validas",
      });
    }

    // generar token
    const token = await generateJWT(
      existEmailAndNoDocument._id.toString(),
      existEmailAndNoDocument.login,
      "10m",
      process.env.JWT_SECRET_PASS
    );

    const tiempoExpiracion = 600;

    res.status(200).json({
      ok: true,
      usuario: existEmailAndNoDocument,
      token,
      tiempoExpiracion,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const updateNewPassword = async (req: CustomRequest, res: Response) => {
  try {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordCript = bcrypt.hashSync(password, salt);

    if (!password) {
      return res.status(401).json({
        ok: false,
        msg: "No has ingresado una contraseña valida",
      });
    }
    const id = req._id;
    // El update del cliente - Actualizar el cliente
    const userNewPass = await UserModel.findByIdAndUpdate(
      id,
      { password: passwordCript },
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      user: userNewPass,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error consultar el user",
    });
  }
};
