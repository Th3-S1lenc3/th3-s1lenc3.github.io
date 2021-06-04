import React from 'react';

export default function PageNotFound(props) {
  const { className } = props;

  return (
    <div class={`page ${className}`}>
      404 Page Not Found
    </div>
  )
}
