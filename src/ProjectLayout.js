import classes from "./ProjectLayout.module.css";
import AppTasksV01 from "./prjTasksV01/AppTasksV01";
import AppTasksV02 from "./prjTasksV02/AppTasksV02";

const ProjectLayout = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container_v2}>
        <div className={classes.container_prj}>
          <div className={classes.container_prj_backplate}>
            <AppTasksV01 />
          </div>
        </div>

        <div className={classes.container_prj}>
          <div className={classes.container_prj_backplate}>
            <AppTasksV02 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
