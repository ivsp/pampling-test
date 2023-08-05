// CSS global and pages imports
import "../styles/global.scss";
import "../styles/index.scss";
// CSS components imports
import "../../components/NewTaskForm/NewTaskForm.scss";
import "../../components/EditTaskForm/EditTaskForm.scss";
import "../../components/TaskCard/TaskCard.scss";
import "../../components/LayoutColumn/LayoutColumn.scss";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
