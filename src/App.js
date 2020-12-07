import "./App.css";
import Header from "./components/header";
import TabPanel from "./components/TabPanel";
import Tasks from "./components/Tasks";
import { TasksProvider } from "./contexts/Tasks.context";
import WorkingOnTask from "./components/WorkingOnTask";
function App() {
  return (
    <div className="App">
      <Header />

      <TasksProvider>
        <TabPanel />
        <WorkingOnTask />
        <Tasks />
      </TasksProvider>
    </div>
  );
}

export default App;
