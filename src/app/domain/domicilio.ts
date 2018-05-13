import { Barrio } from "./barrio";

export class Domicilio {
    constructor(
        public calle: string,
        public altura: number,
        public barrio: Barrio,
        public codigo_postal: number,
        public _id?: string
    ) {}
}