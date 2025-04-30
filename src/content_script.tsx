import Mustache from 'mustache';

// Import templates
import './css/block.css';
import blockTemplate from './templates/block.mustache';

const qweanixLandingUrl = "https://app-9w1.pages.dev/"

// Register partials
Mustache.parse(blockTemplate);

const createQweanixBlock = function () {
  const rightCol = document.querySelector("#rightCol");
  if (!rightCol) {
    console.log("no right col")
    return;
  }
  console.log(rightCol);

  let qweanixUrl = qweanixLandingUrl + "?" + new URLSearchParams({
    url: window.location.href.replace(/\?#.*$/, ""),
  }).toString()

  const container = document.createElement('div');
  container.innerHTML = Mustache.render(blockTemplate, {
    qweanixUrl: qweanixUrl
  });
  rightCol.insertBefore(container, rightCol.firstChild);
}


const setupOnReady = function () {
  document.removeEventListener('DOMContentLoaded', createQweanixBlock)
  document.addEventListener('DOMContentLoaded', createQweanixBlock)
  window.addEventListener('pageshow', function (event) {
    event.persisted && createQweanixBlock();
  });
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    createQweanixBlock();
  }
}

setupOnReady();

