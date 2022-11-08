import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import moment from "moment/moment";
import useWrapper from "../../hook/use-wrapper";
function DisplayDueDate() {
  const dispatch = useDispatch();
  const { timeNow, monthNow } = useWrapper();
  const [id, setId] = useState("");
  const idDetail = useSelector((state) => state.important.idTasks);
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
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const plannedTasksArrTomorow = tasksArr.filter(
    (ele) =>
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time === timeNow + 1 &&
      ele.month === monthNow
  );
  const plannedTasksArrWeek = tasksArr.filter(
    (ele) =>
      ele.isDone !== true &&
      ele.timeOut === false &&
      ele.time < timeNow + 7 &&
      ele.time >= timeNow + 2
  );
  const plannedTasksArrLater = tasksArr.filter(
    (ele) =>
      ele.isDone !== true && ele.timeOut === false && ele.time >= timeNow + 7
  );
  const plannedTimeOut = tasksArr.filter(
    (ele) => ele.timeOut === true && ele.isDone !== true
  );
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
    <>
      {/* ////////////tomorow/////////////////// */}
      {plannedTasksArrTomorow.length > 0 && (
        <div className="today" onClick={showPlannedTomorowHandler}>
          {!showPlannedTomorow ? (
            <span className="fa-solid fa-chevron-right iconWidthCompleted" />
          ) : (
            <span className="fa-solid fa-chevron-down iconWidthCompleted" />
          )}
          <span className="textB">Tomorow</span>{" "}
          <span className="textGray">{plannedTasksArrTomorow.length}</span>
        </div>
      )}
      {showPlannedTomorow && (
        <div>
          {[...plannedTasksArrTomorow].reverse().map((ele) => {
            return (
              <div
                className={`${
                  ele.id === idDetail
                    ? "borderTasksArrActive"
                    : "borderTasksArr"
                }`}
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
                  <span className="fontSize14"> {ele.tasks}</span>
                  <br />
                  <span className="textGray fontSize12 ">
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
                    <span className="textGray fonSize12">
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
                className={`${
                  ele.id === idDetail
                    ? "borderTasksArrActive"
                    : "borderTasksArr"
                }`}
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
                  <span className="fontSize14"> {ele.tasks}</span>
                  <br />
                  <span className="textGray fontSize12 ">
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
                    <span className="later fontSize12">
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
                className={`${
                  ele.id === idDetail
                    ? "borderTasksArrActive"
                    : "borderTasksArr"
                }`}
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
                  <span className="fontSize14"> {ele.tasks}</span>
                  <br />
                  <span className="fontSize12 textGray">
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
                className={`${
                  ele.id === idDetail
                    ? "borderTasksArrActive"
                    : "borderTasksArr"
                }`}
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
                  <span className="fontSize14"> {ele.tasks}</span>
                  <br />
                  <span className="fontSize12 textGray">
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
    </>
  );
}

export default DisplayDueDate;
