document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAVBAR
  ========================== */

  const nav = document.querySelector(".nav");

  function updateNavbar() {

    if (!nav) return;

    nav.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =========================
     REVEAL ANIMATIONS
  ========================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =========================
     MOBILE MENU
  ========================== */

  const links =
    document.querySelector(".links");

  if (nav && links) {

    const menuButton =
      document.createElement("button");

    menuButton.className =
      "menuToggle";

    menuButton.setAttribute(
      "aria-label",
      "Ouvrir le menu"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    nav.appendChild(menuButton);


    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          links.classList.toggle("open");

        menuButton.classList.toggle(
          "active",
          isOpen
        );

        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    /* Fermer après clic */

    links
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            links.classList.remove(
              "open"
            );

            menuButton.classList.remove(
              "active"
            );

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });


    /* Fermer avec ESC */

    document.addEventListener(
      "keydown",
      event => {

        if (event.key !== "Escape")
          return;

        links.classList.remove(
          "open"
        );

        menuButton.classList.remove(
          "active"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  }


  /* =========================
     SMOOTH SCROLL
  ========================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          const navHeight =
            nav?.offsetHeight || 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navHeight -
            12;

          window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

          });

        }
      );

    });


  /* =========================
     ACTIVE NAV LINK
  ========================== */

  const sections =
    document.querySelectorAll(
      "header[id], section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      '.links a[href^="#"]'
    );

  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            const id =
              entry.target.id;

            navLinks.forEach(link => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${id}`
              );

            });

          });

        },
        {
          threshold: 0.2,

          rootMargin:
            "-20% 0px -60% 0px"
        }
      );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* =========================
     CURRENT YEAR
  ========================== */

  document
    .querySelectorAll("[data-year]")
    .forEach(element => {

      element.textContent =
        new Date().getFullYear();

    });

});
