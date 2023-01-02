const { Router } = require('express');
const pokemonsRoute = require('./pokemonsRoute');
const typesRoute = require('./typesRoute');

const router = Router();


router.use('/pokemons', pokemonsRoute );
router.use('/types', typesRoute );


// Ruta para mostrar los pokemons, tambien podriamos filtrarlos y ordenarlos desde aqui si quisieramos.
// router.get('/pokemons', async (req, res) => {

//     const { name } = req.query;
    
//     const allPokemons = await getAllPokemonNames();

//     if(name) {
        
//         let arrPokemon = [];
//         const dbPokemon = await Pokemon.findOne({
//             where: {
//                 name: name.toLowerCase()
//             },
//             include: {
//                 model: Types,
//                 attributes: ['name'],
//                 through: {
//                     attributes: [],
//                 },
//             },
//         });

//         if(dbPokemon) {
//             arrPokemon.push(dbPokemon);
//             return res.status(200).send(arrPokemon)
//         }
        
//         try {
//             const specificPokemon = await getSpecificPokemonByName(name);
//             res.status(200).send(specificPokemon)
//         } catch (err) {
//             res.json({msg: 'POKEMON NOT FOUND..'});
//         }
    
//     } else {
//         return res.status(200).send(allPokemons);
//     }
// })

// Ruta para crear los Pokemons
// router.post('/pokemons', async (req, res) => {
//     const { name, hp, attack, defense, speed, height, weight, createdInDb, types, image} = req.body;
//     if(!name) throw new Error('Faltan datos obligatorios!') 
//     try {
//         const newPokemon = await Pokemon.create({
//             name: name.toLowerCase(),
//             hp,
//             attack,
//             defense, 
//             speed,
//             height,
//             weight,
//             createdInDb,
//             image
//         });

//         const typesInDb = await Types.findAll({
//             where: {
//                 name: {
//                     [Op.or]: [types]
//                 }
//             }
//         });

//         newPokemon.addTypes(typesInDb);
//         return res.status(200).send('Pokemon creado con exito!');
//     } catch (err) {
//         return res.status(404).send({msg: err.message});
//     };
// });

// Ruta para mostrarme el detalle de los pokemons
// router.get('/pokemons/:id', async (req, res) => {
//     const { id } = req.params;
//     if(id.length > 5) {
//         let arrPokemon = [];
//         const dbPokemon = await Pokemon.findOne({
//             where: {
//                 id: id
//             },
//             include: {
//                 model: Types,
//                 attributes: ['name'],
//                 through: {
//                     attributes: [],
//                 },
//             },
//         });
    
//         if(dbPokemon) {
//             arrPokemon.push(dbPokemon);
//             return res.status(200).send(arrPokemon)
//         };
//     };
//     const pokemon = await getSpecificPokemonByName(id);
//     return res.status(200).send(pokemon); 
// });


// Ruta para eliminar los pokemons de la DB
// router.delete('/pokemons/:id', async (req, res) => {
//     const { id } = req.params;
//     Pokemon.findByPk(id)
//         .then(pokemon => {
//             pokemon.removeTypes()
//             return pokemon;
//         })
//         .then(pokemon => pokemon.destroy())
//         .then(r => res.status(200).send('Pokemon eliminado correctamente!'))
//         .catch(err => console.log(err));
// });

// Ruta para editar los pokemons de la DB
// router.put('/pokemons/:id',  async (req, res) => {
//     const { id } = req.params;
//     const { hp, attack, defense, speed, weight, height, image, types } = req.body;
//     const typesInDb = await Types.findAll({
//         where: {
//             name: {
//                 [Op.or]: [types]
//             }
//         }
//     });
//     Pokemon.findByPk(id, {
//         include: {
//             model: Types,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             },
//         },
//     })
//         .then(pokemon => {
//             pokemon.update({hp, attack, defense, speed, weight, height, image})
//             return pokemon;
//         })
//         .then(pokemon => pokemon.setTypes(typesInDb))
//         .then(() => res.send('Pokemon editado correctamente!'))
//         .catch(err => console.log(err)); 
// });


module.exports = router;
