import * as React from "react";
import API from "../api";
import BookStore from '../stores/book.store';
import { IBookStore } from '../stores/book.store';

interface State {
    books: any[];
}

export class Main extends React.Component<{}, State> {
    constructor(props?: any) {
        super(props);
        this.state = { books: [] };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        BookStore.on("change", this.onChange);
        API.fetchBooks();
    }

    componentWillUnmount() {
        BookStore.removeListener("change", this.onChange);
    }

    onChange() {
        this.setState(BookStore.getState());
    }

    render() {
        let content = this.state.books.map(book=>{
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