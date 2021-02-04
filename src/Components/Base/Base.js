import React from "react";
import Header from "../Header/Header";
import "./Base.css";

export default function Base(props) {
  return (
    <>
      <Header />
      <div className="Base">
        <main className="main-content">{props.children}</main>
      </div>
    </>
  );
}
