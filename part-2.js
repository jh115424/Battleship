let rs = require("readline-sync");

// const grid = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const strikeLocations = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let grid = [];
let guesses = [];
let cords = [];

// const shipName = ["Carrier", "Battleship", "Submarine", "Destroyer"];

class ship {
  constructor(name, size, cords) {
    this.name = name;
    this.size = size;
    this.cords = cords;
  }
}

let ships = [];

ships.push(new ship("Carrier", 5, []));
ships.push(new ship("Battleship", 4, []));
ships.push(new ship("Submarine", 3, []));
ships.push(new ship("Destroyer", 2, []));
ships.push(new ship("Cruiser", 3, []));

const buildGrid = (sideLength) => {
  for (let i = 0; i < sideLength; i++) {
    for (let j = 0; j < sideLength; j++) {
      grid.push(letters[i] + j);
    }
  }
  return grid;
};

// puts random numbers
const shipPlacement = () => Math.floor(Math.random() * grid.length);

//function to get integer
const gridIndex = (maxLocation) => randomNumber(maxLocation);

//TESTING
function randomNumber(number) {
  return Math.floor(Math.random() * Math.floor(number));
}

function generateShip(shipSize, shipIndex) {
  const startingLocation = randomNumber(grid.length);

  let placed = false;
  const whichDirection = randomNumber(2);
  // ship placement
  while (!placed) {
    let shipCords = [];
    let cord = startingLocation;
    shipCords.push(cord);

    //horizontal = 0;

    for (let i = 0; i < shipSize - 1; i++) {
      console.log(cord, whichDirection);

      if (whichDirection === 0) {
        cord++;
      } else {
        cord += 10;
      }
      shipCords.push(cord);
    }
    ships[shipIndex].cords.push(...shipCords);
    cords.push(...shipCords);

    //error handling

    if (shipSize === ships[shipIndex].cords.length) {
      placed = true;
    }
  }
}

let gameSetUp = true;

// This is the game loop
while (gameSetUp) {
  rs.keyIn(" Press any key to start the game. ");
  buildGrid(6);
  console.log(grid);
  console.log("Inside of set up while loop");

  for (let i = 0; i < ships.length; i++) {
    generateShip(ships[i].size, i);
    console.log(ships[i].name,ships[i].cords)
  }
  gameSetUp = false;
}
