import { Model, Schema, Types, model } from "mongoose";
import { ServiceInterface } from "../interfaces/service.interface";
import { STATE } from "../core/enum/state.enum";

const ServiceSchema = new Schema<ServiceInterface>({
  //aqui se coloca la definicion de mis datos:
  /*oportunidad: {
    type: Object,
    required: true,
  },
  interaccion: {
    type: Object,
    required: true,
  }, 
  idNew: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  }, 
  createdAt: {
    type: Date,
    default: Date.now(),
  },*/
  refOportunity: {
    type: Schema.Types.ObjectId,
    ref: "oportunidades",
    required: true,
  },
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
  },
  userGestor: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
  },
  createdAtOporunity: {
    type: Date,
  },
  updateAtOporunity: {
    type: Date,
  },
  id_interaccion: {
    type: Schema.Types.ObjectId,
    ref: "oportunidades",
  },
  descriptionInteraction: { type: String },
  actionInteraction: { type: String },
  userCreateInteraccion: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
  },
});

/* // se quita del esquema el password para que no se muestre en la data
CommunitySchema.method("toJSON", function () {
  const { usuario.password, ...object } = this.toObject();
  return object;
});
 */
const ServiceModel: Model<ServiceInterface> = model<ServiceInterface>(
  "services",
  ServiceSchema
);

export default ServiceModel;
