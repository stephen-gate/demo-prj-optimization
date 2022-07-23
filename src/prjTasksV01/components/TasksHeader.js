import Card from "../UI/Card";
// import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./TasksHeader.module.css";

// let reevalCounter = 0;

const TasksHeader = (props) => {
  // reevalCounter++;

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
          {/* <div className={classes.task_header_button_div_left}> */}
            <button
              onClick={toggleHandler}
              className={classes.toggle_button}
              type="button">
              {buttonText}
            </button>
          {/* </div> */}
          {/* <div className={classes.task_header_button_div_right}>
            {props.showSpinner && <LoadingSpinner />}
          </div> */}
        </div>
      </Card>
    </section>
  );
};

export default TasksHeader;
