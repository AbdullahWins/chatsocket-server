const { createServer } = require("http");
const { Server } = require("socket.io");
const { configureApp } = require("../server/configure.config");
const {
  handleIndividualMessage,
} = require("../../src/chats/IndividualChatModule");
const { handleGroupMessage } = require("../../src/chats/GroupChatModule");

const app = configureApp();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;
  console.log("A user connected with User ID:", userId);

  socket.join(userId);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //handle individual chat messages
  socket.on("individual", (data) => handleIndividualMessage(io, socket, data));
  socket.on("group", (data) => handleGroupMessage(io, socket, data));

  // socket.on("createGroup", (data) => handleCreateGroup(io, socket, data));
  // socket.on("addUsersToGroup", (data) =>
  //   handleAddUsersToGroup(io, socket, data)
  // );

  // Handle individual call
  // socket.on("individualCall", (data) => handleIndividualCall(io, socket, data));
});

module.exports = { httpServer, io };
