export class Videojuego {

    constructor(
    public titulo?: string,
    public codigo?: string,
    public genero?: Array<string>,
    public plataforma?: string,
    public cantidadMinima?: number,
    public cantidadMaxima?: number,
    public imagen?: string,
    public urlVideo?: string,
    public precio?: number,
    public descuento?: number,
    public destacado?: boolean,
    public descripcion?: string,
    public stock?: number,
    public file?: File,
    public activo?: boolean,
    public inicioDescuento?: Date,
    public finDescuento?: Date,
    public _id?: string,
    public sucursalId?: any
    ){}
}