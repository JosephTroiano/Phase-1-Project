document.addEventListener('DOMContentLoaded', fetchRecipes)

function fetchRecipes() {
    const url = `http://localhost:3000/recipes`
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
    const recipeShowcase = document.getElementById('recipe-container');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    const recipeName = document.createElement('h2')
    recipeName.textContent = recipe.name;

    const recipeImage = document.createElement('img')
    recipeImage.src = recipe.image;

    const showRecipe = document.createElement('button')
    showRecipe.id = 'details-btn'
    showRecipe.textContent = 'View Recipe'

    const recipeLikes = document.createElement('button')
    recipeLikes.textContent = `Likes: ${recipe.likes}`
    recipeLikes.id = 'likes-btn'


    recipeCard.appendChild(recipeName)
    recipeCard.appendChild(recipeImage)
    recipeCard.appendChild(showRecipe)
    recipeCard.appendChild(recipeLikes)

    recipeShowcase.appendChild(recipeCard)

}