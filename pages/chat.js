import { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket;

function ChatPage() {
  const [input, setInput] = useState("");
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/chat/message-route");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-message", (msg) => {
        setMessageArray((prevMessages) => [...prevMessages, msg]);
      });
    };

    socketInitializer();
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onClickHandler = () => {
    setMessageArray((prevMessages) => [...prevMessages, input]);
    socket.emit("message-send", input);
    setInput("");
  };

  const messages = messageArray.map((message, index) => {
    return <p key={index}>{message}</p>;
  });

  return (
    <>
      <h1>Socket.io</h1>
      {messageArray && messages}
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
      <button onClick={onClickHandler}>Send</button>
    </>
  );
}

export default ChatPage;
