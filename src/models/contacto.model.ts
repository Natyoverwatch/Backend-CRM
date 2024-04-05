import { Schema, model, Model } from "mongoose";

// Definir la interfaz para el formulario de contacto
export interface ContactoFormInterface {
    nombre: string;
    email: string;
    mensaje: string;
    createdAt: Date;
}

// Definir el esquema para el formulario de contacto
const ContactoFormSchema = new Schema<ContactoFormInterface>({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContactoFormModel: Model<ContactoFormInterface> = model<ContactoFormInterface>("ContactoForm", ContactoFormSchema);

export default ContactoFormModel;
