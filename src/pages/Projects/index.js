import React from 'react';

import ListProjects from '@components/ListProjects';

export default function Projects(props) {
  const { className } = props;

  return (
    <div className={`page ${className}`}>
      <ListProjects />
    </div>
  )
}
