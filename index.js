let rs = require("readline-sync");

const strikeLocations = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
let shipLocation = 2;
let guesses = [];
let allShipLocations = [];

const startGameQuestion = () => {
  rs.keyIn(" Press any key to start the game. ");
  placeAllShips();
  console.log(allShipLocations);
  while (shipLocation > 0) {
    playerStrike();
  }

  restartGame();
};

function placeAllShips() {
  const randomShips = () => Math.floor(Math.random() * strikeLocations.length);
  for (let i = 0; i < shipLocation; i++) {
    if (i < shipLocation) {
      const findLocation = strikeLocations[randomShips()];
      if (!allShipLocations.includes(findLocation)) {
        allShipLocations.push(findLocation);
      } else {
        i--;
      }
    }
  }
}
function restartGame() {
  if (shipLocation === 0) {
    let answer = rs.keyInYNStrict(
      "You have destroyed all of the battleships!  Would you like to play again? Y/N"
    );
    if (answer) {
      resetGame();
    } else {
      console.log("Goodbye! ");
      process.exit();
    }
  }
}
function resetGame() {
  shipLocation = 2;
  guesses = [];
  allShipLocations = [];
  startGameQuestion();
}

// ⁡⁢⁣⁢Keeps track of strikes⁡
function playerStrike() {
  let strike = rs.question("Enter a location to strike: ").toUpperCase();
  checkShipHit(strike);
}

function checkShipHit(location) {
  if (guesses.includes(location)) {
    console.log("You have already picked this location! Miss!");
  } else if (allShipLocations.includes(location)) {
    shipLocation = shipLocation - 1;
    console.log(`You have sunk a battleship! ${shipLocation} ship remaining! `);
    guesses.push(location);
  } else if (!allShipLocations.includes(location)) {
    console.log("You have missed!");
    guesses.push(location);
  }
}
startGameQuestion();
