# VisitData

A modern, responsive website analytics tool for tracking visitor statistics and website performance metrics.

## 🚀 Features

### Core Functionality
- **URL Analysis**: Enter any website URL to analyze its traffic statistics
- **Real-time Data**: Get instant mock analytics data including:
  - Total views and unique visitors
  - Monthly and annual visit statistics
  - Average session duration
  - Bounce rate metrics
  - Trend indicators (positive/negative changes)

### Visual Analytics
- **Interactive Charts**: View visitor data trends over the last 7 days
- **Statistics Dashboard**: Clean, organized display of key metrics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Popular Sites
- **Quick Access**: Click on popular websites (Google, YouTube, Facebook, etc.) for instant analysis
- **Live Statistics**: See current view counts and trend indicators for popular sites

## 🎨 Design Features

- **Modern UI**: Glassmorphism design with backdrop blur effects
- **Gradient Backgrounds**: Beautiful purple-blue gradient theme
- **Transparency Effects**: Subtle transparency throughout the interface
- **Smooth Animations**: Hover effects and transitions for better UX
- **Eye-catching Favicon**: Eye emoji icon representing visitor analytics

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Pure CSS with responsive design
- **State Management**: React hooks (useState, useEffect)

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop** (1200px+): Full sidebar layout with complete feature set
- **Tablet** (768px-1199px): Stacked layout with optimized spacing
- **Mobile** (320px-767px): Single-column layout with touch-friendly controls

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd visitdata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 How It Works

1. **Enter URL**: Type or paste a website URL in the input field
2. **Analyze**: Click "Check Views" to start the analysis
3. **View Results**: See comprehensive statistics and charts
4. **Quick Access**: Use popular sites sidebar for instant analysis
5. **Clear Data**: Use "Clear" button to reset and try another URL

## 🎯 Key Components

- **Header**: Application branding and title
- **URL Form**: Input field for website analysis
- **Results Dashboard**: Statistics cards and trend indicators
- **Chart Visualization**: Canvas-based line chart for visitor trends
- **Popular Sites**: Quick-access sidebar with trending websites
- **Footer**: Application credits and information

## 🔧 Development

### Project Structure
```
visitdata/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MainContent.jsx
│   │   ├── URLForm.jsx
│   │   ├── Loading.jsx
│   │   ├── Results.jsx
│   │   └── Error.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes

- **Mock Data**: Currently uses simulated data for demonstration purposes
- **API Integration**: Ready for backend API integration for real analytics data
- **Performance**: Optimized with Vite for fast loading and development
- **Accessibility**: Semantic HTML and keyboard navigation support

## 👨‍💻 Author

**OBi** - VisitData Analytics Tool

## 📄 License

This project is licensed under the ISC License.

---

*Website analytics tool for tracking view statistics - Built with React & Vite*