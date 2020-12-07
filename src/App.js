import "./App.css";
import Header from "./components/header";
import TabPanel from "./components/TabPanel";
import Tasks from "./components/Tasks";
import { TasksProvider } from "./contexts/Tasks.context";
function App() {
  return (
    <div className="App">
      <Header />

      <TasksProvider>
        <TabPanel />
        <Tasks />
      </TasksProvider>
    </div>
  );
}

export default App;
