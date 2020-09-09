const { post, setToken } = require("../helper/httpService");
const { endpoints } = require("../helper/constants");
const username = "prueba";
const password = "prueba";

const login = () => {
  try {
    const access_token = post(endpoints.chatiggo + "/login", {
      username,
      password,
    });
    if (!access_token) {
      return console.error("No se pudo conectar con la plataforma chatiggo");
    }
    setToken(access_token);
  } catch (e) {
    console.error("No se pudo conectar con la plataforma chatiggo");
  }
};

module.exports = login;
