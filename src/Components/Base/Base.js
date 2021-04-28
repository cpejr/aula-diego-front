import React from "react";
import Header from "../Header/Header";
import "./Base.css";
import { useSession } from "../../Context/SessionContext";

export default function Base(props) {
  const { session } = useSession();

  return (
    <>
      <Header />
      {session.user.type === "student" ? (
        <div>
          <main>{props.children}</main>
        </div>
      ) : (
        <div className="Base">
          <main className="main-content">{props.children}</main>
        </div>
      )}
    </>
  );
}
