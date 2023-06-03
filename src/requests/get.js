const axios = require("axios");
const Cookies = require("js-cookie");

module.exports = async (path) => {
  const serverAddress = process.env.VUE_APP_SERVER_ADDRESS;
  try {
    let config = {
      method: 'get',
      url: `${serverAddress}/${path}`,
      headers: {
      }
    };

    let { data } = await axios(config)
    return { data: data.result }
  } catch (error) {
    console.log(error)
  }
}

