export class Baneo {
    constructor(
        public fecha_desde: Date,
        public motivo: string,
        public fecha_hasta: Date,
        public vigente: boolean,
        public id?: string
    ) {}
}