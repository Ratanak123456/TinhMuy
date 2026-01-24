/**
 * DARK MODE LOGIC
 * Targeted to work with Tailwind CSS v4 
 */

// We use a function to get the element inside the toggle to ensure 
// it exists when the user clicks.
function toggleDarkMode() {
  const htmlElement = document.querySelector('#main-html');
  
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Initial Check: This runs immediately to prevent "flashing"
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const htmlElement = document.querySelector('#main-html');

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
})();