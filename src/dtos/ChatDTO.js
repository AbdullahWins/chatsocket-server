//Chat DTO

//group fetch dto
class GroupFetchDTO {
  constructor(group) {
    this._id = group?._id || null;
    this.name = group?.name || "";
    this.users = group?.users || [];
    this.createdAt = group?.createdAt || null;
  }
}

class ChatDTO {
  constructor(chat) {
    this._id = chat?._id || null;
    this.sender = chat?.sender || null;
    this.receiver = chat?.receiver || null;
    this.group = chat?.group || null;
    this.message = chat?.message || "";
    this.isGroupChat = chat?.isGroupChat || false;
    this.createdAt = chat?.createdAt || null;
  }
}

class ChatFetchDTO {
  constructor(chat) {
    this._id = chat?._id || null;
    this.sender = chat?.sender || null;
    this.receiver = chat?.receiver || null;
    this.group = chat?.group || null;
    this.message = chat?.message || "";
    this.isGroupChat = chat?.isGroupChat || false;
    this.createdAt = chat?.createdAt || null;
  }
}

//individual chat fetch dto
class IndividualChatFetchDTO {
  constructor(userId, chat) {
    this._id = chat?._id || null;
    this.message = chat?.message || "";
    this.attachment = chat?.attachment || "";
    this.ismine = chat?.senderId.equals(userId) ? true : false;
    this.createdAt = chat?.createdAt || null;
  }
}

//individual chat fetch dto
class GroupChatFetchDTO {
  constructor(chat) {
    this._id = chat?._id || null;
    this.sender = chat?.sender || null;
    this.group = chat?.group || null;
    this.message = chat?.message || "";
    this.attachment = chat?.attachment || "";
    this.createdAt = chat?.createdAt || null;
  }
}

module.exports = {
  GroupFetchDTO,
  ChatDTO,
  ChatFetchDTO,
  IndividualChatFetchDTO,
  GroupChatFetchDTO,
};
