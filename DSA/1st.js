// Write a function in JavaScript/Typescript that takes a string and returns the first non-repeating
// character in it. Consider only alphabetic characters.

const nonRepeatingChar = (str) => {

    const charCount = {};

    for (const char of str) {
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
    }

    for (const char of str) {
        if (
            ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) &&
            charCount[char] === 1
        ) {
            return char;
        }
    }

    return null;
};

const inputString = "azhar";
const result = nonRepeatingChar(inputString);

if (result !== null) {
    console.log(`First non repeating character is ${result}`);
} else {
    console.log("Not found");
};
