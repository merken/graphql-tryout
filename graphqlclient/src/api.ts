import BooksActionsCreator from './actioncreators/books.actions.creator';
import { inject, provideSingleton } from './inversify.config';

@provideSingleton("Api")
class Api {
    @inject("BooksActionsCreator")
    private booksActionsCreator: BooksActionsCreator;

    constructor() { }

    async fetchBooks(): Promise<any> {
        const response = await fetch('http://localhost:4000/books');
        const books = await response.json();
        this.booksActionsCreator.booksReceived(books);
    }
};

export default Api;