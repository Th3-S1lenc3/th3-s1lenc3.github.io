import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';

export default function RepoCard(props) {

  if (!props.repo) {
    throw new Error('RepoCard requires repo attribute')
  }

  const {
    name,
    description,
    created_at,
    updated_at,
    license,
  } = props.repo;

  let createdAt = 'Unable to get creation date.';
  let updatedAt = 'Unable to get last comit date.';

  if (created_at) {
    createdAt = moment(created_at).format('MMMM Do YYYY');
  }

  if (updated_at) {
    updatedAt = moment(updated_at).format('MMMM Do YYYY [at] HH:mm:ss');
  }

  return (
    <Link to={`/projects/${name.toLowerCase()}`} className="project-details">
      <Card className="project mx-2 my-3">
        <Card.Body>
          <Card.Title className="project-name">
            {name}
          </Card.Title>
          <Card.Text className="project-description">
            {description ?? 'No Description'}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="project-footer">
          <span className="project-created_at mr-2">
            Created: {createdAt}
          </span>
          <span className="project-updated_at mr-2">
            Last Commit: {updatedAt}
          </span>
          <span className="project-licenseName mr-2">
            License: {license?.name ?? 'No License'}
          </span>
        </Card.Footer>
      </Card>
    </Link>
  );
}
