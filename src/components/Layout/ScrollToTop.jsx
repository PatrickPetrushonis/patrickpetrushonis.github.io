// src/components/Layout/ScrollToTop.jsx
import { useScrollVisibility } from '../../utils/scroll';
import { smoothScrollTo } from '../../utils/scroll';

const ScrollToTop = ({ pageRef }) => {
  const isVisible = useScrollVisibility(100);

  const handleClick = (e) => {
    e.preventDefault();
    smoothScrollTo('#section-top', 0); // No offset for top scroll
  };

  return (
    <a 
      className="button__return-top"
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden'
      }}
      href="#section-top"
      onClick={handleClick}
    >
      <img 
        src={`${pageRef}app/img/icon-arrow-up.svg`} 
        alt="Return to top" 
      />
    </a>
  );
};

export default ScrollToTop;