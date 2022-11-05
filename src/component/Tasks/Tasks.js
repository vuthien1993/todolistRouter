import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import Submit from "../MyDay/Submit";
import useWrapper from "../../hook/use-wrapper";
import moment from "moment/moment";
import useShowTaskDate from "../../hook/use-showtaskdate";
import "./Tasks.css";
function Tasks(props) {
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, timeNow, time, monthNow, month } =
    useWrapper();

  const dispatch = useDispatch();
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
  };

  ///////////////////////////////////////

  return (
    <React.Fragment>
      <div className="mydayBorder ">
        <div className={`fll marginTMyday lineTasks`} id="sizeText">
          <p className="textColorImportant">
            <i className="fa-solid fa-house"></i> <span>Tasks</span>
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
          <p className="textColorImportant">
            <span>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </span>
            <span>Sort</span>
          </p>
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
