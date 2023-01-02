const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Types } = require('../db');
const { Op } = require('sequelize');

const router = Router();

// Controllers

// Me traigo los 40 primeros pokemons de la API.
const getApiInfo = async () => {

    const apiInfo = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
    
    const allPokemons = apiInfo.data.results;

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

// Routes

// Ruta para mostrar los pokemons, tambien podriamos filtrarlos y ordenarlos desde aqui si quisieramos.
router.get('/pokemons', async (req, res) => {

    const { name } = req.query;
    
    const allPokemons = await getAllPokemonNames();

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
        
        try {
            const specificPokemon = await getSpecificPokemonByName(name);
            res.status(200).send(specificPokemon)
        } catch (err) {
            res.json({msg: 'POKEMON NOT FOUND..'});
        }
    
    } else {
        return res.status(200).send(allPokemons);
    }
})

// Ruta para crear los Pokemons
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

// Ruta para mostrarme el detalle de los pokemons
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


// Ruta para eliminar los pokemons de la DB
router.delete('/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    Pokemon.findByPk(id)
        .then(pokemon => {
            pokemon.removeTypes()
            return pokemon;
        })
        .then(pokemon => pokemon.destroy())
        .then(r => res.status(200).send('Pokemon eliminado correctamente!'))
        .catch(err => console.log(err));
});

// Ruta para editar los pokemons de la DB
router.put('/pokemons/:id',  async (req, res) => {
    const { id } = req.params;
    const { hp, attack, defense, speed, weight, height, image, types } = req.body;
    const typesInDb = await Types.findAll({
        where: {
            name: {
                [Op.or]: [types]
            }
        }
    });
    Pokemon.findByPk(id, {
        include: {
            model: Types,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    })
        .then(pokemon => {
            pokemon.update({hp, attack, defense, speed, weight, height, image})
            return pokemon;
        })
        .then(pokemon => pokemon.setTypes(typesInDb))
        .then(() => res.send('Pokemon editado correctamente!'))
        .catch(err => console.log(err)); 
});

// Ruta para traerme los tipos de Pokemons y almacenar esos tipos en la base de datos.
router.get('/types', (req, res) => {
    axios('https://pokeapi.co/api/v2/type')
        .then(res => {
            const pokemonTypes = res.data.results.map(type => type.name);
            pokemonTypes.forEach(t => {
                Types.findOrCreate({
                    where: {
                        name: t
                    }
                })
            })
            return pokemonTypes;
        })
        .then((allTypes) => {
            res.status(200).send(allTypes)
        })
        .catch(err => console.log(err));
});



module.exports = router;
