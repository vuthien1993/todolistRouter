import React from "react";
import "./MyDay.css";
function Submit(props) {
  return (
    <form onSubmit={props.submitHandler}>
      <div className="totalInputTask">
        <div className="inputTasks">
          <i className="fa-regular fa-circle"></i>
          <input
            placeholder="Add a tasks"
            value={props.entered}
            onChange={props.changeHandler}
            onBlur={props.blurHandler}
          />
        </div>
        <div className="iconMydayAdd">
          <div className="textGray fll iconWidth">
            <i
              title="Add due date!"
              className="fa-solid fa-calendar-days"
              onClick={props.showDateHandler}
            ></i>
            <i className="fa-regular fa-bell" title="Remind me!"></i>
            <i className="fa-solid fa-repeat" title="Repeat!"></i>
          </div>
          <div className="fll" id="ffl">
            <button disabled={!props.formIsvalid}>Add</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Submit;