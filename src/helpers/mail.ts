import { ContactoFormInterface } from "../models/contacto.model";

const nodemailer = require("nodemailer");
// crea un transportador que conecta y hace el envio del mail
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "jorjuroba@hotmail.com",
    pass: "figciapbmdujrwwe",
  },
});

// Definir y exportar la función main
export const sendMail = async (nomOportunidad: string) => {
  // Configuración del transporte de nodemailer...

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Mario Jurado" <jorjuroba@hotmail.com>',
    to: "jorjuroba@gmail.com",
    subject: `Nueva Oportunidad Recibida: ${nomOportunidad}`, // Personalizar el asunto con el nombre de la oportunidad
    text: `¡Hola! Se ha creado una nueva oportunidad llamada ${nomOportunidad}.`, // Personalizar el texto del correo con el nombre de la oportunidad
    html: `<b>¡Hola!</b><p>Se ha creado una nueva oportunidad llamada ${nomOportunidad}.</p>`, // Personalizar el HTML del correo con el nombre de la oportunidad
  });

  console.log("Message sent: %s", info.messageId);
};

export const enviarCorreoContacto = async (formulario: ContactoFormInterface) => {
  try {
    // Configurar el correo electrónico
    const info = await transporter.sendMail({
      from: '"Mario Jurado" <jorjuroba@hotmail.com>',
      to: "jorjuroba@gmail.com",
      subject: "Nuevo Formulario de Contacto Recibido",
      text: `Nuevo formulario de contacto recibido:\n\nNombre: ${formulario.nombre}\nCorreo electrónico: ${formulario.email}\nMensaje: ${formulario.mensaje}`,
      html: `<p>Nuevo formulario de contacto recibido:</p><ul><li><b>Nombre:</b> ${formulario.nombre}</li><li><b>Correo electrónico:</b> ${formulario.email}</li><li><b>Mensaje:</b> ${formulario.mensaje}</li></ul>`
    });

    console.log("Correo electrónico enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};