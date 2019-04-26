import React from 'react';
import './App.css';
import NavBar from './containers/NavBar'
import MainContainer from './containers/MainContainer'

const App = () => {
    return (
      <div className="App">
          <NavBar />

          <MainContainer />
      </div>
    );
}

export default App;
