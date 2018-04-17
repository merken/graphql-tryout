import BooksActionsCreator from './actioncreators/books.actions.creator';
import { inject, provideSingleton } from './inversify.config';

@provideSingleton("Api")
class Api {
    @inject("BooksActionsCreator")
    private booksActionsCreator: BooksActionsCreator;

    constructor() { }

    async fetchBooks(): Promise<any> {
        const booksQuery = `query {
            books {
                _id,
                title,
                author
            }
        }`;
        const response = await fetch('http://localhost:4000/graphql?query=' + encodeURIComponent(booksQuery), { method: 'POST' });
        const graphqlResponse = await response.json();
        this.booksActionsCreator.booksReceived(graphqlResponse.data.books);
    }
};

export default Api;