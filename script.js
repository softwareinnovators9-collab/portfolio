const contactForm = document.querySelector(".contact-form");
const FORM_ENDPOINT = "https://formspree.io/f/mqknjzbl"; 

if (contactForm) {
  const status = document.createElement("p");
  status.className = "form-status";
  status.style.marginTop = "4px";
  status.style.fontWeight = "600";
  status.style.fontSize = "0.95rem";
  contactForm.appendChild(status);

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    status.textContent = "Sending...";
    status.style.color = "#ffd97b";

    const name = contactForm.querySelector("input[name='name']");
    const email = contactForm.querySelector("input[name='email']");
    const message = contactForm.querySelector("textarea[name='message']");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      status.textContent = "Please complete all fields before sending.";
      status.style.color = "#ffc8c8";
      return;
    }

    const data = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
      _subject: `Portfolio message from ${name.value.trim()}`,
      _replyto: email.value.trim(),
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Send failed");
      status.textContent = "Message sent successfully";
      status.style.color = "#b5ffc8";
      contactForm.reset();
    } catch (err) {
      status.textContent = "Unable to send right now. Please try again later.";
      status.style.color = "#ffc8c8";
      console.error(err);
    }
  });
}

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

