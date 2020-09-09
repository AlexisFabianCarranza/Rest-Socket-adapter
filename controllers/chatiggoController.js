const io = require("socket.io-client");
const outbound = require("../chatiggo/outbound");
const host_api_gw = "http://localhost:3001/";
const sockets = [];

const inbound = (req, res) => {
  const message = req.body;

  // Si el socket esta creado , usamos el creado , sino creamos uno nuevo
  const oldSocket = sockets.find((socket) => socket.id === message.Msisdn);
  if (oldSocket) {
    oldSocket.socket.emit("new-msg", {
      msg: message.Content,
      room: message.Msisdn,
    });
    oldSocket.socket.on("send-msg-response", async (response) => {
      const messageResponse = Object.assign({}, message);
      messageResponse.Content = response.message;
      await outbound(messageResponse);
      return res.status(200).json(response);
    });
  } else {
    const newSocket = io(host_api_gw);
    newSocket.connect(true);
    newSocket.emit("join", message.Msisdn);
    newSocket.emit("new-msg", {
      msg: message.Content,
      room: message.Msisdn,
    });
    newSocket.on("send-msg-response", async (response) => {
      const messageResponse = Object.assign({}, message);
      messageResponse.Content = response.message;
      await outbound(messageResponse);
      return res.status(200).json(response);
    });
    sockets.push({
      id: message.Msisdn,
      socket: newSocket,
    });
  }
};

module.exports = {
  inbound,
};
