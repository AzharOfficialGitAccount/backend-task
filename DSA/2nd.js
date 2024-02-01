// Print a spiral square matrix without using any extra space.
//     Given a positive number N, print an N × N spiral matrix containing numbers from 1 to N × N in a
// counterclockwise direction and without extra space.
// For example,
//     Input: N = 5
// Output:
// 25 24 23 22 21
// 10 9 8 7 20
// 11 2 1 6 19
// 12 3 4 5 18
// 13 14 15 16 17


const printSpiralMatrix = (N) => {

    const matrix = Array.from({ length: N }, () => Array(N).fill(0));

    let num = N * N;
    let top = 0;
    let bottom = N - 1;
    let left = 0;
    let right = N - 1;

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num--;
        }
        top++;

        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num--;
        }
        right--;

        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = num--;
        }
        bottom--;

        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = num--;
        }
        left++;
    }

    for (let row of matrix) {
        console.log(row.join("\t"));
    }
}

const N = 5;
printSpiralMatrix(N);


