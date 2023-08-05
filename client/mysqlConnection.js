import axios from "axios";

// Function to get all tasks from DB
const getAllTaskFromDb = async () => {
  try {
    const response = await axios.get("http://localhost:8888/api/tasks/getAll");
    if (response.status !== 200) {
      throw new Error(`Error on get tasks ${request.status}`);
    }
    const { data } = response;
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Function to create a new task in DB
const createNewTaskInDb = async (input) => {
  try {
    const response = await axios.post(
      "http://localhost:8888/api/tasks/createNewTask",
      input
    );
    if (response.status !== 200) {
      throw new Error(`Error on create new task ${request.status}`);
    }
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Function to edit a task in DB
const editTaskInDb = async (task, id) => {
  try {
    const response = await axios.put(
      `http://localhost:8888/api/tasks/${id}/editTask`,
      task
    );
    if (response.status !== 200) {
      throw new Error(`Error on edit task ${request.status}`);
    }
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Function to edit task status in DB
const editStatusTaskInDb = async (task, id) => {
  try {
    console.log(task);
    const response = await axios.put(
      `http://localhost:8888/api/tasks/${id}/editStatus`,
      task
    );
    if (response.status !== 200) {
      throw new Error(`Error on edit task ${request.status}`);
    }
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Function to delete one task from DB
const deleteTaskInDb = async (task, id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8888/api/tasks/deleteTask?id=${id}`,
      task
    );
    if (response.status !== 200) {
      throw new Error(`Error on delete task ${request.status}`);
    }
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllTaskFromDb,
  createNewTaskInDb,
  editTaskInDb,
  editStatusTaskInDb,
  deleteTaskInDb,
};
