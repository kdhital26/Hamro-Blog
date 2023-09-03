export class CommenModel {
    constructor(
        public page?: number,
        public limit?: number
    ) {
        this.page = page || 1;
        this.limit = limit || 10 ;
    }
}