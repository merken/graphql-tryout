//This is an action creator
import Dispatcher from '../dispatcher';
import { ActionTypes } from '../actions';

const ServerActions = {
    booksReceived(books: any) {
        Dispatcher.dispatch({
            type: ActionTypes.BOOKS_RECEIVED,
            payload: books
        });
    }
};

export default ServerActions;