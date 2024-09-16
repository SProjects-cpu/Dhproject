const searchButton = document.getElementById('searchButton');
const recipeResults = document.getElementById('recipeResults');

searchButton.addEventListener('click', () => {
    const foodName = document.getElementById('foodInput').value.trim();
    if (foodName) {
        fetchRecipes(foodName);
    } else {
        recipeResults.innerHTML = '<div class="alert alert-warning">Please enter a food name.</div>';
    }
});

async function fetchRecipes(foodName) {
    try {
        const response = await fetch(`php/fetch-recipes.php?ingredient=${encodeURIComponent(foodName)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.hits && data.hits.length === 0) {
            recipeResults.innerHTML = '<div class="alert alert-info">No recipes found.</div>';
        } else if (data.error) {
            recipeResults.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        } else {
            recipeResults.innerHTML = data.hits.map(hit => {
                const recipe = hit.recipe;
                return `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.label}</h5>
                                <p class="card-text">Ingredients: ${recipe.ingredientLines.join(', ')}</p>
                                <a href="${recipe.url}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">View Recipe</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        recipeResults.innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}. Please try again later.</div>`;
        console.error('Error fetching recipes:', error);
    }
}
