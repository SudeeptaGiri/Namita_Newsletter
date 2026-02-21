// Little Stars Newsletter - Minimal JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Accordion
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all
      accordionItems.forEach((i) => i.classList.remove("active"));

      // Toggle current
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPos = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(255,255,255,0.98)";
      } else {
        navbar.style.background = "var(--white)";
      }
    },
    { passive: true },
  );
});
