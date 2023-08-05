import React, { useState } from "react";
import { CustomAlert } from "../helpers/CustomAlert";

interface MinecraftCardProps {
  properAuth: boolean;
}

export default function MinecraftCard(props: MinecraftCardProps) {
  const [minecraftIGN, setMinecraftIGN] = useState("");
  async function handleSubmit() {
    const data = {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      mc_username: minecraftIGN,
    };
    await fetch("https://api.csclub.social/whitelist-mc-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r2: any) => {
        if (r2.error) {
          CustomAlert("Could not add you. :(", r2.msg, "okay");
        } else {
          CustomAlert("Worked! :)", r2.msg, "okay");
        }
      });
  }
  return (
    <div className="card" style={{ position: "relative" }}>
      <div
        className="options-wrapper"
        style={{
          padding: 0,
          margin: 0,
          gridGap: ".5em",
          display: "flex",
          height: "fit-contents",
          width: "100%",
        }}
      ></div>
      <h1>Minecraft Server</h1>
      <h2>mc.csclub.social | 1.20.1 vanilla</h2>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          We now have a Minecraft Server! To connect, whitelist yourself and
          then join using the address above!
        </h3>
        <div className="h-stack" style={{ margin: "0 auto" }}>
          <input
            onChange={(e) => setMinecraftIGN(e.target.value)}
            value={minecraftIGN}
            placeholder="minecraft ign"
            style={{
              border: "none",
              backgroundColor: "#e2e8f0",
              padding: ".35em .5em",
              fontFamily: "Source Serif Pro",
              fontSize: "1.25em",
            }}
          />
          <button
            className="basic-button-1"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
