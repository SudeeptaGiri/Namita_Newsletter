// ========================================
// Little Stars Preschool Newsletter
// Interactive JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id], header[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  function setActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);

  // Navbar Background on Scroll
  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.12)";
    } else {
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
    }
  }

  window.addEventListener("scroll", updateNavbar);

  // Curriculum Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add active class to clicked button and corresponding pane
      this.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const animatableElements = document.querySelectorAll(
    ".highlight-card, .activity-card, .event-item, .reminder-card, .tip-card, .curriculum-item",
  );

  animatableElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Parallax Effect for Floating Decorations
  const decorations = document.querySelectorAll(".decoration");

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;

    decorations.forEach((decoration, index) => {
      const speed = 0.2 + index * 0.1;
      decoration.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
    });
  });

  // Add hover sound effect (visual feedback)
  const cards = document.querySelectorAll(
    ".highlight-card, .activity-card, .tip-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition =
        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.3s ease";
    });
  });

  // Counter Animation for Numbers
  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  // Snowflake Random Animation
  const snowflakes = document.querySelectorAll(".snowflake");

  snowflakes.forEach((flake, index) => {
    setInterval(
      () => {
        const randomRotation = Math.random() * 360;
        const randomScale = 0.8 + Math.random() * 0.4;
        flake.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
      },
      3000 + index * 1000,
    );
  });

  // Dynamic Date Display
  const dateBadge = document.querySelector(".date-badge span");
  if (dateBadge) {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // Keep the original date range, but we could update this dynamically
  }

  // Console Easter Egg
  console.log(
    "%c🌟 Little Stars Classroom Newsletter 🌟",
    "font-size: 20px; color: #FF6B9D; font-weight: bold;",
  );
  console.log(
    "%cThank you for viewing our newsletter!",
    "font-size: 14px; color: #7C5CBF;",
  );

  // Add scroll-triggered confetti effect on Thank You section
  const thankyouSection = document.querySelector(".thankyou-section");
  let confettiTriggered = false;

  const thankyouObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !confettiTriggered) {
          confettiTriggered = true;
          createConfetti();
        }
      });
    },
    { threshold: 0.5 },
  );

  if (thankyouSection) {
    thankyouObserver.observe(thankyouSection);
  }

  // Simple Confetti Effect
  function createConfetti() {
    const colors = [
      "#FF6B9D",
      "#FFD93D",
      "#6ECFFF",
      "#6BCB77",
      "#7C5CBF",
      "#FF9F45",
    ];
    const container = document.querySelector(".thankyou-section");

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    opacity: 1;
                    border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
                    transform: rotate(${Math.random() * 360}deg);
                    pointer-events: none;
                    z-index: 100;
                `;

        container.appendChild(confetti);

        // Animate falling
        const fallDuration = Math.random() * 3 + 2;
        confetti.animate(
          [
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            {
              transform: `translateY(${container.offsetHeight}px) rotate(${Math.random() * 720}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: fallDuration * 1000,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          },
        ).onfinish = () => confetti.remove();
      }, i * 50);
    }
  }

  // Keyboard Navigation Enhancement
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const currentSection = document.elementFromPoint(
        window.innerWidth / 2,
        100,
      );
      const allSections = Array.from(sections);

      // Find current section index
      let currentIndex = allSections.findIndex(
        (section) =>
          section.contains(currentSection) || section === currentSection,
      );

      if (e.key === "ArrowDown" && currentIndex < allSections.length - 1) {
        e.preventDefault();
        allSections[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        allSections[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Print Functionality
  window.printNewsletter = function () {
    window.print();
  };

  // Initialize everything
  console.log("Newsletter initialized successfully! 🎉");
});
