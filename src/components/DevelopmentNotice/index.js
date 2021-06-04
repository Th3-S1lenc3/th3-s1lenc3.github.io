import React from 'react';
import { Alert } from 'react-bootstrap';

export default function DevelopmentNotice(props) {
  const { show } = props;

  if (show) {
    return (
      <Alert variant="primary mt-nav">
        Notice: This site is in development. If you notice
        any bugs or inconsitencies. Please report them{' '}
        <Alert.Link
          href="https://github.com/Th3-S1lenc3/th3-s1lenc3.github.io/issues"
          target="_blank"
          rel="noreferrer"
        >
          here
        </Alert.Link>
        .
      </Alert>
    );
  }
  else {
    return <></>
  }
}
