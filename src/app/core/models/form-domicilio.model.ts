import { Domicilio } from "../../domain/domicilio";

export class FormDomicilioModel {
    constructor(
        public domicilio_entrega: Domicilio,
        public _id?: string
    ) {}
}