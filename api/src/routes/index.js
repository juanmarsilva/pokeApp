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
        pokemon.attack = apiExtra.data.stats[1]['base_stat'];
    }

    return allPokemons;
}

const getSpecificPokemonByName = async (name) => {
    const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    let specificPokemon = [];
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
    specificPokemon.push(pokemon);
    return specificPokemon;
};


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

const getAllPokemonNames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

router.get('/pokemons', async (req, res) => {
    const { name } = req.query;
    if(name) {
        let arrPokemon = [];
        const dbPokemon = await Pokemon.findOne({
            where: {
                name: name.toLowerCase()
            },
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });

        if(dbPokemon) {
            arrPokemon.push(dbPokemon);
            return res.status(200).send(arrPokemon)
        }
       
        const specificPokemon = await getSpecificPokemonByName(name);
        specificPokemon 
        ? res.status(200).send(specificPokemon)
        : res.status(404).send('No se encontro dicho pokemon')
    
    } else {
        const allPokemons = await getAllPokemonNames();
        return res.status(200).send(allPokemons);
    }
})


router.post('/pokemons', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, createdInDb, types, image} = req.body;
    if(!name) throw new Error('Faltan datos obligatorios!') 
    try {
        const newPokemon = await Pokemon.create({
            name: name.toLowerCase(),
            hp,
            attack,
            defense, 
            speed,
            height,
            weight,
            createdInDb,
            image
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
    if(id.length > 5) {
        let arrPokemon = [];
        const dbPokemon = await Pokemon.findOne({
            where: {
                id: id
            },
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    
        if(dbPokemon) {
            arrPokemon.push(dbPokemon);
            return res.status(200).send(arrPokemon)
        };
    };
    const pokemon = await getSpecificPokemonByName(id);
    return res.status(200).send(pokemon); 
});

router.get('/types', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const pokemonTypes = typesApi.data.results.map(type => type.name);
    pokemonTypes.forEach(t => {
        Types.findOrCreate({
            where: {
                name: t
            }
        })
    })
    const allTypes = await Types.findAll();
    res.status(200).send(allTypes);
});

router.delete('/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletePokemon = await Pokemon.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json('Pokemon eliminado correctamente!');
    } catch(err) {
        console.log(err);
    };
});


module.exports = router;
