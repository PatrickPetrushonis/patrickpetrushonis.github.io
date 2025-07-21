// src/components/Layout/Layout.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHashNavigation } from '../../utils/scroll';
import { useFooterPadding } from '../../utils/layout';
import { formatPreElements } from '../../utils/pre';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import Footer from './Footer';
//import './Layout.scss';

const Layout = ({ children, pagename = 'Home' }) => {
  const location = useLocation();
  const footerHeight = useFooterPadding();
  
  // Equivalent to pageRef logic - determine if we're on home page
  const isHomePage = location.pathname === '/';
  const pageRef = isHomePage ? '' : '/';

  // Handle hash navigation on page load
  useHashNavigation(77);

  useEffect(() => {
    // Set page title
    document.title = `Patrick Petrushonis - ${pagename}`;
  }, [pagename]);

  useEffect(() => {
    // Load Google Tag Manager
    if (typeof window !== 'undefined' && !window.gtmLoaded) {
      const script = document.createElement('script');
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-N4JR4XW');`;
      document.head.appendChild(script);
      window.gtmLoaded = true;
    }
  }, []);

  useEffect(() => {
    // Format pre elements after component mounts
    formatPreElements();
  }, [children]);

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-N4JR4XW"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>

      <div id="section-top" className="main-container">
        <div 
          className="main-content"
          style={{ paddingBottom: `${footerHeight}px` }}
        >
          <Header pageRef={pageRef} />
          
          {children}

          {pagename !== 'Home' && <ScrollToTop pageRef={pageRef} />}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;