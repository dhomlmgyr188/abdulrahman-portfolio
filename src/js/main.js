// Import our custom CSS
import '../styles/main.scss'
// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// Import Fontawesome
import "@fortawesome/fontawesome-free/css/all.css";
const links = document.querySelectorAll(".custom-nav__links__link");
const sections = document.querySelectorAll("section");
const navHeight = document.querySelector("#custom-navbar").offsetHeight;

links.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    const sectionTop = targetSection.offsetTop - navHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth"
    });

    // active
    links.forEach(l => l.classList.remove("custom-nav__links__link--active"));
    this.classList.add("custom-nav__links__link--active");
  });
});


window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 50;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("custom-nav__links__link--active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("custom-nav__links__link--active");
    }
  });
});

const hamburger = document.querySelector(".custom-nav__humburger");
const navLinks = document.querySelector(".custom-nav__links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.querySelectorAll(".custom-nav__links__link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const textarea = document.getElementById("message");
  const counter = document.querySelector(".contact-us__forms__form__note");
  const maxLength = 300;

  textarea.addEventListener("input", function () {
    let currentLength = textarea.value.length;

    // منع تجاوز 300 حرف
    if (currentLength > maxLength) {
      textarea.value = textarea.value.substring(0, maxLength);
      currentLength = maxLength;
    }

    // تحديث العداد
    counter.textContent = currentLength + " / " + maxLength;
  });