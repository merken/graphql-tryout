import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BooksActionsCreator from './actioncreators/books.actions.creator';
import Api from './api';
import { Main } from './components/main';
import Dispatcher from './dispatcher';
import register from './register';
import BookStore from './stores/book.store';

register.register('Dispatcher', new Dispatcher());
register.register('BooksActionsCreator', new BooksActionsCreator());
register.register('Api', new Api());
register.register('BookStore', new BookStore());

ReactDOM.render(
    <Main/>,
    document.getElementById("root") as HTMLElement
);
