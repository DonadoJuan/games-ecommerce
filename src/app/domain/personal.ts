import { Sucursal } from "./sucursal";
import { Domicilio } from "./domicilio";

export class Personal {
    constructor(
        public nombre: string,
        public legajo: string,
        public dni: string,
        public fecha_nacimiento: string,
        public email: string,
        public perfil: string,
        public sucursal: Sucursal,
        public domicilio: Domicilio,
        public telefono: string,
        public _id?: string
    ) {}
}