const axios = require('axios');
const { Types } = require('../db');

const getPokemonTypes = async ( req , res ) => {
    try {
        const { data } = await axios('https://pokeapi.co/api/v2/type');
        const pokemonTypes = data.results.map(type => type.name);
        pokemonTypes.forEach(t => {
            Types.findOrCreate({
                where: {
                    name: t
                }
            });
        });
        return res.status(200).json( pokemonTypes );
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

module.exports = { getPokemonTypes };