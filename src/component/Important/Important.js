import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import Submit from "../MyDay/Submit";
import useInput from "../../hook/use-input";
import { nextStepAction } from "../../Redux/nextStep";
import useWrapper from "../../hook/use-wrapper";
import moment from "moment/moment";
import "./Important.css";
import DisplayTasks from "../DisplayTasks/DisplayTasks";
function Important() {
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, time, timeNow, month, monthNow } =
    useWrapper();
  const dispatch = useDispatch();
  const display = useSelector((state) => state.nextStep.display);
  const displayHandler = () => {
    dispatch(nextStepAction.displayHandler());
  };
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const tasksImportant = tasksArr.filter(
    (ele) => ele.isImportant === true && ele.isDone !== true
  );
  const {
    value: enteredImportant,
    valueChangeHandler: changeHandler,
    inputBlurHandler: blurHandler,
    reset: resetImportantInput,
    isValid: enteredImportantIsvalid,
  } = useInput((value) => value.trim() !== "");
  let formIsvalid = false;
  if (enteredImportantIsvalid) {
    formIsvalid = true;
  }

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
      isImportant: true,
      isMyday: false,
      isPlanned: false,
      isTasks: false,
      id: id,
      tasks: enteredImportant,
    };
    dispatch(importantAction.addtasks({ tasksItem }));
    resetImportantInput();
    dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
  };

  return (
    <React.Fragment>
      <div className="mydayBorder">
        <div className={`fll marginTMyday lineTasks`} id="sizeText">
          <p className="textColorImportant">
            {!display ? (
              <span
                className="fa-solid fa-bars ipadding"
                onClick={displayHandler}
              />
            ) : (
              <i className="fa-regular fa-star ipadding"></i>
            )}
            <span>Important</span>
            <span
              className="fa-solid fa-ellipsis dotpadding"
              style={{
                color: "gray",
                fontSize: "16px",
              }}
            />{" "}
          </p>
        </div>
        <div className="fll lineTasks1">
          <p className="textColorImportant">
            <span>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </span>
            <span className="hiddenSort">Sort</span>
          </p>
        </div>
      </div>
      <div className="formSubmitMyday">
        {/* ////////////from submit/////////////// */}
        <Submit
          time={time}
          timeNow={timeNow}
          submitHandler={submitHandler}
          entered={enteredImportant}
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          formIsvalid={formIsvalid}
          showDateHandler={showDateHandler}
        />
        {/* ///////////datepicker//////////// */}
        {datePicker}
        {/* /////////ht task list///////// */}
        <div className="tasksArrList">
          <DisplayTasks tasksArrToday={tasksImportant} tasksArrCompleted={[]} />
          {/* {displayTasksToday} */}
          {/* {[...tasksImportant].reverse().map((ele) => {
            return (
              <div
                className="borderTasksArr"
                key={ele.id}
                onClick={() => showTasksDetailHandler(ele)}
              >
                <div className="fll iconLine">
                  <i
                    className="fa-regular fa-circle "
                    onClick={(event) => isDoneHandler(ele, event)}
                  />
                </div>
                <div className="fll taskName">
                  <span> {ele.tasks}</span>
                  <br />
                  <span className="textSize">
                    Tasks
                    {displayStep(ele).stepDetail.length !== 0 && (
                      <span>
                        .{" "}
                        {displayStep(ele).stepDetail.length ===
                          displayStep(ele).stepDetailCompleted.length && (
                          <span className="fa-regular fa-circle-check" />
                        )}{" "}
                        {displayStep(ele).stepDetailCompleted.length} of{" "}
                        {displayStep(ele).stepDetail.length}
                      </span>
                    )}
                  </span>
                </div>
                <div className={`fll iconLineStar`}>
                  {ele.isImportant && (
                    <i
                      onClick={(event) => testHandler(ele, event)}
                      style={{ color: "blue" }}
                      className="fa-solid fa-star"
                      data-toggle="tooltip"
                      title="Remove importance!"
                    ></i>
                  )}
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Important;
