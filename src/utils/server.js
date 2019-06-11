const axios = require('axios');
const { KIWI_API } = require('../constants/api');

const server = KIWI_API;

class Server {
  async post(url,data) {
    try {
      return (await axios.post(`${server}/${url}`, data)).data;
    } catch(error) {
      return {
        isError: true,
        message: error
      };
    }
  }
  async get(url) {
    try {
      return (await axios.get(`${server}/${url}`)).data;
    } catch(error) {
      return {
        isError: true,
        message: error
      }
    }
  }
}

module.exports = new Server();