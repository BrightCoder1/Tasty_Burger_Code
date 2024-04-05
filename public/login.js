const navbarToggle = document.getElementById('js-navbar-toggle');
const menu = document.getElementById('js-menu');

navbarToggle.addEventListener('click', function() {
  menu.classList.toggle('active');
});
