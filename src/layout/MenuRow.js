import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import useInput from "../hook/use-input";

import { importantAction } from "../Redux/important";
import "./MenuRow.css";
import { nextStepAction } from "../Redux/nextStep";
import TaskDetail from "./TaskDetail";
function MenuRow(props) {
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
    (ele) => ele.isPlanned === true && ele.isDone !== true
  );
  const [display, setDisplay] = useState(true);
  const displayMyday = useSelector((state) => state.important.displayMyday);
  const displayImportant = useSelector(
    (state) => state.important.displayImportant
  );
  const displayPlanned = useSelector((state) => state.important.displayPlanned);
  const displayTasks = useSelector((state) => state.important.displayTasks);

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
    setDisplay((pre) => !pre);
  };

  const dispatch = useDispatch();
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
  const classShowDetail = showTasksDetail ? "main-content1" : "main-content";
  return (
    <React.Fragment>
      <div className="borderNavRow">
        <div className="fll leftColumn">
          <div>
            <div className="siderbar">
              <i className="fa-solid fa-bars" onClick={displayHandler}></i>
            </div>
            {display && (
              <div className="siderbarContent">
                <NavLink to="/tasks/myday">
                  <div
                    onClick={mydayClickHandler}
                    className={`${
                      displayMyday ? "siderbarItemActive" : "siderbarItem"
                    }`}
                  >
                    <div className="fll widthContent">
                      <i className="fa-regular fa-sun"></i> <span>My Day</span>
                    </div>
                    <div className="fll lineNumber">
                      {mydayTasksArr.length !== 0 && (
                        <span>{mydayTasksArr.length}</span>
                      )}
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/tasks/important">
                  <div
                    onClick={impotantClickHandler}
                    className={` ${
                      displayImportant ? "siderbarItemActive" : "siderbarItem"
                    }`}
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
                  </div>
                </NavLink>
                <NavLink to="/tasks/planned">
                  <div
                    onClick={plannedClickHandler}
                    className={` ${
                      displayPlanned ? "siderbarItemActive" : "siderbarItem"
                    }`}
                  >
                    <div className="fll widthContent">
                      <i className="fa-solid fa-calendar-days"></i>
                      <span>Planned</span>
                    </div>
                    <div className="fll lineNumber">
                      {plannedTasksArr.length !== 0 && (
                        <span>{plannedTasksArr.length}</span>
                      )}
                    </div>
                  </div>
                </NavLink>

                <NavLink to="/tasks/inbox">
                  <div
                    onClick={taskClickHandler}
                    className={` ${
                      displayTasks ? "siderbarItemActive" : "siderbarItem"
                    }`}
                  >
                    <div className="fll widthContent">
                      <i className="fa-solid fa-house"></i>
                      <span>Tasks</span>
                    </div>
                    <div className="fll lineNumber">
                      {tasksArr.length !== 0 && <span>{tasksArr.length}</span>}
                    </div>
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className={`fll ${classShowDetail}`}>{props.children}</div>
        {showTasksDetail && (
          <TaskDetail
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
        )}
      </div>
    </React.Fragment>
  );
}

export default MenuRow;
