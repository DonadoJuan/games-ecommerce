import { Domicilio } from "./domicilio";
import { Videojuego } from "./videojuego";

export class Sucursal {
    constructor(
        public ubicacion: Domicilio,
        public videojuegos?: Videojuego[],
        public _id?: string
    ) {}
}