window.onload = function () {
  setTimeout(function () {
    document.getElementById("popupOverlay").style.display = "flex";
  }, 5000);
};

document.getElementById("close-btn").onclick = function () {
  document.getElementById("popupOverlay").style.display = "none";
};

window.onclick = function (event) {
  if (event.target === document.getElementById("popupOverlay")) {
    document.getElementById("popupOverlay").style.display = "none";
  }
};


document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");

  navbarToggler.addEventListener("click", function () {
    this.classList.toggle("open");
  });
});

window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    const toggle = item.querySelector(".faq-toggle");
    toggle.textContent = toggle.textContent === "+" ? "-" : "+";
  });
});

// appmarketPlace tabs section
function appmarketPlace(event, sectionId) {
  document.querySelectorAll(".marketplace_tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".tabcontent").forEach((content) => {
    content.classList.remove("active");
  });

  event.currentTarget.classList.add("active");

  document.getElementById(sectionId).classList.add("active");
}

// Form Integrations
document.addEventListener("DOMContentLoaded", () => {
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Stop form from reloading

    // Fetch values using FormData
    const formData = new FormData(event.target);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const city = formData.get("city").trim();
    const restaurant = formData.get("restaurant").trim();

    console.log("📋 Form Values:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("City:", city);
    console.log("Restaurant:", restaurant);

    // Check if any field is empty
    if (!name || !email || !phone || !city || !restaurant) {
      alert("⚠️ All fields are required!");
      return;
    }

    const requestData = { name, email, phone, city, restaurant };
    console.log("🚀 Sending Data:", requestData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/submit-consultation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      console.log("📨 Response Data:", data);

      const responseMessage = document.createElement("p");
      responseMessage.style.fontWeight = "bold";

      if (response.ok) {
        responseMessage.style.color = "green";
        responseMessage.textContent = data.message;
        event.target.reset(); // Reset the form
      } else {
        responseMessage.style.color = "red";
        responseMessage.textContent = data.error;
      }

      event.target.appendChild(responseMessage);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      alert("Error submitting form. Try again later.");
    }
  };

  // Attach event listener to both forms if they exist
  const demoForm = document.getElementById("demoForm");
  const consultationForm = document.getElementById("consultationForm");

  if (demoForm) {
    demoForm.addEventListener("submit", handleFormSubmit);
  }

  if (consultationForm) {
    consultationForm.addEventListener("submit", handleFormSubmit);
  }
});

// Stats Section
document.addEventListener("DOMContentLoaded", () => {
  function animateValue(element, start, end, duration, suffix) {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.innerText =
        Math.floor(progress * (end - start) + start).toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.innerText = end.toLocaleString() + suffix;
      }
    };
    requestAnimationFrame(step);
  }

  const stats = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const endValue = stat.innerText;
          const match = endValue.match(/([0-9,]+)([A-Za-z%]*)/);
          if (match) {
            const parsedValue = parseFloat(match[1].replace(/,/g, ""));
            const suffix = match[2] || "";
            stat.innerText = "0" + suffix;
            animateValue(stat, 0, parsedValue, 2000, suffix);
          }
          observer.unobserve(stat);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
});



