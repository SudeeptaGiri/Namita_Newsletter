// Little Stars Newsletter - With Animations

document.addEventListener("DOMContentLoaded", () => {
  // ========== SCROLL REVEAL ANIMATIONS ==========
  const animateElements = document.querySelectorAll("[data-animate]");

  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          // Unobserve after animating for better performance
          animateObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animateElements.forEach((el) => {
    animateObserver.observe(el);
  });

  // ========== AUTO-APPLY ANIMATIONS TO COMMON ELEMENTS ==========
  const autoAnimateSelectors = {
    ".card": "fade-up",
    ".highlight-card": "zoom-in",
    ".activity-card": "fade-up",
    ".event-card": "fade-left",
    ".reminder-card": "fade-up",
    ".tip-card": "fade-up",
    ".accordion-item": "fade-right",
    ".section-title": "fade-up",
  };

  Object.entries(autoAnimateSelectors).forEach(([selector, animation]) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (!el.hasAttribute("data-animate")) {
        el.setAttribute("data-animate", animation);
        // Add stagger delay
        el.setAttribute("data-delay", (index % 6) * 100);
        el.style.transitionDelay = `${(index % 6) * 0.1}s`;
        animateObserver.observe(el);
      }
    });
  });

  // ========== MOBILE MENU TOGGLE ==========
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

  // ========== ACCORDION ==========
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

  // ========== SMOOTH SCROLL ==========
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

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;

      // Background change
      if (currentScroll > 50) {
        navbar.style.background = "rgba(255,255,255,0.98)";
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
      } else {
        navbar.style.background = "var(--white)";
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      }

      lastScroll = currentScroll;
    },
    { passive: true },
  );

  // ========== TYPING ANIMATION FOR HERO ==========
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    // Add entrance animation class
    heroTitle.style.opacity = "0";
    setTimeout(() => {
      heroTitle.style.animation = "slideUp 0.8s ease forwards";
    }, 400);
  }

  // ========== HOVER EFFECTS - ADD CLASSES ==========
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("hover-lift");
  });

  document.querySelectorAll(".activity-card").forEach((card) => {
    card.classList.add("hover-scale");
  });

  // Add shake to emojis/icons
  document.querySelectorAll(".icon, .emoji").forEach((icon) => {
    icon.classList.add("shake");
  });

  // ========== STAGGER ANIMATION FOR GRIDS ==========
  document
    .querySelectorAll(
      ".grid, .activity-grid, .reminder-grid, .tips-grid, .events-list",
    )
    .forEach((grid) => {
      grid.classList.add("stagger-children");
    });

  // ========== PULSE ANIMATION FOR DATE BADGE ==========
  const dateBadge = document.querySelector(".date-badge");
  if (dateBadge) {
    dateBadge.classList.add("pulse");
  }

  // ========== FLOAT ANIMATION FOR STARS ==========
  const stars = document.querySelector(".stars");
  if (stars) {
    stars.classList.add("float");
  }

  console.log("✨ Little Stars Newsletter loaded with animations!");
});
