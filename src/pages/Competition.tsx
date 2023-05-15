import React from "react";
import poster from "../assets/CSClubCompeitionPoster.png";
export default function Competition() {
  return (
    <section>
      <h1
        style={{
          fontWeight: "black",
          fontSize: "2.75em",
          marginTop: ".25em",
          textAlign: "center",
          maxWidth: "95%",
          margin: "0 auto",
        }}
      >
        CS Club Head Compeition
      </h1>
      <h2
        style={{
          fontWeight: "100",
          fontSize: "1.75em",
          textAlign: "center",
          maxWidth: "95%",
          margin: "0 auto",
        }}
      >
        Win prizes and become a head!
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div className="vstack">
          <h2
            style={{
              fontSize: "2.25em",
              margin: ".5em 0",
            }}
          >
            Flyer
          </h2>
          <img
            src={poster}
            style={{
              width: "50em",
              maxWidth: "min(90%,40em)",
              minWidth: "20em",
            }}
          ></img>
        </div>
        <div className="vstack">
          <h2
            style={{
              fontSize: "2.25em",
              margin: ".5em 0",
            }}
          >
            Details
          </h2>
          <div style={{ width: "90%", maxWidth: "100%",minWidth:"min(30em,90vw)" }}>
            <h3
              style={{
                fontSize: "1.75em",
                marginRight: "auto",
                marginBottom: ".5em",
              }}
            >
              Your submission will be judged on the following categories:
            </h3>
            <h3
              style={{
                fontSize: "1.5em",
                marginLeft: "auto",
                marginBottom: ".5em",
              }}
            >
              Creativity - how unique your creation is
            </h3>
            <h3
              style={{
                fontSize: "1.5em",
                marginRight: "auto",
                marginBottom: ".5em",
              }}
            >
              Ambition - how technologically complex your submission (scaled
              based on your previous experience, as something that is easy to
              someone who has done it 10 times may take a lot of effort/passion
              to learn for a newcomer)
            </h3>
            <h3
              style={{
                fontSize: "1.5em",
                marginRight: "auto",
                marginBottom: ".5em",
              }}
            >
              Real-World Usefulness - how useful/useable your solution would be
              to everyday people
            </h3>
            <h3
              style={{
                fontSize: "2em",
                marginBottom: ".5em",
                fontWeight: "bold",
              }}
            >
              FAQs
            </h3>
            <h3 className="question">what can i make?</h3>
            <h3 className="ans">
              You can make anything you want, using anything you want as long as
              it somehow relates to coding/software development. You can make a
              website, app, program, script, algorthim, or anything else.
            </h3>
            <h3 className="question">
              what are the deadlines and how do i submit my project?
            </h3>
            <h3 className="ans">
              You must have your project submitted by May 26th. If it's a website
              that runs plain HTML/CSS/JS or React.js (no PHP), you can use our
              Deploy (visit our home page and create an account if you haven't
              already) Feature to host it. If not, just email it to a club head (George, Nico, Quinn, and last but still least, Iain)
            </h3>
            <h3 className="question">how will you pick the winners?</h3>
            <h3 className="ans">
              We will use a rubric that assigns equal weight to each catagories
              to judge submissons. For 1st place (the club head position) we
              will take into account your participation in the club this year as
              well as how high your project scored.
            </h3>
            <h3 className="question">questions?</h3>
            <h3 className="ans">feel free to email a head with any questions or comments you have.</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
