document.addEventListener('DOMContentLoaded', () => {
  fetchRecipes();

  const filterSeletct = document.getElementById('filter-select')
  filterSeletct.addEventListener('change', handleFilterChange);

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.toLowerCase();
    searchRecipes(searchQuery);
  });

});

// Search for recipes by ingredients
function searchRecipes(query) {
  const recipeCards = document.getElementsByClassName('recipe-card');

  for (let i = 0; i < recipeCards.length; i++) {
    const recipeCard = recipeCards[i];
    const ingredients = recipeCard.dataset.ingredients.toLowerCase();

    if (ingredients.includes(query)) {
      recipeCard.style.display = 'block';
    } else {
      recipeCard.style.display = 'none';
    }
  }
}

// Function to handle filter change
function handleFilterChange() {
  const filterSelect = document.getElementById('filter-select');
  const selectedType = filterSelect.value;
  const recipeCards = document.getElementsByClassName('recipe-card');

 

  Array.from(recipeCards).forEach(card => {
      const recipeType = card.getAttribute('data-type');
      

      if (selectedType === 'all' || recipeType === selectedType) {
          
          card.style.display = 'block';
      } else {
          
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

    const ingredientsString = recipe.ingredients.join(', ').toLowerCase();

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.id = recipe.id;
    recipeCard.setAttribute('data-type', recipe.type);
    recipeCard.dataset.ingredients = ingredientsString;

    const recipeName = document.createElement('h2');
    recipeName.textContent = recipe.name;

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;

    const viewRecipe = document.createElement('button');
    viewRecipe.id = 'details-btn';
    viewRecipe.textContent = 'View';
    viewRecipe.addEventListener('click', () => {
        showRecipe(recipe.id);
    });

    const editRecipe = document.createElement('button');
    editRecipe.id = 'edit-btn'
    editRecipe.textContent = 'Edit';
    editRecipe.addEventListener('click', () => {
      editRecipeForm(recipe)
    });

    const deleteRecipe = document.createElement('button');
    deleteRecipe.id = 'del-btn';
    deleteRecipe.textContent = 'Delete';
    deleteRecipe.addEventListener('click', () => {
      deleteRecipeCard(recipe.id);
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
    recipeCard.appendChild(editRecipe);
    recipeCard.appendChild(deleteRecipe)
    
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
      showFavoriteAlert('Reciped added to Favorites ⬇');
    } else {
      favoriteButton.textContent = '✩';
      removeCardFromFavorites(recipeCard);
      showFavoriteAlert('Recipe removed from Favorites')
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

  // Function to show favorited alert
  function showFavoriteAlert(message) {
  
    const alertDuration = 2000;

    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert');
    alertContainer.textContent = message

    document.body.appendChild(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, alertDuration);
  }
  
  // Handle add recipe form functionality 
  const addRecipeForm = document.getElementById('add-recipe-form')
  addRecipeForm.addEventListener('submit', handleAddRecipe);

  function handleAddRecipe(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const type = document.getElementById('type').value;
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

    const typeSelect = document.getElementById('type');
    const selectedType = typeSelect.value
    recipe.type = selectedType



    const url = `http://localhost:3000/recipes`

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
    .then(response => response.json())
    .then(savedRecipe => {
      createRecipeCard(savedRecipe);
    })
    .catch(error => {
      console.error(error)
    });


  }
// Edit recipe 
function editRecipeForm(recipe) {
  
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const editFormContainer = document.createElement('div');
  editFormContainer.classList.add('edit-form-container');

  const closeButton = document.createElement('button');
  closeButton.id = 'close-btn';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    overlay.remove();
  });

 
  const editForm = document.createElement('form');
  editForm.id = 'edit-recipe-form';
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveEditedRecipe(recipe.id);
    overlay.remove();
  });

  
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = recipe.name;
  nameInput.name = 'name';
  nameLabel.appendChild(nameInput);

  
  const imageLabel = document.createElement('label');
  imageLabel.textContent = 'Image URL';
  const imageInput = document.createElement('input');
  imageInput.type = 'text';
  imageInput.value = recipe.image;
  imageInput.name = 'image';
  imageLabel.appendChild(imageInput);

  
  const typeLabel = document.createElement('label');
  typeLabel.textContent = 'Type';
  const typeInput = document.createElement('input');
  typeInput.type = 'text';
  typeInput.value = recipe.type;
  typeInput.name = 'type';
  typeLabel.appendChild(typeInput);

  
  const ingredientsLabel = document.createElement('label');
  ingredientsLabel.textContent = 'Ingredients';
  const ingredientsTextarea = document.createElement('textarea');
  ingredientsTextarea.value = recipe.ingredients.join('\n');
  ingredientsTextarea.name = 'ingredients';
  ingredientsLabel.appendChild(ingredientsTextarea);

  
  const directionsLabel = document.createElement('label');
  directionsLabel.textContent = 'Directions';
  const directionsTextarea = document.createElement('textarea');
  directionsTextarea.value = recipe.directions.join('\n');
  directionsTextarea.name = 'directions';
  directionsLabel.appendChild(directionsTextarea);


  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Save Changes';

  
  editForm.appendChild(closeButton);
  editForm.appendChild(nameLabel);
  editForm.appendChild(imageLabel);
  editForm.appendChild(typeLabel);
  editForm.appendChild(ingredientsLabel);
  editForm.appendChild(directionsLabel);
  editForm.appendChild(submitButton);

  editFormContainer.appendChild(editForm)

  
  overlay.appendChild(editForm);

  document.body.appendChild(overlay);
}

// Send edited recipe to server and update the card in the DOM
function saveEditedRecipe(recipeId) {
  const nameInput = document.querySelector('#edit-recipe-form input[name="name"]');
  const imageInput = document.querySelector('#edit-recipe-form input[name="image"]');
  const typeInput = document.querySelector('#edit-recipe-form input[name="type"]');
  const ingredientsTextarea = document.querySelector('#edit-recipe-form textarea[name="ingredients"]');
  const directionsTextarea = document.querySelector('#edit-recipe-form textarea[name="directions"]');

  const editedRecipe = {
    name: nameInput.value,
    image: imageInput.value,
    type: typeInput.value,
    ingredients: ingredientsTextarea.value.split('\n'),
    directions: directionsTextarea.value.split('\n'),
  };

  
  const recipeCard = document.getElementById(recipeId);
  const recipeName = recipeCard.querySelector('h2');
  const recipeImage = recipeCard.querySelector('img');
  const recipeType = recipeCard.getAttribute('data-type');
  const recipeIngredients = recipeCard.dataset.ingredients;

  recipeName.textContent = editedRecipe.name;
  recipeImage.src = editedRecipe.image;
  recipeCard.setAttribute('data-type', editedRecipe.type);
  recipeCard.dataset.ingredients = editedRecipe.ingredients.join(', ');

  
  const url = `http://localhost:3000/recipes/${recipeId}`;

  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedRecipe),
  })
    .then(response => response.json())
    .then(updatedRecipe => {
      
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to handle deleting a recipe
function deleteRecipeCard(recipeId) {
  const recipeCard = document.getElementById(recipeId);
  
  
  recipeCard.remove();

  
  const url = `http://localhost:3000/recipes/${recipeId}`;
  fetch(url, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Recipe deleted successfully');
      } else {
        throw new Error('Failed to delete recipe');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
