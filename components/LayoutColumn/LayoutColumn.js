// icons
import { GrAddCircle } from "react-icons/gr";

function LayoutColumn({ status, children, setCreateNewTaskForm }) {
  return (
    <>
      <section className="LayoutColumn">
        <div className="LayoutColumn__status">
          <h2 className="LayoutColumn__status__title">{status}</h2>
          {status === "Pending" && (
            <p onClick={() => setCreateNewTaskForm(true)}>
              <GrAddCircle
                color="#fff"
                className="LayoutColumn__status__addButton"
              />
            </p>
          )}
        </div>
        {children}
      </section>
    </>
  );
}

export default LayoutColumn;
