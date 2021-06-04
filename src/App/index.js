import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import Navbar from '@components/Navbar';
import DevelopmentNotice from '@components/DevelopmentNotice';

import Home from '@pages/Home';
import Projects from '@pages/Projects';
import ProjectDetails from '@pages/ProjectDetails';
import About from '@pages/About';

import PageNotFound from '@pages/PageNotFound';

import './index.css';

export default function App() {
  const showDev = true;

  const devShown = classNames({
    'mt-nav': !showDev,
  });

  return (
    <div className="App">
      <Router>
        <Navbar />
        <DevelopmentNotice show={showDev} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home className={devShown} {...props} />}
          />
          <Route
            exact
            path="/projects"
            render={(props) => <Projects className={devShown} {...props} />}
          />
          <Route
            exact
            path="/projects/:repo"
            render={(props) => <ProjectDetails className={devShown} {...props} />}
          />
          <Route
            exact
            path="/about"
            render={(props) => <About className={devShown} {...props} />}
          />
          <Route
            path="/"
            render={(props) => <PageNotFound className={devShown} {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}
