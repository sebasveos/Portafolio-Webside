export class User{
    constructor(
        public _id: string,
        public name: string,
        public password: string,
        public favorite: string[], // Array de IDs de los animes favoritos
    ){}
}
