import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import UserFetch from './components/Users';
import DataFetch from './components/data/Data';
import FileFetch from './components/File';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export const UserState = React.createContext();

function App() {
  const [userstate,setUserstate] = useState();
  const value = {
    userstate,
    setUserstate
  };

  return (
    <UserState.Provider value={value}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <UserFetch />
          } />
          <Route path="/upload" element={
            <DataFetch />
          } />
          <Route path="/user" element={
            <UserFetch />
          } />
          <Route path="/file" element={
            <FileFetch />
          } />
        </Routes>
      </BrowserRouter>
    </UserState.Provider>
  );
}

export default App;
