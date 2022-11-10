import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import useInput from "../hook/use-input";

import { importantAction } from "../Redux/important";
import "./MenuRow.css";
import { nextStepAction } from "../Redux/nextStep";
import TaskDetail from "./TaskDetail";
import useWrapper from "../hook/use-wrapper";
function MenuRow(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (window.innerWidth < 910) {
        dispatch(nextStepAction.displayMobile());
      }
      dispatch(nextStepAction.setWidth({ width }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(nextStepAction.displayMobile());
          dispatch(importantAction.hidenDetail());
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const { timeNow, monthNow } = useWrapper();
  const width = useSelector((state) => state.nextStep.width);
  const display = useSelector((state) => state.nextStep.display);
  const idDetail = useSelector((state) => state.important.idTasks);
  const isDone = useSelector((state) => state.important.isDone);
  const isMyday = useSelector((state) => state.important.isMyday);
  const isImportant = useSelector((state) => state.important.isImportant);
  const tasksArrTotal = useSelector((state) => state.important.tasksArr);
  const tasksArr = tasksArrTotal.filter((ele) => ele.isDone !== true);
  const tasksImportant = tasksArrTotal.filter(
    (ele) => ele.isImportant === true && ele.isDone !== true
  );
  const mydayTasksArr = tasksArrTotal.filter(
    (ele) => ele.isMyday === true && ele.isDone !== true
  );
  const plannedTasksArr = tasksArrTotal.filter(
    (ele) =>
      ele.isPlanned === true && ele.isDone !== true && ele.time === timeNow
  );
  const plannedTasksArrTomorow = tasksArr.filter(
    (ele) =>
      ele.timeOut === false &&
      ele.time === timeNow + 1 &&
      ele.month === monthNow
  );
  const plannedTasksArrWeek = tasksArr.filter(
    (ele) =>
      ele.timeOut === false && ele.time < timeNow + 7 && ele.time >= timeNow + 2
  );
  const plannedTasksArrLater = tasksArr.filter(
    (ele) => ele.timeOut === false && ele.time >= timeNow + 7
  );
  const plannedTimeOut = tasksArr.filter((ele) => ele.timeOut === true);
  useEffect(() => {
    dispatch(importantAction.checkTimeOut({ timeNow, monthNow }));
  }, [timeNow, monthNow]);

  const mydayClickHandler = () => {
    dispatch(importantAction.hidenDetail());
    dispatch(importantAction.displayMyday());
  };
  const impotantClickHandler = () => {
    dispatch(importantAction.hidenDetail());
    dispatch(importantAction.displayImportant());
  };
  const plannedClickHandler = () => {
    dispatch(importantAction.hidenDetail());
    dispatch(importantAction.displayPlanned());
  };

  const taskClickHandler = () => {
    dispatch(importantAction.hidenDetail());
    dispatch(importantAction.displayTasks());
  };
  const displayHandler = () => {
    dispatch(nextStepAction.displayHandler());
  };

  const tasks = useSelector((state) => state.important.tasksName);
  console.log(tasks);
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const hiddenTasksDetail = () => {
    dispatch(importantAction.hidenDetail());
  };

  const isDoneHandler = (event) => {
    event.stopPropagation();
    const idC = idDetail;
    dispatch(importantAction.complete({ idC }));
    dispatch(importantAction.showCompletedDetail());
  };
  //hàm tích chọn, bỏ chọn quan trọng khi mở detail
  const importantDetail = () => {
    dispatch(importantAction.importantDetail());
  };
  const deleteTaskHandler = () => {
    const id = idDetail;
    dispatch(importantAction.deleteTask({ id }));
    dispatch(nextStepAction.deleteStepDetail({ id }));
    dispatch(importantAction.hidenDetail());
  };
  // xu ly them step detail task  và add xóa my day//////////////////////////////////////
  const nextStepArr = useSelector((state) => state.nextStep.nextStepArr);
  const stepDetail = nextStepArr.filter((ele) => ele.idDetail === idDetail);
  console.log(stepDetail);
  const {
    value: enteredStep,
    valueChangeHandler: changeHandler,
    reset: resetStepInput,
  } = useInput((value) => value.trim() !== "");

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    let id = randomIntFromInterval(1, 999);
    let stepItem = {
      idDetail,
      isDone: false,
      id: id,
      nameStep: enteredStep,
    };
    dispatch(nextStepAction.addStep({ stepItem }));
    resetStepInput();
  };

  //ham xoa step

  const deleteStepHandler = (ele) => {
    const id = ele.id;
    dispatch(nextStepAction.deleteStep({ id }));
  };

  //ham chon step da hoan thanh
  const completedHandler = (ele) => {
    const idC = ele.id;
    dispatch(nextStepAction.completed({ idC }));
  };
  //ham add xóa my day
  const isMydayHandler = () => {
    dispatch(importantAction.isMyday({ isMyday, idDetail }));
  };

  return (
    <React.Fragment>
      <div className="borderNavRow">
        {display && (
          <div className="fll leftColumn" ref={width < 910 ? wrapperRef : null}>
            <div>
              <div className="siderbar">
                <i className="fa-solid fa-bars" onClick={displayHandler}></i>
              </div>
              <div className="siderbarContent">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "siderbarItemActive" : "siderbarItem"
                  }
                  onClick={mydayClickHandler}
                  to="myday"
                >
                  <div className="fll widthContent">
                    <svg
                      className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
                      fill="currentColor"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      focusable="false"
                    >
                      <path
                        d="M10 2c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 12a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm7.5-2.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM10 16c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm-6.5-5.5a.5.5 0 000-1H2.46a.5.5 0 000 1H3.5zm.65-6.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 11.7a.5.5 0 01-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm11-11.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 11.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>My Day</span>
                  </div>
                  <div className="fll lineNumber">
                    {mydayTasksArr.length !== 0 && (
                      <span>{mydayTasksArr.length}</span>
                    )}
                  </div>
                </NavLink>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "siderbarItemActive" : "siderbarItem"
                  }
                  onClick={impotantClickHandler}
                  to="important"
                >
                  <div className="fll widthContent">
                    <i className="fa-regular fa-star"></i>{" "}
                    <span>Important</span>
                  </div>
                  <div className="fll lineNumber">
                    {tasksImportant.length !== 0 && (
                      <span>{tasksImportant.length}</span>
                    )}
                  </div>
                </NavLink>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "siderbarItemActive" : "siderbarItem"
                  }
                  onClick={plannedClickHandler}
                  to="planned"
                >
                  <div className="fll widthContent">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Planned</span>
                  </div>
                  <div className="fll lineNumber">
                    {plannedTasksArr.length +
                      plannedTasksArrTomorow.length +
                      plannedTasksArrWeek.length +
                      plannedTasksArrLater.length +
                      plannedTimeOut.length !==
                      0 && (
                      <span>
                        {plannedTasksArr.length +
                          plannedTasksArrTomorow.length +
                          plannedTasksArrWeek.length +
                          plannedTasksArrLater.length +
                          plannedTimeOut.length}
                      </span>
                    )}
                  </div>
                </NavLink>

                <NavLink
                  className={(navData) =>
                    navData.isActive ? "siderbarItemActive" : "siderbarItem"
                  }
                  onClick={taskClickHandler}
                  to="inbox"
                >
                  <div className="fll widthContent">
                    <i className="fa-solid fa-house"></i>
                    <span>Tasks</span>
                  </div>
                  <div className="fll lineNumber">
                    {tasksArr.length !== 0 && <span>{tasksArr.length}</span>}
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        <div
          className={`fll  ${
            display
              ? showTasksDetail
                ? "main-content1 dark"
                : "main-content dark"
              : showTasksDetail
              ? "main-content3 "
              : " main-content2 "
          } 
          `}
        >
          <Outlet />
        </div>
        {showTasksDetail && (
          <React.Fragment>
            <TaskDetail
              width={width}
              wrapperRef={wrapperRef}
              importantDetail={importantDetail}
              isMyday={isMyday}
              isMydayHandler={isMydayHandler}
              isDone={isDone}
              isDoneHandler={isDoneHandler}
              tasks={tasks}
              isImportant={isImportant}
              stepDetail={stepDetail}
              enteredStep={enteredStep}
              completedHandler={completedHandler}
              deleteStepHandler={deleteStepHandler}
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              hiddenTasksDetail={hiddenTasksDetail}
              deleteTaskHandler={deleteTaskHandler}
            />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default MenuRow;
