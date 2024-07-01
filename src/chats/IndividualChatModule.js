//individual chat module
const IndividualChatMessage = require("../models/Chat/IndividualChatModel");
const { logger } = require("../services/logHandlers/HandleWinston");
const { CustomError } = require("../services/responseHandlers/HandleResponse");

async function handleIndividualMessage(io, socket, data) {
  //extract the data
  const { senderId, receiverId, message, attachment } = data;
  //try to send the message
  try {
    //save the message to the database
    const processedData = {
      sender: senderId,
      receiver: receiverId,
      message: message,
      attachment: attachment,
    };

    //save the message to the database
    const newMessage = await IndividualChatMessage.addIndividualChatMessage(
      processedData
    );
    //emit the message to the sender and receiver
    io.to(senderId).emit("individual", newMessage);
    io.to(receiverId).emit("individual", newMessage);
    //log the message
    logger.log({
      level: "info",
      message: `Message sent from "${senderId}" to "${receiverId}": \n messge: "${message}" \n attachment: "${attachment}"`,
    });
    return newMessage;
  } catch (error) {
    //emit an error message to the sender
    io.to(senderId).emit("error", error?.message);
    console.log("error", error);
    // throw new CustomError(error?.statusCode, error?.message);
  }
}

// Server-side code
async function handleIndividualCall(io, socket, { callerId, receiverId }) {
  try {
    // Emit an "incomingCall" event to the receiver with the callerId included
    io.to(receiverId).emit("incomingCall", { callerId });

    // Listen for the receiver's response to the call
    socket.on("callResponse", async (response) => {
      try {
        if (response.accepted) {
          // If the call is accepted, emit a "callAccepted" event to both caller and receiver
          io.to(callerId).emit("callAccepted", { receiverId });
          io.to(receiverId).emit("callAccepted", { callerId });

          // Create RTCPeerConnection object
          const pc = new RTCPeerConnection();

          // Add local stream to peer connection
          navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then((stream) => {
              stream.getTracks().forEach((track) => pc.addTrack(track, stream));
            })
            .catch((error) => {
              console.error("Error accessing media devices:", error);
            });

          // Listen for ICE candidates and send them to the remote peer
          pc.onicecandidate = (event) => {
            if (event.candidate) {
              socket.emit("icecandidate", {
                candidate: event.candidate,
                receiverId,
              });
            }
          };

          // Create offer and set local description
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);

          // Send offer to the remote peer
          socket.emit("offer", { offer, receiverId });

          // Listen for answer from the remote peer
          socket.on("answer", async ({ answer }) => {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
          });
        } else {
          // If the call is rejected, emit a "callRejected" event to the caller
          io.to(callerId).emit("callRejected", { receiverId });
        }
      } catch (error) {
        console.error("Error handling call response:", error);
      }
    });
  } catch (error) {
    console.error("Error handling individual call:", error);
  }
}

module.exports = {
  handleIndividualMessage,
  handleIndividualCall,
};
