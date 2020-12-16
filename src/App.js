import React from 'react';
import './App.css';
import Header from './components/header';
import TabPanel from './components/TabPanel';
import Tasks from './components/Tasks';
import { TasksProvider } from './contexts/Tasks.context';
import InfoBar from './components/InfoBar';

function App() {
  return (
    <div className="App">
      <Header />
      <TasksProvider>
        <TabPanel />
        <Tasks />
        <InfoBar />
      </TasksProvider>
    </div>
  );
}

export default App;
