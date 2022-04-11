import React, { useState, useRef } from "react";
import "../stylesheet/SingleLine.css";
const SingleLine = (props) => {
  const [placeholder, placeholderController] = useState(true);
  const [value, valueController] = useState(props.value);
  const inputRef = useRef();
  const onClickHandler = (e) => {
    placeholderController(false);
    e.target.placeholder = "";
  };
  const onBlurHandler = (e) => {
    if (value.length == 0) {
      e.target.placeholder = props.placeholder;
      placeholderController(true);
    }
  };
  const onChangeHandler = (e) => {
    valueController(e.target.value);
  };
  return (
    <div className="SingleLine">
      <span className={`title ${placeholder ? "hidden" : ""}`}>
        {props.placeholder}
      </span>
      <input
        className="textInput"
        type="text"
        value={value}
        placeholder={props.placeholder}
        ref={inputRef}
        onClick={onClickHandler}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SingleLine;
