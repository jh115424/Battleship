let rs = require("readline-sync");

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let grid = [];
let guesses = [];
let cords = [];
let orientation = [];
let shipLocation = 5;

class ship {
  constructor(name, size, cords, orientation) {
    this.name = name;
    this.size = size;
    this.cords = cords;
    this.orientation = orientation;
  }
}

let ships = [];

// Instead of Setting the orientation in the buildShips Function, I set it on the ship itself
ships.push(new ship("Carrier", 5, [], 0));
ships.push(new ship("Battleship", 4, [], randomNumber(2)));
ships.push(new ship("Submarine", 3, [], randomNumber(2)));
ships.push(new ship("Destroyer", 2, [], randomNumber(2)));
ships.push(new ship("Cruiser", 3, [], randomNumber(2)));

const buildGrid = (sideLength) => {
  for (let row = 0; row < sideLength; row++) {
    grid[row] = [];
    for (let col = 0; col < sideLength; col++) {
      grid[row][col] = `${letters[row]}${col + 1}`;
    }
  }
  return grid;
};

function randomNumber(number) {
  return Math.floor(Math.random() * Math.floor(number));
}

//checks to see if coordinate is used more than once
function notUsedMoreThanOnce(pCords) {
  console.log("PCords:", pCords);
  console.log("Cords:", cords);
  let wrappingBoard =
    (pCords.includes("A10") && pCords.includes("B1")) ||
    (pCords.includes("B10") && pCords.includes("C1")) ||
    (pCords.includes("C10") && pCords.includes("D1")) ||
    (pCords.includes("D10") && pCords.includes("E1")) ||
    (pCords.includes("E10") && pCords.includes("F1")) ||
    (pCords.includes("F10") && pCords.includes("G1")) ||
    (pCords.includes("G10") && pCords.includes("H1")) ||
    (pCords.includes("H10") && pCords.includes("I1")) ||
    (pCords.includes("I10") && pCords.includes("J1")) ||
    pCords.includes(undefined);

  //check if coordinates are in the grid
  let outSideGrid = cords.some((cord) => cord > grid.flat().length);

  //check if other ships does not have same coordinates
  let overlappingShips = cords.includes(pCords);

  ships.includes(cords, pCords);

  console.log(!wrappingBoard, !outSideGrid, !overlappingShips);
  return !wrappingBoard && !outSideGrid && !overlappingShips;
}
const shipPlacements = {
  placedShips: [],
  notPlacedShips: [],
};

function generateShip(shipSize, shipIndex) {
  const flatGrid = grid.flat();

  console.log(`Placing ${ships[shipIndex].name}`);
  let placed = false;
  const whichDirection = ships[shipIndex].orientation;

  // ship placement
  while (!placed) {
    let potentialCords = [];

    let startingLocation = randomNumber(flatGrid.length);
    let cord = startingLocation;
    potentialCords.push(flatGrid[cord]);
    for (let i = 0; i < shipSize - 1; i++) {
      if (whichDirection === 0) {
        ships[shipIndex].size + (startingLocation % 10) < 10 ? cord++ : cord--;
      } else {
        ships[shipIndex].size + (startingLocation % 10) < 10
          ? (cord += 10)
          : (cord -= 10);
      }
      console.log(potentialCords);
      potentialCords.push(flatGrid[cord]);
    }

    if (notUsedMoreThanOnce(potentialCords)) {
      placed = true;
      ships[shipIndex].cords.push(...potentialCords);

      shipPlacements.placedShips.push({
        shipName: ships[shipIndex].name,
        cords: [...potentialCords],
      });
      cords.push(...potentialCords);
    }
  }
}
let gameSetUp = true;

// This is the game loop
while (gameSetUp) {
  rs.keyIn(" Press any key to start the game. ");
  buildGrid(10);
  console.table(grid);
  for (let i = 0; i < ships.length; i++) {
    generateShip(ships[i].size, i);
  }

  console.log("Placed ships:", shipPlacements.placedShips);
  shipPlacements.notPlacedShips.forEach((ship) => {
    console.log("Not Placed:", ship.shipName, ship.cords);
  });
  gameSetUp = false;
}

// ⁡⁢⁣⁢CODE TO ACTUALLY PLAY GAME BELOW⁡

// LOADING SCREEN
const loadScreen = () => {
  console.log("Starting game.......");
};
loadScreen();

// STARTS THE GAME
const strike = () => {
  let strike = rs.question("Press any key to continue: ");
  strike = strike.toUpperCase();
  let cord = strike.charCodeAt(0) - 65;
  if (strike.length > 2) {
    cord = strike.charCodeAt(1) - 49;
  }
  console.log(cord);
  console.log(cords);
  return cord;
};
strike();

const potentialCords = () => {
  let potentialCords = [];
  let randomX = Math.floor(Math.random() * 10);
  let randomY = Math.floor(Math.random() * 10);
  let randomDirection = Math.floor(Math.random() * 2);

  if (randomDirection === 0) {
    for (let i = 0; i < 5; i++) {
      if (randomX + i < 10) {
        potentialCords.push(grid[randomX + i][randomY]);
      } else {
        potentialCords.push(grid[randomX - i][randomY]);
      }
    }
  }
  return potentialCords;
};
console.log(potentialCords());

function resetGame() {
  loadScreen();
  strike();
  console.log();
  shipLocation = 5;
  playerStrike();
  resetGame();
}

function playerStrike() {
  if (shipLocation === 0) {
    shipLocation = shipLocation;
    let answer = rs.keyIn(
      "You have destroyed all of the battleships!  Would you like to play again? Y/N"
    );
    answer = answer.toUpperCase();

    console.log();
    console.log("The locations of the ships were: ");
    console.log(shipPlacements.placedShips);
    console.log("The locations of the misses were: ");
    console.log(guesses);

    if (answer === "Y") {
      resetGame();
    } else if (answer === "N") {
      console.log("Goodbye! ");
      process.exit();
    }
  }
  let strike = rs.question("Enter a location to strike: ");
  strike = strike.toUpperCase();

  if (shipLocation < 0) {
    checkShipHit(strike);
  } else if (shipLocation > 0) {
    checkShipHit(strike);
  }
}
playerStrike();

function checkShipHit(location) {
  console.log(location);
  console.log(guesses);

  if (guesses.includes(location)) {
    console.log("You have already picked this location!  Miss!");
    console.log(location);
    playerStrike();
  }
  if (!guesses.includes(location)) {
    shipLocation = shipLocation - 1;
    console.log(
      `You have sunken a ship!  You have ${shipLocation} ships left! `
    );
    guesses.push(location);
    playerStrike();
  } else if (guesses.includes(location)) {
    console.log("You have missed!");
    guesses.push(location);
    playerStrike();
  }
}
