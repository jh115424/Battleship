let rs = require("readline-sync");

const strikeLocations = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

let ships = "";
let rows = 10;
let columns = 10;
let shipLocation = 2;
let guesses = [];

let allShipLocations = [];


function loadScreen() {
    console.log("Starting game.......");
  }
  loadScreen();

const startGame = () => {
  rs.keyIn(" Press any key to start the game. ");

  // createGrid(3);
  // generateShips();
};
startGame();

// creates 2 random ships on board
const randomShips = () => Math.floor(Math.random() * strikeLocations.length);
console.log(allShipLocations);

// function generateShips() {
//     if(shipLocation < 2) {
//         const findLocation = strikeLocations[randomShips()]

//         if(allShipLocations.includes(findLocation)) {
//             generateShips();
//         } else {
//             allShipLocations.push(findLocation);
//         }
//     }
// }
// generateShips();

for (let i = 0; i < shipLocation; i++) {
  if (i < shipLocation) {
    const findLocation = strikeLocations[randomShips()];

    // if(!allShipLocations.includes(findLocation)) {
    allShipLocations.push(findLocation);

    // }
  }
}
console.log(allShipLocations);

function resetGame() {
  console.log();
  shipLocation = 2;
  allShipLocations();
  strikeLocations = [];
  startGame();
  loadScreen();
}

// Keeps track of strikes
function playerStrike() {
  if (shipLocation === 0) {
    shipLocation = shipLocation;
    let answer = rs.keyIn(
      "You have destroyed all of the battleships!  Would you like to play again? Y/N"
    );

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
    console.log("You have already picked this location! Miss!");
    console.log(location);
    playerStrike();
  }
  if (allShipLocations.includes(location)) {
    shipLocation = shipLocation - 1;
    console.log(`You have sunk a battleship! ${shipLocation} ship remaining! `);
    guesses.push(location);
    playerStrike();
  } else if (!allShipLocations.includes(location)) {
    console.log("You have missed!");
    guesses.push(location);
    playerStrike();
  }
}

