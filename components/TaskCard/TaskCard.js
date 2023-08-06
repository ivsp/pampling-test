import { useContext, useState } from "react";
// icons
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
// components
import EditTaskForm from "../EditTaskForm/EditTaskForm";
// context
import { TasksContext } from "@/context/TaskContext";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

function TaskCard({ task }) {
  const [editTaskForm, setEditTaskForm] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const { deleteTask, changeTaskStatus } = useContext(TasksContext);

  const handleOnChangeStatus = async () => {
    const data = task;
    if (task.status === "pending") data.status = "done";
    else data.status = "pending";
    // connection with API to edit task status
    // const changeStatus = await editStatusTaskInDb(data, task.id);
    const changeStatus = await changeTaskStatus(data);
    if (changeStatus.status === 200) {
      // console.log("estado cambiado correctamente");
    }
  };

  const handleEditTask = () => {
    setEditTaskForm(true);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteTask = () => {
    setDeleteTaskModal(true);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
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
            onClick={() => handleDeleteTask(true)}
          />
        </div>
      </article>
      {editTaskForm && (
        <EditTaskForm setEditTaskForm={setEditTaskForm} task={task} />
      )}
      {deleteTaskModal && (
        <DeleteTaskModal setDeleteTaskModal={setDeleteTaskModal} task={task} />
      )}
    </>
  );
}

export default TaskCard;
