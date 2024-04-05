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
  const [doneUpdating, setDoneUpdating] = useState(false);
  const [files, setFiles]: any = useState([]);
  const [loadingFiles, setLoadingFiles]: any = useState(false);
  function getSites() {
    var data = {
      username: localStorage.getItem("username"),
    };
    fetch("https://csclub-api.quinnpatwardhan.com/get-user-sites", {
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
  }
  useEffect(() => {
    getSites();
  }, []);
  return !loaded ? (
    <>
      <h1 style={{ fontSize: "1.75em" }}>Create a Website</h1>
      <div className="create-website-wrapper">
        <div
          className="hstack"
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            maxWidth: "90%",
          }}
        >
          <input
            placeholder="github repo link"
            value={githubLink}
            type="url"
            onChange={(e) => setGithubLink(e.target.value)}
            style={{
              paddingLeft: ".75em",
              borderRadius: "1em",
              padding: ".125em .8em",
            }}
          ></input>
        </div>
        <h2 style={{ margin: 0 }}>or</h2>
        <div
          className="hstack"
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            maxWidth: "90%",
            gap: 0,
          }}
        >
          <label
            className={
              (files[0]?.webkitRelativePath?.split("/")[0] || "") === ""
                ? "hidden"
                : ""
            }
            style={{ marginRight: "1em", textAlign: "right" }}
          >
            {files[0]?.webkitRelativePath?.split("/")[0] || ""}
          </label>
          <input
            placeholder="drag folder"
            type="file"
            directory=""
            webkitdirectory="true"
            multiple={true}
            onChange={(e) => {
              setFiles(e.target.files);
              console.log(e.target.files);
            }}
            style={{ margin: 0, padding: "0" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
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
            if (
              framework !== "" &&
              (validateGithubLink(githubLink) ||
                validateFolder(files, framework))
            ) {
              console.log(files.length)
              if (files.length !== 0) {
                setLoadingFiles(true);
                const formData = new FormData();
                for (const a of files) {
                  formData.append("file", a);
                }

                formData.append("token", String(localStorage.getItem("token")));
                formData.append(
                  "username",
                  String(localStorage.getItem("username"))
                );
                formData.append(
                  "folder_name",
                  files[0]?.webkitRelativePath?.split("/")[0]
                );
                formData.append("framework", framework);
                fetch("https://csclub-api.quinnpatwardhan.com/handle-upload", {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: formData,
                })
                  .then((r) => r.json())
                  .then((r: any) => {
                    setRes(r);
                    setError(r.error);

                    setLoaded(true);
                    setLoadingFiles(false);
                    console.log(r);
                  });
              } else {
                let data = {
                  token: localStorage.getItem("token"),
                  username: localStorage.getItem("username"),
                  github_link: githubLink,
                  framework: framework,
                };
                setLoadingFiles(true)
                fetch("https://csclub-api.quinnpatwardhan.com/handle-deploy", {
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
                    setLoadingFiles(false);
                    setLoaded(true);
                    console.log(r);
                  });
              }
            } else {
              alert("Please fill out all fields bozo");
            }
          }}
        >
          GO
        </button>
        <GrUpdate
          style={{
            fontSize: "2em",
            fill: "white",
            animation: loadingFiles ? "rotate-forever infinite 2s" : "",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {userSites.map((item: any, index: any) => {
          return (
            <div
              key={index}
              style={{
                width: "min(85%,30em)",
                overflowX: "scroll",
                background: "rgba(255,255,255,.3)",
                padding: ".35em 1em",
                borderRadius: "1em",
                marginTop: "1em",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <h1 style={{ fontSize: "1.5em" }}>{item.domain_name}</h1>
              <h3 style={{ textAlign: "left", justifyContent: "flex-start" }}>
                Created: {FormatTime(item.creation_timestamp)}
              </h3>
              <h3 style={{ textAlign: "left", justifyContent: "flex-start" }}>
                Last Updated: {FormatTime(item.last_updated)}
              </h3>
              <a href={"http://" + item.domain_name + ".csclub.quinnpatwardhan.com"}>
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
                  style={{ fontSize: "1.8em", color: "red", cursor: "pointer" }}
                  onClick={() => {
                    var data = {
                      token: localStorage.getItem("token"),
                      username: localStorage.getItem("username"),
                      github_link: item.github_link,
                      domain_name: item.domain_name,
                    };
                    console.log(data);
                    fetch("https://csclub-api.quinnpatwardhan.com/delete-site", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: JSON.stringify(data),
                    })
                      .then((r) => r.json())
                      .then((r) => {
                        console.log(r);
                        window.location.reload();
                      });
                  }}
                />
                <GrUpdate
                  style={{
                    fontSize: "1.5em",
                    marginLeft: ".5em",
                    color: "white",
                    cursor: "pointer",
                    animation: !doneUpdating
                      ? "rotate-forever infinite 1s"
                      : "",
                  }}
                  onClick={() => {
                    setDoneUpdating(false);
                    var data = {
                      token: localStorage.getItem("token"),
                      username: localStorage.getItem("username"),
                      github_link: item.github_link,
                      domain_name: item.domain_name,
                    };
                    console.log(data);
                    fetch("https://csclub-api.quinnpatwardhan.com/update-site", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: JSON.stringify(data),
                    })
                      .then((r) => r.json())
                      .then((r) => {
                        console.log(r);
                        setDoneUpdating(true);
                        if (!r.error) {
                          getSites();
                        } else {
                          alert(r.msg);
                        }
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
        <a href={"http://" + res.domain_name.split("_")[0]}>
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
  try {
    const url = new URL(l);
    if (url.hostname === "github.com") return true;
    return false;
  } catch {
    return false;
  }
}

function validateFolder(folder: any, framework: any) {
  if (folder.length === 0) {
    return;
  }
  var sizeSum = 0;
  var containsIndexHTML = false;
  for (const element of folder) {
    sizeSum += element.size;
    if (element.name === "index.html") {
      containsIndexHTML = true;
    }
  }
  var sizeSumMB = sizeSum / 1024 / 1024;
  if (framework === "HTML" && !containsIndexHTML) {
    alert("Invalid HTML");
    return false;
  }

  return sizeSumMB < 500;
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}
