import Dispatcher from '../dispatcher';
import { ActionTypes, Action } from '../actions';
import { EventEmitter } from 'events'
import register from '../register';

class BookStore extends EventEmitter {
    private dispatcher: Dispatcher;
    private books: any[];
    
    constructor(props?: any) {
        super();
        this.dispatcher = register.resolve("Dispatcher") as Dispatcher;
        this.registerForActions();
    }

    private registerForActions() {
        this.dispatcher.registerForActions((action: Action) => {
            switch (action.type) {
                case ActionTypes.BOOKS_RECEIVED:
                    this.books = action.payload;
                    this.emit("change");
                    break;
            }
        });
    }

    getState() {
        return {
            books: this.books
        };
    }
}

export default BookStore;