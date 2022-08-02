import { useState, useCallback } from "react";
import TasksAdd from "./components/TasksAdd";
import TasksList from "./components/TasksList";
import TasksSearch from "./components/TasksSearch";
import TasksHeader from "./components/TasksHeader";

const AppTasksV01 = () => {
  const [taskArray, setTaskArray] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [searchLoader, setSearchLoader] = useState(true);
  
  const toggleSearchLoader = () => {
    setSearchLoader( (prevSearchLoader) => {return !prevSearchLoader } );
    console.log('searchLoader: ', searchLoader );
  };

  const addHandler = (taskObj) => {

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
  };

  const deleteHandler = (deleteId) => {
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
  };

  const searchLoader01 = (loadedResults) => {
    setTaskArray(loadedResults);
  };

  const searchLoader02 = useCallback((loadedResults) => {
    setTaskArray(loadedResults);
  }, []);


  return (
    <div>
      <TasksHeader 
      searchLoader={searchLoader}
      onToggleSearchLoader={toggleSearchLoader}
      showSpinner={false}
      />

      <TasksAdd 
      showSpinner={loadingSpinner} 
      searchLoader={searchLoader}
      onAdd={addHandler} />
      
      { searchLoader && <TasksSearch 
      onSearchResultsLoaded={searchLoader01} /> }

      { !searchLoader && <TasksSearch 
      onSearchResultsLoaded={searchLoader02} /> }

    <TasksList 
    taskArray={taskArray} 
    onRemoveItem={deleteHandler} 
    />

    </div>
  );
};

export default AppTasksV01;
