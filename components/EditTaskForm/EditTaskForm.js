import { useState } from "react";
// icons
import { SlClose } from "react-icons/sl";
// services
import { editTaskInDb } from "../../client/mysqlConnection";

function EditTaskForm({ setEditTaskForm, task, pendingTasks, doneTasks }) {
  const [showTitleError, setTitleError] = useState(false);
  const [showDescriptionError, setDescriptionError] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDescriptionError(false);
    // control inputs values and show errors if them are empty
    if (e.target.taskTitle.value === "") {
      setTitleError(true);
      return;
    }
    if (e.target.taskDescription.value === "") {
      setDescriptionError(true);
      return;
    }
    const data = {
      title: e.target.taskTitle.value,
      description: e.target.taskDescription.value,
      status: task.status,
      id: task.id,
    };

    // connection with API to edit the task
    const editTask = await editTaskInDb(data, task.id);
    if (editTask.status === 200) {
      if (task.status === "pending") {
        // update pendingtasks when the task has been updated
        const taskIndex = pendingTasks.findIndex((item) => item.id === task.id);
        if (taskIndex !== -1) {
          pendingTasks[taskIndex].title = data.title;
          pendingTasks[taskIndex].description = data.description;
        }
      } else {
        // update donetasks when the task has been updated
        const taskIndex = doneTasks.findIndex((item) => item.id === task.id);
        if (taskIndex !== -1) {
          doneTasks[taskIndex].title = data.title;
          doneTasks[taskIndex].description = data.description;
        }
      }
      setEditTaskForm(false);
    }
  };
  return (
    <div className="EditTaskForm">
      <form onSubmit={submitForm} className="EditTaskForm__form">
        <div
          className="EditTaskForm__form__close"
          onClick={() => setEditTaskForm(false)}
        >
          <SlClose />
        </div>
        <div className="EditTaskForm__form__item">
          <label className="EditTaskForm__form__item__label" htmlFor="">
            Título
          </label>
          <input
            className="EditTaskForm__form__item__title"
            type="text"
            name="taskTitle"
            placeholder="Escribe el título de la tarea..."
            defaultValue={task.title}
            onChange={() => {
              setTitleError(false);
            }}
          />
          {showTitleError && (
            <p className="error">*Debe rellenar el título de la tarea.</p>
          )}
        </div>
        <div className="EditTaskForm__form__item">
          <label className="EditTaskForm__form__item__label" htmlFor="">
            Descripción
          </label>
          <textarea
            className="EditTaskForm__form__item__description"
            type="text"
            name="taskDescription"
            placeholder="Escribe la descripción de la tarea..."
            rows={8}
            defaultValue={task.description}
            onChange={() => {
              setDescriptionError(false);
            }}
          />
          {showDescriptionError && (
            <p className="error">*Debe rellenar la descripción de la tarea.</p>
          )}
        </div>
        <div className="EditTaskForm__form__buttons">
          <button onClick={() => setEditTaskForm(false)}>Cancelar</button>
          <button type="submit">Editar</button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
