import React, { useState } from "react";
// services
import {
  createNewTaskInDb,
  deleteTaskInDb,
  editStatusTaskInDb,
  editTaskInDb,
} from "../../client/mysqlConnection";

export const TasksContext = React.createContext([]);

const TasksProvider = (props) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [filteredPendingTasks, setFilteredPendingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [filteredDoneTasks, setFilteredDoneTasks] = useState([]);

  const createNewTasks = async (task) => {
    // connection with API to create the task
    const createTask = await createNewTaskInDb(task);
    if (createTask.status === 200) {
      // update the list of pending task
      filteredPendingTasks.push(task);
    }
    return createTask;
  };

  const updateTask = async (task) => {
    // connection with API to edit the task
    const editTask = await editTaskInDb(task, task.id);
    if (editTask.status === 200) {
      if (task.status === "pending") {
        // update pendingtasks when the task has been updated
        const taskIndex = filteredPendingTasks.findIndex(
          (item) => item.id === task.id
        );
        if (taskIndex !== -1) {
          filteredPendingTasks[taskIndex].title = task.title;
          filteredPendingTasks[taskIndex].description = task.description;
        }
      } else {
        // update donetasks when the task has been updated
        const taskIndex = filteredDoneTasks.findIndex(
          (item) => item.id === task.id
        );
        if (taskIndex !== -1) {
          filteredDoneTasks[taskIndex].title = task.title;
          filteredDoneTasks[taskIndex].description = task.description;
        }
      }
    }
    return editTask;
  };

  const changeTaskStatus = async (task) => {
    // connection with API to edit task status
    const changeStatus = await editStatusTaskInDb(task, task.id);
    if (changeStatus.status === 200) {
      if (task.status === "done") {
        // update pending tasks the status task has been change
        const taskIndex = filteredPendingTasks.findIndex(
          (item) => item.id === task.id
        );
        if (taskIndex !== -1) {
          filteredPendingTasks.splice(taskIndex, 1);
          filteredDoneTasks.unshift(task);
          const resultTask = filteredPendingTasks.filter(
            (item) => item.id !== task.id
          );
          setPendingTasks(resultTask);
        }
      } else {
        // update donetasks when the status task has been change
        const taskIndex = filteredDoneTasks.findIndex(
          (item) => item.id === task.id
        );
        if (taskIndex !== -1) {
          filteredDoneTasks.splice(taskIndex, 1);
          filteredPendingTasks.unshift(task);
          const resultTask = filteredDoneTasks.filter(
            (item) => item.id !== task.id
          );
          setDoneTasks(resultTask);
        }
      }
    }
    return changeStatus;
  };

  const deleteTask = async (task) => {
    // connection with API to delete the task
    const removeTask = await deleteTaskInDb(task, task.id);
    if (removeTask.status === 200) {
      if (task.status === "pending") {
        // update pending tasks when the task has been deleted
        const taskIndex = filteredPendingTasks.findIndex(
          (item) => item.id === task.id
        );
        if (taskIndex !== -1) {
          filteredPendingTasks.splice(taskIndex, 1);
          const resultTask = filteredPendingTasks.filter(
            (item) => item.id !== task.id
          );
          setFilteredPendingTasks(resultTask);
        }
      } else {
        // update done tasks when the task has been deleted
        const taskIndex = filteredDoneTasks.findIndex(
          (item) => item.id === task.id
        );
        if (taskIndex !== -1) {
          filteredDoneTasks.splice(taskIndex, 1);
          const resultTask = filteredDoneTasks.filter(
            (item) => item.id !== task.id
          );
          setFilteredDoneTasks(resultTask);
        }
      }
    }
    return removeTask;
  };

  return (
    <TasksContext.Provider
      value={{
        pendingTasks: pendingTasks,
        setPendingTasks: setPendingTasks,
        filteredPendingTasks: filteredPendingTasks,
        setFilteredPendingTasks: setFilteredPendingTasks,
        doneTasks: doneTasks,
        setDoneTasks: setDoneTasks,
        filteredDoneTasks: filteredDoneTasks,
        setFilteredDoneTasks: setFilteredDoneTasks,
        createNewTasks: createNewTasks,
        updateTask: updateTask,
        changeTaskStatus: changeTaskStatus,
        deleteTask: deleteTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
