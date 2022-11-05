import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../../Redux/important";
import useInput from "../../hook/use-input";
import moment from "moment/moment";
import Submit from "../MyDay/Submit";
import useWrapper from "../../hook/use-wrapper";
import useShowTaskDate from "../../hook/use-showtaskdate";
import "./Planned.css";

function Planned() {
  //ht modal select date su dung customhook
  const { value, showDateHandler, datePicker, time, timeNow, month, monthNow } =
    useWrapper();
  const idDetail = useSelector((state) => state.important.idTasks);
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const showPlanned = useSelector((state) => state.important.showPlanned);
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const showPlannedLater = useSelector(
    (state) => state.important.showPlannedLater
  );
  const showPlannedWeek = useSelector(
    (state) => state.important.showPlannedWeek
  );
  const showTimeOut = useSelector(
    (state) => state.important.showPlannedTimeOut
  );
  const showPlannedTomorow = useSelector(
    (state) => state.important.showPlannedTomorow
  );
  const plannedTasksArrToday = tasksArr.filter(
    (ele) =>
      ele.isPlanned === true &&
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time === timeNow &&
      ele.month === monthNow
  );
  const plannedTasksArrTomorow = tasksArr.filter(
    (ele) =>
      ele.isPlanned === true &&
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time === timeNow + 1 &&
      ele.month === monthNow
  );
  const plannedTasksArrWeek = tasksArr.filter(
    (ele) =>
      ele.isPlanned === true &&
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time < timeNow + 7 &&
      ele.time >= timeNow + 2
  );
  console.log(plannedTasksArrWeek);
  const plannedTasksArrLater = tasksArr.filter(
    (ele) =>
      ele.isPlanned === true &&
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time >= timeNow + 7
  );
  const plannedTimeOut = tasksArr.filter(
    (ele) => ele.timeOut === true && ele.isDone !== true
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
  }, [timeNow, monthNow]);

  //ht tasks sd custom hook
  const { tasksToday, displayTasksToday } = useShowTaskDate(
    plannedTasksArrToday,
    []
  );
  //khai bao su dung custom hook
  const [id, setId] = useState("");
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
  const testHandler = (ele, event) => {
    event.stopPropagation();
    const idI = ele.id;
    dispatch(importantAction.important({ idI }));
    if (ele.id === id) {
      const isImportant = !ele.isImportant;
      dispatch(importantAction.showImportantDetail({ isImportant }));
    }
  };

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
  //ham chon va bo chon hoan thanh cong viec
  const isDoneHandler = (ele, event) => {
    event.stopPropagation();
    const idC = ele.id;
    dispatch(importantAction.complete({ idC }));
    if (idC === idDetail) {
      dispatch(importantAction.showCompletedDetail());
    }
  };
  //show tasks theo date
  const nextWeek1 = moment().add(2, "day").format("MMM Do YY");
  const nextWeek2 = moment().add(6, "day").format("MMM Do YY");

  const showPlannedTomorowHandler = () => {
    dispatch(importantAction.showPlannedTomorow());
  };
  const showPlannedHandler = () => {
    dispatch(importantAction.showPlanned());
  };
  const showPlannedLaterHandler = () => {
    dispatch(importantAction.showPlannedLater());
  };
  const showPlannedWeekHandler = () => {
    dispatch(importantAction.showPlannedWeek());
  };
  const showPlannedTimeOut = () => {
    dispatch(importantAction.showPlannedTimeOut());
  };
  ////////////////////// xử lý step/////////////
  const nextStepArr = useSelector((state) => state.nextStep.nextStepArr);
  const displayStep = (ele) => {
    const stepDetail = nextStepArr.filter(
      (element) => element.idDetail === ele.id
    );
    const stepDetailCompleted = stepDetail.filter((e) => e.isDone === true);
    return { stepDetail, stepDetailCompleted };
  };
  return (
    <React.Fragment>
      <div>
        <div className="mydayBorder">
          <div className={`fll marginTMyday lineTasks`} id="sizeText">
            <p className="textColorImportant">
              <i className="fa-solid fa-calendar-days ipadding" />
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
            {/* {plannedTasksArrToday.length > 0 && (
              <div className="today" onClick={showPlannedHandler}>
                {!showPlanned ? (
                  <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                ) : (
                  <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                )}
                <span className="textB">Today</span>{" "}
                <span className="textGray">{plannedTasksArrToday.length}</span>
              </div>
            )} */}
            {tasksToday}

            {
              showPlanned && displayTasksToday

              // <div>
              //   {[...plannedTasksArrToday].reverse().map((ele) => {
              //     return (
              //       <div
              //         className="borderTasksArr"
              //         key={ele.id}
              //         onClick={() => showTasksDetailHandler(ele)}
              //       >
              //         <div className="fll iconLine">
              //           <i
              //             className="fa-regular fa-circle "
              //             onClick={(event) => {
              //               isDoneHandler(ele, event);
              //             }}
              //           ></i>
              //         </div>
              //         <div className="fll taskName">
              //           <span> {ele.tasks}</span>
              //           <br />
              //           <span className="textSize">
              //             <span>Tasks</span>
              //             {displayStep(ele).stepDetail.length !== 0 && (
              //               <span>
              //                 .{" "}
              //                 {displayStep(ele).stepDetail.length ===
              //                   displayStep(ele).stepDetailCompleted.length && (
              //                   <span className="fa-regular fa-circle-check" />
              //                 )}{" "}
              //                 {displayStep(ele).stepDetailCompleted.length} of{" "}
              //                 {displayStep(ele).stepDetail.length}
              //               </span>
              //             )}
              //             <span className="textBlue">
              //               <span>.</span>
              //               <span className="fa-solid fa-calendar-days" />
              //               <span>Today</span>
              //             </span>
              //           </span>
              //         </div>
              //         <div className={`fll iconLineStar`}>
              //           {!ele.isImportant && (
              //             <i
              //               style={{ color: "blue" }}
              //               onClick={(event) => testHandler(ele, event)}
              //               className="fa-regular fa-star"
              //               data-toggle="tooltip"
              //               title="Mark tasks as important!"
              //             ></i>
              //           )}
              //           {ele.isImportant && (
              //             <i
              //               onClick={(event) => testHandler(ele, event)}
              //               style={{ color: "blue" }}
              //               className="fa-solid fa-star"
              //               data-toggle="tooltip"
              //               title="Remove importance!"
              //             ></i>
              //           )}
              //         </div>
              //       </div>
              //     );
              //   })}
              // </div>
            }
            {/* ///////tomorow///////// */}
            {plannedTasksArrTomorow.length > 0 && (
              <div className="today" onClick={showPlannedTomorowHandler}>
                {!showPlannedTomorow ? (
                  <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                ) : (
                  <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                )}
                <span className="textB">Tomorow</span>{" "}
                <span className="textGray">
                  {plannedTasksArrTomorow.length}
                </span>
              </div>
            )}
            {showPlannedTomorow && (
              <div>
                {[...plannedTasksArrTomorow].reverse().map((ele) => {
                  return (
                    <div
                      className="borderTasksArr"
                      key={ele.id}
                      onClick={() => showTasksDetailHandler(ele)}
                    >
                      <div className="fll iconLine">
                        <i
                          className="fa-regular fa-circle "
                          onClick={(event) => {
                            isDoneHandler(ele, event);
                          }}
                        ></i>
                      </div>
                      <div className="fll taskName">
                        <span> {ele.tasks}</span>
                        <br />
                        <span className="textSize">
                          <span>Tasks</span>
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
                          <span className="textBlue">
                            <span>.</span>
                            <span className="fa-solid fa-calendar-days" />
                            <span>Tomorow</span>
                          </span>
                        </span>
                      </div>
                      <div className={`fll iconLineStar`}>
                        {!ele.isImportant && (
                          <i
                            style={{ color: "blue" }}
                            onClick={(event) => testHandler(ele, event)}
                            className="fa-regular fa-star"
                            data-toggle="tooltip"
                            title="Mark tasks as important!"
                          ></i>
                        )}
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
                })}
              </div>
            )}
            {/* ///////////planned Week */}
            {plannedTasksArrWeek.length > 0 && (
              <div className="today" onClick={showPlannedWeekHandler}>
                {!showPlannedWeek ? (
                  <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                ) : (
                  <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                )}
                <span className="textB">
                  {nextWeek1} To {nextWeek2}
                </span>{" "}
                <span className="textGray">{plannedTasksArrWeek.length}</span>
              </div>
            )}
            {showPlannedWeek && (
              <div>
                {[...plannedTasksArrWeek].reverse().map((ele) => {
                  return (
                    <div
                      className="borderTasksArr"
                      key={ele.id}
                      onClick={() => showTasksDetailHandler(ele)}
                    >
                      <div className="fll iconLine">
                        <i
                          className="fa-regular fa-circle "
                          onClick={(event) => {
                            isDoneHandler(ele, event);
                          }}
                        ></i>
                      </div>
                      <div className="fll taskName">
                        <span> {ele.tasks}</span>
                        <br />
                        <span className="textSize">
                          <span>Tasks</span>
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
                          <span className="later">
                            <span>.</span>
                            <span className="fa-solid fa-calendar-days" />
                            <span>{ele.timed}</span>
                          </span>
                        </span>
                      </div>
                      <div className={`fll iconLineStar`}>
                        {!ele.isImportant && (
                          <i
                            style={{ color: "blue" }}
                            onClick={(event) => testHandler(ele, event)}
                            className="fa-regular fa-star"
                            data-toggle="tooltip"
                            title="Mark tasks as important!"
                          ></i>
                        )}
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
                })}
              </div>
            )}
            {/* /////////Later///////// */}

            {plannedTasksArrLater.length > 0 && (
              <div className="today" onClick={showPlannedLaterHandler}>
                {!showPlannedLater ? (
                  <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                ) : (
                  <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                )}
                <span className="textB">Later</span>{" "}
                <span className="textGray">{plannedTasksArrLater.length}</span>
              </div>
            )}
            {showPlannedLater && (
              <div>
                {[...plannedTasksArrLater].reverse().map((ele) => {
                  return (
                    <div
                      className="borderTasksArr"
                      key={ele.id}
                      onClick={() => showTasksDetailHandler(ele)}
                    >
                      <div className="fll iconLine">
                        <i
                          className="fa-regular fa-circle "
                          onClick={(event) => {
                            isDoneHandler(ele, event);
                          }}
                        ></i>
                      </div>
                      <div className="fll taskName">
                        <span> {ele.tasks}</span>
                        <br />
                        <span className="textSize">
                          <span>Tasks</span>
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
                          <span className="later">
                            <span>.</span>
                            <span className="fa-solid fa-calendar-days" />
                            <span>{ele.timed}</span>
                          </span>
                        </span>
                      </div>
                      <div className={`fll iconLineStar`}>
                        {!ele.isImportant && (
                          <i
                            style={{ color: "blue" }}
                            onClick={(event) => testHandler(ele, event)}
                            className="fa-regular fa-star"
                            data-toggle="tooltip"
                            title="Mark tasks as important!"
                          ></i>
                        )}
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
                })}
              </div>
            )}
            {/* ////////Time out/////////// */}
            {plannedTimeOut.length > 0 && (
              <div className="today" onClick={showPlannedTimeOut}>
                {!showTimeOut ? (
                  <span className="fa-solid fa-chevron-right iconWidthCompleted" />
                ) : (
                  <span className="fa-solid fa-chevron-down iconWidthCompleted" />
                )}
                <span className="textB">Earlier</span>{" "}
                <span className="textGray">{plannedTimeOut.length}</span>
              </div>
            )}
            {showTimeOut && (
              <div>
                {plannedTimeOut.map((ele) => {
                  return (
                    <div
                      className="borderTasksArr"
                      key={ele.id}
                      onClick={() => showTasksDetailHandler(ele)}
                    >
                      <div className="fll iconLine">
                        <i
                          className="fa-regular fa-circle "
                          onClick={(event) => {
                            isDoneHandler(ele, event);
                          }}
                        ></i>
                      </div>
                      <div className="fll taskName">
                        <span> {ele.tasks}</span>
                        <br />
                        <span className="textSize">
                          <span>Tasks</span>
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
                          <span className="textRed">
                            <span>.</span>
                            <span className="fa-solid fa-calendar-days" />
                            <span> {ele.timed}</span>
                          </span>
                        </span>
                      </div>
                      <div className={`fll iconLineStar`}>
                        {!ele.isImportant && (
                          <i
                            style={{ color: "blue" }}
                            onClick={(event) => testHandler(ele, event)}
                            className="fa-regular fa-star"
                            data-toggle="tooltip"
                            title="Mark tasks as important!"
                          ></i>
                        )}
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
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Planned;
