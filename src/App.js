import React from 'react';
import ReactGA from 'react-ga';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from './components/header';
import TabPanel from './components/TabPanel';
import Tasks from './components/Tasks/Tasks';
import { TasksProvider } from './contexts/Tasks.context';
import { WeeklyDataProvider } from './contexts/WeeklyData.context';
import { StatsProvider } from './contexts/Stats.context';
import InfoBar from './components/Tasks/InfoBar';

ReactGA.initialize('UA-116096399-6', { debug: true });
ReactGA.pageview(window.location.pathname + window.location.search);

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
      </ThemeProvider>
    </div>
  );
}

export default App;
