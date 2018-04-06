//This is the general API object

import ServerActions from "./actions/server.actions";

const API = {
    async fetchBooks(): Promise<any> {
        const response = await fetch('http://localhost:4000/books');
        const books = await response.json();
        debugger
        ServerActions.booksReceived(books);
    }
};

export default API;