import * as React from 'react';

import Api from '../api';
import { inject, provideSingleton } from '../inversify.config';
import BookStore from '../stores/book.store';

export interface AppProps { }

export interface AppState {
    books: any[]
}

@provideSingleton("Main")
export class Main extends React.Component<AppProps, AppState> {
    @inject("Api")
    private api: Api;

    @inject("BookStore")
    private bookStore: BookStore;

    constructor(props: any) {
        super(props);
        this.state = { books: [] };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.bookStore.on("change", this.onChange);
        this.api.fetchBooks();
        this.bookStore.getState();
    }

    componentWillUnmount() {
        this.bookStore.removeListener("change", this.onChange);
    }

    onChange() {
        this.setState(this.bookStore.getState());
    }

    render(): React.ReactElement<{}> {
        let content = this.state.books.map(book => {
            return <li key={book._id}>{book.title}</li>;
        })
        return <div>
            Books
            <ul>
                {content}
            </ul>
        </div>;
    }
}