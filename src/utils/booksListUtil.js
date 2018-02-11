export const getSelectedBook = (bookTitle, books = []) => {
    return books.find((book) => {
        return book.title === bookTitle;
    });
};