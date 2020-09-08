const io = require("socket.io-client");
const host_api_gw = "http://localhost:3001/";
const sockets = [];

const sendMessage = (req, res) => {
  const { msg, id } = req.body;

  // Si el socket esta creado , usamos el creado , sino creamos uno nuevo
  const oldSocket = sockets.find((socket) => socket.id === id);
  if (oldSocket) {
    oldSocket.socket.emit("new-msg", {
      msg: msg,
      room: id,
    });
    oldSocket.socket.on("send-msg-response", async (response) => {
      console.log(response);
      return res.status(200).json(response);
    });
  } else {
    const newSocket = io(host_api_gw);
    newSocket.connect(true);
    newSocket.emit("join", id);
    newSocket.emit("new-msg", {
      msg: msg,
      room: id,
    });
    newSocket.on("send-msg-response", async (response) => {
      console.log(response);
      return res.status(200).json(response);
    });
    sockets.push({
      id,
      socket: newSocket,
    });
  }

  /*if (sockets.length > 1) {

  };*/
};

module.exports = {
  sendMessage,
};
