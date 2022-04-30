const axios = require("axios").default;
const qs = require('qs')

async function getJoker() {
  return await axios({
    method: "GET",
    url: "https://api.chucknorris.io/jokes/random",
    headers: {
        "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      //console.log(res.data);
      return { code: res.status, data: res.data };
    })
    .catch((err) => {
      console.log("ERROR", err.response.status, err.response.data);
      throw {
        code: err.response.status,
        data: err.response.data,
      };
    });
}

module.exports = {
  getJoker,
};