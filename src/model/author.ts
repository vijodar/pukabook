interface IAuthor {
    id: number
    first: string
    last: string
    biography: string
    photo: string
}

export class Author {

    //region PUBLIC_VARIABLES
    id: number
    first: string
    last: string
    biography: string
    photo: string
    //endregion PUBLIC_VARIABLES

    //region CONST
    constructor(iAuthor: IAuthor = {
        id: null,
        first: null,
        last: null,
        biography: null,
        photo: null
    }) {

        this.id = iAuthor.id
        this.first = iAuthor.first
        this.last = iAuthor.last
        this.biography = iAuthor.biography
        this.photo = iAuthor.photo
    }
    //endregion CONST
}