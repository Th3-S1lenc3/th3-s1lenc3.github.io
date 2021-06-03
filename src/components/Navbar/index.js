import React from 'react';
import { Navbar as NavBar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './index.css';

function Navbar(props) {
  const { pathname } = props.location;

  let activeKey = pathname.split('/')[1];

  if (activeKey === '') {
    activeKey = '/';
  }

  return (
    <NavBar variant="dark" bg="dark" expand="lg" fixed="top">
      <NavBar.Brand>
        <Link to='/'>
          <div className="logo-wrapper mx-1">
            <FontAwesomeIcon className="logo logo-brand" icon={faUserSecret} />
          </div>
        </Link>
      </NavBar.Brand>
      <NavBar.Toggle aria-controls="nav" />
      <NavBar.Collapse id="nav">
        <Nav className="mr-auto" activeKey={activeKey}>
          <Link to='/' className="nav-link">
            <Nav.Link
              as="span"
              bsPrefix=''
              eventKey='/'
            >
              Home
            </Nav.Link>
          </Link>
          <Link to='/projects' className="nav-link">
            <Nav.Link
              as="span"
              bsPrefix=''
              eventKey='projects'
            >
              Projects
            </Nav.Link>
          </Link>
          <Link to='/about' className="nav-link">
            <Nav.Link
              as="span"
              bsPrefix=''
              eventKey='about'
            >
              About
            </Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Nav.Link href='https://github.com/Th3-S1lenc3' target="_blank">
            <FontAwesomeIcon size='2x' icon={faGithub} />
          </Nav.Link>
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  )
}

export default withRouter(Navbar);
