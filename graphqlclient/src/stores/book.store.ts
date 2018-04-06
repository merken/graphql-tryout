import Dispatcher from '../dispatcher';
import { ActionTypes, Action } from '../actions';
import { EventEmitter } from 'events'

export interface IBookStore {
    getState(): any;
}

class BookStoreImpl extends EventEmitter implements IBookStore {
    private books: any[];
    constructor(props?: any) {
        super();
        this.registerForActions();
    }

    private registerForActions() {
        Dispatcher.register((action: Action) => {
            switch (action.type) {
                case ActionTypes.BOOKS_RECEIVED:
                debugger
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

export default new BookStoreImpl();