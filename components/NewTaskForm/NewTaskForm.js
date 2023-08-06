import { useState } from "react";
// icons
import { SlClose } from "react-icons/sl";
// services
import { createNewTaskInDb } from "../../client/mysqlConnection";

function NewTaskForm({ setCreateNewTaskForm, pendingTasks, setPendingTasks }) {
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
      status: "pending",
    };
    // connection with API to create the task
    const createTask = await createNewTaskInDb(data);
    if (createTask.status === 200) {
      // update the list of pending task
      pendingTasks.push(data);
      setPendingTasks(pendingTasks);
      setCreateNewTaskForm(false);
    }
  };
  return (
    <div className="NewTaskForm">
      <form onSubmit={submitForm} className="NewTaskForm__form">
        <div
          className="NewTaskForm__form__close"
          onClick={() => setCreateNewTaskForm(false)}
        >
          <SlClose />
        </div>
        <div className="NewTaskForm__form__item">
          <label className="NewTaskForm__form__item__label" htmlFor="">
            Título
          </label>
          <input
            className="NewTaskForm__form__item__title"
            type="text"
            name="taskTitle"
            placeholder="Escribe el título de la tarea..."
            onChange={() => {
              setTitleError(false);
            }}
          />
          {showTitleError && (
            <p className="error">*Debe rellenar el título de la tarea.</p>
          )}
        </div>
        <div className="NewTaskForm__form__item">
          <label className="NewTaskForm__form__item__label" htmlFor="">
            Descripción
          </label>
          <textarea
            className="NewTaskForm__form__item__description"
            type="text"
            name="taskDescription"
            placeholder="Escribe la descripción de la tarea..."
            rows={8}
            onChange={() => {
              setDescriptionError(false);
            }}
          />
          {showDescriptionError && (
            <p className="error">*Debe rellenar la descripción de la tarea.</p>
          )}
        </div>
        <div className="NewTaskForm__form__buttons">
          <button onClick={() => setCreateNewTaskForm(false)}>Cancelar</button>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
}

export default NewTaskForm;
