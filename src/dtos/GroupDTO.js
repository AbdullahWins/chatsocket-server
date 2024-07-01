//Group DTO

class GroupDTO {
  constructor(group) {
    this._id = group?._id || null;
    this.owner = group?.owner || null;
    this.name = group?.name || "";
    this.coverImage = group?.coverImage || "";
    this.description = group?.description || "";
    this.members = group?.members || [];
    this.isJoined = group?.isJoined || false;
    this.memberCount = group?.memberCount || 0;
    this.createdAt = group?.createdAt || null;
  }
}

class GroupGetDTO {
  constructor(group) {
    this._id = group?._id || null;
    this.owner = group?.owner || null;
    this.name = group?.name || "";
    this.coverImage = group?.coverImage || "";
    this.description = group?.description || "";
    this.members = group?.members || [];
    this.createdAt = group?.createdAt || null;
  }
}

module.exports = { GroupDTO, GroupGetDTO };
