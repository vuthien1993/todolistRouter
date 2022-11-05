import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importantAction } from "../Redux/important";

const useShowTaskDate = (tasksArrToday, tasksArrCompleted) => {
  const timeNow = new Date().getDate();

  const [id, setId] = useState("");

  //chon cac state tu redux
  const displayMyday = useSelector((state) => state.important.displayMyday);
  const displayImportant = useSelector(
    (state) => state.important.displayImportant
  );
  const displayPlanned = useSelector((state) => state.important.displayPlanned);
  const displayTasks = useSelector((state) => state.important.displayTasks);
  const showCompleted = useSelector((state) => state.important.showCompleted);

  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const idDetail = useSelector((state) => state.important.idTasks);
  const showPlanned = useSelector((state) => state.important.showPlanned);
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
  const dispatch = useDispatch();
  const showPlannedHandler = () => {
    dispatch(importantAction.showPlanned());
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
  //chon viec quan trong
  const testHandler = (ele, event) => {
    event.stopPropagation();
    const idI = ele.id;
    dispatch(importantAction.important({ idI }));
    if (ele.id === id) {
      const isImportant = !ele.isImportant;
      dispatch(importantAction.showImportantDetail({ isImportant }));
    }
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
  const showCompletedHandler = () => {
    dispatch(importantAction.showCompleted());
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
  ////////////////khai bao biến tối ưu code jsx ////////////
  const datePlannedToday = (
    <span className="textBlue">
      <span className="fa-solid fa-calendar-days" />
      <span>Today</span>
    </span>
  );
  const datePlannedTomorow = (
    <span className="textBlue">
      <span className="fa-solid fa-calendar-days" />
      <span>Tomorow</span>
    </span>
  );

  const iconMyday = (
    <span>
      <span className="fa-regular fa-sun" />
      My Day
    </span>
  );

  //khai bao bien tasks hom nay
  const tasksToday = tasksArrToday.length > 0 && (
    <div className="today" onClick={showPlannedHandler}>
      {!showPlanned ? (
        <span className="fa-solid fa-chevron-right iconWidthCompleted" />
      ) : (
        <span className="fa-solid fa-chevron-down iconWidthCompleted" />
      )}
      <span className="textB">Today</span>{" "}
      <span className="textGray">{tasksArrToday.length}</span>
    </div>
  );
  const displayTasksToday = (
    <div>
      {[...tasksArrToday].reverse().map((ele) => {
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
              <span
                className={`${
                  !ele.isMyday &&
                  displayStep(ele).stepDetail.length === 0 &&
                  !ele.isPlanned &&
                  "tasksLine"
                }`}
              >
                {ele.tasks}
              </span>
              <br />
              <span className="mydayFontsize">
                {ele.isPlanned &&
                  !ele.timeOut &&
                  ele.time === timeNow &&
                  datePlannedToday}
                {ele.isPlanned &&
                  !ele.timeOut &&
                  ele.time === timeNow + 1 &&
                  datePlannedTomorow}
                {ele.isPlanned && !ele.timeOut && ele.time > timeNow + 1 && (
                  <span className="later">
                    <span className="fa-solid fa-calendar-days" />
                    <span>{ele.timed}</span>
                  </span>
                )}
                {ele.isImportant && displayImportant && <span>Tasks</span>}
                {ele.isMyday && displayMyday && <span>Tasks</span>}
                {ele.isMyday && displayTasks && iconMyday}
                {ele.timeOut && (
                  <span className="textRed">
                    <span className="fa-solid fa-calendar-days" />
                    <span> {ele.timed}</span>
                  </span>
                )}
                {displayStep(ele).stepDetail.length !== 0 &&
                  ele.isMyday === true && (
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
                {displayStep(ele).stepDetail.length !== 0 &&
                  ele.isMyday === false && (
                    <span>
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
  );
  //khai bao bien ht viec da hoan thanh
  const tasksCompleted = tasksArrCompleted.length > 0 && (
    <div onClick={showCompletedHandler} className="completed">
      {!showCompleted ? (
        <span className="fa-solid fa-chevron-right iconWidthCompleted" />
      ) : (
        <span className="fa-solid fa-chevron-down iconWidthCompleted" />
      )}
      <span>Completed</span> <span>{tasksArrCompleted.length}</span>
    </div>
  );

  const displayTasksCompleted = showCompleted && (
    <div>
      {tasksArrCompleted.map((ele) => {
        return (
          <div
            className="borderTasksArr"
            key={ele.id}
            onClick={() => showTasksDetailHandler(ele)}
          >
            <div className="fll iconLine">
              <i
                style={{ color: "blue" }}
                className="fa-solid fa-circle-check"
                onClick={(event) => isDoneHandler(ele, event)}
              ></i>
            </div>
            <div className="fll taskName">
              <span className="checked"> {ele.tasks}</span>
              <br />
              <span className="mydayFontsize">
                {ele.isPlanned &&
                  !ele.timeOut &&
                  ele.time === timeNow &&
                  datePlannedToday}
                {ele.isPlanned &&
                  !ele.timeOut &&
                  ele.time === timeNow + 1 &&
                  datePlannedTomorow}
                {ele.isPlanned && !ele.timeOut && ele.time > timeNow + 1 && (
                  <span className="later">
                    <span className="fa-solid fa-calendar-days" />
                    <span>{ele.timed}</span>
                  </span>
                )}
                {ele.isImportant && displayImportant && <span>Tasks</span>}
                {ele.isMyday && displayMyday && <span>Tasks</span>}
                {ele.isMyday && displayTasks && iconMyday}
                {ele.timeOut && (
                  <span className="textRed">
                    <span className="fa-solid fa-calendar-days" />
                    <span> {ele.timed}</span>
                  </span>
                )}
                {displayStep(ele).stepDetail.length !== 0 &&
                  ele.isMyday === true && (
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
                {displayStep(ele).stepDetail.length !== 0 &&
                  ele.isMyday === false && (
                    <span>
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
  );
  return {
    tasksToday,
    displayTasksToday,
    tasksCompleted,
    displayTasksCompleted,
  };
};
export default useShowTaskDate;
