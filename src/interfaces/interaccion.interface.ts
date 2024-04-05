import { Types } from "mongoose";

export interface InteractionsInterface {
  descriptionInteraction: string;
  actionInteraction: string;
  userCreate: Types.ObjectId;
  refOportunity: Types.ObjectId;
  createdAt: {
    type: Date;
  };
  updateAt: {
    type: Date;
  };
}
