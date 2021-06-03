import React from 'react';

import BannerImage from '@components/BannerImage';
import RecentProjects from '@components/RecentProjects';

export default function Home() {
  return (
    <div className="page">
      <BannerImage />
      <RecentProjects />
    </div>
  )
}
