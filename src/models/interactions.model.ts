import { Model, Schema, Types, model } from "mongoose";
import { InteractionsInterface } from "../interfaces/interaccion.interface";

const InteractionsSchema = new Schema<InteractionsInterface>({
  //aqui se coloca la definicion de nuestros datos:
  descriptionInteraction: { type: String, required: true },
  actionInteraction: { type: String, required: true },
  userCreate: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  },
  refOportunity: {
    type: Schema.Types.ObjectId,
    ref: "oportunidades",
    required: true,
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

const InteractionModel: Model<InteractionsInterface> =
  model<InteractionsInterface>("interacciones", InteractionsSchema);

export default InteractionModel; 
