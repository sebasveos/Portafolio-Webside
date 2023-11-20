export class Anime{
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public category: string[],
        public type: string,
        public year: number,
        public status: string,
        public image: string,
        public isInFavorites?: boolean,
    ){}
}