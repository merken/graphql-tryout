import BooksActionsCreator from "./actioncreators/books.actions.creator";
import register from "./register";

class Api {
    private booksActionsCreator: BooksActionsCreator;
    constructor() {
        this.booksActionsCreator = register.resolve("BooksActionsCreator") as BooksActionsCreator;
    }

    async fetchBooks(): Promise<any> {
        const response = await fetch('http://localhost:4000/books');
        const books = await response.json();
        this.booksActionsCreator.booksReceived(books);
    }
};

export default Api;