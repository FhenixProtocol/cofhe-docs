// Fix for styled-components SSR mismatch
(function() {
  const styleElements = document.querySelectorAll('style[data-styled]');
  styleElements.forEach(style => {
    if (style.innerHTML === '') {
      style.parentNode.removeChild(style);
    }
  });
})(); 