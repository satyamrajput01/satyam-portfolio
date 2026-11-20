// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      if (this.classList.contains("skip-link")) {
        target.focus({ preventScroll: true });
      }

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });

    }

  });

});

// ================= MOBILE NAVIGATION =================

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");

const closeMenu = () => {
  navbar.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
};

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navbar.classList.toggle("menu-open", !isExpanded);
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});


// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
  ".about-content, .about-photo, .skill-card, .certification-card, .process-item, .project, .soft-grid div, .contact-item"
);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -35px 0px",
      threshold: 0.08
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

const sectionLinks = [...navMenu.querySelectorAll('a[href^="#"]')];
const navigationSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeLink = navMenu.querySelector(`a[href="#${entry.target.id}"]`);

        sectionLinks.forEach((link) => {
          if (link === activeLink) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  navigationSections.forEach((section) => {
    navigationObserver.observe(section);
  });
}


// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 24);
}, { passive: true });


// ================= CONTACT EMAIL =================

const emailLinks = document.querySelectorAll(
  'a[href^="mailto:"]'
);

emailLinks.forEach((link) => {

  link.addEventListener("click", () => {

    console.log("Opening email client...");

  });

});


// ================= CERTIFICATE PREVIEWS =================

document.querySelectorAll(".certificate-thumbnail").forEach((image) => {
  const preview = image.closest(".certificate-preview");

  if (!preview) {
    return;
  }

  const showThumbnail = () => preview.classList.add("has-thumbnail");
  const showFallback = () => preview.classList.add("preview-image-failed");

  image.addEventListener("load", showThumbnail, { once: true });
  image.addEventListener("error", showFallback, { once: true });

  if (image.complete) {
    if (image.naturalWidth > 0) {
      showThumbnail();
    } else {
      showFallback();
    }
  }
});


// ================= PAGE LOAD =================

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});