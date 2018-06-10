import { Book } from "../model/book";

export interface OnSearchBooksResponse {
    onSearchBooks (books: Book[])
}