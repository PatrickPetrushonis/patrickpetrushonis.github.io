// src/components/Layout/Footer.jsx
//import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-controls">    
        <span>
          Created by
          <br className="mobile-only" />
          Patrick Petrushonis 
        </span>  
        <ul className="social-icon__container">
          <li className="social-icon">
            <a 
              className="social-linkedin" 
              target="_blank" 
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/patrick-petrushonis/"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;