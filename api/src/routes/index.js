const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Types } = require('../db');
const { Op } = require('sequelize');

const router = Router();

const getApiInfo = async () => {

    const apiInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const apiInfo2 = await axios.get(`${apiInfo.data.next}`);

    const allPokemons = apiInfo.data.results.concat(apiInfo2.data.results);

    for(let pokemon of allPokemons) {
        const apiExtra = await axios.get(`${pokemon.url}`);
        pokemon.id = apiExtra.data.id;
        pokemon.image = apiExtra.data.sprites["other"]["dream_world"]['front_default'];
        pokemon.types = apiExtra.data.types.map(t => t.type.name);
    }

    return allPokemons;
}

const getSpecificPokemon = async (name) => {
    const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = {
        id: apiInfo.data.id,
        name: apiInfo.data.name,
        image: apiInfo.data.sprites["other"]["dream_world"]['front_default'],
        types: apiInfo.data.types.map(t => t.type.name),
        attack: apiInfo.data.stats[1]['base_stat'],
        defense: apiInfo.data.stats[2]['base_stat'],
        hp: apiInfo.data.stats[0]['base_stat'],
        speed: apiInfo.data.stats[5]['base_stat'],
        height: apiInfo.data.height,
        weight: apiInfo.data.weight,
    }
    return pokemon;
}

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
    if(name) {
        const dbPokemon = await Pokemon.findOne({
            where: {
                name
            },
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    
        if(dbPokemon) return res.status(200).send(dbPokemon);
        
        const specificPokemon = await getSpecificPokemon(name);
        specificPokemon 
        ? res.status(200).send(specificPokemon)
        : res.status(404).send('No se encontro dicho pokemon')
    
    } else {
        const allPokemons = await getAllPokemonNames();
        return res.status(200).send(allPokemons);
    }
})


router.post('/pokemons', async (req, res) => {
    const { name, health, attack, defense, speed, height, weight, createdInDb, types} = req.body;
    if(!name) throw new Error('Faltan datos obligatorios!') 
    try {
        const newPokemon = await Pokemon.create({
            name,
            health,
            attack,
            defense, 
            speed,
            height,
            weight,
            createdInDb
        });

        const typesInDb = await Types.findAll({
            where: {
                name: {
                    [Op.or]: [types]
                }
            }
        });

        newPokemon.addTypes(typesInDb);
        return res.status(200).send('Pokemon creado con exito!');
    } catch (err) {
        return res.status(404).send({msg: err.message});
    };
});

router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await getSpecificPokemon(id);
        return res.status(200).send(pokemon)
    } catch(err) {
        return res.status(404).send(`No existe dicho pokemon!`);
    };
});


router.get('/types', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const pokemonTypes = typesApi.data.results.map(type => type.name);
    pokemonTypes.forEach(el => {
        Types.findOrCreate({
            where: {
                name: el
            }
        })
    })
    const allTypes = await Types.findAll();
    res.status(200).send(allTypes);
});


module.exports = router;
