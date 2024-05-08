(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let menu = document.querySelector(".menu");
    let navbar = document.querySelector(".nav-options");
    let isVisible = false;
    menu.addEventListener("click", (e) => {
      e.preventDefault();
      if (isVisible) {
        isVisible = false;
        navbar.style.display = "none";
        menu.classList.remove("rotate");
      } else {
        isVisible = true;
        navbar.style.display = "flex";
        menu.classList.add("rotate");
      }
    });
  });
})();
