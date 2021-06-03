import React, { useState, useEffect, forwardRef } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import RepoCard from '@components/RepoCard';

import titleCase from '@utilities/titleCase';

import './index.css';

export default function ListProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('created');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const getRepos = async () => {
      const { data } = await axios({
        url: `https://api.github.com/users/Th3-S1lenc3/repos?sort=${sort}&direction=${sortDirection}`,
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
      });

      setProjects(data);
      setLoading(false);
    }
    getRepos();
  }, [sort, sortDirection]);

  if (loading) return <div>Getting Projects...</div>

  const formatProjects = () => {
    if (projects.length > 0 && projects.map) {
      return projects.map((repo, index) => {
        return (
          <RepoCard key={index} repo={repo} />
        );
      });
    }
  }

  const sortOptions = new Map([
    ['created', 'created'],
    ['updated', 'updated'],
    ['pushed', 'pushed'],
    ['full_name', 'full name'],
  ]);

  const sortDirectionOptions = new Map([
    ['asc', 'ascending'],
    ['desc', 'descending'],
  ]);

  const SortOptions = () => {
    const options = [];
    let index = 1;

    for (let [key, value] of sortOptions) {
      options.push(
        <option key={index} value={key}>{titleCase(value)}</option>
      )
      index++;
    }
    return options;
  };

  const SortDirectionOptions = () => {
    const options = [];
    let index = 10;

    for (let [key, value] of sortDirectionOptions) {
      options.push(
        <option key={index} value={key}>{titleCase(value)}</option>
      )
      index++;
    }
    return options;
  };

  const Select = forwardRef(({ children, style, className, id, 'aria-labelledby': labelledBy, onChange, value, label }, ref) => (
    <Form.Group
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labelledBy}
      controlId={id}
    >
      <Form.Label
        srOnly={true}
      >
        {label ?? 'No Label'}
      </Form.Label>
      <Form.Control
        as='select'
        custom
        onChange={onChange}
        value={value}
      >
        {children}
      </Form.Control>
    </Form.Group>
  ));

  return (
    <div className="pt-1">
      <div className="list-projects-header">
        <div/>
        <h1>Projects</h1>
        <div className="mr-2">
          <Dropdown alignRight>
            <Dropdown.Toggle as={Button} variant='secondary'>
              <FontAwesomeIcon icon={faFilter} />
            </Dropdown.Toggle>

            <Dropdown.Menu className='p-2'>
              <Dropdown.Item
                active={false}
                as={Select}
                label='Sort By'
                id='selectSort'
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <SortOptions />
              </Dropdown.Item>
              <Dropdown.Item
                as={Select}
                id='selectSortDirection'
                value={sortDirection}
                onChange={e => setSortDirection(e.target.value)}
              >
                <SortDirectionOptions />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="list-projects-content">
        {formatProjects()}
      </div>
    </div>
  )
}
