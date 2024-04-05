import { Types } from "mongoose";
import { InteractionsInterface } from "./interaccion.interface";
import { OportunityInterface } from "./oportunidad.interface";
import { STATE } from "../core/enum/state.enum";

export interface ServiceInterface {
  refOportunity: Types.ObjectId;
  nameOportunity: string;
  descriptionOportunity: string;
  stateOportunity: STATE;
  userCliente: Types.ObjectId;
  userCreate: Types.ObjectId;
  userGestor: Types.ObjectId;
  createdAtOporunity: {
    type: Date;
  };
  updateAtOporunity: {
    type: Date;
  };
  id_interaccion: Types.ObjectId;
  descriptionInteraction: string;
  actionInteraction: string;
  userCreateInteraccion: Types.ObjectId;
  /* oportunidad: OportunityInterface;
  interaccion: InteractionsInterface; 
  createdAt: {
    type: Date;
  };*/
}
