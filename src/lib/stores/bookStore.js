import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createBookStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set: (value) => {
            if (browser) {
                localStorage.setItem('books', JSON.stringify(value));
            }
            set(value);
        },
        update: (updater) => {
            update(currentBooks => {
                const newBooks = updater(currentBooks);
                if (browser) {
                    localStorage.setItem('books', JSON.stringify(newBooks));
                }
                return newBooks;
            });
        },
        updateBook: (bookId, updater) => {
            update(currentBooks => {
                const newBooks = currentBooks.map(book => 
                    book.id === bookId ? updater(book) : book
                );
                if (browser) {
                    localStorage.setItem('books', JSON.stringify(newBooks));
                }
                return newBooks;
            });
        }
    };
}

export const books = createBookStore();
