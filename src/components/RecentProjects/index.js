import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import RepoCard from '@components/RepoCard';

import clean from '@utilities/clean';

import './index.css';

export default function RecentProjects() {
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRepos = async () => {
      const { data } = await axios({
        url: 'https://api.github.com/users/Th3-S1lenc3/repos?sort=updated&direction=desc',
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
      });

      const minTime = moment().subtract(3, 'months').unix();

      const recentlyUpdatedRepos = clean(data.map((repo, index) => {
        const updateTime = moment(repo['updated_at']).unix();
        if (updateTime > minTime) {
          return repo;
        }
        return null;
      }));

      setRecentProjects(recentlyUpdatedRepos);
      setLoading(false);
    }
    getRepos();
  }, []);

  if (loading) return <div>Getting Recent Projects...</div>

  const formatRecentProjects = () => {
    if (recentProjects.length > 0 && recentProjects.map) {
      return recentProjects.map((repo, index) => {
        return (
          <RepoCard key={index} repo={repo} />
        );
      });
    }
  }

  return (
    <div>
      <h1>Recent Projects</h1>
      {formatRecentProjects()}
    </div>
  )
}
