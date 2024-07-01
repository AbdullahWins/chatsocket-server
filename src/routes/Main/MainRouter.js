const MainRouter = require("express").Router();

//import routes
const DefaultRouter = require("./DefaultRoutes");
const ChatRouter = require("../Chat/ChatRoutes");

//routes with prefixes
MainRouter.use("/chats", ChatRouter);

//default routes
MainRouter.use(DefaultRouter);

module.exports = { MainRouter };
