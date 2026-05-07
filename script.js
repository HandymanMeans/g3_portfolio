// MENU ATIVO
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// FORM + LOADER + TOAST
const form = document.getElementById("form");
const btn = document.getElementById("btn");
const loader = document.querySelector(".loader");
const text = document.querySelector(".btn-text");
const toast = document.getElementById("toast");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  loader.classList.remove("hidden");
  text.textContent = "Enviando...";

  const data = new FormData(form);

  const res = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  loader.classList.add("hidden");
  text.textContent = "Enviar";

  if (res.ok) {
    form.reset();
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});

const toggle = document.getElementById("themeToggle");

// carregar preferência salva
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  toggle.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});