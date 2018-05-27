import { Sucursal } from "../../domain/sucursal";
import { Domicilio } from "../../domain/domicilio";
import { Baneo } from "../../domain/baneo";
import { Falta } from "../../domain/falta";

export class FormClientesModel {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public verificar_password: string,
        public telefono: string,
        public dni: string,
        public domicilio_entrega: Domicilio,
        public faltas: Falta,
        public baneos: Baneo,
        public activo: Boolean,
        public _id?: string
    ) {}
}