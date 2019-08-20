import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Landing from './components/layout/Landing';

function App() {
  return (
    <div className="App">
      <Router>             
        <Route exact path="/" component={Landing} />

      </Router>

    </div>
  );
}

export default App;
