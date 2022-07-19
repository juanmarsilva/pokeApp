const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Types } = require('../db');

const router = Router();

// Configurar los routers

const getApiInfo = async () => {
    let apiInfoTotal = [];
    for (let i = 1; i <= 40; i++) {
        let apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        apiInfoTotal.push({
            id: apiInfo.data.id,
            name: apiInfo.data.name,
            types: apiInfo.data.types.map(t => t.type.name),
            image: apiInfo.data.sprites["versions"]["generation-v"]['black-white']['animated']['front_default'],
        });
    }
    return apiInfoTotal;
};

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
};

const getAllPokemonNames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};


router.get('/pokemons', async (req, res) => {
    const { name } = req.query;
    let allPokemons = await getAllPokemonNames();
    if(name) {
        let pokemonName = allPokemons.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
        pokemonName.length 
        ? res.status(200).send(pokemonName)
        : res.status(404).send('No se encuentra dicho Pokemon');
    } else {
        res.status(200).send(allPokemons);
    }
});

router.post('/pokemons', async (req, res) => {
    const { name, health, attack, defense, speed, height, weight, types } = req.body;
    try {
        const newPokemon = await createNewPokemon(name, health, attack, defense, speed, height, weight, types);
        return res.status(200).send(newPokemon);
    } catch (err) {
        return res.status(404).send({msg: err.message});
    };
});

const createNewPokemon = async (name, health, attack, defense, speed, height, weight, types) => {
    if(!name) throw new Error('Faltan datos obligatorios!');
    const newPokemon = await Pokemon.create({
        name,
        health,
        attack,
        defense, 
        speed,
        height,
        weight,
        types
    });
    return newPokemon;
}

const getSpecificPokemon = async (id) => {
    const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (apiInfo) {
        return {
            id,
            name: apiInfo.data.name,
            types: apiInfo.data.types.map(t => t.type.name),
            image: apiInfo.data.sprites["versions"]["generation-v"]['black-white']['animated']['front_default'],
        };
    } else {
        return await Pokemon.findByPk(id, {
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    }
};

router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await getSpecificPokemon(id);
        return res.status(200).send(pokemon)
    } catch(err) {
        return res.status(404).send(`No existe dicho pokemon!`);
    };
});

const getApiTypes = async () => {
    const apiInfo = await axios.get('https://pokeapi.co/api/v2/type')
    console.log(apiInfo.data)
    apiInfo.data.results.map(async (type) => await Types.create({ name: type.name }));
};

getApiTypes();

// router.get('/types', async (req, res) => {
//     try {
//         const pokemonTypes = getApiTypes()
//     } catch (err) {

//     }
// })


module.exports = router;
