import React from 'react';
import './App.css';
import Header from './components/header';
import TabPanel from './components/TabPanel';
import Tasks from './components/Tasks';
import { TasksProvider } from './contexts/Tasks.context';
import { WeeklyDataProvider } from './contexts/WeeklyData.context';
import InfoBar from './components/InfoBar';

function App() {
  return (
    <div className="App">
      <WeeklyDataProvider>
        <Header />
      </WeeklyDataProvider>
      <TasksProvider>
        <WeeklyDataProvider>
          <TabPanel />
        </WeeklyDataProvider>
        <Tasks />
        <InfoBar />
      </TasksProvider>
    </div>
  );
}

export default App;
