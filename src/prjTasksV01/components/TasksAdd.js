import React, { useState } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./TasksAdd.module.css";

let reevalCounter = 0;

const TasksAdd = React.memo((props) => {
  reevalCounter++;

  const [enteredTask, setEnteredTask] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAdd({ task: enteredTask, priority: enteredPriority });
  };

  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const priorityChangeHandler = (event) => {
    setEnteredPriority(event.target.value);
  };

  return (
    <section className={classes.task_add_section}>
      <Card>
        <div className={classes.task_header}>
          <div className={classes.task_title}>ADD TASK FORM</div>
          <div className={classes.task_counter}>{reevalCounter}</div>
        </div>

        <form onSubmit={submitHandler}>
          <div className={classes.task_add_control}>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              maxLength={30}
              value={enteredTask}
              onChange={taskChangeHandler}
            />
          </div>

          <div className={classes.task_add_control}>
            <label htmlFor="priority">Priority</label>
            <input
              maxLength={1}
              type="text"
              id="priority"
              value={enteredPriority}
              onChange={priorityChangeHandler}
            />
          </div>

          <div className={classes.button_layout}>
            <div className={classes.button_layout_left}></div>
            <div className={classes.button_layout_center}>
              <button className={classes.add_button} type="submit">
                ADD TASK
              </button>
            </div>
            <div className={classes.button_layout_right}>
              {props.showSpinner && <LoadingSpinner />}
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default TasksAdd;
