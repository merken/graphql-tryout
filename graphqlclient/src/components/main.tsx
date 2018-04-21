import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Component } from 'react';

export interface AppProps { store: any; }

export class Main extends Component<AppProps> {
    render(): React.ReactElement<{}> {
        let content = "";
        if (this.props.store.books) {
            content = this.props.store.books.map((book: any) => {
                return <li key={book._id}>{book.title}</li>;
            });
        }

        return <div>
            Books
            <ul>
                {content}
            </ul>
        </div>;
    }
}

export default createFragmentContainer(Main, {
    store: graphql`
        fragment main_store on Store {
            books {
                _id
                title
                author
            }
        }`
});