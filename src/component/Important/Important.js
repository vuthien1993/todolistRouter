import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { importantAction } from "../../Redux/important";
import Submit from "../MyDay/Submit";
import useInput from "../../hook/use-input";

import "./Important.css";
function Important() {
  const dispatch = useDispatch();
  const tasksArr = useSelector((state) => state.important.tasksArr);
  const tasksImportant = tasksArr.filter(
    (ele) => ele.isImportant === true && ele.isDone !== true
  );
  const [id, setId] = useState("");
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
  const showTasksDetail = useSelector(
    (state) => state.important.showTasksDetail
  );
  const showTasksDetailHandler = (ele) => {
    setId(ele.id);
    const idDetail = ele.id;
    const tasksName = ele.tasks;
    const isImportant = ele.isImportant;
    dispatch(importantAction.showDetail({ tasksName, idDetail }));
    dispatch(importantAction.showImportantDetail({ isImportant }));
    console.log(showTasksDetail);
  };
  //ham chon va bo chon hoan thanh cong viec
  const isDoneHandler = (ele, event) => {
    event.stopPropagation();
    const idC = ele.id;
    dispatch(importantAction.complete({ idC }));
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
      <div className="mydayBorder">
        <div className={`fll marginTMyday lineTasks`} id="sizeText">
          <p className="textColorImportant">
            <i className="fa-regular fa-star ipadding"></i>
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
            <span>Sort</span>
          </p>
        </div>
      </div>
      <div className="formSubmitMyday">
        {/* ////////////from submit/////////////// */}
        <Submit
          submitHandler={submitHandler}
          entered={enteredImportant}
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          formIsvalid={formIsvalid}
        />

        {/* /////////ht task list///////// */}
        <div className="tasksArrList">
          {[...tasksImportant].reverse().map((ele) => {
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
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Important;
