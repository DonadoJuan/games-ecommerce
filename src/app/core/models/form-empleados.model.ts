import { Sucursal } from "../../domain/sucursal";
import { Domicilio } from "../../domain/domicilio";

export class FormEmpleadosModel {
    constructor(
        public nombre: string,
        public legajo: string,
        public dni: string,
        public fecha_nacimiento: Date,
        public email: string,
        public perfil: string,
        public sucursal: Sucursal,
        public domicilio: Domicilio,
        public telefono: string,
        public password: string,
        public id?: string
    ) {}
}