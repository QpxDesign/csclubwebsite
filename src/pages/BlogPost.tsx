import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormatTime } from "../helpers/FormatTime";

export default function BlogPost() {
  const { id } = useParams();

  const [res, setRes]: Array<any> = useState([]);
  const [loaded, setLoaded]: any = useState(false);
  const [postData, setPostData]: any = useState({});
  async function FetchPosts() {
    await fetch("http://localhost:4201/get-blog-posts")
      .then((res) => res.json())
      .then((r) => {
        setRes(r);
        if (id !== undefined) {
          const newID = id.replaceAll("/blog/path/", "");
          const post = r.find((r: any) => r.post_id === newID);

          setPostData(post);
        }
        setLoaded(true);
      });
  }
  function getPostFromId(postID: any) {
    return res.find((r: any) => r.PostID === postID);
  }

  useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <div className="" style={{ backgroundColor: "black" }}>
      {postData !== undefined ? (
        <div className="post-page-wrapper">
          <h1>{postData.title}</h1>
          <h2>
            By {postData.author} &#x2022; {FormatTime(postData.timestamp)}
          </h2>
          <img src={postData.image_slug} />
          <p
            dangerouslySetInnerHTML={{ __html: postData.contents_html }}
            className="content-wrapper"
          ></p>
        </div>
      ) : (
        "Error"
      )}
    </div>
  );
}
