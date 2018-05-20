export class FormVideojuegosModel {
    constructor(
        public titulo: string,
        public codigo: string,
        public genero: string,
        public plataforma : string,
        public cantMinima : number,
        public cantMaxima : number,
        public urlVideo : string,
        public precio : number,
        public descripcion: string
    ) {}
}