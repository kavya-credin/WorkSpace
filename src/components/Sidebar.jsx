import React, { useState } from "react";
import { status } from "../Data/data.js";
import styles from "../styles/sidebar.module.css";
import { IoAddOutline } from "react-icons/io5";
import { AiFillFolderAdd } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import {toast} from "react-toastify"
function Sidebar() {
  const [droppedForms, setDroppedForms] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const handleDrop = (item, e) => {
    e.preventDefault();
    if (activeButton) {
      setDroppedForms((prevItems) =>
        prevItems.map((form) => {
          if (form.index === activeButton.index) {
            const isAlreadyPresent = form.nextPossibleArray.some(
              (nextItem) => nextItem.id === item.id
            );
            if (isAlreadyPresent) {
              toast.warn("Already present");
              console.log("already present");
              return form;
            } else {
              return {
                ...form,
                nextPossibleArray: [...form.nextPossibleArray, item],
              };
            }
          }
          return form;
        })
      );
    } else {
      const isDuplicateInDroppedForms = droppedForms.some(
        (form) => form.item.id === item.id
      );
      if (isDuplicateInDroppedForms) {
        toast.info("Already present in droppedForms");
        console.log("already present in droppedForms");
      } else {
        setDroppedForms((prevItems) => [
          ...prevItems,
          { item, nextPossibleArray: [], index: prevItems.length },
        ]);
      }
    }
  };

  const handleRemoveDroppedItems = (index) => {
    // console.log(index);
    setDroppedForms((prevItems) =>
      prevItems
        .filter((item) => item.index !== index)
        .map((item, idx) => ({ ...item, index: idx }))
    );
    toast.success("Item removed successfully");
  };
  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    setActiveButton(null);
  };
  // console.log(droppedForms);
  const addSubItem = (item) => {
    if (activeButton == null) {
      setActiveButton(item);
    } else {
      console.log("already one active button");
    }
  };
  const handleRemoveNextPossibleItems = (index,subIndex) => {
   setDroppedForms((prevItems) => {
    return prevItems.map((item) => {
      if (item.index === index) {
        return {
          ...item,
          nextPossibleArray: item.nextPossibleArray.filter(
            (subItem, subIdx) => subIdx !== subIndex
          ),
        };
      } else {
        return item;
      }
    });
   })
   toast.success("Item removed successfully")
  }

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

      {droppedForms.length > 0 && activeButton == null && (
        <div className={styles.workFlowSeq}>
          <h2>Our Flow</h2>
          <div className={styles.droppedForms}>
            {droppedForms.map((item, index) => (
              
                <div key={index} className={styles.droppedForms_item}>
                  <h3>{item.item.value}</h3>
                  <div className={styles.subItems}>
                    {item.nextPossibleArray.map((subItem, subIndex) => (
                      <div key={subIndex} className={styles.subItem}>
                        <p>{subItem.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.buttonsDiv}>
                    <button
                      onClick={() => addSubItem(item)}
                      className={styles.btn}
                    >
                      <IoAddOutline />
                    </button>
                    <button
                      onClick={() => handleRemoveDroppedItems(index)}
                      className={styles.Crossbtn}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              
            ))}
          </div>
        </div>
      )}

      {activeButton != null && (
        <div
          style={{
            backgroundColor: "#C9D7DD",
            padding: "10px",
            marginLeft: "330px",
            marginRight: "40px",
          }}
        >
          {droppedForms.map((item, index) =>
            index === activeButton.index ? (
              <div key={index} className={styles.droppedForms_item}>
                <h3>{item.item.value}</h3>
                <button onClick={handleSave} className={styles.btn}>
                  <AiFillFolderAdd />
                </button>
                <div className={styles.subItemsAdding}>
                  {item.nextPossibleArray.map((subItem, subIndex) => (
                    <div key={subIndex} style={{ display: "flex" , gap:"25px", alignItems:"center", justifyContent:"space-between"}}>
                      <div key={subIndex} className={styles.subItem}>
                        <p>{subIndex}</p>
                        <p>{subItem.value}</p>
                      </div>
                      <div>
                      <button
                      onClick={() => handleRemoveNextPossibleItems( index,subIndex)}
                      style={{
                        backgroundColor:"transparent",
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        fontSize: "20px",
                        color: "#1B2A49",
                      }}
                    >
                      <RxCross1 />
                    </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
