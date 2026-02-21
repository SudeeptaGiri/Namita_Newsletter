// ========================================
// Little Stars Newsletter - Optimized & Clean
// Performance-focused with smooth animations
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // ===== SCROLL REVEAL ANIMATIONS (AOS-style) =====
  const revealElements = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;

          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);

          // Unobserve after revealing (better performance)
          revealObserver.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Auto-add reveal to common elements
  const autoRevealSelectors = [
    ".glass-card",
    ".bento-item",
    ".timeline-item",
    ".accordion-item",
    ".tip-item",
    ".activity-card-3d",
    ".section-header",
  ];

  autoRevealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "fade-up");
        el.setAttribute("data-delay", index * 100);
      }
      revealObserver.observe(el);
    });
  });

  // ===== NAVIGATION =====
  const navbar = document.querySelector(".glass-nav");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  // Navbar scroll effect
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;

      if (navbar) {
        if (currentScroll > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 300) {
          navbar.classList.add("nav-hidden");
        } else {
          navbar.classList.remove("nav-hidden");
        }
      }

      lastScroll = currentScroll;
    },
    { passive: true },
  );

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger?.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger?.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Active nav highlighting
  const sections = document.querySelectorAll("section[id], header[id]");
  const navItems = document.querySelectorAll(".nav-item");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${entry.target.id}`) {
              item.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" },
  );

  sections.forEach((section) => navObserver.observe(section));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const navHeight = navbar?.offsetHeight || 80;
        const targetPos = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== ACCORDION =====
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all
        accordionItems.forEach((acc) => acc.classList.remove("active"));

        // Toggle current
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // Open first accordion by default
  if (accordionItems[0]) {
    accordionItems[0].classList.add("active");
  }

  // ===== HOVER EFFECTS (Tilt) =====
  const tiltElements = document.querySelectorAll("[data-tilt]");

  tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // ===== 3D FLIP CARDS =====
  const flipCards = document.querySelectorAll(".activity-card-3d");

  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    // Also flip on hover for desktop
    card.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        card.classList.add("flipped");
      }
    });

    card.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        card.classList.remove("flipped");
      }
    });
  });

  // ===== SCROLL PROGRESS =====
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    },
    { passive: true },
  );

  // ===== HOVER RIPPLE EFFECT =====
  document
    .querySelectorAll(".glass-card, .bento-item, .accordion-header")
    .forEach((el) => {
      el.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

  // ===== TYPING EFFECT (Hero) =====
  const typingEl = document.querySelector(".hero-subtitle span");
  if (typingEl) {
    const text = typingEl.textContent;
    typingEl.textContent = "";
    typingEl.classList.add("typing");

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        typingEl.classList.remove("typing");
      }
    };

    setTimeout(typeWriter, 800);
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count);
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(easeProgress * target);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // ===== STAGGER CHILDREN ANIMATION =====
  document.querySelectorAll(".stagger-container").forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // ===== PARALLAX LITE (CSS-based helper) =====
  const parallaxEls = document.querySelectorAll("[data-parallax]");

  if (parallaxEls.length > 0) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;

        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
      },
      { passive: true },
    );
  }

  // ===== CONFETTI ON THANK YOU (lightweight) =====
  const thankyouSection = document.querySelector(".thankyou-section");
  let confettiDone = false;

  if (thankyouSection) {
    const confettiObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !confettiDone) {
          confettiDone = true;
          createConfetti();
        }
      },
      { threshold: 0.4 },
    );

    confettiObserver.observe(thankyouSection);
  }

  function createConfetti() {
    const colors = ["#FF6B9D", "#FFD93D", "#6ECFFF", "#6BCB77", "#7C5CBF"];
    const container =
      thankyouSection.querySelector(".thankyou-wrapper") || thankyouSection;

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";
        confetti.style.cssText = `
                    --x: ${(Math.random() - 0.5) * 400}px;
                    --r: ${Math.random() * 360}deg;
                    left: ${50 + (Math.random() - 0.5) * 20}%;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                `;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2500);
      }, i * 30);
    }
  }

  // ===== PRINT FUNCTION =====
  window.printNewsletter = () => window.print();

  // ===== CONSOLE =====
  console.log(
    "%c🌟 Little Stars Newsletter",
    "font-size: 20px; color: #FF6B9D; font-weight: bold;",
  );
  console.log("%cOptimized & Interactive", "font-size: 12px; color: #7C5CBF;");
});
