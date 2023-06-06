const axios = require("axios");

module.exports = async (path, body={}) => {
  const serverAddress = process.env.VUE_APP_SERVER_ADDRESS;
  try {
    let config = {
      method: 'delete',
      url: `${serverAddress}/${path}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : body
    };

    let { data } = await axios(config)
    return { data: data.result }
  } catch (error) {
    console.log(error)
  }
}

