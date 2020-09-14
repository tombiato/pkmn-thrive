const https = require('https');

module.exports = {
    getAll: async (req, res) => {
        let offset, limit;
        ({
            query: {
                offset,
                limit,
            },
        } = req);

      offset = offset ? offset : 0;
      limit = limit ? limit : 20;

      const url = `https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${limit}`;

      https.get(url, (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
              data += chunk;
          });

          resp.on('end', () => {
              res.status(200).json(JSON.parse(data).results);
          });
      }).on("error", (err) => {
          console.log("Error : " + err.message);
      });
    },
    getByUrl: async (req, res) => {
        let {
            query: {
                id
            },
        } = req;
        https.get('https://pokeapi.co/api/v2/pokemon-species/' + id, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log('OK');
                res.status(200).json(JSON.parse(data));
            });
        });
    },
};
