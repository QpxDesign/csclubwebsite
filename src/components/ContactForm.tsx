import React, { useState } from "react";
import { CustomAlert } from "../helpers/CustomAlert";

export default function ContactForm() {
  const [messageTitle, setMessageTitle] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  async function handleSendContactField() {
    let data = {
      author: messageName,
      title: messageTitle,
      messageBody: messageBody,
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(messageName)) {
      CustomAlert("Invalid Email.", "", "close");
      return;
    }
    if (messageTitle.length < 5) {
      CustomAlert("Subject Too Short.", "", "close");
      return;
    }
    if (messageBody.length < 5) {
      CustomAlert("Body Too Short.", "", "close");
      return;
    }
    await fetch("https://api.csclub.social/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    }).then(() => {
      CustomAlert("Message Sent.", "", "close");
      setMessageTitle("");
      setMessageName("");
      setMessageBody("");
    });
  }
  return (
    <div
      className="contact-form-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <input
        placeholder="email"
        onChange={(e) => setMessageName(e.target.value)}
        value={messageName}
      />
      <input
        placeholder="subject"
        onChange={(e) => setMessageTitle(e.target.value)}
        value={messageTitle}
      />
      <textarea
        placeholder="message"
        onChange={(e) => setMessageBody(e.target.value)}
        value={messageBody}
        style={{
          width: "15em",
          textAlign: "left",
        }}
      />
      <button onClick={() => handleSendContactField()}>Send</button>
    </div>
  );
}
