import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import moment from "moment/moment";
import Submit from "../MyDay/Submit";
import useWrapper from "../../hook/use-wrapper";
import useShowTaskDate from "../../hook/use-showtaskdate";
import { nextStepAction } from "../../Redux/nextStep";
import "./Planned.css";
import DisplayDueDate from "./DisplayDueDate";

function Planned() {
  const dispatch = useDispatch();

  const display = useSelector((state) => state.nextStep.display);
  const displayHandler = () => {
    dispatch(nextStepAction.displayHandler());
  };
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, time, timeNow, month, monthNow } =
    useWrapper();
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const showPlanned = useSelector((state) => state.important.showPlanned);

  const plannedTasksArrToday = tasksArr.filter(
    (ele) =>
      ele.isPlanned === true &&
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time === timeNow &&
      ele.month === monthNow
  );

  //ht tasks sd custom hook
  const { tasksToday, displayTasksToday } = useShowTaskDate(
    plannedTasksArrToday,
    []
  );
  //khai bao su dung custom hook
  const {
    value: enteredPlanned,
    isValid: enteredPlannedIsvalid,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetPlannedInput,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredPlannedIsvalid) {
    formIsvalid = true;
  }

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let tasksItem = {
      timeOut: false,
      month: month,
      time: time,
      timed: moment(value).format("dddd, MMMM Do"),
      isDone: false,
      isImportant: false,
      isMyday: false,
      isPlanned: true,
      isTasks: false,
      id: id,
      tasks: enteredPlanned,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetPlannedInput();
    dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
  };

  return (
    <React.Fragment>
      <div>
        <div className="mydayBorder">
          <div className={`fll marginTMyday lineTasks`} id="sizeText">
            <p className="textColorImportant">
              {!display ? (
                <span
                  className="fa-solid fa-bars ipadding"
                  onClick={displayHandler}
                />
              ) : (
                <i className="fa-solid fa-calendar-days ipadding" />
              )}
              <span>Planned</span>
              <span
                className="fa-solid fa-ellipsis dotpadding"
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              />{" "}
            </p>
          </div>
        </div>
        {/* //////////////submit  ///////////////// */}
        <div className="formSubmitMyday">
          <Submit
            submitHandler={submitHandler}
            entered={enteredPlanned}
            changeHandler={changeHandler}
            blurHandler={blurHandler}
            formIsvalid={formIsvalid}
            showDateHandler={showDateHandler}
          />

          {/* /////////date picker///////// */}
          {datePicker}

          <div className="tasksArrList">
            {/* /////////today///////// */}

            {tasksToday}

            {showPlanned && displayTasksToday}
            <DisplayDueDate />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Planned;
