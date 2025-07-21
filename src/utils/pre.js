// src/utils/pre.js - Pre element formatting
export const formatPreElements = () => {
  const preElements = document.querySelectorAll('pre');
  
  preElements.forEach(pre => {
    const lines = pre.innerHTML.split('\n');
    const offset = lines[0]?.match(/^\s*/)?.[0]?.length || 0;
    
    const formattedLines = lines.map(line => line.slice(offset));
    pre.innerHTML = formattedLines.join('\n');
  });
};