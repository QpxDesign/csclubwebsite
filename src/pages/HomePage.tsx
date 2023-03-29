import React, { useState, useEffect } from "react";
import StartUpScreen from "./StartUpPage";
import { BsFillPersonFill } from "react-icons/bs";
import uuid from "react-uuid";
import PostEditor from "../components/PostEditor";
import { FormatTime } from "../helpers/FormatTime";
import { Link } from "react-router-dom";

import {
  AiOutlineClose,
  AiFillPlusCircle,
  AiFillCloseCircle,
  AiFillDelete,
  AiTwotoneEdit,
} from "react-icons/ai";

export default function HomePage() {
  const [authed, setAuthed] = useState(false);
  const [showCardEditor, setShowCardEditor] = useState(false);
  const [activeEditID, setActiveEditID] = useState("");

  const [cardData, setCardData]: any = useState([]);
  const [cardChunks, setCardChunks] = useState([[], []]);
  const [cardDataLoaded, setCardDataLoaded] = useState(false);

  const [viewmode, setViewmode] = useState("About the Club");

  const [blogData, setBlogData]: any = useState([]);

  const [createMode, setCreateMode] = useState(false);

  function killEditor() {
    //setShowCardEditor(false);
    disablePopup();
  }
  function handleUserSignout() {
    localStorage.setItem("username", "");
    localStorage.setItem("token", "");
    window.location.reload();
  }
  function disablePopup() {
    document.body.classList.remove("noscroll-all");
  }
  function enablePopup() {
    window.scrollTo(0, 0);
    document.body.classList.add("noscroll-all");
  }
  function handleCardDelete(card_id: any) {
    var data = {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      card_id: card_id,
    };
    fetch("https://api.csclub.social/delete-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    }).then(() => {
      window.location.reload();
    });
  }
  useEffect(() => {
    fetch("https://api.csclub.social/get-blog-posts")
      .then((r) => r.json())
      .then((r) => {
        setBlogData([...r]);
      });
    fetch("https://api.csclub.social/get-cards")
      .then((r) => r.json())
      .then((r2) => {
        setCardData([...r2]);
        setCardDataLoaded(true);
        setCardChunks(splitToChunks(r2, 3));
      });
    var data = {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
    };
    fetch("https://api.csclub.social/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r2) => {
        if (r2.auth) {
          setAuthed(true);
        }
      });
  }, []);
  useEffect(() => {
    console.log("EDIT ID CHANGED -- " + activeEditID);
  }, [activeEditID]);
  useEffect(() => {
    console.log("CARD DATA CHANGED -- " + cardData.length);
  }, [cardData]);
  if (
    localStorage.getItem("username") === null ||
    localStorage.getItem("username") === ""
  ) {
    return <StartUpScreen />;
  }
  function splitToChunks(array: any, parts: any) {
    let result: any = [];
    for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  }
  return (
    <>
      {cardDataLoaded && (activeEditID !== "" || createMode) ? (
        <div
          className={showCardEditor ? "greyed-out" : "hidden"}
          style={{
            display: "flex",
          }}
        >
          <PostEditor
            id={activeEditID}
            viewmode={viewmode}
            inCreateMode={createMode}
            killSelf={killEditor()}
            titleDefault={
              viewmode === "About the Club"
                ? (
                    cardData.find((a: any) => a.card_id === activeEditID) ?? {
                      title: activeEditID,
                    }
                  ).title
                : (
                    blogData.find((a: any) => a.post_id === activeEditID) ?? {
                      title: "",
                    }
                  ).title
            }
            subtitleDefault={
              viewmode === "About the Club"
                ? (
                    cardData.find((a: any) => a.card_id === activeEditID) ?? {
                      subtitle: "",
                    }
                  ).subtitle
                : (
                    blogData.find((a: any) => a.post_id === activeEditID) ?? {
                      blurb: "",
                    }
                  ).blurb
            }
            htmlDefault={
              viewmode === "About the Club"
                ? (
                    cardData.find((a: any) => a.card_id === activeEditID) ?? {
                      contents_html: "",
                    }
                  ).contents_html
                : (
                    blogData.find((a: any) => a.post_id === activeEditID) ?? {
                      contents_html: "",
                    }
                  ).contents_html
            }
            imageDefault={
              viewmode === "About the Club"
                ? ""
                : (
                    blogData.find((a: any) => a.post_id === activeEditID) ?? {
                      image_slug: "",
                    }
                  ).image_slug
            }
          />
        </div>
      ) : null}

      <section>
        <header>
          <h1>cs_club</h1>
          <h2>meetings every friday at 12:10pm in the CS Lab</h2>
          <h3>
            <BsFillPersonFill />
            {localStorage.getItem("username")}
            <AiOutlineClose onClick={() => handleUserSignout()} />
          </h3>
        </header>
        <AiFillPlusCircle
          className={authed ? "new-post-button" : "hidden"}
          role="button"
          onClick={() => {
            enablePopup();
            setCreateMode(true);

            setActiveEditID("");
            setShowCardEditor(true);
          }}
          style={{
            position: "fixed",
            bottom: 25,
            right: 25,
            fontSize: "5em",
            color: "black",
            zIndex: 99999,
            cursor: "pointer",
            transition: ".3s",
          }}
        />
        <div className={authed ? "edit-button" : "hidden"}></div>
        <div
          className="view-selector hstack"
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => {
              setViewmode("About the Club");
            }}
            className={
              viewmode === "About the Club" ? "option active" : "option"
            }
          >
            About the Club
          </div>
          <div
            style={{
              borderLeft: "4px solid white",
              height: "2em",
            }}
          ></div>

          <div
            onClick={() => {
              setViewmode("Cool Stuff");
            }}
            className={viewmode === "Cool Stuff" ? "option active" : "option"}
          >
            Cool Stuff
          </div>
        </div>

        {viewmode === "About the Club" ? (
          <div className="card-wrapper">
            {cardChunks.map((item0: any) => {
              return (
                <div className="col" key={uuid()}>
                  {item0.map((item: any) => {
                    return (
                      <div
                        className="card"
                        style={{ position: "relative" }}
                        key={uuid()}
                      >
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
                        >
                          <AiFillDelete
                            onClick={() => handleCardDelete(item.card_id)}
                            className={authed ? "" : "hidden"}
                            style={{
                              fontSize: "2em",
                              color: "red",
                              cursor: "pointer",
                            }}
                          />
                          <AiTwotoneEdit
                            className={authed ? "" : "hidden"}
                            onClick={() => {
                              setActiveEditID(item.card_id);
                              enablePopup();
                              setShowCardEditor(true);
                            }}
                            style={{
                              fontSize: "2em",
                              color: "black",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <h1>{item.title}</h1>
                        <h2>{item.subtitle}</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.contents_html,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              );
            })}{" "}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "1em",
            }}
          >
            {blogData.map((item: any) => {
              return (
                <div className="post">
                  <Link to={"/blog/post/" + item.post_id}>
                    {" "}
                    <img src={item.image_slug} />
                  </Link>
                  <Link to={"/blog/post/" + item.post_id}>
                    <h1>{item.title}</h1>
                  </Link>
                  <h2>{item.blurb}</h2>
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "1em",
                      marginTop: ".5em",
                      fontStyle: "italic",
                    }}
                  >
                    <h3>{item.author}</h3>
                    <h3>{FormatTime(item.timestamp)}</h3>
                  </div>{" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "3em",
                      paddingBottom: ".5em",
                      gap: "1em",
                      width: "100%",
                    }}
                  >
                    <AiFillDelete
                      onClick={() => {
                        var data = {
                          post_id: item.post_id,
                          token: localStorage.getItem("token"),
                          username: localStorage.getItem("username"),
                        };
                        fetch("https://api.csclub.social/delete-blog-post", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                          },
                          body: JSON.stringify(data),
                        }).then((r) => {
                          window.location.reload();
                        });
                      }}
                      className={authed ? "" : "hidden"}
                      style={{
                        fontSize: "2em",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />{" "}
                    <AiTwotoneEdit
                      className={authed ? "" : "hidden"}
                      onClick={() => {
                        setActiveEditID(item.post_id);
                        enablePopup();
                        setShowCardEditor(true);
                      }}
                      style={{
                        fontSize: "2em",
                        color: "black",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <h5 style={{ fontSize: "2em" }}>version 0.17</h5>
      </section>
    </>
  );
}
