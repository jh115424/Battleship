let rs = require("readline-sync");

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let grid = [];
let guesses = [];
let cords = [];



class ship {
  constructor(name, size, cords, orientation) {
    this.name = name;
    this.size = size;
    this.cords = cords;
    this.orientation = orientation;
    this.cords.length = 0;
  
  }
}

let ships = [];

// Instead of Setting the orientation in the buildShips Function, I set it on the ship itself
ships.push(new ship("Carrier", 4, [], 0));
ships.push(new ship("Battleship", 3, [], randomNumber(2)));
ships.push(new ship("Submarine", 2, [], randomNumber(2)));
ships.push(new ship("Destroyer", 1, [], randomNumber(2)));
ships.push(new ship("Cruiser", 2, [], randomNumber(2)));

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

  //   if(!wrappingBoard.flat().includes(pCords)){
  //  cords.push(pCords);
  //     ships.push(pCords);
  
  //   }



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


/* TODO LIST :
  1. Make sure each ship can fit in the grid 
    - if it is to close to an edge , go the other direction
  2. Check that each ship gets placed correctly ( this is being done in the notUsedMoreThanOnce function just need to apply it each time)
    - no overlaps 
    - not off the grid
    - all ships are placed 
  3. Log out all the ships and their coordinates - DONE ln 74, and 147,148
*/

// TODO: CHECK THAT EACH COORDINATE IS NOT USED MORE THAN ONCE.  1ST SHIP CAN TECHNICALLY GO ANYWHERE.  HINT: CHECK SHIP COORDINATES I HAVE ALREADY DONE
function generateShip(shipSize, shipIndex) {
  const flatGrid = grid.flat(); // likely to cause issues  [A1,A10,B1,B10]
  // cause issues, returns a number not the value of the grid coordinate
  console.log(`Placing ${ships[shipIndex].name}`);
  let placed = false;
  const whichDirection = ships[shipIndex].orientation; // this is set on the ship object now instead of in the buildShips function
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
    } else {
      console.log("Try to place ship again");
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

