// Get the button, input, and result container elements
let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let resultsEl = document.getElementById("results");

// When the search button is clicked
searchBtn.addEventListener("click", function () {
  let bannerPage = document.getElementById("bannerPage");
  bannerPage.style.display = "none"; // Hide the banner

  let query = searchInput.value.trim(); // Get the text from input

  if (query !== "") {
    fetchRecipes(query); // Call function to fetch recipes
  }
});

// Function to fetch recipes from the API
function fetchRecipes(query) {
  resultsEl.innerHTML = "Loading...";

  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query;

  fetch(url)
    .then(function (response) {
      return response.json(); // Convert to JSON
    })
    .then(function (data) {
      resultsEl.innerHTML = ""; // Clear previous results

      if (!data.meals) {
        resultsEl.innerHTML = "<p class='text-center text-gray-700'>No recipes found.</p>";
        return;
      }

      for (let i = 0; i < data.meals.length; i++) {
        let meal = data.meals[i];

        // Create a card div
        let card = document.createElement("div");
        card.className = "bg-white w-[300px] rounded-lg shadow-lg overflow-hidden";

        // Add inner HTML for the card
        card.innerHTML =
          '<img src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '" class="w-full h-[200px] object-cover">' +
          '<div class="p-4">' +
          '<h2 class="text-xl font-bold text-[#654465] mb-2">' + meal.strMeal + '</h2>' +
          '<p class="text-sm text-gray-600">' + meal.strArea + ' | ' + meal.strCategory + '</p>' +
          '<button onclick="viewRecipe(' + meal.idMeal + ')" class="mt-4 bg-[#153e17] text-white px-4 py-1 rounded border-[1px] border-white hover:bg-[#165656]">' +
          'View Recipe</button>' +
          '</div>';

        // Add the card to the result container
        resultsEl.appendChild(card);
      }
    });
}

// This function stores the selected recipe ID and opens a new page
function viewRecipe(id) {
  localStorage.setItem("selectedMealId", id); // Save ID in local storage
  window.location.href = "recipe.html";       // Go to recipe page
}
