// Import our custom CSS
import '../styles/main.scss'
// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// Import Fontawesome
import "@fortawesome/fontawesome-free/css/all.css";

const links = document.querySelectorAll(".custom-nav__links__link");
const sections = document.querySelectorAll("section");

links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault(); 
    const targetId = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({ behavior: "smooth" });
    
    links.forEach(l => l.classList.remove("custom-nav__links__link--active"));
    this.classList.add("custom-nav__links__link--active");
  });
});

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("custom-nav__links__link--active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("custom-nav__links__link--active");
    }
  });
});