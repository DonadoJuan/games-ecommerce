export class Cupon {

    constructor(
    public codigo?: string,
    public descuento?: number,
    public validoDesde?:Date,
    public validoHasta?: Date,
    public _id?: string
    ){}
}