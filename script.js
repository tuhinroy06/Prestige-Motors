/**
 * ========================================================
 * PRESTIGE MOTORS - JAVASCRIPT FILE
 * Mapped to CAP135 Syllabus (Unit V & VI):
 * - Comments, variables (let, const), data types, operators
 * - JavaScript Objects & Array
 * - Loops (forEach), Conditionals (if/else & switch)
 * - Functions
 * - Browser Object Model (Window, Document, getElementById, innerHTML, textContent)
 * - Form Validation & Email Validation
 * - Web Storage (LocalStorage)
 * ========================================================
 */

// 1. CAR DATASET (Unit VI: JavaScript Objects & Array)
const cars = [
  {
    id: 1,
    name: "Rolls-Royce Ghost",
    category: "Sedan",
    price: "$395,000",
    engine: "6.75L V12 (563 HP)",
    img: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    price: "$302,000",
    engine: "6.0L W12 (650 HP)",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Porsche 911 Turbo S",
    category: "Supercar",
    price: "$230,000",
    engine: "3.8L Flat-6 (640 HP)",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Mercedes-Maybach S 680",
    category: "Sedan",
    price: "$229,000",
    engine: "6.0L V12 (621 HP)",
    img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
  }
];

// 2. HELPER FUNCTION WITH SWITCH STATEMENT (Unit VI: Switch & Operators)
function getCategoryTag(category) {
  let tag = "";
  switch (category) {
    case "Supercar":
      tag = "⚡ High Performance";
      break;
    case "Grand Tourer":
      tag = "🏁 Grand Tourer";
      break;
    case "Sedan":
      tag = "👑 Ultra Luxury";
      break;
    default:
      tag = "✨ Exclusive";
  }
  return tag;
}

// 3. DISPLAY CARS (Unit VI: DOM Manipulation, innerHTML & Loops)
const carList = document.getElementById("carList");

function renderCars() {
  carList.innerHTML = ""; // Clear existing content
  
  // Unit II: Web Storage (localStorage)
  const favs = JSON.parse(localStorage.getItem("favCars")) || [];

  // Unit VI: forEach loop
  cars.forEach(car => {
    const isFav = favs.includes(car.id);
    const tag = getCategoryTag(car.category);

    carList.innerHTML += `
      <div class="car-card">
        <img src="${car.img}" alt="${car.name}">
        <div class="card-details">
          <small style="color: #c5a059; font-weight: bold;">${tag}</small>
          <h3>${car.name}</h3>
          <p class="gold">${car.price}</p>
          <p>${car.engine}</p>
          <button type="button" class="btn-card-fav" onclick="toggleFav(${car.id})">
            ${isFav ? "❤️ Saved" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    `;
  });

  // Unit VI: textContent property
  document.getElementById("favCount").textContent = favs.length;
}

// 4. WEB STORAGE: LOCALSTORAGE API (Unit II & VI)
function toggleFav(id) {
  let favs = JSON.parse(localStorage.getItem("favCars")) || [];

  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id); // Remove
  } else {
    favs.push(id); // Add
  }

  localStorage.setItem("favCars", JSON.stringify(favs));
  renderCars();
}

// Unit VI: Window Object (window.alert) & Events (click)
document.getElementById("favBtn").addEventListener("click", () => {
  const favs = JSON.parse(localStorage.getItem("favCars")) || [];
  if (favs.length === 0) {
    window.alert("You have not saved any cars yet!");
  } else {
    const names = cars.filter(c => favs.includes(c.id)).map(c => c.name).join("\n- ");
    window.alert("Your Saved Cars:\n- " + names);
  }
});

// 5. FORM VALIDATION & EMAIL VALIDATION (Unit VI: Validation)
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Unit V: Understanding Events - stop refresh

  // Unit VI: getElementById and Variables
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Unit VI: If Statements & Logical Operators (||, &&, <)
  if (name === "" || email === "" || phone === "" || message === "") {
    formMsg.className = "form-msg error";
    formMsg.innerText = "Please fill in all fields."; // Unit VI: innerText property
    return;
  }

  // Email validation (checks for @ and .)
  if (!email.includes("@") || !email.includes(".")) {
    formMsg.className = "form-msg error";
    formMsg.innerText = "Please enter a valid email address.";
    return;
  }

  // Phone validation (minimum 10 digits)
  if (phone.length < 10) {
    formMsg.className = "form-msg error";
    formMsg.innerText = "Phone number must be at least 10 digits.";
    return;
  }

  // Success output
  formMsg.className = "form-msg success";
  formMsg.innerText = `Thank you, ${name}! Your inquiry has been sent.`;
  contactForm.reset();
});

// Initial function call
renderCars();
