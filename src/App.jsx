// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
// Import other pages as you create them
// import About from './pages/About';
// import Contact from './pages/Contact';

// Import your data
import data from './data/data.json';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout pagename="Home">
            <Home data={data} />
          </Layout>
        } />
        
        {/* Add other routes as needed */}
        {/* 
        <Route path="/about" element={
          <Layout pagename="About">
            <About data={data} />
          </Layout>
        } />
        */}
        
        {/* 404 page */}
        <Route path="*" element={
          <Layout pagename="Page Not Found">
            <div className="content">
              <div className="section__container">
                <div className="section__content">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;