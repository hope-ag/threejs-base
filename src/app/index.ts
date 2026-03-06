import '../styles/globals.css';

import Three from './three';

document.addEventListener('DOMContentLoaded', () => {});

window.addEventListener('load', () => {
  const node = document.querySelector<HTMLDivElement>('#renderer');
  if (node) {
    return new Three({
      node
    });
  }
});
