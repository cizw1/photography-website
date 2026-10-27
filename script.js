
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const enquiryForm = document.getElementById("enquiry-form");
const formMessage = document.getElementById("form-message");

// Mobile navigation menu
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Submit the enquiry without leaving the website
enquiryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) {
    return;
  }

  const submitButton = enquiryForm.querySelector(
    'button[type="submit"]'
  );

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formMessage.textContent = "";

  try {
    const response = await fetch(enquiryForm.action, {
      method: "POST",
      body: new FormData(enquiryForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("The enquiry could not be sent.");
    }

    formMessage.textContent =
      "Thank you! Your enquiry has been sent successfully.";
    formMessage.style.color = "#286b47";
    enquiryForm.reset();
  } catch (error) {
    formMessage.textContent =
      "Sorry, your enquiry could not be sent. Please try again.";
    formMessage.style.color = "#b42318";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Enquiry";
  }
});
