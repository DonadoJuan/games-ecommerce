export class FormCuponModel {
    constructor(
        public codigo: string,
        public descuento: number,
        public validoDesde:Date,
        public validoHasta: Date,
    ) {}
}