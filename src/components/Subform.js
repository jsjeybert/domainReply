import React, { useState, useEffect } from "react";
import "../stylesheet/Subform.css";

const Subform = (props) => {
  const [data, dataController] = useState(props.data);
  let index = 0;
  const [row, rowController] = useState([]);

  console.log("subform rendering", data, props.data);

  // State Rerendering while passing updated data using props
  useEffect(() => {
    dataController(props.data);
  }, [props.data]);

  const rowElements = props.row.map((element, index) =>
    React.cloneElement(element, { key: index })
  );

  const onMouseEnterHandler = (e) => {
    e.currentTarget.firstChild.classList.remove("invisible");
    // console.log(e.currentTarget.firstChild.classList.to("invisible"), e.target);
  };
  const onMouseLeavehandler = (e) => {
    e.currentTarget.firstChild.classList.add("invisible");
    // console.log(e, "Leaves");
  };
  const deleteRowEventHandler = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const addNewRow = () => {
    const rowComponent = (
      <div
        key={index}
        className="subformRow"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeavehandler}
        data-index={index}
      >
        <span onClick={deleteRowEventHandler} className="deleteRow invisible">
          ❌
        </span>
        {rowElements}
      </div>
    );
    rowController((prev) => [...prev, rowComponent]);
    index++;
  };
  useEffect(() => {
    console.log(index);
  }, [index]);
  useEffect(() => {
    data.forEach((ele) => {
      addNewRow();
    });
  }, [data]);
  return (
    <div className="Subform">
      <div className="subformTitle">{props.title}</div>
      <div className="subformRows">{row}</div>
      <div className="addNew">
        <button onClick={addNewRow}>+ Add New</button>
      </div>
    </div>
  );
};

export default Subform;
