import React from "react";
import { Link } from "react-router-dom";
import "./Comment.css";

export default function Comment({
  author,
  date,
  text,
  linkSrc,
  linkText,
  onClick,
}) {
  return (
    <div class="comment" onClick={onClick}>
      <p>
        {" "}
        <span class="comment__author">{author}</span> -{" "}
        <span class="comment__date">{date}</span>{" "}
      </p>
      <div class="comment__content">
        <p class="comment__text">{text}</p>
        <Link to={linkSrc} class="comment__parent-link">
          {linkText}
        </Link>
      </div>
    </div>
  );
}
