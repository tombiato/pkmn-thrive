const https = require('https');

module.exports = {
    getAll: async (req, res) => {
      let {
        query: {
            offset,
            limit,
        },
      } = req;

      offset = offset ? offset : 0;
      limit = limit ? limit : 20;

      const url = `https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${limit}`;

      https.get(url, (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
              data += chunk;
          });

          resp.on('end', () => {
              console.log(JSON.parse(data));
              res.status(200).json(JSON.parse(data));
          });
      }).on("error", (err) => {
          console.log("Error : " + err.message);
      });
    },
    getByUrl: async (req, res) => {
        let {
            query: {
                url
            },
        } = req;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log(JSON.parse(data));
                return res.status(200).json(JSON.parse(data));
            });
        });
        return res.status(200);
    },
};
