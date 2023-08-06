import { useContext, useState } from "react";
// icons
import { SlClose } from "react-icons/sl";
// Contexts
import { TasksContext } from "@/context/TaskContext";

function EditTaskForm({ setEditTaskForm, task }) {
  const [showTitleError, setTitleError] = useState(false);
  const [showDescriptionError, setDescriptionError] = useState(false);
  const { updateTask } = useContext(TasksContext);

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
    const editTask = await updateTask(data);
    if (editTask.status === 200) {
      // close modal
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
