import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import UserFetch from './components/Users';
import DataFetch from './components/Data';

export const UserState = React.createContext();

function App() {
  const [userstate,setUserstate] = useState("");
  const value = {
    userstate,
    setUserstate
  };

  return (
    <div className="App">
      <header className="App-header">
        <UserState.Provider value={value}>
        <img src={logo} className="App-logo" alt="logo" />
        <UserFetch />
        <DataFetch />
        </UserState.Provider>
      </header>
    </div>
  );
}

export default App;
