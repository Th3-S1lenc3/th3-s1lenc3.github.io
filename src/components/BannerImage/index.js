import React from 'react';

import './index.css';

export default function BannerImage() {
  return (
    <div className="header mb-3">
      <img className="bannerImg" src="/images/banner.jpg" alt="BannerImage" />
      <div className="bannerText border border-white p-2">
        Th3_S1lenc3
      </div>
    </div>
  )
}
