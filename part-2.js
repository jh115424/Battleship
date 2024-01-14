let rs = require("readline-sync");

const runGame = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let grid = [];
  let cords = [];
  let orientation = [];
  let shipLocation = 5;
  let allShipLocations = [];
  let guesses = [];
  let ships = [];

  class ship {
    constructor(name, size, cords, orientation) {
      this.name = name;
      this.size = size;
      this.cords = cords;
      this.orientation = orientation;
    }
  }

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

  // checks to see if coordinate is used more than once
  function notUsedMoreThanOnce(pCords) {
    let overlap = false;

    for (let i = 0; i < pCords.length; i++) {
      if (allShipLocations.includes(pCords[i])) {
        overlap = true;
      }
    }
    return overlap;
  }

  const shipPlacements = {
    placedShips: [],
    notPlacedShips: [],
  };

  function generateShip(shipSize, shipIndex) {
    const flatGrid = grid.flat();

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
          ships[shipIndex].size + (startingLocation % 10) < 10
            ? cord++
            : cord--;
        } else {
          ships[shipIndex].size + Math.floor(startingLocation / 10) < 10
            ? (cord += 10)
            : (cord -= 10);
        }
        potentialCords.push(flatGrid[cord]);
      }

      if (!notUsedMoreThanOnce(potentialCords)) {
        allShipLocations.push(...potentialCords);
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

  const startIntro = () => {
    rs.keyIn(" Press any key to start the game. ");
    while (shipLocation > 0) {
      playerStrike();
    }
  };

  function restartGame() {
    let answer = rs.keyInYNStrict(
      "You have destroyed all of the battleships!  Would you like to play again? Y/N"
    );
    if (answer) {
      runGame();
    } else {
      console.log("Goodbye! ");
      process.exit();
    }
  }

  function resetGame() {
    strike();
    startIntro();
    console.log();
    shipLocation = 5;
    guesses = [];
    allShipLocations = [];
    playerStrike();
    restartGame();
  }

  let gameSetUp = true;

  // This is the game loop
  while (gameSetUp) {
    buildGrid(10);
    console.table(grid);
    for (let i = 0; i < ships.length; i++) {
      generateShip(ships[i].size, i);
    }
    //this line below loads the shipName and cords under the grid
    console.log("Placed ships:", shipPlacements.placedShips);
    shipPlacements.notPlacedShips.forEach((ship) => {
      console.log("Not Placed:", ship.shipName, ship.cords);
    });
    gameSetUp = false;
  }

  // STARTS THE GAME
  const strike = () => {
    let strike = "Press any key to load game board: ";

    strike = rs.question(strike);
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

  //subtracts ships from game board with each play
  function playerStrike() {
    let strike = rs.question("Enter a location to strike: ").toUpperCase();
    checkShipHit(strike);
  }
  allShipLocations = cords;

  function checkShipHit(location) {
    console.log(allShipLocations);
    if (guesses.includes(location)) {
      console.log("You have already picked this location!  Miss!");
      console.log(location);
      playerStrike();
    } else if (!allShipLocations.includes(location)) {
      console.log("You have missed!");
      guesses.push(location);
      playerStrike();
    } else if (allShipLocations.includes(location)) {
      shipLocation = shipLocation - 1;
      allShipLocations.splice(
        allShipLocations.findIndex((index) => index === location),
        1
      );
      console.log(
        `Hit!  You have ${allShipLocations.length} more places to hit!`
      );
      guesses.push(location);
      if (allShipLocations.length === 0) {
        restartGame();
      } else {
        playerStrike();
      }
    }
  }
  startIntro();
};

runGame();
