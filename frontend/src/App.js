import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import UserFetch from './components/Users';
import DataFetch from './components/Data';
import FileFetch from './components/File';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export const UserState = React.createContext();

function App() {
  const [userstate,setUserstate] = useState("");
  const value = {
    userstate,
    setUserstate
  };

  return (
      <Grid container direction="column">
        <UserState.Provider value={value}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid sm={3}>
          <UserFetch />
          </Grid>
          <Grid xs={12} sm={8}>
            <DataFetch />
            <FileFetch />
          </Grid>
        </Grid>
        </UserState.Provider>
      </Grid>
  );
}

export default App;
