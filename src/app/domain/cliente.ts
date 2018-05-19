import { Falta } from "./falta";
import { Baneo } from "./baneo";
import { Domicilio } from "./domicilio";

export class Cliente {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public telefono: string,
        public dni: string,
        public domicilio_entrega: Domicilio[],
        public faltas: Falta[],
        public baneos: Baneo[],
        public activo: Boolean,
        public _id?: string
    ) {}
}