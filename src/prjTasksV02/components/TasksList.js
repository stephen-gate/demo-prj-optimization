import Card from "../UI/Card";
import classes from "./TasksList.module.css";

let reevalCounter = 0;

const TasksList = (props) => {
  reevalCounter++;

  return (
    <section className={classes.task_list_section}>
      <Card>
        <div className={classes.task_header}>
          <div className={classes.task_title}>FILTERED TASK LIST</div>
          <div className={classes.task_counter}>{reevalCounter}</div>
        </div>

        <ul>
          {props.taskArray.map((task) => (
            <li
              className={classes.task_list_bar}
              key={task.id}
              onClick={props.onRemoveItem.bind(this, task.id)}
            >
              <span className={classes.task_priority}>{task.priority}</span>
              <span className={classes.task_taskname}>{task.task}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default TasksList;
