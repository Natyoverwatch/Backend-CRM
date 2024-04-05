import { Model, Schema, Types, model } from "mongoose";
import { OportunityInterface } from "../interfaces/oportunidad.interface";
import { STATE } from "../core/enum/state.enum";

const OporunitySchema = new Schema<OportunityInterface>({
  //aqui se coloca la definicion de mis datos:
  nameOportunity: { type: String, required: true },
  descriptionOportunity: { type: String, required: true },
  stateOportunity: {
    type: String,
    enum: Object.values(STATE),
    required: true,
  },
  userCliente: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
  },
  userCreate: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  },
  userGestor: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
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

const OportunityModel: Model<OportunityInterface> = model<OportunityInterface>(
  "oportunidades",
  OporunitySchema
);

export default OportunityModel;
