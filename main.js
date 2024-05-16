document.addEventListener('DOMContentLoaded', () => {
  const elList = document.querySelector('.list');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const favoritesButton = document.getElementById('favoritesButton');
  const favoritesMenu = document.getElementById('favoritesMenu');
  const closeFavoritesButton = document.getElementById('closeFavoritesButton');
  const favoritesList = document.querySelector('.favorites-list');
  const clearFavoritesButton = document.getElementById('clearFavoritesButton');
  let favorites = [];

  function createPokemonItem(item, isFavorite = false) {
      let newitem = document.createElement('li');
      newitem.className = 'item';
      
      newitem.innerHTML = `
          <span class="id">${item.num}</span>
          <h2 class="Name">${item.name}</h2>
          <img class="Img" src="${item.img}" alt="${item.name}">
          <p class="Type">${item.type.join(', ')}</p>
          <strong class="Weight">${item.weight}</strong>
          <h4 class="Candy">Candy count: ${item.candy_count || 'N/A'}</h4>
          <h3 class="Weaknesses">${item.weaknesses.join(', ')}</h3>
          <span class="Spawn">${item.spawn_time}</span>
          <button class="Star ${isFavorite ? 'favorite' : ''}"></button>
      `;
      
      const starButton = newitem.querySelector('.Star');
      starButton.addEventListener('click', () => {
          const isFavorite = starButton.classList.toggle('favorite');
          if (isFavorite) {
              addFavorite(item);
          } else {
              removeFavorite(item);
          }
      });

      return newitem;
  }

  function renderPokemon(pokemonArray, container) {
      container.innerHTML = '';
      pokemonArray.forEach(item => {
          const newitem = createPokemonItem(item, container === favoritesList);
          container.appendChild(newitem);
      });
  }

  function filterPokemons() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredPokemons = pokemons.filter(pokemon => 
          pokemon.name.toLowerCase().includes(searchTerm)
      );
      renderPokemon(filteredPokemons, elList);
  }

  function addFavorite(pokemon) {
      if (!favorites.includes(pokemon)) {
          favorites.push(pokemon);
          renderPokemon(favorites, favoritesList);
      }
  }

  function removeFavorite(pokemon) {
      favorites = favorites.filter(fav => fav.num !== pokemon.num);
      renderPokemon(favorites, favoritesList);
  }

  searchButton.addEventListener('click', filterPokemons);

  searchInput.addEventListener('input', filterPokemons);

  favoritesButton.addEventListener('click', () => {
      document.body.classList.add('menu-open');
      favoritesMenu.style.display = 'block';
  });

  closeFavoritesButton.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      favoritesMenu.style.display = 'none';
  });

  clearFavoritesButton.addEventListener('click', () => {
      favorites = [];
      renderPokemon(favorites, favoritesList);
  });

  renderPokemon(pokemons, elList);
});
