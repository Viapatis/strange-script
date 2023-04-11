/**
 *
 * @param startChar {string}
 * @param length {number}
 * @returns {string[]}
 */
function createCharSubset(startChar, length) {
    const startCharCode = startChar.charCodeAt();
    return [...new Array(length)].map((_, index) =>
        String.fromCharCode(startCharCode + index)
    );
}

/**
 *
 * @param excludedSymbols? {string}
 * @param specChars ? {string}
 * @returns {string[]}
 */
function getAllowedCharSet(excludedSymbols = 'CPSX', specChars = '+-_$~') {
    const digits = createCharSubset('0', 10);
    const lowercaseLitters = createCharSubset('a', 26);
    const uppercaseLitters = createCharSubset('A', 26);
    return [
        ...digits,
        ...lowercaseLitters,
        ...uppercaseLitters,
        ...specChars,
    ].filter((char) => excludedSymbols.indexOf(char) === -1);
}

/**
 *
 * @param length {number}
 * @param allowedCharSet {string[]}
 * @returns {string}
 */
function createRandomString(length, allowedCharSet) {
    const maxIndex = allowedCharSet.length - 1;
    return [...new Array(length)]
        .map(() => {
            const index = Math.round(Math.random() * maxIndex);
            return allowedCharSet[index];
        })
        .join('');
}

const LOWERCASE_LITTERS_INTERVAL = {
    START: 'a'.charCodeAt(),
    END: 'z'.charCodeAt(),
};

const UPPERCASE_LITTERS_INTERVAL = {
    START: 'A'.charCodeAt(),
    END: 'Z'.charCodeAt(),
};

const DIGITS_INTERVAL = {
    START: '0'.charCodeAt(),
    END: '9'.charCodeAt(),
};

/**
 *
 * @param char {string}
 * @returns {boolean}
 */
const isLitter = (char) => {
    const charCode = char.charCodeAt();
    return (
        (charCode >= LOWERCASE_LITTERS_INTERVAL.START &&
            charCode <= LOWERCASE_LITTERS_INTERVAL.END) ||
        (charCode >= UPPERCASE_LITTERS_INTERVAL.START &&
            charCode <= UPPERCASE_LITTERS_INTERVAL.END)
    );
};

/**
 *  * @returns {void}
 */
const start = () => {
    let letterCount = 0;
    let digitCount = 0;
    let specCharsCount = 0;
    const allowedCharSet = getAllowedCharSet();
    const randomStringLength = +prompt('Введите длину строки');
    const randomString = createRandomString(randomStringLength, allowedCharSet);
    console.log(randomString, randomString.length);

    const charForReplaceLitters = prompt('Введите символ для замены букв');

    const stringAfterReplaceLitters = [...randomString]
        .map((char) => {
            let newChar = char;
            if (isLitter(char)) {
                letterCount++;
                newChar = charForReplaceLitters;
            } else if (Number.isNaN(+char)) {
                specCharsCount++;
            }
            return newChar;
        })
        .join('');
    console.log(stringAfterReplaceLitters);

    const charForReplaceDigits = prompt('Введите символ для замены цифр');
    const stringAfterReplaceDigits = [...stringAfterReplaceLitters]
        .map((char) => {
            let newChar = char;
            if (!Number.isNaN(+char)) {
                digitCount++;
                newChar = charForReplaceDigits;
            }
            return newChar;
        })
        .join('');
    console.log(stringAfterReplaceDigits);
    console.log(
        `Повторов "${charForReplaceLitters}": ${letterCount}.\nПовторов "${charForReplaceDigits}": ${digitCount}.\nЧисло незамененных символов: ${specCharsCount}`
    );
};
