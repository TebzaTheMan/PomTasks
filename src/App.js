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
      main: '#F37122',
      contrastText: 'rgb(255,255,255)',
    },
    secondary: {
      main: '#169D7F',
    },
    bodyText: {
      main: '#565656',
    },
  },
  typography: {
    allVariants: {
      color: '#565656',
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
