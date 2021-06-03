import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RenderMarkdown from '@components/RenderMarkdown';

import AboutMarkdown from './about.md';

export default function About() {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMarkdown = async () => {
      const { data } = await axios.get(AboutMarkdown);

      setMarkdown(data);
      setLoading(false);
    };
    getMarkdown();
  }, []);

  if (loading) return <div className="page">Fetching My Information...</div>

  return (
    <div className="page p-2">
      <RenderMarkdown source={markdown} />
    </div>
  )
}
