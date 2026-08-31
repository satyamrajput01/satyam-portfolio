// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
  ".about-content, .about-photo, .skill-card, .process-item, .project, .soft-grid div, .contact-item"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});


const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach((element) => {
  observer.observe(element);
});


// ================= NAVBAR SCROLL EFFECT =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {

    navbar.style.background = "rgba(5, 5, 5, 0.95)";

  } else {

    navbar.style.background = "rgba(8, 8, 8, 0.82)";

  }

});


// ================= PROJECT HOVER =================

document.querySelectorAll(".project").forEach((project) => {

  project.addEventListener("mouseenter", () => {

    project.style.borderTopColor = "#ff3045";

  });

  project.addEventListener("mouseleave", () => {

    project.style.borderTopColor = "#242424";

  });

});


// ================= CONTACT EMAIL =================

const emailLinks = document.querySelectorAll(
  'a[href^="mailto:"]'
);

emailLinks.forEach((link) => {

  link.addEventListener("click", () => {

    console.log("Opening email client...");

  });

});


// ================= PAGE LOAD =================

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});