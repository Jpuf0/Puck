'use strict';

/* eslint-env browser */

const { webFrame } = require('electron');

const lewd = document.getElementById('lewd');
const counter = document.getElementById('ass');

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

window.ass = 0;

function phatass() {
  window.ass += 1;
  counter.innerHTML = `PUCK HAS CLAPPED ${window.ass} TIMES`;
}

lewd.onmousedown = () => {
  lewd.style['width'] = '62.5%';
  phatass();
};

lewd.onmouseup = () => {
  lewd.style['width'] = '60%';
};
