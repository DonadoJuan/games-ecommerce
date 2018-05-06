import { Domicilio } from "./domicilio";
import { Videojuego } from "./videojuego";

export class Sucursal {
    constructor(
        public ubicacion: Domicilio,
        public videojuego: Videojuego,
        public id?: string
    ) {}
}