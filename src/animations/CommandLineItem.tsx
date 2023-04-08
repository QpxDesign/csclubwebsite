import React, { useEffect, useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import SignInWithGoogle from "../pages/SignInWithGoogle";

export default function CommandLineItem(props: any) {
  const textInput = React.useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enteredUsername, setenteredUsername] = useState(false);

  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const handleSubmit = () => {
    var data = {
      password: password,
      username: username,
    };
    fetch(
      `https://api.csclub.social/${userAlreadyExists ? "login" : "signup"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      }
    )
      .then((r) => r.json())
      .then((r2) => {
        if (
          (r2 !== undefined && r2.status === "okay") ||
          (r2.allowLogin !== undefined && r2.allowLogin === true)
        ) {
          localStorage.setItem("token", r2.token);
          localStorage.setItem("username", username);
          window.location.reload();
        } else {
          alert("Couldn't Log You In.");
        }
      });

    // window.location.reload(false);
  };
  async function getUserStatus() {
    var data = {
      username: username,
    };
    await fetch("https://api.csclub.social/get-username-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r2) => {
        if (r2.user_status === "has-account") {
          setUserAlreadyExists(true);
        }
      });
  }
  useEffect(() => {
    if (props.type === "Input" && textInput.current !== null) {
      textInput.current.focus();
    }
  }, []);

  if (props.type !== "Input") return <h1 className="cl-text">{props.text}</h1>;
  return (
    <>
      <div className="hstack">
        <h1 className="cl-text">{props.inputTitle}</h1>
        <input
          readOnly={enteredUsername}
          className="cl-input"
          ref={textInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className={
            username !== "" && !enteredUsername ? "cl-button" : "hidden"
          }
          onClick={() => {
            setenteredUsername(true);
            getUserStatus();
          }}
        >
          {"next ==>"}
        </button>
        <h1 className="cl-text">or</h1>
        <GoogleOAuthProvider clientId="449905501322-kdoojod5l6skjl6v7n3l56i46umjkbtc.apps.googleusercontent.com">
          <SignInWithGoogle />
        </GoogleOAuthProvider>
      </div>
      <div className={enteredUsername ? "hstack" : "hide"}>
        <h1 className="cl-text">
          {userAlreadyExists
            ? "Welcome Back! Please enter your password: "
            : "Great! Please enter a strong password: "}
        </h1>
        <input
          className="cl-input"
          ref={textInput}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "10em" }}
        />
        <AiFillCheckCircle
          style={{ color: "green", fontSize: "2em", zIndex: 999 }}
          className={password.length >= 8 ? "" : "hidden"}
          color={"red"}
        />
      </div>
      <button
        className={
          username !== "" && password.length >= 8 ? "cl-button" : "hidden"
        }
        onClick={() => {
          if (password.length >= 8) {
            handleSubmit();
          } else {
            alert("Invalid Password");
          }
        }}
      >
        {"i'm ready ==>"}
      </button>
    </>
  );
}
