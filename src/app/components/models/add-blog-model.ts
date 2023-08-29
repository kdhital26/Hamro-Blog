export class BlogModel {
    constructor(
        public title?: string,
        public description?: string,
        public file?: any[],
        public _id?: string | undefined,
        public imagePath?: string| null
    ) {
        this.description = description;
        this.file = file;
        this.title = title;
        this._id = _id;
        this.imagePath = imagePath;
    }
}