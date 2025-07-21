// src/utils/layout.js - Layout utilities
import { useEffect, useState } from 'react';

export const useFooterPadding = () => {
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const calculateFooterHeight = () => {
      const footer = document.querySelector('.footer-container');
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }
    };

    calculateFooterHeight();
    window.addEventListener('resize', calculateFooterHeight);
    
    return () => window.removeEventListener('resize', calculateFooterHeight);
  }, []);

  return footerHeight;
};