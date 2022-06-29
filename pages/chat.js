import { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket = false;

function ChatPage() {
  const [input, setInput] = useState("");
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:8080/");
    }
  }, []);

  useEffect(() => {
    socket.on("chat", (msg) => {
      setMessageArray([...messageArray, msg]);
    });
  }, [messageArray]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onClickHandler = () => {
    // setMessageArray((prevMessages) => [...prevMessages, input]);
    socket.emit("chat", input);
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
