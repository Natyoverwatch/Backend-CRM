import { Types } from "mongoose";
import { ROLES } from "../core/enum/roles.enum";

export interface UserInterface {
  nombre: string;
  email: string;
  celular: number;
  direccion: string;
  tipoDocumento: string;
  numeroDocumento: string;
  login: string;
  password: string;
  rol: ROLES; // Aquí se utiliza el enum ROLES para tipar el campo rol
  estado: boolean;
  createdAt: {
    type: Date;
  };
  updateAt: {
    type: Date;
  };
}
