import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
// icons
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
// Components
import LayoutColumn from "../../components/LayoutColumn/LayoutColumn";
import TaskCard from "../../components/TaskCard/TaskCard";
import NewTaskForm from "../../components/NewTaskForm/NewTaskForm";
// Seervices
import { getAllTaskFromDb } from "../../client/mysqlConnection";
// Contexts
import { TasksContext } from "@/context/TaskContext";
// Functions
import { removeAccentsAndLowerCase } from "../../functions/functions";

// GetStaticProps from server (SSR)
export async function getStaticProps() {
  const allTask = await getAllTaskFromDb();
  const pendingTasks = allTask?.filter((task) => task.status === "pending");
  const doneTasks = allTask?.filter((task) => task.status === "done");
  return {
    props: {
      tasks: {
        pending: pendingTasks ?? [],
        done: doneTasks ?? [],
      },
    },
  };
}
export default function Home({ tasks }) {
  const [showCreateNewTaskForm, setCreateNewTaskForm] = useState(false);
  const {
    pendingTasks,
    setPendingTasks,
    filteredPendingTasks,
    setFilteredPendingTasks,
    doneTasks,
    setDoneTasks,
    filteredDoneTasks,
    setFilteredDoneTasks,
  } = useContext(TasksContext);
  // Function to filter task by input
  const handleOnFilterTasks = (e) => {
    const text = removeAccentsAndLowerCase(e.target.value);
    const filterPendingTask = pendingTasks.filter(
      (task) =>
        removeAccentsAndLowerCase(task.title).includes(text) ||
        removeAccentsAndLowerCase(task.description).includes(text)
    );
    setFilteredPendingTasks(filterPendingTask);
    const filterDoneTask = doneTasks.filter(
      (task) =>
        removeAccentsAndLowerCase(task.title).includes(text) ||
        removeAccentsAndLowerCase(task.description).includes(text)
    );
    setFilteredDoneTasks(filterDoneTask);
  };

  useEffect(() => {
    //  update context variables with server data
    setFilteredPendingTasks(tasks.pending ?? []);
    setPendingTasks(tasks.pending ?? []);
    setFilteredDoneTasks(tasks.done ?? []);
    setDoneTasks(tasks.done ?? []);
  }, []);

  return (
    <>
      <Head>
        <title>To do list</title>
      </Head>
      <main className="MainContainer">
        <h1>To DO LIST</h1>
        <div className="SearchInput">
          <input
            className="SearchInput__input"
            type="text"
            placeholder="Escribe tu búsqueda..."
            onChange={(e) => handleOnFilterTasks(e)}
          />
          <CiSearch />
        </div>
        <section className="TaskColumns">
          <LayoutColumn
            status={"Pending"}
            setCreateNewTaskForm={setCreateNewTaskForm}
          >
            <div className="TaskColumns__list">
              {filteredPendingTasks.length !== 0 &&
                filteredPendingTasks.map((task, i) => (
                  <TaskCard key={i} task={task} />
                ))}
            </div>
          </LayoutColumn>
          <LayoutColumn status={"Done"}>
            <div className="TaskColumns__list">
              {filteredDoneTasks.length !== 0 &&
                filteredDoneTasks.map((task, i) => (
                  <TaskCard key={i} task={task} />
                ))}
            </div>
          </LayoutColumn>
        </section>
        <div className="Footer">
          <p className="Footer__title">Iván Sánchez Pérez</p>
          <div className="Footer__icons">
            <Link href={"https://github.com/ivsp"}>
              <FaGithub />
            </Link>
            <Link href={"https://www.linkedin.com/in/ivansperez/"}>
              <FaLinkedin />
            </Link>
          </div>
        </div>
        {showCreateNewTaskForm && (
          <NewTaskForm setCreateNewTaskForm={setCreateNewTaskForm} />
        )}
      </main>
    </>
  );
}
