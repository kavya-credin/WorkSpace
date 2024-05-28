import React, { useState } from "react";
import { status } from "../Data/data.js";
import styles from "../styles/sidebar.module.css";
import { useEffect, useRef } from "react";

function Sidebar() {
  const [droppedForms, setDroppedForms] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const handleDrop = (item, e) => {
    e.preventDefault();
    setDroppedForms((prevItems) => [
      ...prevItems,
      { item, nextPossibleArray: [], index: prevItems.length },
    ]);
  };
  // console.log(droppedForms);

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const addSubItem = (item) => {
    if (activeButton == null) {
      setActiveButton(item);
    } else {
      console.log("already one active button");
    }
  };

  console.log(activeButton);

  return (
    <div className={styles.main}>
      <div className={styles.sidebar_div}>
        {status.map((item) => (
          <div
            className={styles.sidebar_div_item}
            key={item.id}
            draggable
            onDrag={handleDrag}
            onDragEnd={(e) => handleDrop(item, e)}
          >
            {item.value}
          </div>
        ))}
      </div>

      {droppedForms.length > 0 && (
        <div className={styles.workFlowSeq}>
          <h3>Our Flow</h3>
          <div className={styles.droppedForms}>
            {droppedForms.map((item, index) => (
              <div key={index} className={styles.droppedForms_item}>
                <p>{index}</p>
                {console.log(index)}
                <p>{item.item.value}</p>
                <button onClick={() => addSubItem(item)}>➕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
