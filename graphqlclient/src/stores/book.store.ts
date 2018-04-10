import { EventEmitter } from 'events';

import { Action, ActionTypes } from '../actions';
import Dispatcher from '../dispatcher';
import { inject, provideSingleton } from '../inversify.config';
import * as inversify from 'inversify';
import { injectable } from 'inversify';
inversify.decorate(injectable(), EventEmitter);

@provideSingleton("BookStore")
class BookStore extends EventEmitter {
    @inject("Dispatcher")
    private dispatcher: Dispatcher;
    private books: any[];

    constructor() {
        super();
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