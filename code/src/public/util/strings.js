function fill(str, extend) {
    const len = str.toString().length; // in case str is not a string
    if (len > extend) {
        return '';
    }
    return ' '.repeat(extend - len);
}

/**
 * Appends blanks to the right until the string is of size extend
 * padRight :: String, Int -> String
 */
function padRight(str, extend) {
    return `${str}${fill(str, extend)}`;
}

/**
 * Appends blanks to the left until the string is of size extend
 * padLeft :: String, Int -> String
 */
function padLeft(str, extend) {
    return `${fill(str, extend)}${str}`;
}

export { padRight, padLeft };
