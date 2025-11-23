import { alphabetLetters, categories, dashElement } from "./words.js";
import { drawInitialStructure } from "./canvas.js";

const categoryContainer = document.getElementById("category-container");
const hiddenWord = document.querySelector("#hidden-word");
const alphabetContainer = document.querySelector(".alphabet-container");

let secretWord = "";

document.addEventListener("DOMContentLoaded", () => {
  displayCategories();
  createAlphabetButtons();
  drawInitialStructure();
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
    alphabetContainer.appendChild(button);
  });
};
