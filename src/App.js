import "./App.css";
import Header from "./components/header";
import TabPanel from "./components/TabPanel";
import Tasks from "./components/Tasks";
function App() {
  return (
    <div className="App">
      <Header />
      <TabPanel />
      <Tasks />
    </div>
  );
}

export default App;
