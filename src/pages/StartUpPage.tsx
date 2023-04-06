import React, { useState, useEffect } from "react";
import CommandLineItem from "../animations/CommandLineItem";
import StartupLines from "../data/startup.json";

export default function StartUpPage() {
  const [StartupLineArray, SetStartupLineArray]: any = useState([]);
  const [skipAnimation, setSkipAnimation]: any = useState(false);

  useEffect(() => {
    if (!skipAnimation) {
      const nerd = setInterval(() => {
        SetStartupLineArray([
          ...StartupLineArray,
          StartupLines[StartupLineArray.length],
        ]);
        clearInterval(nerd);
      }, 800);
      if (StartupLineArray.length === StartupLines.length) {
        clearInterval(nerd);
      }
    } else {
      SetStartupLineArray(StartupLines);
    }
  });
  return (
    <div className="terminal-wrapper" onClick={() => setSkipAnimation(true)}>
      <button style={{
        position:'absolute',
        zIndex:1000,
        left: 0,
        right: 0, 
        marginLeft: "auto", 
        marginRight: "auto",
        width: "8em",
        border:'none',
        background:"rgba(255,255,255,.8)",
        fontFamily: "Source-Serif-Pro",
        fontWeight:800,
        fontSize:"1.5em",
        borderRadius:".25em"
      }}>Tap To Skip</button>
      {Array.isArray(StartupLineArray)
        ? StartupLineArray.map((line, index) => {
            return <CommandLineItem text={line} key={index} />;
          })
        : null}
      {StartupLineArray.length === StartupLines.length ? (
        <CommandLineItem type={"Input"} inputTitle={"username:"} />
      ) : null}
    </div>
  );
}
