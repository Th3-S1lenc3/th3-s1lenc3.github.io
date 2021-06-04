import React, { Fragment } from 'react';
import moment from 'moment';
import {
  Accordion,
  Card,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import RenderMarkdown from '@components/RenderMarkdown';

import titleCase from '@utilities/titleCase';

import './index.css';

export default function AboutProject(props) {
  const {
    name,
    'html_url': htmlUrl,
    fork,
    parent,
  } = props.details;

  const detailsToInclude = [
    'description',
    'created_at',
    'updated_at',
    'license',
    'forks',
    'language',
    'releases',
  ];

  const { details: detailsObj } = props;

  const StrongH4 = ({ children }) => (
    <h4 className="pt-2">
      <strong>
        {children}
      </strong>
    </h4>
  );

  const Section = ({ title, children, className }) => (
    <section className={className}>
      <StrongH4>{titleCase(title)}</StrongH4>
      {children}
    </section>
  );

  const IsFork = () => {
    if (fork && parent) {
      return (
        <h6 className="text-muted">
          Forked from {parent['full_name']}
        </h6>
      );
    }
    else {
      return <></>;
    }
  }

  const Details = () => {
    const OverlayTooltip = ({ children, tooltip, className }) => (
      <OverlayTrigger
        className={className}
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip>
            {tooltip}
          </Tooltip>
        }
      >
        {children}
      </OverlayTrigger>
    );
    const formatReleases = (releases) => {
      if (releases && releases.length > 0) {
        const data = releases.map(({
          tag_name,
          name,
          published_at,
          html_url,
          body
        }, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index.toString()} id={index}>
              {tag_name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index.toString()} id={index}>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted releases-subtitle">
                  Published:
                  {moment(published_at).format(' MMMM Do YYYY')}
                </Card.Subtitle>
                <RenderMarkdown
                  source={body}
                  className="releases-markdown"
                  options={{
                    h1: 'h2',
                    h2: 'h3',
                    h3: 'h4',
                    h4: 'h5',
                  }}
                />
                <p>
                  See{' '}
                  <a
                    href={html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{color: 'var(--markdown-link-color)'}}
                  >
                    Assets
                  </a>
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ));

        return (
          <Accordion>
            {data}
          </Accordion>
        );
      }
      else {
        return '';
      }


    }
    const formatForksStarsIssues = (index) => {
      const {
        forks,
        'open_issues': openIssues,
        watchers: stars,
      } = detailsObj;

      return (
        <Fragment>
          <OverlayTooltip
            tooltip='Forks'
          >
            <span className="mx-1">
              <FontAwesomeIcon
                className="fa-code-fork-custom left"
                icon={faCodeBranch}
                flip='horizontal'
                size='lg'
              />
              <FontAwesomeIcon
                className="fa-code-fork-custom right"
                icon={faCodeBranch}
                size='lg'
              />
              {forks}
            </span>
          </OverlayTooltip>
          <OverlayTooltip
            tooltip='Open Issues'
          >
            <span className="mx-1">
              <FontAwesomeIcon
                className="mr-1"
                icon={faExclamationCircle}
                size='lg'
              />
              {openIssues}
            </span>
          </OverlayTooltip>
          <OverlayTooltip
            tooltip='Stars'
          >
            <span className="mx-1">
              <FontAwesomeIcon
                className="mr-1"
                icon={faStar}
                size='lg'
              />
              {stars}
            </span>
          </OverlayTooltip>
        </Fragment>
      )
    }

    const content = [];
    let i = 1;

    for (let detail in detailsObj) {
      if (detailsToInclude.includes(detail)) {
        let body = detailsObj[detail] ?? '';

        if (typeof body === 'object') {
          body = body?.name;
        }

        switch (detail) {
          case 'created_at':
            detail = 'created';
            body = moment(body).format('MMMM Do YYYY');
            break;
          case 'updated_at':
            detail = 'last_commit';
            body = moment(body).format('MMMM Do YYYY [at] HH:mm:ss');
            break;
          case 'releases':
            body = formatReleases(detailsObj[detail]);
            break;
          case 'forks':
            detail = 'other';
            body = formatForksStarsIssues(i);
            break;
          default:
            break;
        }

        body = body !== '' ? body : `No ${titleCase(detail.replace('_', ' '))}`;

        content.push(
          <Section key={i} title={detail.replace('_', ' ')}>
            {body}
          </Section>
        );

        i++;
      }
    }

    return (
      <Fragment>
        {content}
      </Fragment>
    )
  }

  return (
    <div className='project-details-about border border-secondary rounded my-2 p-4'>
      <h3>
        Project:
        <a
          href={htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="project-details-repoUrl ml-1"
        >
          {name}
        </a>
      </h3>
      <IsFork />
      <Details />
    </div>
  )
}
