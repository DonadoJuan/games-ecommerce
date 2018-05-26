export class FormVideojuegosModel {
    constructor(
        public titulo: string,
        public codigo: string,
        public genero: Array<string>,
        public plataforma : Array<string>,
        public cantMinima : number,
        public cantMaxima : number,
        public urlVideo : string,
        public precio : number,
        public destacado: boolean,
        public descripcion: string
    ) {}
}