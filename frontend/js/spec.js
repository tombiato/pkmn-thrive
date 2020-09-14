const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')

fetch('http://localhost:3000/api/pokemons/spec?id=' + id)
    .then(async (response) => {
        let pokemon = await response.json();
        let container = document.getElementsByClassName("container-one")[0];
        let pokemonField = document.createElement("div");

        if (pokemon.names[4]) {
            pokemonField.innerHTML = `
                <h1 class="name">${pokemon.names[4].name}</h1>
                <h2>Genre :</h2>
                <p class="type">${pokemon.genera[3].genus}</p>
                <h2>Decription :</h2>
                <p class="description">${pokemon.flavor_text_entries[16].flavor_text}</p>`;
            container.appendChild(pokemonField);
        }
    })