function toggleMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
    
    menuIcon.classList.toggle('change');
    menu.classList.toggle('open');
  }