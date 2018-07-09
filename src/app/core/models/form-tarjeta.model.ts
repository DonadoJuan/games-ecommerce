import { Domicilio } from "../../domain/domicilio";

export class FormTarjetaModel {
    constructor(
        public tipoTarjeta : string,
        public nombre : string,
        public numero : number,
        public vencimiento : Date,
        public codigo : number,
        public domicilio_entrega: Domicilio,
        public _id?: string
    ) {}
}