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

fetch('http://localhost:3000/api/pokemons?offset=0&limit=20')
  .then((response) => {
    console.log(response);
    for (let pokemon of response.results) {
      fetch(pokemon.url)
          .then((response) => {
            console.log(response.id);
  //          let container = document.getElementsByClassName("container")[0];
//            let pokemonField = document.createElement("div");
          });
    };
  });