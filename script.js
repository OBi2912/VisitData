// DOM Elements
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const error = document.getElementById('error');
const displayUrl = document.getElementById('displayUrl');
const totalViews = document.getElementById('totalViews');
const uniqueVisitors = document.getElementById('uniqueVisitors');
const avgSession = document.getElementById('avgSession');
const bounceRate = document.getElementById('bounceRate');
const viewsChange = document.getElementById('viewsChange');
const visitorsChange = document.getElementById('visitorsChange');
const monthlyVisits = document.getElementById('monthlyVisits');
const annualVisits = document.getElementById('annualVisits');
const monthlyChange = document.getElementById('monthlyChange');
const annualChange = document.getElementById('annualChange');
const errorMessage = document.getElementById('errorMessage');
const viewsChart = document.getElementById('viewsChart');
const popularSites = document.getElementById('popularSites');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    urlForm.addEventListener('submit', handleFormSubmit);
    clearBtn.addEventListener('click', clearResults);
    populatePopularSites();
});

// Form submission handler
async function handleFormSubmit(e) {
    e.preventDefault();

    const url = urlInput.value.trim();

    if (!isValidUrl(url)) {
        showError('Please enter a valid URL (e.g., https://example.com)');
        return;
    }

    // Show loading state
    showLoading();

    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate mock data
        const data = generateMockData(url);

        // Display results
        displayResults(url, data);

    } catch (err) {
        showError('Failed to fetch website data. Please try again.');
    }
}

// URL validation
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Show loading state
function showLoading() {
    hideAll();
    clearBtn.classList.add('hidden');
    loading.classList.remove('hidden');
    checkBtn.disabled = true;
    checkBtn.textContent = 'Analyzing...';
}

// Show error message
function showError(message) {
    hideAll();
    clearBtn.classList.add('hidden');
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    resetButton();
}

// Display results
function displayResults(url, data) {
    hideAll();
    results.classList.remove('hidden');
    clearBtn.classList.remove('hidden');

    // Update display elements
    displayUrl.textContent = url;
    totalViews.textContent = formatNumber(data.totalViews);
    uniqueVisitors.textContent = formatNumber(data.uniqueVisitors);
    monthlyVisits.textContent = formatNumber(data.monthlyVisits);
    annualVisits.textContent = formatNumber(data.annualVisits);
    avgSession.textContent = data.avgSession;
    bounceRate.textContent = data.bounceRate;

    // Update change indicators
    updateChangeIndicator(viewsChange, data.viewsChange);
    updateChangeIndicator(visitorsChange, data.visitorsChange);
    updateChangeIndicator(monthlyChange, data.monthlyChange);
    updateChangeIndicator(annualChange, data.annualChange);

    // Create chart
    createChart(data.chartData);

    resetButton();
}

// Generate mock data
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
    return function() {
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

// Create simple chart using Canvas
function createChart(data) {
    const ctx = viewsChart.getContext('2d');
    const width = viewsChart.width = viewsChart.offsetWidth;
    const height = viewsChart.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (data.length === 0) return;

    // Chart dimensions
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.views));

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

    data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
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
}

// Update change indicator
function updateChangeIndicator(element, change) {
    const percentage = Math.abs(change).toFixed(1);
    const isPositive = change >= 0;

    element.textContent = `${isPositive ? '+' : '-'}${percentage}%`;
    element.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Reset button state
function resetButton() {
    checkBtn.disabled = false;
    checkBtn.textContent = 'Check Views';
}

// Clear results and reset form
function clearResults() {
    hideAll();
    clearBtn.classList.add('hidden');
    urlInput.value = '';
    urlInput.focus();

    // Clear chart
    const ctx = viewsChart.getContext('2d');
    ctx.clearRect(0, 0, viewsChart.width, viewsChart.height);
}

// Hide all sections
function hideAll() {
    loading.classList.add('hidden');
    results.classList.add('hidden');
    error.classList.add('hidden');
}

// Populate popular sites sidebar
function populatePopularSites() {
    const popularWebsites = [
        { name: 'Google', url: 'https://google.com', baseViews: 250000000 },
        { name: 'YouTube', url: 'https://youtube.com', baseViews: 180000000 },
        { name: 'Facebook', url: 'https://facebook.com', baseViews: 120000000 },
        { name: 'Wikipedia', url: 'https://wikipedia.org', baseViews: 95000000 },
        { name: 'Twitter', url: 'https://twitter.com', baseViews: 85000000 },
        { name: 'Instagram', url: 'https://instagram.com', baseViews: 78000000 },
        { name: 'Amazon', url: 'https://amazon.com', baseViews: 65000000 },
        { name: 'Reddit', url: 'https://reddit.com', baseViews: 52000000 }
    ];

    popularSites.innerHTML = '';

    popularWebsites.forEach(site => {
        const siteElement = createSiteElement(site);
        popularSites.appendChild(siteElement);
    });
}

// Create site element for popular sites
function createSiteElement(site) {
    const siteDiv = document.createElement('div');
    siteDiv.className = 'site-item';
    siteDiv.onclick = () => checkPopularSite(site.url);

    // Generate mock change percentage
    const changePercent = (Math.random() - 0.5) * 20; // -10% to +10%
    const isPositive = changePercent >= 0;

    siteDiv.innerHTML = `
        <div class="site-name">${site.name}</div>
        <div class="site-stats">
            <div class="site-views">${formatNumber(site.baseViews)}</div>
            <div class="site-change ${isPositive ? 'positive' : 'negative'}">
                ${isPositive ? '+' : ''}${changePercent.toFixed(1)}%
            </div>
        </div>
    `;

    return siteDiv;
}

// Handle clicking on popular site
function checkPopularSite(url) {
    urlInput.value = url;
    // Trigger form submission
    urlForm.dispatchEvent(new Event('submit'));
}