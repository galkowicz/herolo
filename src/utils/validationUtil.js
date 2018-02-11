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

export const isFormValid = (inputs) => {
    const {title, author, date} = inputs;

    return isValidPastYear(date) && !isEmptyString(title) && !isEmptyString(author);
};