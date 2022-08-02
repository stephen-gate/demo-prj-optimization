import { useState, useCallback, useMemo } from "react";
import TasksAdd from "./components/TasksAdd";
import TasksList from "./components/TasksList";
import TasksSearch from "./components/TasksSearch";

const AppTasksV02 = () => {
  const [taskArray, setTaskArray] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);


  const addHandler = useCallback((taskObj) => {

    setLoadingSpinner(true);
    fetch("https://sgg-tasks-default-rtdb.firebaseio.com/sgg-tasks.json", {
      method: "POST",
      body: JSON.stringify(taskObj),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setTaskArray((prevTasks) => {
          return [
            ...prevTasks,
            {
              id: responseData.name,
              task: taskObj.task,
              priority: taskObj.priority,
            },
          ];
        });
        setLoadingSpinner(false);
      });
  }, []);

  const deleteHandler = useCallback((deleteId) => {
    setLoadingSpinner(true);
    fetch(
      `https://sgg-tasks-default-rtdb.firebaseio.com/sgg-tasks/${deleteId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setLoadingSpinner(false);
        setTaskArray((prevTasks) => {
          return prevTasks.filter((task) => task.id !== deleteId);
        });
      })
      .catch((error) => {
        console.log("ERROR!ON DELETE!: ", error.message);
      });
  }, []);

  const handleSearchResultsLoaded = useCallback((loadedResults) => {
    setTaskArray(loadedResults);
  }, []);

  const tasksList = useMemo(() => {
    return <TasksList taskArray={taskArray} onRemoveItem={deleteHandler} />;
  }, [taskArray, deleteHandler]);

  return (
    <div>
      <TasksAdd showSpinner={loadingSpinner} onAdd={addHandler} />
      <TasksSearch 
      onSearchResultsLoaded={handleSearchResultsLoaded} />
      {tasksList}
    </div>
  );
};

export default AppTasksV02;
