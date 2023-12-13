let rs = require("readline-sync");

const numbers = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
  let row;
  let col = 0;
  for (row = 0; row < sideLength; row++) {
    grid[row] = [];

    for (col = 0; col < sideLength; col++) {
      grid[row][col] = `${letters[row]}${col + 1}`;
      
    }
  }
  return grid;
};
//for line 37
// grid.push(letters[i] + j);

// puts random numbers
const shipPlacement = () => Math.floor(Math.random() * grid.length);

//function to get integer
const gridIndex = (maxLocation) => randomNumber(maxLocation);

//TESTING
function randomNumber(number) {
  return Math.floor(Math.random() * Math.floor(number));
}

//checks to see if coordinate is used more than once
function notUsedMoreThanOnce(cords) {
    
     let shipCheck = 
     (cords.includes("A10") && cords.includes("A1")) || 
     (cords.includes("B10") && cords.includes("C1")) || 
     (cords.includes("C10") && cords.includes("D1")) ||
     (cords.includes("D10") && cords.includes("E1")) ||
     (cords.includes("E10") && cords.includes("F1")) ||
     (cords.includes("F10") && cords.includes("G1")) ||
     (cords.includes("G10") && cords.includes("H1")) ||
     (cords.includes("H10") && cords.includes("I1")) ||
     (cords.includes("I10") && cords.includes("J1")) ||
     (cords.includes("J10") && cords.includes("A1")) ||
     cords.includes(undefined) 

     //check if coordinates are in the grid
     let outSideGrid = cords.some((cord) => cord > grid.flat().length);

//check if other ships does not have same coordinates
let overlappingShips = cords.some((cord) => ships.includes(`${cord}`));
return !shipCheck && !outSideGrid && !overlappingShips;

//   console.log(shipCheck);
//       if (shipCheck === false) {
//         console.log(shipCheck);
//         return true;
      
//       } else {
//         return false;
//       }
       
};


// TODO: CHECK THAT EACH COORDINATE IS NOT USED MORE THAN ONCE.  1ST SHIP CAN TECHNICALLY GO ANYWHERE.  HINT: CHECK SHIP COORDINATES I HAVE ALREADY DONE
function generateShip(shipSize, shipIndex) {
   const flatGrid = grid.flat();
  const startingLocation = randomNumber(flatGrid.length);

  let placed = false;
  const whichDirection = randomNumber(2);
  // ship placement
  while (!placed) {
    let shipCords = [];
    let cord = startingLocation;

    shipCords.push(flatGrid[cord]);
  
    for (let i = 0; i < shipSize - 1; i++) {

      if (whichDirection === 0) {
        cord++;
      } else {
        cord += 10;
      }

      shipCords.push(flatGrid[cord]);
    }

      //  console.log(notUsedMoreThanOnce(shipCords));
    if(notUsedMoreThanOnce(shipCords)) {
      placed = true;
       ships[shipIndex].cords.push(...shipCords);
      cords.push(...shipCords);
      // placed = true;
      console.log("ship placed");

    }
    if (shipSize === ships[shipIndex].cords.length) {
        placed = true;
        generateShip(shipSize, shipIndex);
      }


    // } else {
    //     placed= true;
    //   generateShip(shipSize, shipIndex);
    }

    if (shipCords.length === ships.length) {
    }

    ships[shipIndex].cords.push(...shipCords);
    cords.push(...shipCords);

    //error handling
    if (shipSize === ships[shipIndex].cords.length) {
      placed = true;
    }
  }




let gameSetUp = true;

// This is the game loop
while (gameSetUp) {
  rs.keyIn(" Press any key to start the game. ");
  buildGrid(10);
  console.table(grid);
//   console.log("Inside of set up while loop");

  for (let i = 0; i < ships.length; i++) {
    generateShip(ships[i].size, i);
    console.log(ships[i].name, ships[i].cords);
  }
  gameSetUp = false;
}


