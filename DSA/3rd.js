const findOddOccurringElements = (arr) => {

    let xorResult = arr.reduce((acc, num) => acc ^ num, 0);

    const rightmostSetBit = xorResult & - xorResult;

    let x = 0, y = 0;
    for (let num of arr) {
        if ((num & rightmostSetBit) === 0) {
            x ^= num;
        } else {
            y ^= num;
        }
    }
    console.log(`The odd occurring elements are ${x} and ${y}`);
}
const arr = [4, 3, 6, 2, 4, 2, 3, 4, 3, 3];
findOddOccurringElements(arr);
