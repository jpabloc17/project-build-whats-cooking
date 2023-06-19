//www.themealdb.com/api/json/v1/1/list.php?a=list - Cuisine Option
//www.themealdb.com/api/json/v1/1/list.php?c=list - Categories Option

// Elements
const cuisineSelect = document.querySelector("#cuisines");
const categorySelect = document.querySelector("#categories");

// Function Calls
getCuisines();
getCategories();

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine);
categorySelect.addEventListener("change", getRecipesByCategory);

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
