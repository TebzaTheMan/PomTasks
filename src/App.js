import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from './components/header';
import TabPanel from './components/TabPanel';
import Tasks from './components/Tasks/Tasks';
import { TasksProvider } from './contexts/Tasks.context';
import { WeeklyDataProvider } from './contexts/WeeklyData.context';
import { StatsProvider } from './contexts/Stats.context';
import InfoBar from './components/Tasks/InfoBar';
import UserProvider from './contexts/User.context';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F37122',
      contrastText: 'rgb(255,255,255)',
    },
    secondary: {
      main: '#169D7F',
    },
    grey: {
      dark: '#565656',
      light: '#F4F4F9',
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
        <UserProvider>
          <TasksProvider>
            <WeeklyDataProvider>
              <StatsProvider>
                <Header />
                <TabPanel />
              </StatsProvider>
            </WeeklyDataProvider>
            <Tasks />
            <InfoBar />
          </TasksProvider>
        </UserProvider>
      </ThemeProvider>

    </div>
  );
}

export default App;
