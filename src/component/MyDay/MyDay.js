import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../../Redux/important";
import moment from "moment/moment";
import useInput from "../../hook/use-input";
import Submit from "./Submit";
import useWrapper from "../../hook/use-wrapper";
import useShowTaskDate from "../../hook/use-showtaskdate";
import "./MyDay.css";

function MyDay(props) {
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, time, timeNow, month, monthNow } =
    useWrapper();
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const mydayTasksArr = tasksArr.filter(
    (ele) => ele.isMyday === true && ele.isDone !== true
  );
  const mydayTasksArrCompleted = tasksArr.filter(
    (ele) => ele.isMyday === true && ele.isDone === true
  );

  const dispatch = useDispatch();

  // khai bao customhook hien thi task

  const { displayTasksToday, tasksCompleted, displayTasksCompleted } =
    useShowTaskDate(mydayTasksArr, mydayTasksArrCompleted);
  //khai bao lay gia tri thoi gian thuc
  const d = moment().format("dddd, MMMM Do");
  //khai bao su dung custom hook

  const [id, setId] = useState("");
  const {
    value: enteredMyday,
    isValid: enteredMydayIsvalid,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetMydayInput,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredMydayIsvalid) {
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
      isMyday: true,
      isPlanned: false,
      isTasks: false,
      id: id,
      tasks: enteredMyday,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetMydayInput();
  };

  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    const isDone = ele.isDone;
    const isMyday = ele.isMyday;
    const idDetail = ele.id;
    const tasksName = ele.tasks;
    const isImportant = ele.isImportant;
    dispatch(importantAction.showDetail({ tasksName, idDetail, isMyday }));
    dispatch(importantAction.showImportantDetail({ isImportant, isDone }));
    console.log(showTasksDetail);
  };

  return (
    <React.Fragment>
      <div>
        <div className="mydayBorder">
          <div className={`fll contentLineMyday`} id="sizeText">
            <p>
              <span className="fa-regular fa-sun ipadding" />
              <span className="ipadding">My Day</span>
              <span
                className="fa-solid fa-ellipsis dotpadding"
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              />
            </p>
            <div className="textGray mydayspan">
              <span>{d}</span>
            </div>
          </div>
          <div className="fll lineSort">
            <div className="textGray">
              <span className="sort">
                <span className="ipadding">
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>
                  <i className="fa fa-arrow-up" aria-hidden="true"></i>
                </span>
                <span>Sort</span>
              </span>
              <span className="suggestions">
                <span className="fa-solid fa-neuter ipadding" />
                <span>Suggestions</span>
              </span>
            </div>
          </div>
        </div>
        <div className="formSubmitMyday">
          {/* /////////////// from submit //////////////// */}
          <Submit
            submitHandler={submitHandler}
            entered={enteredMyday}
            changeHandler={changeHandler}
            blurHandler={blurHandler}
            formIsvalid={formIsvalid}
            showDateHandler={showDateHandler}
          />
          {datePicker}
          {/* //////////////////////// */}
          <div className="tasksArrList">
            {displayTasksToday}
            <br />
            {/* Completed */}
            {tasksCompleted}
            {displayTasksCompleted}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MyDay;
