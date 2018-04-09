import * as React from "react";
import Api from "../api";
import BookStore from '../stores/book.store';
import register from "../register";

interface State {
    books: any[];
}

export class Main extends React.Component<{}, State> {
    private api: Api;
    private bookStore: BookStore;

    constructor(props?: any) {
        super(props);
        this.state = { books: [] };
        this.onChange = this.onChange.bind(this);
        this.api = (register.resolve("Api") as Api);
        this.bookStore = (register.resolve("BookStore") as BookStore);
    }

    componentDidMount() {
        this.bookStore.on("change", this.onChange);
        this.api.fetchBooks();
    }

    componentWillUnmount() {
        this.bookStore.removeListener("change", this.onChange);
    }

    onChange() {
        this.setState(this.bookStore.getState());
    }

    render() {
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