import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface PostEditorProps {
  id: String;
  viewmode: String;
  inCreateMode: Boolean;
  killSelf: any;
  titleDefault: String;
  subtitleDefault: String;
  htmlDefault: String;
  imageDefault: String;
}

export default function PostEditor(props: PostEditorProps) {
  const [title, setTitle]: any = useState(props.titleDefault);
  const [subtitle, setSubtitle]: any = useState(props.subtitleDefault);
  const [contents_html, setHTML]: any = useState(props.htmlDefault);
  const [image_slug, setImageSlug]: any = useState(props.imageDefault);
  function commitSuicide() {
    window.location.reload();
  }
  return (
    <div
      className="card-editor"
      style={{
        position: "absolute",
        padding: "1em",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        minWidth: "min(90%,30em)",
      }}
    >
      <AiFillCloseCircle
        role="button"
        onClick={() => {
          commitSuicide();
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "red",
          fontSize: "3em",
          zIndex: 2000,
          cursor: "pointer",
        }}
      />

      {props.viewmode !== "About the Club" ? (
        <>
          <img
            src={
              image_slug !== ""
                ? image_slug
                : "https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM="
            }
            style={{
              width: "100%",
              objectFit: "cover",
              height: "12em",
              marginBottom: "1em",
            }}
          />
          <input
            style={{
              marginRight: "auto",
              textAlign: "left",
              maxWidth: "80%",
              fontSize: "2em",
              marginBottom: ".5em",
            }}
            className="h1"
            value={image_slug}
            onChange={(e) => setImageSlug(e.target.value)}
            placeholder="image url"
          ></input>
        </>
      ) : null}
      <textarea
        className="h1"
        placeholder="title goes here"
        value={title}
        style={{
          marginRight: "auto",
          textAlign: "left",
          width: "80%",
          fontSize: "2em",
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="h2"
        value={subtitle}
        style={{
          marginTop: ".25em",
          marginRight: "auto",
          textAlign: "left",
          maxWidth: "80%",
        }}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="subtitle"
      />

      <textarea
        className="h3"
        value={contents_html}
        style={{
          marginTop: ".25em",
          textAlign: "left",
          fontSize: "1.75em",
          marginRight: "auto",
          maxWidth: "80%",
        }}
        onChange={(e) => setHTML(e.target.value)}
        placeholder="body (HTML)"
      />

      <button
        role={"button"}
        onClick={() => {
          if (props.viewmode === "About the Club") {
            var data = {
              token: localStorage.getItem("token"),
              username: localStorage.getItem("username"),
              title: title,
              subtitle: subtitle,
              contents_html: contents_html,
              card_id: props.id,
            };
            fetch(
              `https://api.csclub.social/${
                props.inCreateMode ? "add-card" : "update-cards"
              }`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
              }
            ).then((r) =>
              r.json().then((r) => {
                commitSuicide();
                window.location.reload();
              })
            );
          } else {
            var data2 = {
              token: localStorage.getItem("token"),
              username: localStorage.getItem("username"),
              title: title,
              blurb: subtitle,
              image_slug: image_slug,
              contents_html: contents_html,
              post_id: props.id,
            };
            fetch(
              `https://api.csclub.social/${
                props.inCreateMode ? "create-blog-post" : "edit-blog-post"
              }`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data2),
              }
            ).then((r) =>
              r.json().then((r) => {
                commitSuicide();
                window.location.reload();
              })
            );
          }
        }}
        className="submit-button"
        style={{
          border: "none",
          fontFamily: "source-serif-pro",
          fontWeight: "900",
          fontSize: "2.25em",
          color: "white",
          padding: "0em 1em",
          borderRadius: ".25em",
          margin: ".25em 0",
          background: "black",
          marginLeft: "auto",
          cursor: "pointer",
          transition: ".12s",
        }}
      >
        Done
      </button>
    </div>
  );
}
