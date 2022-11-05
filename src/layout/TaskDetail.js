import React from "react";
import "./MenuRow.css";
function TaskDetail(props) {
  return (
    <>
      <div className="tasksDetail fll">
        <div className="tasksDetailX row">
          <div className="divR"></div>
          <div className="col-md-10">
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
          <div className="col-md-2">
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
              <div className="iconDetail">
                <i className="fa-regular fa-bell"></i>
                <span>Remind me</span>
              </div>
              <div className="iconDetail">
                <i className="fa-solid fa-calendar-days" />
                <span>Add due date</span>
              </div>
              <div className="iconDetail">
                <i className="fa-solid fa-repeat"></i>
                <span>Repeat</span>
              </div>
              <div className="iconDetail">
                <i className="fa-regular fa-paper-plane"></i>{" "}
                <span>Pick a category</span>
              </div>
              <div className="iconDetail">
                <i className="fa-solid fa-paperclip" />
                <span>
                  <input
                    className="inputFile"
                    type="file"
                    id="inputFile"
                    tabIndex="-1"
                  />
                  <label htmlFor="inputFile">Add file</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="deleteTasks">
          <i
            className="fa-regular fa-square-caret-right"
            onClick={props.hiddenTasksDetail}
            data-toggle="tooltip"
            title="Hide detail view!"
          />
          <span>Create on mon</span>
          <i
            data-toggle="tooltip"
            title="Delete tasks!"
            data-placement="top"
            className="fa-regular fa-trash-can"
            onClick={props.deleteTaskHandler}
          ></i>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;
