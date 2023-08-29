export class RatingModel{
    public id?: string;
    public rating?: number;
    constructor(id: string, rating: number) {
        this.id = id;
        this.rating = rating;
    }
}

export class CommentModel {
    constructor(
        public id?: string,
        public comment?: string
    ) {
        this.id = id;
        this.comment = comment
    }
}