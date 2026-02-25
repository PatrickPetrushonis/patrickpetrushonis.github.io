// src/utils/scroll.ts - Enhanced scroll utilities
import { useEffect, useState } from 'react';

export const smoothScrollTo = (targetId, offset = 77) => {
  const element = document.querySelector(targetId);
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Hook for scroll-based visibility
export const useScrollVisibility = (threshold = 100) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};

// Hook for slim header effect
export const useSlimHeader = (threshold = 100) => {
  const [isSlim, setIsSlim] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSlim(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isSlim;
};

// Hook for handling hash navigation on page load
export const useHashNavigation = (offset = 77) => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        smoothScrollTo(hash, offset);
      }, 100);
    }
  }, [offset]);
};