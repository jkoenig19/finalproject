import React from "react";
import "./style.css";

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group list-group-item-primary">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="listItem">{children}</li>;
}
