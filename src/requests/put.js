const axios = require("axios");
const Cookies = require("js-cookie");

module.exports = async (path, body) => {
  let status = true,
    data = null,
    redirect = false;
  const serverAddress = process.env.VUE_APP_SERVER_ADDRESS;
  await axios
    .put(`${serverAddress}/${path}`, body, {
      headers: {
        // "X-Auth-Token": Cookies.get("token"),
      },
    })
    .then((value) => {
      data = value.data.data;
    })
    .catch((reason) => {
      status = false;
      if (reason.response.data.data) {
        data = reason.response.data.data;
      } else {
        data = {
          message: "خطا",
          detail: "قطع ارتباط با سرور",
        };
      }
      redirect = reason.response.status === 401;
    });
  return {
    status: status,
    redirect: redirect,
    data: data,
  };
};
