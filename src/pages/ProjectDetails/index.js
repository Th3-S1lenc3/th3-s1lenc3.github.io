import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import RenderMarkdown from '@components/RenderMarkdown';
import AboutProject from '@components/AboutProject';

import './index.css';

export default function ProjectDetails(props) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [readMe, setReadMe] = useState('');

  useEffect(() => {
    const getRepo = async () => {
      const { repo } = props.match.params;

      const { data: repoData } = await axios({
        url: `https://api.github.com/repos/Th3-S1lenc3/${repo}`,
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
      });

      const { data: releasesData } = await axios({
        url: `https://api.github.com/repos/Th3-S1lenc3/${repo}/releases`,
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
      });


      const data = Object.assign({}, repoData, {releases: releasesData});

      const { data: readMe } = await axios({
        url: `https://api.github.com/repos/Th3-S1lenc3/${repo}/readme`,
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
      });

      setReadMe(window.atob(readMe.content));
      setDetails(data);
      setLoading(false);
    }
    getRepo();
  }, [props.match.params])

  if (loading) return <div className="page">Fetching Repository Details...</div>

  return (
    <div className="page page-centre">
      <Row className="project-details-page">
        <Col className="border border-secondary rounded my-2 p-4">
          <RenderMarkdown source={readMe} />
        </Col>
        <Col>
          <AboutProject details={details} />
        </Col>
      </Row>
    </div>
  )
}
