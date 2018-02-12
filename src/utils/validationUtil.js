import {DUPLICATE_TITLE, EMPTY_STRING} from '../constants/messages';

export const isEmptyString = (str) => {
    return (!str || 0 === str.length);
};

export const isValidPastYear = (date) => {
    const reg = new RegExp(/^\d+$/);
    if (!date.match(reg)) {
        return false;
    }

    if (date < 0) {
        return false;
    }
    let currentYear = new Date().getFullYear();
    return currentYear - date >= 0;
};

export const isFormValid = (inputs, books) => {
    const {title, author, date} = inputs;

    return isValidPastYear(date) && !isEmptyString(title) && !isEmptyString(author) && !isMultipleTitle(title, books);
};

export const isMultipleTitle = (title, books) => {
    return books.find((book) => {
        return book.title.toLowerCase() === title.toLowerCase();
    });
};

export const getTitleMessage = (title, books) => {
    if (isEmptyString(title)) {
        return EMPTY_STRING;
    }
    if (isMultipleTitle(title, books)) {
        return DUPLICATE_TITLE;
    }
};