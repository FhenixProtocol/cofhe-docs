// Fix for styled-components SSR mismatch
(function() {
  const styleElements = document.querySelectorAll('style[data-styled]');
  styleElements.forEach(style => {
    if (style.sheet && style.sheet.cssRules.length === 0) {
      style.parentNode.removeChild(style);
    }
  });
})();
