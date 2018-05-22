export class Videojuego {

    constructor(
    public titulo?: string,
    public codigo?: string,
    public genero?: Array<string>,
    public plataforma?: Array<string>,
    public cantidadMinima?: number,
    public cantidadMaxima?: number,
    public imagen?: string,
    public urlVideo?: string,
    public precio?: number,
    public descuento?: number,
    public destacado?: boolean,
    public descripcion?: string,
    public stock?: number,
    public _id?: number
    ){}
}