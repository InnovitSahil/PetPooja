// Scroll top bottom
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scroll-top-btn");

  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 2) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});


// view DemoForm
document
  .getElementById("bookDemoBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default action
    document.getElementById("demoForm").scrollIntoView({ behavior: "smooth" });
  });


// billing faqs
document.querySelectorAll(".accordion_head").forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.parentNode;
    const content = parent.querySelector(".accordion_content");

    // Collapse all others
    document.querySelectorAll(".accordion_body").forEach((body) => {
      if (body !== parent) {
        body.classList.remove("active");
        body.querySelector(".accordion_content").style.maxHeight = "0px";
      }
    });

    // Toggle the current one
    parent.classList.toggle("active");
    content.style.maxHeight = parent.classList.contains("active")
      ? content.scrollHeight + "px"
      : "0px";
  });
});


// active navbar links 
document.addEventListener("DOMContentLoaded", function () {
  let currentPage = window.location.pathname.split("/").pop();

  let navLinks = document.querySelectorAll(".navbar-nav .nav-link"); 
  let dropdownItems = document.querySelectorAll(".dropdown-menu .dropdown-item"); 

  function setActiveLink(links) {
    links.forEach(link => {
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");

        let parentDropdown = link.closest(".dropdown-menu")?.previousElementSibling;
        if (parentDropdown) {
          parentDropdown.classList.add("active-dropdown");
        }
      }
    });
  }

  setActiveLink(navLinks);
  setActiveLink(dropdownItems);
});


// Navbar Dropdown section
document.addEventListener("DOMContentLoaded", function () {
  function handleDropdownBehavior() {
    document
      .querySelectorAll(".nav-item.dropdown")
      .forEach(function (dropdown) {
        const menu = dropdown.querySelector(".dropdown-menu");
        const toggle = dropdown.querySelector(".nav-link");

        // Reset event listeners
        dropdown.onmouseenter = null;
        dropdown.onmouseleave = null;
        toggle.onclick = null;

        if (window.innerWidth >= 992) {
          // Desktop: Open on Hover
          dropdown.addEventListener("mouseenter", function () {
            menu.classList.add("show");
          });
          dropdown.addEventListener("mouseleave", function () {
            menu.classList.remove("show");
          });
        } else {
          // Mobile: Open on Click
          toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Close other open dropdowns
            document.querySelectorAll(".nav-item.dropdown").forEach((item) => {
              if (item !== dropdown) {
                item.classList.remove("show");
                item.querySelector(".dropdown-menu").classList.remove("show");
              }
            });

            // Toggle current dropdown
            menu.classList.toggle("show");
            dropdown.classList.toggle("show");
          });
        }
      });
  }

  handleDropdownBehavior();

  window.addEventListener("resize", handleDropdownBehavior);

  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-menu.show").forEach(function (menu) {
      if (!menu.parentElement.contains(event.target)) {
        menu.classList.remove("show");
        menu.parentElement.classList.remove("show");
      }
    });
  });
});