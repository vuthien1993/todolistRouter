import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../../Redux/important";
import moment from "moment/moment";
import useInput from "../../hook/use-input";
import Submit from "./Submit";
import useWrapper from "../../hook/use-wrapper";
import useShowTaskDate from "../../hook/use-showtaskdate";
import "./MyDay.css";
import { nextStepAction } from "../../Redux/nextStep";

function MyDay(props) {
  const dispatch = useDispatch();

  const display = useSelector((state) => state.nextStep.display);
  const displayHandler = () => {
    dispatch(nextStepAction.displayHandler());
  };
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, time, timeNow, month, monthNow } =
    useWrapper();
  console.log(time);
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const mydayTasksArr = tasksArr.filter(
    (ele) => ele.isMyday === true && ele.isDone !== true
  );
  const mydayTasksArrCompleted = tasksArr.filter(
    (ele) => ele.isMyday === true && ele.isDone === true
  );

  // khai bao customhook hien thi task
  const { displayTasksToday, tasksCompleted, displayTasksCompleted } =
    useShowTaskDate(mydayTasksArr, mydayTasksArrCompleted);
  //khai bao lay gia tri thoi gian thuc
  const d = moment().format("dddd, MMMM Do");
  //khai bao su dung custom hook

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
    dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
  };

  return (
    <React.Fragment>
      <div>
        <div className="mydayBorder">
          <div className={`fll contentLineMyday`} id="sizeText">
            <p>
              {!display ? (
                <span
                  className="fa-solid fa-bars ipadding"
                  onClick={displayHandler}
                />
              ) : (
                <svg
                  className="fluentIcon listTitle-icon ___12fm75w f1w7gpdv fez10in fg4l7m0 ipadding"
                  fill="currentColor"
                  aria-hidden="true"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
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
                <span>Sort</span>
              </span>
              <span className="suggestions">
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
                    d="M10 2c3.31 0 6 2.6 6 5.8 0 1.68-.75 3.22-2.2 4.6a.6.6 0 00-.15.2l-.02.09-.94 3.92a1.84 1.84 0 01-1.67 1.38l-.15.01H9.13c-.82 0-1.54-.52-1.78-1.26l-.04-.14-.93-3.91a.6.6 0 00-.17-.3A6.32 6.32 0 014 8.04L4 7.8v-.2A5.91 5.91 0 0110 2zm2.04 13H7.96l.31 1.33.03.1c.1.3.38.52.71.56l.12.01h1.81a.86.86 0 00.75-.53l.03-.1.32-1.37zM10 3a4.92 4.92 0 00-4.98 4.41L5 7.63V8c.06 1.3.68 2.52 1.9 3.67.18.17.32.4.4.64l.05.15.37 1.54h4.57l.38-1.61.05-.16c.09-.21.22-.4.39-.56C14.38 10.47 15 9.18 15 7.8A4.9 4.9 0 0010 3z"
                    fill="currentColor"
                  ></path>
                </svg>
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
