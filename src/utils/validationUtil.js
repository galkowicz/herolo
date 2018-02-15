import {DUPLICATE_TITLE, EMPTY_STRING} from '../constants/messages';

export const isEmptyString = (str) => {
    return (!str || 0 === str.length);
};

export const isValidPastYear = (date) => {
    const selectedDate = new Date(date);
    const now = new Date();

    return selectedDate < now;
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

export const isTitleValid = (title, books, isNewBook) => {
    if (isNewBook) {
        return !isEmptyString(title) && !isMultipleTitle(title, books);
    } else {
        return !isEmptyString(title);
    }
};

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();

    const formatDay = day[1] ? day : '0' + day[0];
    const formatMonth = month[1] ? month : '0' + month[0];

    return `${formatDay}/${formatMonth}/${date.getFullYear()}`;
};