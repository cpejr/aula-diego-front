import React from "react";
import Header from "../Header/Header";
import "./Base.css";

export default function Base(props) {
    return (
        <>
        <Header />
        <div className="Base">
            {props.children}
        </div>
        </>
  );
  }
  