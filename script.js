// ========================================
// Little Stars Preschool Newsletter
// Advanced Creative JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ===== CUSTOM CURSOR =====
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  let cursorX = 0,
    cursorY = 0;
  let outlineX = 0,
    outlineY = 0;

  if (cursorDot && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      cursorDot.style.left = cursorX + "px";
      cursorDot.style.top = cursorY + "px";
    });

    // Smooth cursor outline follow
    function animateCursor() {
      outlineX += (cursorX - outlineX) * 0.15;
      outlineY += (cursorY - outlineY) * 0.15;

      cursorOutline.style.left = outlineX + "px";
      cursorOutline.style.top = outlineY + "px";

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor effects on hover
    const hoverElements = document.querySelectorAll(
      "a, button, .glass-card, .bento-item, .accordion-header, .activity-card-3d, .timeline-card",
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(2)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.borderColor = "#FF6B9D";
      });

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.borderColor = "#FF6B9D";
      });
    });
  }

  // ===== NAVIGATION =====
  const navbar = document.querySelector(".glass-nav");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  // Scroll effect for navbar
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      if (hamburger) {
        hamburger.classList.toggle("active");
      }
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id], header[id]");
  const navItems = document.querySelectorAll(".nav-item");

  function setActiveNav() {
    let current = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
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

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu
        if (navLinks) {
          navLinks.classList.remove("active");
        }
      }
    });
  });

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    createParticles();
  }

  function createParticles() {
    const particleCount = 30;
    const emojis = ["✨", "⭐", "💫", "🌟", "❄️"];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: particle-float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
      particlesContainer.appendChild(particle);
    }
  }

  // Add particle animation to styles
  const particleStyle = document.createElement("style");
  particleStyle.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-50px) translateX(30px) rotate(90deg);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-20px) translateX(-20px) rotate(180deg);
                opacity: 0.4;
            }
            75% {
                transform: translateY(-40px) translateX(10px) rotate(270deg);
                opacity: 0.7;
            }
        }
    `;
  document.head.appendChild(particleStyle);

  // ===== TILT EFFECT =====
  const tiltCards = document.querySelectorAll("[data-tilt]");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ===== ACCORDION =====
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all items
        accordionItems.forEach((accItem) => {
          accItem.classList.remove("active");
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // Open first accordion by default
  if (accordionItems.length > 0) {
    accordionItems[0].classList.add("active");
  }

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Stagger children animations
        const children = entry.target.querySelectorAll(".stagger-child");
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add("animate-in");
        });
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(
    ".bento-item, .timeline-item, .reminder-orb, .tip-item, .activity-card-3d, .glass-card, .accordion-item",
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    scrollObserver.observe(el);
  });

  // Add animation styles
  const animationStyle = document.createElement("style");
  animationStyle.textContent = `
        .animate-in {
            animation: scrollFadeIn 0.6s ease forwards;
        }
        
        @keyframes scrollFadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(animationStyle);

  // ===== MAGNETIC ELEMENTS =====
  const magneticElements = document.querySelectorAll(".magnetic-element");

  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });

  // ===== TEXT ANIMATIONS =====
  const splitTextElements = document.querySelectorAll(".split-text");

  splitTextElements.forEach((el) => {
    const text = el.textContent;
    el.innerHTML = "";

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${index * 0.05}s`;
      span.className = "char";
      el.appendChild(span);
    });
  });

  // ===== PARALLAX EFFECT FOR BLOBS =====
  const blobs = document.querySelectorAll(".blob");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    blobs.forEach((blob, index) => {
      const speed = 0.1 + index * 0.05;
      blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===== 3D CARD FLIP HOVER =====
  const flip3DCards = document.querySelectorAll(".activity-card-3d");

  flip3DCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const inner = card.querySelector(".card-inner");
      if (inner) {
        inner.style.transform = "rotateY(180deg)";
      }
    });

    card.addEventListener("mouseleave", () => {
      const inner = card.querySelector(".card-inner");
      if (inner) {
        inner.style.transform = "rotateY(0)";
      }
    });
  });

  // ===== COUNTER ANIMATION =====
  function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + range * easeProgress);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== CONFETTI ON THANK YOU SECTION =====
  const thankyouSection = document.querySelector(".thankyou-section");
  let confettiCreated = false;

  const thankyouObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !confettiCreated) {
          confettiCreated = true;
          createConfettiExplosion();
        }
      });
    },
    { threshold: 0.3 },
  );

  if (thankyouSection) {
    thankyouObserver.observe(thankyouSection);
  }

  function createConfettiExplosion() {
    const colors = [
      "#FF6B9D",
      "#FFD93D",
      "#6ECFFF",
      "#6BCB77",
      "#7C5CBF",
      "#FF9F45",
    ];
    const container = document.querySelector(".thankyou-wrapper");

    if (!container) return;

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        const size = Math.random() * 10 + 5;
        const isCircle = Math.random() > 0.5;

        confetti.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: 50%;
                    top: 50%;
                    border-radius: ${isCircle ? "50%" : "0"};
                    pointer-events: none;
                    z-index: 100;
                `;

        container.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 500 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        confetti.animate(
          [
            {
              transform: "translate(-50%, -50%) rotate(0deg)",
              opacity: 1,
            },
            {
              transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) rotate(${Math.random() * 720}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 2000 + Math.random() * 1000,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          },
        ).onfinish = () => confetti.remove();
      }, i * 20);
    }
  }

  // ===== TYPING EFFECT FOR HERO =====
  const heroSubtitle = document.querySelector(".hero-subtitle span");
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = "";
    heroSubtitle.style.borderRight = "2px solid #FF6B9D";

    let charIndex = 0;

    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          heroSubtitle.textContent += text[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          heroSubtitle.style.borderRight = "none";
        }
      }, 50);
    }, 1500);
  }

  // ===== FLOATING ELEMENTS RANDOM MOVEMENT =====
  const floatingElements = document.querySelectorAll(".floating-card, .shape");

  floatingElements.forEach((el, index) => {
    let startX = 0,
      startY = 0;

    setInterval(
      () => {
        const randomX = (Math.random() - 0.5) * 30;
        const randomY = (Math.random() - 0.5) * 30;
        const randomRotate = (Math.random() - 0.5) * 10;

        el.style.transition = "transform 2s ease-in-out";
        el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
      },
      3000 + index * 500,
    );
  });

  // ===== SMOOTH REVEAL SECTIONS =====
  const revealSections = document.querySelectorAll(
    ".section-header, .glass-card",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.2 },
  );

  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });

  // Add reveal styles
  const revealStyle = document.createElement("style");
  revealStyle.textContent = `
        .section-header, .glass-card {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .section-header.revealed, .glass-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(revealStyle);

  // ===== MOUSE TRAIL EFFECT =====
  let mouseTrailEnabled = true;
  const trails = [];
  const maxTrails = 20;

  if (mouseTrailEnabled) {
    document.addEventListener("mousemove", (e) => {
      if (Math.random() > 0.7) {
        createTrail(e.clientX, e.clientY);
      }
    });
  }

  function createTrail(x, y) {
    const trail = document.createElement("div");
    const emojis = ["⭐", "✨", "💫", "🌟"];

    trail.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 10 + 10}px;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            transform: translate(-50%, -50%);
        `;

    document.body.appendChild(trail);
    trails.push(trail);

    trail.animate(
      [
        { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        { opacity: 0, transform: "translate(-50%, -100%) scale(0.5)" },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      },
    ).onfinish = () => {
      trail.remove();
      trails.shift();
    };

    // Limit trails
    if (trails.length > maxTrails) {
      const oldTrail = trails.shift();
      oldTrail.remove();
    }
  }

  // ===== SCROLL PROGRESS INDICATOR =====
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FF6B9D, #7C5CBF, #6ECFFF);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      window.scrollBy({ top: -window.innerHeight * 0.8, behavior: "smooth" });
    }
  });

  // ===== EASTER EGG - KONAMI CODE =====
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateRainbowMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateRainbowMode() {
    document.body.style.animation = "rainbow-bg 5s linear infinite";

    const rainbowStyle = document.createElement("style");
    rainbowStyle.textContent = `
            @keyframes rainbow-bg {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(rainbowStyle);

    // Create rainbow confetti burst
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.innerHTML = ["🌈", "⭐", "✨", "💫", "🎉", "🎊"][
          Math.floor(Math.random() * 6)
        ];
        confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    font-size: ${Math.random() * 30 + 20}px;
                    pointer-events: none;
                    z-index: 100000;
                `;
        document.body.appendChild(confetti);

        confetti.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            {
              transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 3000 + Math.random() * 2000,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          },
        ).onfinish = () => confetti.remove();
      }, i * 30);
    }

    setTimeout(() => {
      document.body.style.animation = "";
    }, 10000);
  }

  // ===== INTERACTIVE ORBIT ITEMS =====
  const orbitItems = document.querySelectorAll(".orbit-item");

  orbitItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.animation = "none";
      item.offsetHeight; // Trigger reflow
      item.style.animation = "pulse 0.5s ease";

      // Show tooltip
      const content = item.querySelector(".orbit-content");
      if (content) {
        content.style.transform = "scale(1.1)";
        setTimeout(() => {
          content.style.transform = "scale(1)";
        }, 300);
      }
    });
  });

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c🌟 Little Stars Classroom Newsletter 🌟",
    "font-size: 24px; color: #FF6B9D; font-weight: bold; text-shadow: 2px 2px #7C5CBF;",
  );
  console.log(
    "%cBuilt with ❤️ for Early Childhood Education",
    "font-size: 14px; color: #7C5CBF;",
  );
  console.log(
    "%c💡 Try the Konami code for a surprise!",
    "font-size: 12px; color: #6BCB77;",
  );

  // ===== PERFORMANCE OPTIMIZATION =====
  // Reduce animations for users who prefer reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty(
      "--animation-duration",
      "0.01ms",
    );
    mouseTrailEnabled = false;

    const allAnimated = document.querySelectorAll("*");
    allAnimated.forEach((el) => {
      el.style.animationDuration = "0.01ms";
      el.style.animationIterationCount = "1";
      el.style.transitionDuration = "0.01ms";
    });
  }

  // ===== INITIALIZE PRINT FUNCTION =====
  window.printNewsletter = function () {
    window.print();
  };

  console.log("🎉 Newsletter loaded successfully!");
});
