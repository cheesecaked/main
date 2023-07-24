import { configureAbly, useChannel } from "@ably-labs/react-hooks";

import { useState } from "react";

configureAbly({
  key: "-TDDJA.wfHEYQ:TSL8k8-ht5w1IJW65t0L6Q5SC75-Ic1Mxa8K1Y5VGNo",
  clientId: Date.now() + "",
});

export default function Chat() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const [channel] = useChannel("public-chat", (message: any) => {
    setMessages((prev: any) => [...prev, message]);
  });

  const submitMessage = async () => {
    const response = await fetch("http://localhost:4000/create", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");
    submitMessage()
  }
  return (
    <main>
      {messages.map((message: any, index: any) => (
        <Message key={index} message={message} />
      ))}
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" className="btn" onClick={sendMessage}>
        send
      </button>
    </main>
  );
}

const Message = (props: any) => {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{props.message.data.text}</div>
    </div>
  );
};
