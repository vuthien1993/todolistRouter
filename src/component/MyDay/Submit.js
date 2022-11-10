import React from "react";
import { useSelector } from "react-redux";
import "./MyDay.css";
function Submit(props) {
  const display = useSelector((state) => state.nextStep.display);
  const width = useSelector((state) => state.nextStep.width);
  return (
    <form onSubmit={props.submitHandler}>
      <div className="totalInputTask">
        <div
          className={`${
            display && width < 910 ? "inputTasksMobile" : "inputTasks"
          }`}
        >
          <i className="fa-regular fa-circle"></i>
          <input
            placeholder="Add a tasks"
            value={props.entered}
            onChange={props.changeHandler}
            onBlur={props.blurHandler}
          />
        </div>
        <div
          className={`${
            display && width < 910 ? "iconMydayAddMobile" : "iconMydayAdd"
          }`}
        >
          <div className="textGray fll iconWidth">
            <i
              title="Add due date!"
              className="fa-solid fa-calendar-days"
              onClick={props.showDateHandler}
            ></i>
            {props.time === props.timeNow + 1 && <span>Tomorow</span>}

            <i className="fa-regular fa-bell" title="Remind me!"></i>
            <i className="fa-solid fa-repeat" title="Repeat!"></i>
          </div>
          <div className="fll" id="ffl">
            <button
              disabled={!props.formIsvalid}
              className={`${props.formIsvalid ? "textBlue" : ""}`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Submit;
