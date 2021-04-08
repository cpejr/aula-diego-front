import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Comment.css";

export default function Comment({
  author,
  date,
  text,
  linkSrc,
  linkText,
  onClick,
  displayLink,
}) {
  const history = useHistory();
  return (
    <div class="comment" onClick={onClick}>
      <p>
        {" "}
        <span class="comment__author">{author}</span> -{" "}
        <span class="comment__date">{date}</span>{" "}
      </p>
      <div class="comment__content">
        <p class="comment__text">{text}</p>
        {displayLink ? (
          <Link
            to={linkSrc}
            onClick={() => {
              history.push(linkSrc);
              window.location.reload();
            }}
            class="comment__parent-link"
          >
            {linkText}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
