import { alphabetLetters, categories, dashElement } from "./words.js";
import {
  drawBody,
  drawHead,
  drawInitialStructure,
  drawLeftArm,
  drawLeftLeg,
  drawRightArm,
  drawRightLeg,
} from "./canvas.js";
import { blastConfetti } from "./confetti.js";

const categoryContainer = document.getElementById("category-container");
const hiddenWord = document.querySelector("#hidden-word");
const alphabetContainer = document.querySelector(".alphabet-container");
const newGamePopup = document.querySelector(".new-game-popup");
const NewGameButton = document.querySelector(".new-game-popup button");

let secretWord = "";
let correctGuesses = 0;
let wrongGuesses = 0;

document.addEventListener("DOMContentLoaded", () => {
  displayCategories();
  createAlphabetButtons();
  drawInitialStructure();

  NewGameButton.addEventListener("click", startNewGame);
});

const displayCategories = () => {
  const categoriesArray = Object.keys(categories);

  categoriesArray.forEach((category) => {
    const button = document.createElement("button");
    button.className = "category";
    button.textContent = category;
    button.addEventListener("click", () => selectCategory(category));
    categoryContainer.appendChild(button);
  });
};

const selectCategory = (selectedCategory) => {
  const categoryButtons = document.querySelectorAll(".category");

  categoryButtons.forEach((button) => {
    const isSelected = button.textContent === selectedCategory;

    if (isSelected) {
      button.classList.add("active");
    } else {
      button.disabled = true;
    }
  });

  const wordsArray = categories[selectedCategory];

  const randomIndex = Math.floor(Math.random() * wordsArray.length);

  secretWord = wordsArray[randomIndex];

  const letters = secretWord.split("");
  const dashes = letters.map((letter) => dashElement);
  hiddenWord.innerHTML = dashes.join(" ");

  hiddenWord.classList.add("active");
  alphabetContainer.classList.add("active");
};

const createAlphabetButtons = () => {
  const alphabet = alphabetLetters.split("");

  alphabet.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "letter";
    button.textContent = letter;
    button.addEventListener("click", selectLetter);
    alphabetContainer.appendChild(button);
  });
};

const selectLetter = (e) => {
  const letterButton = e.target;
  const chosenLetter = letterButton.textContent;

  if (secretWord.includes(chosenLetter)) {
    revealLetters(chosenLetter);
    if (correctGuesses === secretWord.length) {
      displayResult(true);
    }
  } else {
    wrongGuesses++;
    drawNextPart();
    if (wrongGuesses === 6) {
      displayResult(false);
    }
  }

  letterButton.disabled = true;
};

const revealLetters = (chosenLetter) => {
  const dashes = document.querySelectorAll(".dash");

  const secretWordLetters = secretWord.split("");

  secretWordLetters.forEach((letter, index) => {
    if (letter === chosenLetter) {
      const dash = dashes[index];
      dash.textContent = chosenLetter;
      correctGuesses++;
    }
  });
};

const drawNextPart = () => {
  const drawFunctions = [
    drawHead,
    drawBody,
    drawLeftArm,
    drawRightArm,
    drawLeftLeg,
    drawRightLeg,
  ];

  const drawStep = drawFunctions[wrongGuesses - 1];
  drawStep();
};

const displayResult = (isWin) => {
  const h2 = document.querySelector(".new-game-popup h2");
  h2.textContent = isWin ? "You Win" : "You Lost!";

  const p = document.querySelector(".new-game-popup p");
  p.textContent = `Your chosen word was ${secretWord.toUpperCase()}`;

  setTimeout(() => {
    newGamePopup.classList.add("active");
    if (isWin === true) {
      blastConfetti();
    }
  }, 500);
};

const startNewGame = () => {
  correctGuesses = 0;
  wrongGuesses = 0;
  secretWord = "";

  categoryContainer.innerHTML = "";
  alphabetContainer.innerHTML = "";
  hiddenWord.innerHTML = "";

  alphabetContainer.classList.remove("active");
  hiddenWord.classList.remove("active");
  newGamePopup.classList.remove("active");

  displayCategories();
  createAlphabetButtons();
  drawInitialStructure();
};
