import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div class="loader-container">
      <img
        src={require("../../images/logo.png")}
        alt="logomarca"
        className="loader-img"
      />
      <div class="loader">
        <div class="dot" />
        <div class="dot" />
        <div class="dot" />
      </div>
    </div>
  );
}
