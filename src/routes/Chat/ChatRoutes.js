const ChatRouter = require("express").Router();
const {
  getAllChatsByGroupId,
  getAllGroupsJoinedByUserWithLastMessage,
} = require("../../controllers/Chat/GroupChatController");
const {
  getIndivualChattedUsers,
  getAllIndividualChatsBetweenTwoUser,
} = require("../../controllers/Chat/IndividualChatController");

//individual chat routes
ChatRouter.get("/chatted-users", getIndivualChattedUsers);
ChatRouter.get("/individual/:receiverId", getAllIndividualChatsBetweenTwoUser);

//group chat routes
ChatRouter.get("/my-groups", getAllGroupsJoinedByUserWithLastMessage);
ChatRouter.get("/groups/:groupId", getAllChatsByGroupId);

module.exports = ChatRouter;
