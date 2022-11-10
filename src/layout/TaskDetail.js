import React from "react";
import "./MenuRow.css";
function TaskDetail(props) {
  return (
    <>
      <div
        className="tasksDetail fll"
        ref={props.width < 910 ? props.wrapperRef : null}
      >
        <div className="tasksDetailX">
          <div className="divR"></div>
          <div>
            <div className="fll nameDetail">
              {props.isDone ? (
                <i
                  style={{ color: "blue" }}
                  className="fa-solid fa-circle-check"
                  onClick={props.isDoneHandler}
                />
              ) : (
                <i
                  className="fa-regular fa-circle "
                  onClick={props.isDoneHandler}
                />
              )}
              <span className={`${props.isDone && "checked"}`}>
                {" "}
                {props.tasks}
              </span>
            </div>
            <div className="fll startDetail">
              {!props.isImportant && (
                <i
                  onClick={props.importantDetail}
                  style={{ color: "blue" }}
                  className="fa-regular fa-star"
                  data-toggle="tooltip"
                  title="Mark tasks as important!"
                ></i>
              )}
              {props.isImportant && (
                <i
                  onClick={props.importantDetail}
                  style={{ color: "blue" }}
                  className="fa-solid fa-star"
                  data-toggle="tooltip"
                  title="Remove importance!"
                ></i>
              )}
            </div>
          </div>
        </div>
        {/* //////////////xu ly add step////////////////// */}
        <div className="tasksDetailInput textGray">
          {props.stepDetail.map((ele) => {
            return (
              <div key={ele.id} className="addStep">
                <div className="borderStep fll">
                  {ele.isDone ? (
                    <i
                      style={{ color: "blue" }}
                      className="fa-solid fa-circle-check"
                      onClick={() => props.completedHandler(ele)}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-circle "
                      onClick={() => props.completedHandler(ele)}
                    />
                  )}
                </div>
                <div className="contentStep fll">
                  <div className="fll nameStep">
                    <span className={`${ele.isDone ? "checked" : ""}`}>
                      {ele.nameStep}
                    </span>
                  </div>
                  <div className="fll deleteStep">
                    <span onClick={() => props.deleteStepHandler(ele)}> ×</span>
                  </div>
                </div>
              </div>
            );
          })}
          <form className="marginLDetail" onSubmit={props.submitHandler}>
            <i className="fa-regular fa-circle "></i>
            <input
              placeholder="Add step"
              onChange={props.changeHandler}
              value={props.enteredStep}
            />
            {props.enteredStep !== "" && <button>Add</button>}
          </form>
          <div>
            <div className="hoverdiv">
              <div className="addtomyday">
                {props.isMyday ? (
                  <span>
                    <div className="fll addedMyday">
                      <i className="fa-regular fa-sun" />
                      <span>Added to my day</span>
                    </div>
                    <div className="fll closeMyday">
                      <span onClick={props.isMydayHandler}>×</span>
                    </div>
                  </span>
                ) : (
                  <div onClick={props.isMydayHandler}>
                    <i className="fa-regular fa-sun" />
                    <span>Add to my day</span>
                  </div>
                )}
              </div>
              <div className="iconDetail borderBottom">
                <i className="fa-regular fa-bell"></i>
                <span>Remind me</span>
              </div>
              <div className="iconDetail borderBottom">
                <i className="fa-solid fa-calendar-days" />
                <span>Add due date</span>
              </div>
              <div className="iconDetail">
                <i className="fa-solid fa-repeat"></i>
                <span>Repeat</span>
              </div>
              <div className="iconDetail marginCategory">
                <i className="fa-regular fa-paper-plane"></i>{" "}
                <span>Pick a category</span>
              </div>
              <div className="iconDetail">
                <i className="fa-solid fa-paperclip" />
                <span>
                  <input type="file" id="inputFile" />
                  <label htmlFor="inputFile">Add file</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="deleteTasks">
          <div>
            <svg
              onClick={props.hiddenTasksDetail}
              className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0"
              fill="currentColor"
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.18 10.5l-1 .87a.5.5 0 10.66.76l2-1.75a.5.5 0 000-.76l-2-1.75a.5.5 0 10-.66.76l1 .87H5.5a.5.5 0 000 1h3.68zM16 16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v8c0 1.1.9 2 2 2h12zm1-2a1 1 0 01-1 1h-3V5h3a1 1 0 011 1v8zm-5-9v10H4a1 1 0 01-1-1V6a1 1 0 011-1h8z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div>
            <span>Create on mon</span>
          </div>
          <div>
            <i
              data-toggle="tooltip"
              title="Delete tasks!"
              data-placement="top"
              className="fa-regular fa-trash-can"
              onClick={props.deleteTaskHandler}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;
