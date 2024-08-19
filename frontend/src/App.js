/* Default website 

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */

//Simple sign-in for test 
/*
import React from 'react';
import './App.css';
import SignIn from './SignIn';

function App() {
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App; */

//Export SignIn template from https://mui.com/material-ui/getting-started/templates/

import React from 'react';
import SignInTemplate from './components/SignInTemplate';

function App() {
  return (
    <div className="App">
      <SignInTemplate />
    </div>
  );
}

export default App; 