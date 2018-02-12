export const getSelectedBook = (bookTitle, books = []) => {
    return books.find((book) => {
        return book.title === bookTitle;
    });
};

export const clearNonEnglishChars = (str) => {
    const reg = /[^A-Za-z_,\s.-]/g; // only english letters
    return str.replace(reg, '');
};

export const formatWords = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const formatTitle = (str) => {
    let result = str;
    result = clearNonEnglishChars(result);
    result = formatWords(result);

    return result;
};