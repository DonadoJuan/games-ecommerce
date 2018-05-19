export class Falta {
    constructor(
        public fecha_desde: Date,
        public fecha_hasta: Date,
        public motivo: string,
        public id?: string
    ) {}
}