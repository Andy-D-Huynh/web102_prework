/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (let i = 0; i < games.length; i++) {
        const game = games[i]

        let gameDiv = document.createElement("div")
        gameDiv.classList.add("game-card")

        gameDiv.innerHTML = `
            <img src = "${game.img}" class = "game-img" />
            <h2>${game.name}</h2> 
            <p>${game.description}<p>
        `
        gamesContainer.appendChild(gameDiv)
    }

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalCont = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `${totalCont.toLocaleString()}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0)

// set inner HTML using template literal

raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numGames = GAMES_JSON.reduce ( (acc, game) => {
    return acc + 1
}, 0)
gamesCard.innerHTML = `${numGames}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unFunded = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal 
    })
    return unFunded

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const funded = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal 
    })
    return funded

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM
}

document.addEventListener("DOMContentLoaded", () => {
  showAllGames();
});


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", () => {addGamesToPage(filterUnfundedOnly())})
fundedBtn.addEventListener("click", () => {addGamesToPage(filterFundedOnly())})
allBtn.addEventListener("click", () => {showAllGames()})

showAllGames();
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unFundedGames = filterUnfundedOnly().reduce( (sum) => sum + 1, 0 )

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = 
    `A total of ${totalRaised.toLocaleString()} has been raised for ${numGames} games. Currently, 
    ${unFundedGames == 1 ? `${unFundedGames} game` : `${unFundedGames} games`}  
    remains unfunded. We need your help to fund these amazing games!`


// create a new DOM element containing the template string and append it to the description container
const display = document.createElement("p")
display.innerHTML = `${displayStr}` 
descriptionContainer.appendChild(display)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [firstWord, secondWord, ...other] = sortedGames
console.log(firstWord)
console.log(secondWord)
console.log(sortedGames)

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGame = document.createElement("div")
firstGame.innerHTML = `${firstWord.name}`
const secondGame = document.createElement("div")
secondGame.innerHTML = `${secondWord.name}`

firstGameContainer.appendChild(firstGame)
secondGameContainer.appendChild(secondGame)
// do the same for the runner up item