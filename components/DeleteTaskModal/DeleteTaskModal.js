import { useContext, useState } from "react";
// icons
import { SlClose } from "react-icons/sl";
// context
import { TasksContext } from "@/context/TaskContext";

function DeleteTaskModal({ task, setDeleteTaskModal }) {
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const { deleteTask } = useContext(TasksContext);

  const handleOnDeleteTask = async () => {
    const removeTask = await deleteTask(task);
    if (removeTask.status === 200) {
      setTimeout(() => {
        setShowDeleteMessage(false);
      }, 2000);
    } else {
      setShowDeleteError(true);
    }
  };
  return (
    <div className="DeleteTaskModal">
      <div className="DeleteTaskModal__container">
        <div
          className="DeleteTaskModal__container__close"
          onClick={() => setDeleteTaskModal(false)}
        >
          <SlClose />
        </div>
        <div className="DeleteTaskModal__container__item">
          <p className="DeleteTaskModal__container__item__text">
            ¿Estás seguro de que quieres eliminar esta tarea de la base de
            datos?
          </p>
          {showDeleteError && (
            <p className="error">
              *No se ha podido eliminar la tarea, inténtalo de nuevo.
            </p>
          )}
          {showDeleteMessage && (
            <p className="sucssess">Tarea eliminada de la base de datos.</p>
          )}
        </div>
        <div className="DeleteTaskModal__container__buttons">
          <button onClick={() => setDeleteTaskModal(false)}>Cancelar</button>
          <button onClick={() => handleOnDeleteTask(task)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
