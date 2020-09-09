const { post } = require("../helper/httpService");
const { endpoints } = require("../helper/constants");

const outbound = async (message) => {
  try {
    await post(endpoints.chatiggo + "/outbound", message);
  } catch (e) {
    console.error("No se pudo conectar con la plataforma chatiggo");
  }
};

module.exports = outbound;
