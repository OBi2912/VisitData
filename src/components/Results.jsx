import React, { useEffect, useRef } from 'react';

function Results({ url, data, onClear }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.chartData) {
      createChart(data.chartData);
    }
  }, [data]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const updateChangeIndicator = (change) => {
    const percentage = Math.abs(change).toFixed(1);
    const isPositive = change >= 0;
    return {
      text: `${isPositive ? '+' : '-'}${percentage}%`,
      className: `stat-change ${isPositive ? 'positive' : 'negative'}`
    };
  };

  const createChart = (chartData) => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (chartData.length === 0) return;

    // Chart dimensions
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find max value for scaling
    const maxValue = Math.max(...chartData.map(d => d.views));

    // Draw axes
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.setLineDash([5, 5]);

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      const labelValue = Math.round((maxValue / 5) * (5 - i));
      ctx.fillText(formatNumber(labelValue), padding - 10, y + 4);
    }

    ctx.setLineDash([]);

    // Draw line chart
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();

    chartData.forEach((point, index) => {
      const x = padding + (chartWidth / (chartData.length - 1)) * index;
      const y = padding + chartHeight - (point.views / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw data points
      ctx.fillStyle = '#667eea';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // X-axis labels
      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(point.date, x, height - padding + 20);
    });

    ctx.stroke();

    // Chart title
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Daily Views', width / 2, 30);
  };

  if (!data) return null;

  const viewsChange = updateChangeIndicator(data.viewsChange);
  const visitorsChange = updateChangeIndicator(data.visitorsChange);
  const monthlyChange = updateChangeIndicator(data.monthlyChange);
  const annualChange = updateChangeIndicator(data.annualChange);

  return (
    <div id="results" className="results">
      <div className="url-display">
        <h2>Results for: <span id="displayUrl">{url}</span></h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Views</h3>
          <div className="stat-value" id="totalViews">{formatNumber(data.totalViews)}</div>
          <div className={viewsChange.className} id="viewsChange">{viewsChange.text}</div>
        </div>

        <div className="stat-card">
          <h3>Unique Visitors</h3>
          <div className="stat-value" id="uniqueVisitors">{formatNumber(data.uniqueVisitors)}</div>
          <div className={visitorsChange.className} id="visitorsChange">{visitorsChange.text}</div>
        </div>

        <div className="stat-card">
          <h3>Monthly Visits</h3>
          <div className="stat-value" id="monthlyVisits">{formatNumber(data.monthlyVisits)}</div>
          <div className={monthlyChange.className} id="monthlyChange">{monthlyChange.text}</div>
        </div>

        <div className="stat-card">
          <h3>Annual Visits</h3>
          <div className="stat-value" id="annualVisits">{formatNumber(data.annualVisits)}</div>
          <div className={annualChange.className} id="annualChange">{annualChange.text}</div>
        </div>

        <div className="stat-card">
          <h3>Average Session</h3>
          <div className="stat-value" id="avgSession">{data.avgSession}</div>
          <div className="stat-unit">minutes</div>
        </div>

        <div className="stat-card">
          <h3>Bounce Rate</h3>
          <div className="stat-value" id="bounceRate">{data.bounceRate}</div>
          <div className="stat-unit">%</div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Views Over Time</h3>
        <canvas id="viewsChart" ref={chartRef}></canvas>
      </div>

      <button onClick={onClear} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Clear Results
      </button>
    </div>
  );
}

export default Results;