let rs = require("readline-sync");

const grid = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const units = ["X", "O"];




const gridNineUnit = () => {
    let grid = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid.push(letters[i] + j);
        }
    }
    return grid;
}
console.log(gridNineUnit(3, 3));


const gridTwentyFiveUnit = () => {
    let grid = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            grid.push(letters[i] + j);
        }
    }
    return grid;
}
console.log(gridTwentyFiveUnit(5, 5));


const gridOneHundredUnit = () => {
    let grid = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            grid.push(letters[i] + j);
        }
    }
    return grid;
}
console.log(gridOneHundredUnit(10, 10));