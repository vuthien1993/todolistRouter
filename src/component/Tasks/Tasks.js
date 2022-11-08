import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import Submit from "../MyDay/Submit";
import useWrapper from "../../hook/use-wrapper";
import moment from "moment/moment";
import useShowTaskDate from "../../hook/use-showtaskdate";
import { nextStepAction } from "../../Redux/nextStep";
import "./Tasks.css";
function Tasks(props) {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.nextStep.display);
  const displayHandler = () => {
    dispatch(nextStepAction.displayHandler());
  };
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, timeNow, time, monthNow, month } =
    useWrapper();

  const tasksArrTotal = useSelector((state) => state.important.tasksArr);
  const tasksArr = tasksArrTotal.filter((ele) => ele.isDone !== true);
  const tasksArrCompleted = tasksArrTotal.filter((ele) => ele.isDone === true);
  const {
    value: enteredTasks,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetTasksInput,
    isValid: enteredTasksIsvalid,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredTasksIsvalid) {
    formIsvalid = true;
  }
  const { displayTasksToday, tasksCompleted, displayTasksCompleted } =
    useShowTaskDate(tasksArr, tasksArrCompleted);
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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
      isPlanned: false,
      isTasks: true,
      id: id,
      tasks: enteredTasks,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetTasksInput();
    dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
  };

  ///////////////////////////////////////

  return (
    <React.Fragment>
      <div className="mydayBorder ">
        <div className={`fll marginTMyday lineTasks`} id="sizeText">
          <p className="textColorImportant">
            {!display ? (
              <span
                className="fa-solid fa-bars ipadding"
                onClick={displayHandler}
              />
            ) : (
              <i className="fa-solid fa-house"></i>
            )}
            <span>Tasks</span>
            <span
              className="fa-solid fa-ellipsis dotpadding"
              style={{
                color: "gray",
                fontSize: "16px",
              }}
            />
          </p>
        </div>
        <div className="fll lineTasks1">
          <span className="textColorImportant">
            <span>
              <svg
                className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                fill="currentColor"
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <span className="fontSize14">Sort</span>
          </span>
        </div>
      </div>
      <div className="formSubmitMyday">
        <Submit
          showDateHandler={showDateHandler}
          submitHandler={submitHandler}
          entered={enteredTasks}
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          formIsvalid={formIsvalid}
        />
        {/* date piker chon thoi gian */}
        {datePicker}
        {/* ///////// hiển thị tất cả các tasks///////// */}
        <div className="tasksArrList">
          {displayTasksToday}
          <br />
          {/* Completed */}
          {tasksCompleted}
          {displayTasksCompleted}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Tasks;
