import { Request, Response } from "express";
import InteractionModel from "../models/interactions.model";
import { CustomRequest } from "../middlewares/validate-jwt";
import OportunityModel from "../models/oportunity.model";
import UserModel from "../models/user.model";
import { STATE } from "../core/enum/state.enum";
import { ROLES } from "../core/enum/roles.enum";

// aca va la logica de la data - crear, actualizar, etc.
export const createInteraction = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const userId = req._id;

  try {
    const { refOportunity } = req.body;

    // verificar el Usuario
    const usuario = await UserModel.findById(userId);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    if (usuario.rol === ROLES.CLIENTE) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no tiene permiso para crear una interaccion",
      });
    }

    // verificar el ref oportunidad y si esta tiene gestor asignado
    const oportunidad = await OportunityModel.findById(refOportunity);

    if (!oportunidad) {
      return res.status(401).json({
        ok: false,
        msg: "La referencia de la oportunidad no es valida",
      });
    }
    if (oportunidad.stateOportunity === STATE.NOGESTOR) {
      return res.status(401).json({
        ok: false,
        msg: "La referencia de la oportunidad no no tiene un gestor asignado",
      });
    }

    // verificar el si el estado de la oportunidad es finalizado

    if (oportunidad.stateOportunity === "Finalizada") {
      return res.status(401).json({
        ok: false,
        msg: "No puedes crear una interacción a una oportunidad finalizada",
      });
    }

    const interaccionNuevo = new InteractionModel({
      userCreate: userId,
      ...body,
    });

    const interaccionCreado = await interaccionNuevo.save();

    res.status(200).json({
      ok: true,
      msg: "Interaccion registrada",
      interacción: interaccionCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear la interaccion",
    });
  }
};

export const getInteraction = async (req: CustomRequest, res: Response) => {
  try {
    // devuelve todo el listado de productos con la información que el usuario creó
    const interaccion = await InteractionModel.find().populate({
      path: "refOportunity",
      select: "nameOportunity descriptionOportunity userGestor",
      populate: {
        path: "userGestor",
        select: "nombre",
      },
    });
    res.json({
      ok: true,
      interaccion,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};

export const getaInteraction = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    // El busca un usuario por id
    const comentario = await InteractionModel.findById({ _id: id }).populate({
      path: "refOportunity",
      select: "nameOportunity descriptionOportunity userGestor",
      populate: {
        path: "userGestor",
        select: "nombre",
      },
    });
    res.json({
      ok: true,
      comentario,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error consultar los comentarios",
    });
  }
};

export const getInteractionsByOpportunityId = async (req: CustomRequest, res: Response) => {
  try {
    const opportunityId = req.params.id;
    const interactions = await InteractionModel.find({ refOportunity: opportunityId })
      .populate({
        path: 'refOportunity',
        select: 'nameOportunity userGestor',
        populate: {
          path: 'userGestor',
          select: 'nombre',
        }
      });

    res.json({
      ok: true,
      interactions,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

export const updateInteraccion = async (req: CustomRequest, res: Response) => {
  //
  try {
    // id del usuario
    const id = req.params.id;
    const { body } = req;

    // El update del usuario - Actualizar el usuario
    const interaccionActualizado = await InteractionModel.findByIdAndUpdate(
      id,
      {
        ...body,
        updateAt: new Date(),
      },
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      interaccion: interaccionActualizado,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar la interaccion",
    });
  }
};

export const deleteInteraccion = async (req: CustomRequest, res: Response) => {
  try {
    // id del usuario
    const id = req.params.id;
    const { body } = req;

    // la eliminacion del usuario
    const interaccionEliminada = await InteractionModel.findByIdAndDelete(id);
    res.json({
      ok: true,
      interaccion: interaccionEliminada,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar la interaccion",
    });
  }
};
