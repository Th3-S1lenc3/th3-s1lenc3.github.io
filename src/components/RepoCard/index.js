import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  Card,
  Badge,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

import './index.css';

export default function RepoCard(props) {
  if (!props.repo) {
    throw new Error('RepoCard requires repo attribute');
  }

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const data = props.repo;
    const { url } = data;

    const getTags = async () => {
      const { data: { names: tags } } = await axios({
        url: `${url}/topics`,
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json',
        },
      });

      setTags(tags);
    }

    getTags();
  }, [props.repo]);

  const ProjectBadges = () => {
    if (tagsFormated && tagsFormated.length > 0) {
      return (
        <div key={100} className="project-badges">
          { tagsFormated ?? '' }
        </div>
      )
    }
    else {
      return <></>
    }
  }

  const OverlayTooltip = ({ children, tooltip }) => (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip>
          Topic: {tooltip}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );

  const {
    name,
    description,
    created_at,
    updated_at,
    license,
  } = props.repo;

  let tagsFormated = null;

  if (tags && tags.map && tags.length > 0) {
    tagsFormated = tags.map((tag, index) => (
      <OverlayTooltip
        tooltip={tag}
      >
        <Badge
          key={index}
          pill
          variant="primary"
          className="project-badge mx-1"
        >
          {tag}
        </Badge>
      </OverlayTooltip>
    ));
  }

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
          <ProjectBadges />
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
