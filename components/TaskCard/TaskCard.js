import { useState } from "react";
// icons
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
// components
import EditTaskForm from "../EditTaskForm/EditTaskForm";
// services
import {
  deleteTaskInDb,
  editStatusTaskInDb,
} from "../../client/mysqlConnection";

function TaskCard({
  task,
  pendingTasks,
  setPendingTasks,
  doneTasks,
  setDoneTasks,
}) {
  const [editTaskForm, setEditTaskForm] = useState(false);

  const handleOnChangeStatus = async () => {
    const data = task;
    if (task.status === "pending") data.status = "done";
    else data.status = "pending";
    // connection with API to edit task status
    const changeStatus = await editStatusTaskInDb(data, task.id);
    if (changeStatus.status === 200) {
      if (task.status === "done") {
        // update pending tasks the status task has been change
        const taskIndex = pendingTasks.findIndex((item) => item.id === task.id);
        if (taskIndex !== -1) {
          pendingTasks.splice(taskIndex, 1);
          doneTasks.unshift(data);
          const resultTask = pendingTasks.filter((item) => item.id !== task.id);
          setPendingTasks(resultTask);
        }
      } else {
        // update donetasks when the status task has been change
        const taskIndex = doneTasks.findIndex((item) => item.id === task.id);
        if (taskIndex !== -1) {
          doneTasks.splice(taskIndex, 1);
          pendingTasks.unshift(data);
          const resultTask = doneTasks.filter((item) => item.id !== task.id);
          setDoneTasks(resultTask);
        }
      }
    }
  };

  const handleEditTask = () => {
    setEditTaskForm(true);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const onDeleteTask = async () => {
    // connection with API to delete the task
    const deleteTask = await deleteTaskInDb(task, task.id);
    if (deleteTask.status === 200) {
      if (task.status === "pending") {
        // update pending tasks when the task has been deleted
        const taskIndex = pendingTasks.findIndex((item) => item.id === task.id);
        if (taskIndex !== -1) {
          pendingTasks.splice(taskIndex, 1);
          const resultTask = pendingTasks.filter((item) => item.id !== task.id);
          setPendingTasks(resultTask);
        }
      } else {
        // update done tasks when the task has been deleted
        const taskIndex = doneTasks.findIndex((item) => item.id === task.id);
        if (taskIndex !== -1) {
          doneTasks.splice(taskIndex, 1);
          const resultTask = doneTasks.filter((item) => item.id !== task.id);
          setDoneTasks(resultTask);
        }
      }
    }
  };

  return (
    <>
      <article
        className={
          task.status === "pending" ? "TaskCard pending" : "TaskCard done"
        }
      >
        <h3 className="TaskCard__title">{task.title}</h3>
        <p className="TaskCard__description">{task.description}</p>
        <div className="TaskCard__status">
          {task.status === "pending" ? (
            <BsFillRecordCircleFill
              onClick={() => handleOnChangeStatus()}
              className="TaskCard__status__pending"
            />
          ) : (
            <AiOutlineCheckCircle
              onClick={() => handleOnChangeStatus()}
              className="TaskCard__status__done"
            />
          )}
        </div>
        <div className="TaskCard__functions">
          <FiEdit
            onClick={() => handleEditTask()}
            className="TaskCard__functions__edit"
          />
          <MdDelete
            className="TaskCard__functions__delete"
            onClick={() => onDeleteTask()}
          />
        </div>
      </article>
      {editTaskForm && (
        <EditTaskForm
          setEditTaskForm={setEditTaskForm}
          task={task}
          pendingTasks={pendingTasks}
          doneTasks={doneTasks}
        />
      )}
    </>
  );
}

export default TaskCard;
