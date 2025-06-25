// Function to go back to home page
function goBack() {
  window.location.href = "index.html";
}

// Get the recipe container
let recipeDetailsEl = document.getElementById("recipeDetails");

// Get the stored recipe ID from localStorage
let mealId = localStorage.getItem("selectedMealId");

// If meal ID not found, show message
if (!mealId) {
  recipeDetailsEl.innerHTML = "<p class='text-red-500'>No recipe selected.</p>";
} else {
  let apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;

  // Fetch recipe data
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let meal = data.meals[0];
      let ingredientsList = getIngredients(meal);
      let ingredientsHTML = "";

      for (let i = 0; i < ingredientsList.length; i++) {
        ingredientsHTML += "<li>" + ingredientsList[i] + "</li>";
      }

      // Set full content using one innerHTML assignment
      recipeDetailsEl.innerHTML = `
        <h1 class="text-3xl font-bold text-[#123432]">${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" class="w-full max-h-[400px] shadow-xl object-cover rounded-md mb-9" />

        <div class="flex flex-row gap-5">

          <div class="bg-white shadow-lg rounded w-[300px] p-9">
            <p class="bg-blue-200 text-blue-900 rounded-xl text-center mb-3">${meal.strCategory}</p>
            <p class="bg-orange-200 text-orange-900 rounded-xl text-center">${meal.strArea}</p>
            <h2 class="text-xl font-semibold mt-3 w-[300px]">Ingredients</h2>
            <ul class="list-disc ml-3 text-gray-700 w-[200px]">
              ${ingredientsHTML}
            </ul>
            <p>----------------------------------------------------------------------</p>
          </div>

          <div class="bg-white shadow-lg rounded w-[900px] p-9">
            <h2 class="text-xl font-semibold mt-6">Instructions</h2>
            <p class="mt-2 whitespace-pre-line text-gray-800">${meal.strInstructions}</p>
          </div>

        </div>

        ${meal.strYoutube ? `
          <div class="mt-6">
            <h2 class="text-xl font-semibold">Watch Tutorial</h2>
            <a href="${meal.strYoutube}" target="_blank" class="text-blue-600 underline hover:text-blue-800">YouTube Video</a>
          </div>
        ` : ""}
      `;
    });
}

// Function to get ingredients and measurements
function getIngredients(meal) {
  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    let ingredient = meal["strIngredient" + i];
    let measure = meal["strMeasure" + i];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient + " - " + measure);
    }
  }

  return ingredients;
}
