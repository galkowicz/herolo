import books from '../mocks/books';

export const asyncGetBooks = () => {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });
};