import React, { useState } from "react";
import { status } from "../Data/data.js";
import styles from "../styles/sidebar.module.css";
import { useEffect, useRef } from "react";

function Sidebar() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [droppedForms, setDroppedForms] = useState([]);
  const handleDrop = (e) => {
    e.preventDefault();
    const form = formCreate();
    setDroppedForms((prevForms) => [
      ...prevForms,
      { form, x: e.clientX, y: e.clientY },
    ]);

    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };
  const handleBoxDrag = (e) => {
    e.preventDefault();
  };

  const handleBoxDrop = (item) => {};

  return (
    <div className={styles.main}>
      <div className={styles.sidebar_div}>
        {status.map((item) => (
          <div
            className={styles.sidebar_div_item}
            key={item.id}
            draggable
            onDrag={handleDrag}
            onDragEnd={handleDrop}
          >
            {item.value}
          </div>
        ))}
      </div>
      <div className={styles.workSpace_div}>
        <h1>Define WorkFlow Here</h1>
        {droppedForms.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: item.y,
              left: item.x,
              zIndex: 1000,
              backgroundColor: "#e96666",
              width: "280px",
              boxShadow: "2px 2px 5px 0px rgba(89, 89, 89, 0.75)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              borderRadius: "5px",
              cursor: "grab",
            }}
            draggable
            onDrag={handleBoxDrag}
            onDragEnd={handleBoxDrop}
          >
            {item.form}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

const formCreate = () => {
  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
