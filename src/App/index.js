import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '@components/Navbar';

import Home from '@pages/Home';
import Projects from '@pages/Projects';
import ProjectDetails from '@pages/ProjectDetails';
import About from '@pages/About';

import PageNotFound from '@pages/PageNotFound';

import './index.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/:repo" component={ProjectDetails} />
          <Route exact path="/about" component={About} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
