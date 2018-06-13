import { Author } from "./author";

interface IBook {
    id: number
    bname: string
    photo: string
    synopsis: string
    author: Author
    genre: string
}

export class Book {

    //region PUBLIC_VARIABLES
    id: number
    bname: string
    photo: string
    synopsis: string
    author: Author
    genre: string
    //endregion PUBLIC_VARIABLES

    //region CONST
    constructor(iBook: IBook = {
        id: null,
        bname: null,
        photo: null,
        synopsis: null,
        author: null,
        genre: null,
    }) {
        this.id = iBook.id
        this.bname = iBook.bname
        this.photo = iBook.photo
        this.synopsis = iBook.synopsis
        this.author = iBook.author
        this.genre = iBook.genre
    }
    //endregion CONST
}