import Card from "../UI/Card";
import classes from "./TasksHeader.module.css";

const TasksHeader = (props) => {
  
  const toggleHandler = () => {
    props.onToggleSearchLoader();
  };

  let buttonText;
  if (props.searchLoader) {
    buttonText = "Implement useCallback";
  } else {
    buttonText = "Remove useCallback";
  }

  return (
    <section className={classes.task_header_section}>
      <Card>
        <div className={classes.task_header_button_div}>
           <button
              onClick={toggleHandler}
              className={classes.toggle_button}
              type="button">
              {buttonText}
            </button>
        </div>
      </Card>
    </section>
  );
};

export default TasksHeader;
