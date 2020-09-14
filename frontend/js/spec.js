const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')

fetch('http://localhost:3000/api/pokemons/spec/' + id)
    .then(async (response) => {
        for (let pokemon of await response.json()) {
            fetch(pokemon.url)
                .then(async (response) => {
                    let pokemon = await response.json();
                    let container = document.getElementsByClassName("container")[0];
                    let pokemonField = document.createElement("div");

                    if (pokemon.names[4]) {
                        pokemonField.innerHTML = `<p>${pokemon.id} -> <a href="/spec/${pokemon.id}">${pokemon.names[4].name}</a></p>`;
                        container.appendChild(pokemonField);
                    }
                })
        }
    })