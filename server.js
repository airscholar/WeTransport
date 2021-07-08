const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1232755",
  key: "f6bfc91466e34cd2278b",
  secret: "d5520973aef5d1492b26",
  cluster: "mt1",
  useTLS: true,
});

setInterval(() => {
  pusher.trigger("mapschannel", "googlemap", {
    message: { coordinates: { longitude: (x += 0.0001), latitude: (y += 0.0001) } },
  });
}, 5000);

// const http = require("http");
// const WebSocketServer = require("websocket").server;

// const server = http.createServer();
// server.listen(9898);

// const wsServer = new WebSocketServer({
//   httpServer: server,
// });

// let x = 3.3792;
// let y = 6.5244;

// wsServer.on("request", function (request) {
//   const connection = request.accept(null, request.origin);

//   connection.on("message", function (message) {
//     console.log("Received messages");
//     console.log(message.utf8Data);
//     setInterval(() => {
//       connection.sendUTF(JSON.stringify({ coordinates: { longitude: (x += 0.0001), latitude: (y += 0.0001) } }));
//     }, 5000);
//   });
//   connection.on("close", function (reasonCode, description) {
//     console.log("Client has disconnected.");
//   });
// });
