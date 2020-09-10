const axios = require("axios");

const get = (url) => {
  try {
    return axios.get(url);
  } catch (e) {
    console.error(e);
  }
};

const post = async (url, body, options) => {
  try {
    const res = await axios.post(url, body, options);
    return res.data;
  } catch (e) {
    console.error(e);
    const message = e.response.data.code
      ? e.response.data.code
      : e.response.data.error
      ? e.response.data.error
      : "Intern error";
    return {
      error: true,
      message: message,
    };
  }
};

const remove = (url) => {
  try {
    return axios.delete(url);
  } catch (e) {
    console.error(e);
    const message = e.response.data.code
      ? e.response.data.code
      : e.response.data.error
      ? e.response.data.error
      : "Intern error";
    return {
      error: true,
      message: message,
    };
  }
};

const update = async (url, body) => {
  try {
    const res = await axios.put(url, body);
    return res.data;
  } catch (e) {
    console.error(e);
    const message = e.response.data.code
      ? e.response.data.code
      : e.response.data.error
      ? e.response.data.error
      : "Intern error";
    return {
      error: true,
      message: message,
    };
  }
};

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeToken = () => {
  axios.defaults.headers.common["Authorization"] = null;
};

module.exports = {
  get,
  post,
  update,
  remove,
  setToken,
  removeToken,
};
