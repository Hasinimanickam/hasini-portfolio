const typingText = document.getElementById("typing-text");

const roles = [
  "Machine Learning Engineer",
  "AI Project Builder",
  "Data Science Learner"
];

let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];

  if (deleting) {
    charIndex--;
    typingText.textContent = currentRole.slice(0, charIndex);

    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, 55);
  } else {
    const nextRole = roles[roleIndex];
    charIndex++;
    typingText.textContent = nextRole.slice(0, charIndex);

    if (charIndex >= nextRole.length) {
      deleting = true;
      setTimeout(typeRole, 1400);
    } else {
      setTimeout(typeRole, 85);
    }
  }
}

setTimeout(typeRole, 1400);

// ===== PROJECT DETAILS POPUP =====


const projectDetails = [
    {
        name: "House Price Prediction",
        description: "A machine learning project that uses housing data to predict house prices and evaluate model performance.",
        tech: ["Python", "Pandas", "Linear Regression", "Matplotlib"]
    },
    {
        name: "Retail Sales & Inventory Copilot",
        description: "An interactive dashboard for retail sales analysis, inventory monitoring, low-stock alerts, charts and AI-assisted business questions.",
        tech: ["Python", "Streamlit", "Pandas", "Gemini AI"]
    },
    {
        name: "Heart Rate AI",
        description: "An AI healthcare learning project focused on analyzing heart-rate data and exploring unusual patterns using machine learning. It is for educational purposes and is not a medical diagnostic tool.",
        tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"]
    },
    {
        name: "Smart Emergency Safety",
        description: "A Flask-based web application with SOS support, emergency contacts, location features and emergency-service access.",
        tech: ["Python", "Flask", "SQLite", "JavaScript"]
    }
];


const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalClose = document.getElementById("modal-close");

if (projectModal && modalTitle && modalDescription && modalTech && modalClose) {
    const projectCards = document.querySelectorAll("#projects .card");

    projectCards.forEach((card, index) => {
        const project = projectDetails[index];
        if (!project) return;

        card.style.cursor = "pointer";

        card.addEventListener("click", (event) => {
            if (event.target.closest("a")) return;

            modalTitle.textContent = project.name;
            modalDescription.textContent = project.description;
            modalTech.replaceChildren();

            project.tech.forEach((technology) => {
                const tag = document.createElement("span");
                tag.textContent = technology;
                modalTech.appendChild(tag);
            });

            projectModal.classList.add("show");
            projectModal.setAttribute("aria-hidden", "false");
            modalClose.focus();
        });
    });

    function closeProjectModal() {
        projectModal.classList.remove("show");
        projectModal.setAttribute("aria-hidden", "true");
    }

    modalClose.addEventListener("click", closeProjectModal);

    projectModal.addEventListener("click", (event) => {
        if (event.target === projectModal) {
            closeProjectModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProjectModal();
        }
    });
}




// ===== MOBILE MENU =====

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Contact form - opens the visitor's email app
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document
      .getElementById("contact-name").value.trim();

    const senderEmail = document
      .getElementById("contact-email").value.trim();

    const message = document
      .getElementById("contact-message").value.trim();

    const recipient = "YOUR_EMAIL@gmail.com";

    if (!name || !senderEmail || !message) {
      return;
    }

    const subject = encodeURIComponent(
      "Portfolio Contact - " + name
    );

    const body = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + senderEmail +
      "\n\nMessage:\n" + message
    );

    window.location.href =
      "mailto:" + recipient +
      "?subject=" + subject +
      "&body=" + body;
  });
}


/* =========================================
   EXTRA PORTFOLIO INTERACTIONS
========================================= */

(() => {
    "use strict";

    /* 1. INTERACTIVE SKILLS EXPLORER */

    const skillData = {
        python: {
            category: "PROGRAMMING",
            title: "Python",
            description:
                "Used for programming, data handling and machine learning practice.",
            project:
                "Related learning: House Price Prediction and data-focused projects."
        },
        java: {
            category: "PROGRAMMING",
            title: "Java",
            description:
                "Learning object-oriented programming and Java fundamentals.",
            project:
                "Related learning: Java programming concepts and coursework."
        },
        data: {
            category: "DATA SCIENCE",
            title: "Data Analysis",
            description:
                "Exploring data preparation, analysis and visualization techniques.",
            project:
                "Related learning: Retail Sales & Inventory Copilot."
        },
        ml: {
            category: "ARTIFICIAL INTELLIGENCE",
            title: "Machine Learning",
            description:
                "Learning how data and machine learning methods can be used to explore patterns and make predictions.",
            project:
                "Related learning: House Price Prediction and Heart Rate AI."
        },
        web: {
            category: "WEB DEVELOPMENT",
            title: "Web Development",
            description:
                "Building web interfaces and learning how frontend and backend components work together.",
            project:
                "Related learning: Smart Emergency Safety and this portfolio."
        }
    };

    const skillButtons = document.querySelectorAll(".explorer-button");
    const skillCategory = document.getElementById("explorer-category");
    const skillTitle = document.getElementById("explorer-title");
    const skillDescription = document.getElementById("explorer-description");
    const skillProject = document.getElementById("explorer-project");

    skillButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedSkill = skillData[button.dataset.skill];

            if (!selectedSkill) return;

            skillButtons.forEach((item) => {
                item.classList.toggle("active", item === button);
            });

            skillCategory.textContent = selectedSkill.category;
            skillTitle.textContent = selectedSkill.title;
            skillDescription.textContent = selectedSkill.description;
            skillProject.textContent = selectedSkill.project;
        });
    });


    /* 2. INTERACTIVE PORTFOLIO TERMINAL */

    const terminalForm = document.getElementById("terminal-form");
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    if (terminalForm && terminalInput && terminalOutput) {
        const commands = {
            help:
                "Available commands: help, about, skills, projects, contact, clear",

            about:
                "I am an AI & Data Science student building my skills through learning and practical projects.",

            skills:
                "Explore Python, Java, Data Analysis, Machine Learning and Web Development in the Skills Explorer.",

            projects:
                "Explore House Price Prediction, Retail Sales & Inventory Copilot, Heart Rate AI and Smart Emergency Safety in the Projects section.",

            contact:
                "Scroll to the Contact section to find the available contact links."
        };

        terminalForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const command = terminalInput.value
                .trim()
                .toLowerCase();

            if (!command) return;

            const commandLine = document.createElement("p");
            commandLine.textContent = "visitor@portfolio:~$ " + command;
            terminalOutput.appendChild(commandLine);

            if (command === "clear") {
                terminalOutput.replaceChildren();
                terminalInput.value = "";
                return;
            }

            const result = document.createElement("p");

            result.textContent = commands[command] ||
                'Command not found. Type "help" to see available commands.';

            terminalOutput.appendChild(result);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            terminalInput.value = "";
            terminalInput.focus();
        });
    }


    /* 3. PORTFOLIO ASSISTANT */

    const assistantAnswer = document.getElementById("assistant-answer");
    const assistantButtons = document.querySelectorAll(".assistant-question");

    const assistantResponses = {
        about:
            "Hasini is an AI & Data Science student interested in Artificial Intelligence, Machine Learning and Data Science. She is developing her technical skills through practical projects.",

        projects:
            "Her portfolio features House Price Prediction, Retail Sales & Inventory Copilot, Heart Rate AI and Smart Emergency Safety. Open the Projects section to explore the available project details and repository links.",

        skills:
            "Her learning areas include Python, Java, Data Analysis, Machine Learning and Web Development. The Skills section provides more details about her technical interests.",

        goal:
            "Her stated career goal is to grow into a Machine Learning Engineer and contribute to projects that address real-world problems using AI."
    };

    assistantButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const answer = assistantResponses[button.dataset.answer];

            if (assistantAnswer && answer) {
                assistantAnswer.textContent = answer;
            }
        });
    });

})();




/* =====================================
   PROJECT CARD INTERACTIONS
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(
        "#projects .project-card"
    );

    projectCards.forEach((card) => {
        const details = card.querySelector(".case-study");

        if (!details) return;

        details.addEventListener("toggle", () => {
            card.classList.toggle(
                "project-details-open",
                details.open
            );
        });
    });
});


/* ===== UNIFIED SCROLL REVEAL ANIMATION ===== */

document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealItems = document.querySelectorAll(
        ".hero-content > *, .hero-profile, .hero-visual, " +
        "main section, .certificate-card, .journey-item, " +
        ".status-card, .assistant-card, .explorer-result"
    );

    // Accessibility: show everything without animation if requested.
    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => {
            item.classList.add("animation-visible");
        });
        return;
    }

    revealItems.forEach((item, index) => {
        item.classList.add("animation-reveal");
        item.style.setProperty(
            "--reveal-delay",
            `${Math.min(index % 6, 5) * 80}ms`
        );
    });

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("animation-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealItems.forEach((item) => observer.observe(item));
});




/* ==================================
   NAVBAR INTERACTIONS
   ================================== */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("main-navbar");
    const toggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-link");

    if (!navbar || !toggle || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
    };

    // Mobile menu open / close
    toggle.addEventListener("click", () => {
        const isOpen =
            toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute("aria-expanded", String(!isOpen));
        toggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("nav-open", !isOpen);
    });

    // Smooth scrolling and menu close
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);
            closeMenu();
        });
    });

    // Navbar shadow on scroll
    const updateNavbar = () => {
        navbar.classList.toggle("nav-scrolled", window.scrollY > 20);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    // Highlight the current section while scrolling
    const sectionLinks = Array.from(links)
        .map((link) => ({
            link,
            section: document.querySelector(
                link.getAttribute("href")
            )
        }))
        .filter((item) => item.section);

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (!visible.length) return;

                const currentSection = visible[0].target;

                sectionLinks.forEach(({ link, section }) => {
                    const isActive = section === currentSection;

                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        sectionLinks.forEach(({ section }) => {
            observer.observe(section);
        });
    }

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            toggle.focus();
        }
    });

    // Close menu when switching to desktop layout
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});


/* ===== SKILLS SCROLL ANIMATION ===== */

document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#skills");

  if (!skillsSection) return;

  const skillCards = skillsSection.querySelectorAll(".skill-card");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Respect accessibility preferences
  if (reduceMotion || !("IntersectionObserver" in window)) {
    skillCards.forEach((card) => {
      card.classList.add("skill-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(skillCards).indexOf(card);

          card.style.transitionDelay = `${index * 90}ms`;
          card.classList.add("skill-visible");

          currentObserver.unobserve(card);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  skillCards.forEach((card) => observer.observe(card));
});

