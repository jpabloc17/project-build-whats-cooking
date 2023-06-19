//www.themealdb.com/api/json/v1/1/list.php?a=list - Cuisine Option
//www.themealdb.com/api/json/v1/1/list.php?c=list - Categories Option
//www.themealdb.com/api/json/v1/1/filter.php?a=Canadian - Recipes filter By Area
//www.themealdb.com/api/json/v1/1/filter.php?c=Seafood - Recepes filter By Option
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772 - Lookup full meal details by id

// Elements
const cuisineSelect = document.querySelector("#cuisines");
const categorySelect = document.querySelector("#categories");
const recipeContainer = document.querySelector(".recipe-container");

// Function Calls
getCuisines();
getCategories();

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine);
categorySelect.addEventListener("change", getRecipesByCategory);

// Dropdown Functions
function getCuisines() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then((response) => response.json())
    .then((cuisines) => renderCuisineOptions(cuisines.meals))
    .catch((error) => alert(error));
}

function getCategories() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => response.json())
    .then((categories) => renderCategoryOptions(categories.meals))
    .catch((error) => alert(error));
}

function renderCuisineOptions(cuisines) {
  cuisines.forEach((cuisine) => {
    const option = document.createElement("option");
    option.value = cuisine.strArea;
    option.textContent = cuisine.strArea;
    cuisineSelect.append(option);
  });
}

function renderCategoryOptions(categories) {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    categorySelect.append(option);
  });
}

// Recipe Collection Functions

function getRecipesByCuisine(e) {
  const cuisine = e.target.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
    .then((response) => response.json())
    .then((recipes) => renderAllRecipes(recipes.meals))
    .catch((error) => alert(error));
}

function getRecipesByCategory(e) {
  const category = e.target.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((recipes) => renderAllRecipes(recipes.meals))
    .catch((error) => alert(error));
}

function renderAllRecipes(recipes) {
  recipeContainer.replaceChildren();
  recipes.forEach((recipe) => {
    renderRecipeCard(recipe);
  });
  cuisineSelect.value = "";
  categorySelect.value = "";
}

function renderRecipeCard(recipe) {
  const {
    idMeal: recipeId,
    strMeal: recipeName,
    strMealThumb: recipeImage,
  } = recipe;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.addEventListener("click", (e) => getRecipeDetails(e, recipeId));

  const image = document.createElement("img");
  image.src = recipeImage;
  const title = document.createElement("h3");
  title.textContent = recipeName;

  cardDiv.append(image, title);
  recipeContainer.append(cardDiv);
}

function getRecipeDetails(e, recipeId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((response) => response.json())
    .then((recipe) => console.log(recipe.meals[0]))
    .catch((error) => alert(error));
}
