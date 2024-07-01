# Chat Application API - User Guide

Welcome to the Chat Application API! This guide will help you understand how to interact with the API for getting individual chatted users and sending/receiving individual messages using sockets.

## Table of Contents

1. [Get Users Whom the User Has Chatted With](#get-users-whom-the-user-has-chatted-with)
2. [Send and Receive Individual Messages Using Socket](#send-and-receive-individual-messages-using-socket)

## Get Users Whom the User Has Chatted With

### Endpoint

`GET /api/chat/individual/users`

### Description

Retrieve a list of users with whom the authenticated user has chatted.

### Request Headers

- `Authorization`: Bearer token

### Example Request

```sh
curl -X GET http://yourapiurl/api/chat/individual/users \
-H "Authorization: Bearer <your_token>"
```

### Response

#### Success (200)

```json
{
  "status": "success",
  "message": "Fetched users whom the user has chatted with",
  "data": [
    {
      "_id": "1",
      "username": "User One"
    },
    {
      "_id": "2",
      "username": "User Two"
    }
    // ... more users
  ]
}
```

#### Unauthorized (401)

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

## Send and Receive Individual Messages Using Socket

### Connecting to the Socket

First, connect to the socket server using the `socket.io-client` library in your frontend application.

```javascript
const socket = io("https://chatsocket-server-f59f.onrender.com", {
  query: { userId: "<your_user_id>" },
  auth: {
    token: "Bearer <your_token>",
  },
});
```

### Sending an Individual Message

### Data Format

```json
{
  "senderId": "user1",
  "receiverId": "user2",
  "message": "Hello!",
  "attachment": "http://example.com/image.png"
}
```

### Example Code

```javascript
const messageData = {
  senderId: "user1",
  receiverId: "user2",
  message: "Hello!",
  attachment: "http://example.com/image.png",
};

socket.emit("individual", messageData);
```

### Receiving an Individual Message

### Example Code

```javascript
socket.on("individual", (msg) => {
  const { sender, message, attachment, timestamp } = msg;
  console.log(`Message from ${sender}: ${message}`);
  if (attachment) {
    console.log(`Attachment: ${attachment}`);
  }
});
```

### Sample Received Message

```json
{
  "_id": "chat_id_1",
  "sender": "user1",
  "receiver": "user2",
  "message": "Hello!",
  "attachment": "http://example.com/image.png",
  "timestamp": "2024-01-01T00:00:00Z"
}
```