import React from 'react';

import BannerImage from '@components/BannerImage';
import RecentProjects from '@components/RecentProjects';

export default function Home(props) {
  const { className } = props;

  return (
    <div className={`page ${className}`}>
      <BannerImage />
      <RecentProjects />
    </div>
  )
}
