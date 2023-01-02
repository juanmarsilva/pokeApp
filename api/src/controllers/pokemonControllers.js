const axios = require('axios');
const { Pokemon, Types } = require('../db');


// Me traigo los 40 primeros pokemons de la API.
const getApiInfo = async () => {

    const { data } = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
    
    const allPokemons = data.results;

    for( let pokemon of allPokemons ) {
        const { data } = await axios(`${pokemon.url}`);
        pokemon.id = data.id;
        pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ data.id }.svg`;
        pokemon.types = data.types.map(t => t.type.name);
        pokemon.attack = data.stats[1]['base_stat'];
    }

    return allPokemons;
}

// Me trae un Pokemon en especifico de la API, con sus respectivos datos.
const getSpecificPokemonByName = async (name) => {
    try {
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        let specificPokemon = [];
        const pokemon = {
            id: data.id,
            name: data.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ data.id }.svg`,
            types: data.types.map(t => t.type.name),
            attack: data.stats[1]['base_stat'],
            defense: data.stats[2]['base_stat'],
            hp: data.stats[0]['base_stat'],
            speed: data.stats[5]['base_stat'],
            height: data.height,
            weight: data.weight,
        }
        specificPokemon.push(pokemon);
        return specificPokemon;
    } catch (err) {
        return {msg: 'POKEMON NOT FOUND...'}
    }
};

// Me trae la informacion de la base de datos, todos los Pokemons.
const getDbInfo = async () => {
    const dbInfo = await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    return dbInfo;
};

// Concatena la informacion de la API con la de la base de datos
const getAllPokemonNames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};


module.exports = {
    getApiInfo,
    getSpecificPokemonByName,
    getDbInfo,
    getAllPokemonNames,
}