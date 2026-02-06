import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form', 'loading', 'results', 'error'
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleFormSubmit = async (submittedUrl) => {
    setUrl(submittedUrl);
    setCurrentView('loading');
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock data
      const mockData = generateMockData(submittedUrl);
      setData(mockData);
      setCurrentView('results');
    } catch (err) {
      setError('Failed to fetch website data. Please try again.');
      setCurrentView('error');
    }
  };

  const handleClear = () => {
    setUrl('');
    setData(null);
    setError('');
    setCurrentView('form');
  };

  const handlePopularSiteClick = (siteUrl) => {
    setUrl(siteUrl);
    handleFormSubmit(siteUrl);
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar onSiteClick={handlePopularSiteClick} />
        <MainContent
          currentView={currentView}
          url={url}
          data={data}
          error={error}
          onFormSubmit={handleFormSubmit}
          onClear={handleClear}
        />
      </div>
      <Footer />
    </div>
  );
}

// Generate mock data (same logic as original)
function generateMockData(url) {
  // Use URL as seed for consistent but varied results
  const seed = url.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const random = mulberry32(seed);

  const baseViews = Math.floor(random() * 100000) + 10000;
  const baseVisitors = Math.floor(baseViews * 0.7);

  // Calculate monthly and annual visits based on total views
  const monthlyVisitsValue = Math.floor(baseViews * (random() * 0.5 + 0.8)); // 80-130% of total views for monthly
  const annualVisitsValue = Math.floor(monthlyVisitsValue * 12 * (random() * 0.4 + 0.9)); // 9-13 months worth

  return {
    totalViews: baseViews,
    uniqueVisitors: baseVisitors,
    monthlyVisits: monthlyVisitsValue,
    annualVisits: annualVisitsValue,
    avgSession: (random() * 5 + 2).toFixed(1),
    bounceRate: Math.floor(random() * 30 + 20),
    viewsChange: (random() - 0.5) * 20, // -10% to +10%
    visitorsChange: (random() - 0.5) * 15, // -7.5% to +7.5%
    monthlyChange: (random() - 0.5) * 25, // -12.5% to +12.5%
    annualChange: (random() - 0.5) * 18, // -9% to +9%
    chartData: generateChartData(7, baseViews / 7) // 7 days of data
  };
}

// Simple random number generator with seed
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Generate chart data for the last 7 days
function generateChartData(days, baseValue) {
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Add some variation to the data
    const variation = (Math.random() - 0.5) * 0.4; // -20% to +20%
    const value = Math.max(0, Math.floor(baseValue * (1 + variation)));

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: value
    });
  }

  return data;
}

export default App;