import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, paddingTop: 120, textAlign: "center", borderRadius: 0}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
