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
  ".about-content, .about-photo, .skill-card, .certification-card, .process-item, .project, .soft-grid div, .contact-item"
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


// ================= CERTIFICATE VIEWER =================

const certificateViewer = document.querySelector(".certificate-viewer");

if (certificateViewer instanceof HTMLDialogElement) {

  const certificateFrame = certificateViewer.querySelector("iframe");
  const certificateImage = certificateViewer.querySelector(".certificate-viewer-image");
  const certificateTitle = certificateViewer.querySelector("#certificate-viewer-title");
  const closeCertificateViewer = certificateViewer.querySelector(".certificate-viewer-close");

  document.querySelectorAll(".certificate-button").forEach((button) => {

    button.addEventListener("click", () => {

      const certificatePath = button.dataset.certificate;
      const certificateType = button.dataset.certificateType;
      const title = button.dataset.certificateTitle;

      if (!certificatePath || !title || !certificateFrame || !certificateImage || !certificateTitle) {
        return;
      }

      certificateTitle.textContent = title;
      certificateFrame.hidden = certificateType === "image";
      certificateImage.hidden = certificateType !== "image";

      if (certificateType === "image") {
        certificateFrame.src = "about:blank";
        certificateImage.src = certificatePath;
        certificateImage.alt = `${title} certificate`;
      } else {
        certificateImage.removeAttribute("src");
        certificateImage.alt = "";
        certificateFrame.title = `${title} certificate`;
        certificateFrame.src = `${certificatePath}#page=1&toolbar=0&navpanes=0`;
      }

      certificateViewer.showModal();

    });

  });

  closeCertificateViewer?.addEventListener("click", () => {
    certificateViewer.close();
  });

  certificateViewer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      certificateViewer.close();
    }
  });

  certificateViewer.addEventListener("click", (event) => {
    if (event.target === certificateViewer) {
      certificateViewer.close();
    }
  });

  certificateViewer.addEventListener("close", () => {
    if (certificateFrame) {
      certificateFrame.src = "about:blank";
    }
    if (certificateImage) {
      certificateImage.removeAttribute("src");
    }
  });

}


// ================= PAGE LOAD =================

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});