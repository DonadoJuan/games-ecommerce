import { Videojuego } from "./videojuego";

export class Pedido {
    fecha: string;
    cliente: string;
    domicilio_entrega?: any;
    sucursal_entrega?: any;
    destino: any;
    estado: string;
    videojuegos?: Videojuego[]
    _id?: string
}