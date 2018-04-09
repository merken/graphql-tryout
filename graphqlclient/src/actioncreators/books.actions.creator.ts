import { ActionTypes } from '../actions';
import Dispatcher from '../dispatcher';
import register from '../register';

class BooksActionsCreator {
    private dispatcher: Dispatcher;
    constructor() {
        this.dispatcher = register.resolve("Dispatcher") as Dispatcher;
    }

    booksReceived(books: any) {
        this.dispatcher.dispatchAction({
            type: ActionTypes.BOOKS_RECEIVED,
            payload: books
        });
    }
};

export default BooksActionsCreator;