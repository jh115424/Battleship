let rs = require("readline-sync");

const keys = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

// const shipKey = () => Math.floor(Math.random() * keys.length);

// console.log(shipKey());

// const gridLocation = keys[shipKey()];
// console.log(gridLocation);

const ships = [""];

const pressAnyKey = require("press-any-key");
pressAnyKey("Press any key to start the game:  ", {
    
//   ctrlC: "reject",
}).then(function () {
  console.log("Starting game.......");
  let shipType = rs.question("Load first ship on the board: ", keys);

  const question = rs.question("Load second ship on board: ", keys);


  {
  }

  console.log("You chose: " + shipType + " and " + question);
}); 



// const question = rs.question("Enter a location to strike:");


const shipKey = () => Math.floor(Math.random() * keys.length);

console.log(shipKey());

const gridLocation = keys[shipKey()];
console.log(gridLocation);



     

// const shipStrike = rs.question("Enter a location to strike 'A2' ", keys, {
  

// });