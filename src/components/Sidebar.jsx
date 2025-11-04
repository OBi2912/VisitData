import React, { useState, useEffect } from 'react';

function Sidebar({ onSiteClick }) {
  const [popularSites, setPopularSites] = useState([]);

  useEffect(() => {
    const sites = [
      { name: 'Google', url: 'https://google.com', baseViews: 250000000 },
      { name: 'YouTube', url: 'https://youtube.com', baseViews: 180000000 },
      { name: 'Facebook', url: 'https://facebook.com', baseViews: 120000000 },
      { name: 'Wikipedia', url: 'https://wikipedia.org', baseViews: 95000000 },
      { name: 'Twitter', url: 'https://twitter.com', baseViews: 85000000 },
      { name: 'Instagram', url: 'https://instagram.com', baseViews: 78000000 },
      { name: 'Amazon', url: 'https://amazon.com', baseViews: 65000000 },
      { name: 'Reddit', url: 'https://reddit.com', baseViews: 52000000 }
    ];

    const sitesWithChange = sites.map(site => ({
      ...site,
      changePercent: (Math.random() - 0.5) * 20 // -10% to +10%
    }));

    setPopularSites(sitesWithChange);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <aside className="sidebar">
      <h2>Most Viewed Pages</h2>
      <div className="popular-sites" id="popularSites">
        {popularSites.map((site, index) => (
          <div
            key={index}
            className="site-item"
            onClick={() => onSiteClick(site.url)}
          >
            <div className="site-name">{site.name}</div>
            <div className="site-stats">
              <div className="site-views">{formatNumber(site.baseViews)}</div>
              <div className={`site-change ${site.changePercent >= 0 ? 'positive' : 'negative'}`}>
                {site.changePercent >= 0 ? '+' : ''}{site.changePercent.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;