import { Model, Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import { ROLES } from "../core/enum/roles.enum";

const UserSchema = new Schema<UserInterface>({
  //definicion de la data de usuarios:
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  celular: {
    type: Number,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  tipoDocumento: {
    type: String,
    required: true,
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: Object.values(ROLES),
    required: true,
    default: ROLES.CLIENTE,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

// se quita del esquema el password para que no se muestre al imprimir la data
UserSchema.method("toJSON", function () {
  const { password, ...object } = this.toObject();
  return object;
});

const UserModel: Model<UserInterface> = model<UserInterface>(
  "usuario",
  UserSchema
);

export default UserModel;
