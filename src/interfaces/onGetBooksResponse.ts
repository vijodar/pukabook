import { Book } from "../model/book";

export interface OnGetBooksResponse {
    onGetBooks (books: Book[])
}