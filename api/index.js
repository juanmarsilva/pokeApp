//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const getTypes = () => {
  axios.get('https://pokeapi.co/api/v2/type')
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
            return allTypes
        })
        .catch(err => console.log(err));
}


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PGPORT, async () => {
    console.log(`%s listening at ${process.env.PGPORT}`); // eslint-disable-line no-console
    getTypes();
  });
});
