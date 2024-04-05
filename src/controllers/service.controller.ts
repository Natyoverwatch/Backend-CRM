import { Request, Response } from "express";
import InteractionModel from "../models/interactions.model";
import { CustomRequest } from "../middlewares/validate-jwt";
import ServiceModel from "../models/service.model";
import UserModel from "../models/user.model";
import OportunityModel from "../models/oportunity.model";

// aca va la logica de la data - crear, actualizar, etc.
export const createService = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const userId = req._id;

  try {
    // Validar si el usuario que va a crear la comunidad se encuentra en la data
    const usuario = await UserModel.findById(userId);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    let servicioCreado = {};
    const oportunidadesConInteracciones: any = [];

    // Obtener los datos completos del oportunidades
    const oportunidades = await OportunityModel.find();
    if (!oportunidades) {
      return res.status(404).json({
        ok: false,
        msg: "Oportunidades no encontradas",
      });
    }

    //Por cada opotunidad se busca sus respectivas interacciones
    for (const oportunidad of oportunidades) {
      // Validar si ya existe en la data de servicio ya existe la oportunidad
      const validacion = await ServiceModel.findOne({
        refOportunity: oportunidad._id,
      });
      if (validacion) {
        // Validar si ya existe en la data de servicio ya existe la interaccion de la oportunidad
        const interaccionesRelacionadas = await InteractionModel.find({
          refOportunity: oportunidad._id,
        });
        for (const interaccion of interaccionesRelacionadas) {
          const validacionInteracciones = await ServiceModel.findOne({
            id_interaccion: interaccion._id,
          });
          if (!validacionInteracciones) {
            const comunidadNueva = new ServiceModel({
              refOportunity: oportunidad._id,
              nameOportunity: oportunidad.nameOportunity,
              descriptionOportunity: oportunidad.descriptionOportunity,
              stateOportunity: oportunidad.stateOportunity,
              userCliente: oportunidad.userCliente,
              userCreate: oportunidad.userCreate,
              userGestor: oportunidad.userGestor,
              createdAtOporunity: oportunidad.createdAt,
              updateAtOporunity: oportunidad.updateAt,
              id_interaccion: interaccion._id,
              descriptionInteraction: interaccion.descriptionInteraction,
              actionInteraction: interaccion.actionInteraction,
              userCreateInteraccion: interaccion.userCreate,
            });
            servicioCreado = await comunidadNueva.save();
            oportunidadesConInteracciones.push(comunidadNueva);
          }
        }

        /* return res.status(401).json({
          ok: false,
          msg: "ya existe este usuario, actualiza la data",
        }); */
      } else {
        // Obtener las interacciones relacionadas con la oportunidad actual
        const interaccionesRelacionadas = await InteractionModel.find({
          refOportunity: oportunidad._id,
        });
        if (interaccionesRelacionadas.length === 0) {
          const comunidadNueva = new ServiceModel({
            refOportunity: oportunidad._id,
            nameOportunity: oportunidad.nameOportunity,
            descriptionOportunity: oportunidad.descriptionOportunity,
            stateOportunity: oportunidad.stateOportunity,
            userCliente: oportunidad.userCliente,
            userCreate: oportunidad.userCreate,
            userGestor: oportunidad.userGestor,
            createdAtOporunity: oportunidad.createdAt,
            updateAtOporunity: oportunidad.updateAt,
            descriptionInteraction: "No tiene interacciones asignadas",
            actionInteraction: "No tiene interacciones asignadas",
          });

          servicioCreado = await comunidadNueva.save();
          oportunidadesConInteracciones.push(comunidadNueva);
        }

        for (const interaccion of interaccionesRelacionadas) {
          // Creamos el comentario con los datos del usuario incrustados
          const comunidadNueva = new ServiceModel({
            refOportunity: oportunidad._id,
            nameOportunity: oportunidad.nameOportunity,
            descriptionOportunity: oportunidad.descriptionOportunity,
            stateOportunity: oportunidad.stateOportunity,
            userCliente: oportunidad.userCliente,
            userCreate: oportunidad.userCreate,
            userGestor: oportunidad.userGestor,
            createdAtOporunity: oportunidad.createdAt,
            updateAtOporunity: oportunidad.updateAt,
            id_interaccion: interaccion._id,
            descriptionInteraction: interaccion.descriptionInteraction,
            actionInteraction: interaccion.actionInteraction,
            userCreateInteraccion: interaccion.userCreate,
          });
          servicioCreado = await comunidadNueva.save();
          oportunidadesConInteracciones.push(comunidadNueva);
        }
      }
    }
    if (oportunidadesConInteracciones.length === 0) {
      return res.status(401).json({
        ok: false,
        msg: "no se registro un nuevo servicio",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "servicio registrada",
      comunidad: oportunidadesConInteracciones,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear el servicio",
    });
  }
};

export const getService = async (req: CustomRequest, res: Response) => {
  try {
    // devuelve todo el listado de productos con la información que el usuario creó
    const servicio = await ServiceModel.find()
      .populate("userCreate", "nombre")
      .populate("userGestor", "nombre")
      .populate("userCliente", "nombre")
      .populate("userCreateInteraccion", "nombre");

    res.json({
      ok: true,
      servicio,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};
