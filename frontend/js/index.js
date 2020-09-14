// Recuperer tous les pokemon
/*async function fetchPokemonList () {
  await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=20")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      for (let pokemon of response.results) {
        fetchPokemonData(pokemon.url);
      }
    });
};

// Recuperer les infos d'un seul pokemon
async function fetchPokemonData (url) {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      displayPokedex(response);
    });
};

const displayPokedex = (pokemon) => {
  let container = document.getElementsByClassName("container")[0];
  let pokemonField = document.createElement("div");

  if (pokemon.names[4]) {
    pokemonField.innerHTML = `${pokemon.id} -> ${pokemon.names[4].name}`;
    container.appendChild(pokemonField);
  }
};

fetchPokemonList();
*/

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const offset = urlParams.get('offset')

fetch('http://localhost:3000/api/pokemons?offset=' + offset)
  .then(async (response) => {
      for (let pokemon of await response.json()) {
          fetch(pokemon.url)
              .then(async (response) => {
                  let pokemon = await response.json();
                  let container = document.getElementsByClassName("container")[0];
                  let pokemonField = document.createElement("div");

                  if (pokemon.names[4]) {
                      pokemonField.innerHTML = `<p>${pokemon.id} -> <a href="spec.html?id=${pokemon.id}">${pokemon.names[4].name}</a></p>`;
                      container.appendChild(pokemonField);
                  }
              })
      }
  })