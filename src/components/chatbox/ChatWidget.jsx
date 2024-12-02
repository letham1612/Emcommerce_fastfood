import React, { useEffect, useRef } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "./ChatWidget.css";
import { WEBSOCKET_URL } from "../../config/ApiConfig";

import logo from "../../assets/logo.png";
import { io } from "socket.io-client";

const ChatWidget = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(WEBSOCKET_URL, {
      transports: ["websocket"], // Sử dụng WebSocket
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket.IO connected");
      addResponseMessage("Xin chào! Tôi là trợ lý ảo, bạn cần hỗ trợ gì?");
    });

    socket.on("botMessage", (botMessage) => {
      addResponseMessage(botMessage);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNewUserMessage = (newMessage) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("message", newMessage);
    } else {
      console.error("Socket.IO is not connected");
    }
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={logo}
      title="Chào mừng đến với tiệm gà SV"
      subtitle="Để tôi gợi ý bạn vài món nhé..."
    />
  );
};

export default ChatWidget;
