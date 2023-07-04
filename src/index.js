document.addEventListener('DOMContentLoaded', fetchRecipes)
// Fetch recipes from server
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
// Function to create card for each recipe
function createRecipeCard(recipe) {
    const recipeContainer = document.getElementById('recipe-container');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.id = recipe.id;

    const recipeName = document.createElement('h2')
    recipeName.textContent = recipe.name;

    const recipeImage = document.createElement('img')
    recipeImage.src = recipe.image;

    const viewRecipe = document.createElement('button')
    viewRecipe.id = 'details-btn'
    viewRecipe.textContent = 'View Recipe'
    viewRecipe.addEventListener('click', () => {
        showRecipe(recipe.id)
    })
    

    const recipeLikes = document.createElement('button')
    recipeLikes.textContent = `Likes: ${recipe.likes}`
    recipeLikes.id = 'likes-btn'

    const favoriteButton = document.createElement('p')
    favoriteButton.id = 'fav-btn'
    favoriteButton.textContent = '✩'

    recipeCard.appendChild(recipeName)
    recipeCard.appendChild(recipeImage)
    recipeCard.appendChild(viewRecipe)
    recipeCard.appendChild(recipeLikes)
    recipeCard.appendChild(favoriteButton)

    recipeContainer.appendChild(recipeCard)

}


//Show recipe details
function showRecipe(recipeId) {
    const recipeCard = document.getElementById(recipeId);
    const viewRecipeButton = recipeCard.querySelector('#details-btn');
    const recipeContainer = document.getElementById('recipe-container');
    
  
    const url = `http://localhost:3000/recipes/${recipeId}`;
  
    // Create the expanded recipe card
    const expandedCard = document.createElement('div');
    expandedCard.classList.add('expanded-card');
  
    // Fetch recipe details and update the expanded card content
    fetch(url)
      .then(response => response.json())
      .then(recipe => {
        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
  
        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
  
        const recipeType = document.createElement('h3');
        recipeType.textContent = `Type: ${recipe.type}`;
  
        const recipeIngredients = document.createElement('h3');
        recipeIngredients.textContent = 'Ingredients:';
        recipe.ingredients.forEach(ingredient => {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = ingredient;
          recipeIngredients.appendChild(ingredientItem);
        });
  
        const recipeDirections = document.createElement('h3');
        recipeDirections.textContent = 'Directions:';
        recipe.directions.forEach((direction, index) => {
          const directionItem = document.createElement('p');
          directionItem.textContent = `${index + 1}. ${direction}`;
          recipeDirections.appendChild(directionItem);
        });
  
        expandedCard.appendChild(recipeName);
        expandedCard.appendChild(recipeImage);
        expandedCard.appendChild(recipeType);
        expandedCard.appendChild(recipeIngredients);
        expandedCard.appendChild(recipeDirections);
  
        // Append the expanded card to the recipe container
        recipeContainer.appendChild(expandedCard);
  
        // Disable scrolling of the page
        
        document.body.style.overflow = 'hidden';
      })
      .catch(error => {
        console.error(error);
      });
  
    // Close button event listener
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    expandedCard.appendChild(closeButton);
  
    closeButton.addEventListener('click', () => {
      // Remove the expanded card
      expandedCard.remove();
  
      // Enable scrolling of the page
      document.body.style.overflow = 'auto';
    });
  }
  