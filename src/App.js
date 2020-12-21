import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from './components/header';
import TabPanel from './components/TabPanel';
import Tasks from './components/Tasks/Tasks';
import { TasksProvider } from './contexts/Tasks.context';
import { WeeklyDataProvider } from './contexts/WeeklyData.context';
import InfoBar from './components/Tasks/InfoBar';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#B45CC3',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TasksProvider>
          <WeeklyDataProvider>
            <Header />
            <TabPanel />
          </WeeklyDataProvider>
          <Tasks />
          <InfoBar />
        </TasksProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
