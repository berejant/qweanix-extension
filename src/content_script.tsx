import Mustache from 'mustache';

// Import templates
import './css/block.css';
import blockTemplate from './templates/block.mustache';

const qweanixLandingUrl = "https://app-9w1.pages.dev/"

// Register partials
Mustache.parse(blockTemplate);

const createQweanixBlock = function () {
  const rightCol = document.getElementById("rightCol");
  if (!rightCol) {
    return false;
  }

  let qweanixUrl = qweanixLandingUrl + "?" + new URLSearchParams({
    url: window.location.href.replace(/\?#.*$/, ""),
  }).toString()

  const container = document.createElement('div');
  container.innerHTML = Mustache.render(blockTemplate, {
    qweanixUrl: qweanixUrl
  });
  rightCol.insertBefore(container, rightCol.firstChild);

  return true
}

const observer = new MutationObserver((mutations) => {
  // Check if our target div exists now
  if (createQweanixBlock()) {
    // Stop observing once we've found what we need
    observer.disconnect();
  }
});

observer.observe(document.documentElement, {
  childList: true, // Watch for changes in direct children
  subtree: true, // Watch the entire subtree
  attributes: false // No need to watch for attribute changes
});

