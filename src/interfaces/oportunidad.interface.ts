import { Types } from "mongoose";
import { STATE } from "../core/enum/state.enum";

export interface OportunityInterface {
  nameOportunity: string;
  descriptionOportunity: string;
  stateOportunity: STATE;
  userCliente: Types.ObjectId;
  userCreate: Types.ObjectId;
  userGestor: Types.ObjectId; // se asigna el id del gestor en el front
  createdAt: {
    type: Date;
  };
  updateAt: {
    type: Date;
  };
}
