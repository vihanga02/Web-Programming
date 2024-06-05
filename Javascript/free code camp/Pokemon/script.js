let pokemon_name = document.querySelector('.pokemon-name');
let pokemon_id = document.querySelector('.pokemon-id');
let weight = document.querySelector('.weight');
let height = document.querySelector('.height');
let sprite = document.querySelector('.sprite-container');
let pokemon_type = document.querySelector('.types');
let hp = document.querySelector('#id');
let attack = document.querySelector('#attack');
let defense = document.querySelector('#defense');
let specialAttack = document.querySelector('#special-attack');
let specialDefense = document.querySelector('#special-defense');
let speed = document.querySelector('#speed');

document.querySelector('#search-button').addEventListener('click', function(event) {
    event.preventDefault();
    const pokemon = document.querySelector('#search-input').value.toString().trim().toLowerCase();

    try{
        const request = fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`).then(response => response.json()); 
        setData(request);
    } catch (error) {
        alert('Pokemon not found');
        resetData(); 
        console.error(error);
    }
});

function setData(request) {
    request.then(data => {
        pokemon_name.innerHTML = data.name.toUpperCase();
        pokemon_id.innerHTML = `#${data.id}`;
        weight.innerHTML = `Weight: ${data.weight}`;
        height.innerHTML = `Height: ${data.height}`;
        sprite.innerHTML = `<img src="${data.sprites.front_default}" class="sprite" alt="${data.name}" />`;
        data.types.forEach(typo => {
            pokemon_type.innerHTML +=  `<span class="type ${typo.type.name}">${typo.type.name}</span>`
        });
        hp.innerHTML = data.stats[0].base_stat;
        attack.innerHTML = data.stats[1].base_stat;
        defense.innerHTML = data.stats[2].base_stat;
        specialAttack.innerHTML = data.stats[3].base_stat;
        specialDefense.innerHTML = data.stats[4].base_stat;
        speed.innerHTML = data.stats[5].base_stat;
    });
}

const resetData = () => {
    pokemon_name.innerHTML = '';
    pokemon_id.innerHTML = '';
    weight.innerHTML = '';
    height.innerHTML = '';
    sprite.innerHTML = '';
    pokemon_type.innerHTML = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    specialAttack.innerHTML = '';
    specialDefense.innerHTML = '';
    speed.innerHTML = '';
}
