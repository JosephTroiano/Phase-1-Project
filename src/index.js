document.addEventListener('DOMContentLoaded', fetchRecipes)

function fetchRecipes() {
    const url = http://localhost:3000/recipes
    fetch(url)
    .then(response => response.json())
    .then(recipes => {
        recipes.forEach(recipe => {
            createRecipeCard(recipe)
        })
    })
    .catch(error => {
        console.error(error)
    })
}

function createRecipeCard(recipe) {
    const recipeShowcase = document.getElementById('recipes-showcase');

    const recipeCard = document.createElement('li');
    recipeCard.classList.add('recipe-card');

    const recipeName = document.createElement('h2')
    recipeName.textContent = recipe.name;

    const recipeImage = document.createElement('img')
    recipeImage.src = recipe.image;

    const recipeLikes = document.createElement('button')
    recipeLikes.textContent = `Likes: ${recipe.likes}`

}