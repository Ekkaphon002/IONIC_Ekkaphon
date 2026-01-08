import { createStore } from "vuex";
import booksData from "../stores/books.json";

const savedBooks = JSON.parse(localStorage.getItem("books"));

export default createStore({
    state() {
        return {
            books: savedBooks || booksData
        };
    },
    getters: {
        allBooks(state) {
            return state.books;
        },
        getBookById: (state) => (id) => {
            return state.books.find(b => b.id === id);
        }
    },
    mutations: {
        BORROW_BOOK(state, id) {
            const book = state.books.find(b => b.id === id);
            if (book && book.available_copies > 0) {
            }
            book.available_copies--;
            localStorage.setItem("books", JSON.stringify(state.books));
        },

        RETURN_BOOK(state, id) {
            const book = state.books.find(b => b.id === id);
            if (book) {
                book.available_copies++;
                localStorage.setItem("books", JSON.stringify(state.books));
            }
        },

        ADD_BOOK(state, newBook) {
            state.books.push(newBook);
            localStorage.setItem("books", JSON.stringify(state.books));
        }

    }
});