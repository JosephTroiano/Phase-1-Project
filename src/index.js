document.addEventListener('DOMContentLoaded', () => {
  fetchRecipes();

  const filterSeletct = document.getElementById('filter-select')
  filterSeletct.addEventListener('change', handleFilterChange);
});

// Function to handle filter change
function handleFilterChange() {
  const filterSelect = document.getElementById('filter-select');
  const selectedType = filterSelect.value;
  const recipeCards = document.getElementsByClassName('recipe-card');

  console.log('Selected Type:', selectedType);

  Array.from(recipeCards).forEach(card => {
      const recipeType = card.getAttribute('data-type');
      console.log('Recipe Type:', recipeType);

      if (selectedType === 'all' || recipeType === selectedType) {
          console.log('Display:', card.id);
          card.style.display = 'block';
      } else {
          console.log('Hide:', card.id);
          card.style.display = 'none';
      }
  });
}




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
    });
};

// Function to create card for each recipe
function createRecipeCard(recipe) {
    const recipeContainer = document.getElementById('recipe-container');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.id = recipe.id;
    recipeCard.setAttribute('data-type', recipe.type);

    const recipeName = document.createElement('h2');
    recipeName.textContent = recipe.name;

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;

    const viewRecipe = document.createElement('button');
    viewRecipe.id = 'details-btn';
    viewRecipe.textContent = 'View Recipe';
    viewRecipe.addEventListener('click', () => {
        showRecipe(recipe.id);
    });
    
    const favoriteButton = document.createElement('p');
    favoriteButton.id = 'fav-btn';
    favoriteButton.textContent = '✩';
    favoriteButton.addEventListener('click', () => {
      toggleFavorite(recipeCard)
    });

    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(viewRecipe);
    
    recipeCard.appendChild(favoriteButton);

    recipeContainer.appendChild(recipeCard);

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
  
        
        recipeContainer.appendChild(expandedCard);
  
       
        
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
      
      expandedCard.remove();
  
      
      document.body.style.overflow = 'auto';
    });
  }
  
  // Function to toggle a favorite recipe 
  function toggleFavorite(recipeCard) {
    const favoriteButton = recipeCard.querySelector('#fav-btn');
    const isFavorite = recipeCard.classList.toggle('favorite');
  
    if (isFavorite) {
      favoriteButton.textContent = '★';
      moveCardToFavorites(recipeCard);
    } else {
      favoriteButton.textContent = '✩';
      removeCardFromFavorites(recipeCard);
    }
  }
  
  function moveCardToFavorites(recipeCard) {
    const favoritesSection = document.getElementById('favorites-container');
    favoritesSection.appendChild(recipeCard);
  }
  
  function removeCardFromFavorites(recipeCard) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.appendChild(recipeCard);
  }
  
  // Hanlde add recipe form functionality 
  const addRecipeForm = document.getElementById('add-recipe-form')
  addRecipeForm.addEventListener('submit', handleAddRecipe);

  function handleAddRecipe(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const image = document.getElementById('image').vale;
    const type = document.getElementById('type');
    const ingredients = document.getElementById('ingredients').value;
    const directions = document.getElementById('directions').value;

    const newRecipe = {
      name,
      image,
      type,
      ingredients: ingredients.split('\n'),
      directions: directions.split('\n'),
      likes: 0,
    };

    saveRecipe(newRecipe);

    addRecipeForm.reset();
  }

  // Send new recipe object to server and display it in the DOM

  function saveRecipe(recipe) {
    const url = `http://localhost:3000/recipes`

    fetch(url, {
      method: 'POST',
      headers
    })


  }