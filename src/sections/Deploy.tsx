import React, { useState, useEffect } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";
import { CgArrowTopRightO } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { FormatTime } from "../helpers/FormatTime";

export default function Deploy() {
  const [githubLink, setGithubLink] = useState("");
  const [framework, setFramework] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [res, setRes]: any = useState({});
  const [userSites, setUserSites]: any = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    var data = {
      username: localStorage.getItem("username"),
    };
    fetch("http://localhost:4201/get-user-sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r2) => {
        console.log(r2);
        setUserSites([...r2]);
      });
    console.log(data);
  }, []);
  return !loaded ? (
    <>
      <h1 style={{ fontSize: "1.75em" }}>Create a Website</h1>
      <div className="create-website-wrapper">
        <input
          placeholder="github repo link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        ></input>
        <div style={{ display: "flex", gap: "1em" }}>
          <div>
            <label>HTML</label>
            <input
              type="radio"
              name="service"
              onChange={() => setFramework("HTML")}
            ></input>
          </div>{" "}
          <div>
            <label>React</label>
            <input
              type="radio"
              name="service"
              onChange={() => setFramework("React")}
            ></input>
          </div>
        </div>
        <button
          onClick={() => {
            if (framework !== "" && validateGithubLink(githubLink)) {
              var data = {
                token: localStorage.getItem("token"),
                username: localStorage.getItem("username"),
                github_link: githubLink,
                framework: framework,
              };
              fetch("https://api.csclub.social/handle-deploy", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
              })
                .then((r) => r.json())
                .then((r: any) => {
                  setRes(r);
                  setError(r.error);
                  setLoaded(true);
                  console.log(r);
                });
            } else {
              alert("Please fill out all fields bozo");
            }
          }}
        >
          GO
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {userSites.map((item: any) => {
          return (
            <div
              style={{
                width: "min(85%,30em)",
                overflowX: "scroll",
                background: "rgba(255,255,255,.3)",
                padding: ".35em 1em",
                borderRadius: "1em",
                marginTop: "1em",
                position: "relative",
              }}
            >
              <h1 style={{ fontSize: "1.5em" }}>{item.domain_name}</h1>
              <h3 style={{ textAlign: "left", justifyContent: "flex-start" }}>
                Created: {FormatTime(item.creation_timestamp)}
              </h3>
              <h3 style={{ textAlign: "left", justifyContent: "flex-start" }}>
                Last Updated: {FormatTime(item.last_updated)}
              </h3>
              <a href={"http://" + item.domain_name + ".csclub.social"}>
                <h3
                  style={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    marginTop: "1em",
                  }}
                >
                  Visit Site
                  <CgArrowTopRightO style={{ paddingLeft: ".25em" }} />
                </h3>
              </a>
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  top: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiFillDelete
                  style={{ fontSize: "1.8em", color: "red" }}
                  onClick={() => {
                    var data = {
                      token: localStorage.getItem("token"),
                      username: localStorage.getItem("username"),
                      github_link: item.github_link,
                      domain_name: item.domain_name,
                    };
                    fetch("https://api.csclub.social/delete-site", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: JSON.stringify(data),
                    });
                  }}
                />
                <GrUpdate
                  style={{
                    fontSize: "1.5em",
                    marginLeft: ".5em",
                    color: "white",
                  }}
                  onClick={() => {
                    var data = {
                      token: localStorage.getItem("token"),
                      username: localStorage.getItem("username"),
                      github_link: item.github_link,
                      domain_name: item.domain_name,
                    };
                    fetch("https://api.csclub.social/update-site", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: JSON.stringify(data),
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : !error ? (
    <>
      <AiFillCheckCircle style={{ fontSize: "7em", color: "#22c55e" }} />
      <h1
        style={{
          margin: "0 auto",
          fontSize: "1.75em",
          textAlign: "center",
          width: "100%",
        }}
      >
        {" "}
        Website Deployed. Find it at{" "}
        <a href={res.domain_name.split("_")[0]}>
          {res.domain_name.split("_")[0]}{" "}
        </a>
      </h1>
    </>
  ) : (
    <>
      <AiFillCloseCircle style={{ fontSize: "7em", color: "red" }} />
      <h1
        style={{
          margin: "0 auto",
          fontSize: "1.75em",
          textAlign: "center",
          width: "100%",
        }}
      >
        Uh Oh! We encountered an error when deploying your site: {res.msg}
      </h1>
    </>
  );
}

function validateGithubLink(l: any) {
  const url = new URL(l);
  if (url.hostname === "github.com") return true;
  return false;
}