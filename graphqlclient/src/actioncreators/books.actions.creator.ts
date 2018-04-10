import { ActionTypes } from '../actions';
import Dispatcher from '../dispatcher';
import { inject, provideSingleton } from '../inversify.config';

@provideSingleton("BooksActionsCreator")
class BooksActionsCreator {
    @inject("Dispatcher")
    private dispatcher: Dispatcher;

    constructor() {
    }

    booksReceived(books: any) {
        this.dispatcher.dispatchAction({
            type: ActionTypes.BOOKS_RECEIVED,
            payload: books
        });
    }
};

export default BooksActionsCreator;