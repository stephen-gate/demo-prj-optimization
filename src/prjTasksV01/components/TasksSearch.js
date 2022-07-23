import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import classes from "./TasksSearch.module.css";

let reevalCounter = 0;

const TasksSearch = React.memo((props) => {
  reevalCounter++;
  const inputRef = useRef();
  const [searchFilter, setSearchFilter] = useState("");
  const { onSearchResultsLoaded } = props;

  const searchChangeHandler = (event) => {
    setSearchFilter(event.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchFilter === inputRef.current.value) {
        //console.log("searchFilter: ", searchFilter);
        const query =
          searchFilter.length === 0
            ? ""
            : `?orderBy="priority"&equalTo="${searchFilter}"`;
        //console.log("query: ", query);
        fetch(
          "https://sgg-tasks-default-rtdb.firebaseio.com/sgg-tasks.json" + query
        )
          .then((response) => response.json())
          .then((responseData) => {
            //console.log('SEARCH: ', responseData );
            const loadedTasks = [];
            for (const key in responseData) {
              loadedTasks.push({
                id: key,
                task: responseData[key].task,
                priority: responseData[key].priority,
              });
            }
            onSearchResultsLoaded(loadedTasks);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchFilter, onSearchResultsLoaded, inputRef]);

  return (
    <section className={classes.task_search_section}>
      <Card>
        <div className={classes.task_header}>
          <div className={classes.task_title}>PRIORITY FILTER</div>
          <div className={classes.task_counter}>{reevalCounter}</div>
        </div>
        <div className={classes.search_control}>
          <input
            ref={inputRef}
            type="text"
            maxLength={1}
            value={searchFilter}
            onChange={searchChangeHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default TasksSearch;
