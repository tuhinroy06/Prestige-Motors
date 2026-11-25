/**
 * ========================================================
 * PRESTIGE MOTORS - LUXURY AUTOMOBILE SHOWROOM
 * Vanilla JavaScript (ES6+) Implementation
 * 
 * Topics Covered (from CAP135 Syllabus):
 * 1. Variables (let, const) & Data Types
 * 2. Arrays & Objects (Car Collection Data)
 * 3. Loops (forEach, filter, find) & Conditional Statements (if/else)
 * 4. DOM Manipulation (createElement, querySelector, innerHTML, textContent, classList)
 * 5. Event Handling (click, submit, input, change, keydown, DOMContentLoaded)
 * 6. Form Validation & Regular Expressions (Email, Phone, Name)
 * 7. Browser LocalStorage API (Saving & Retrieving Favorite Vehicles)
 * ========================================================
 */

// Wait for the DOM tree to be fully parsed before executing scripts
document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     1. LUXURY CAR DATASET (Array of Objects)
     ====================================================== */
  const luxuryCars = [
    {
      id: "rr-ghost",
      name: "Rolls-Royce Ghost Extended",
      category: "sedan",
      categoryLabel: "Ultra-Luxury Sedan",
      price: "$395,000",
      year: 2026,
      engine: "6.75L Twin-Turbo V12",
      horsepower: "563 HP",
      acceleration: "4.6s (0–60)",
      topSpeed: "155 mph",
      image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1000&q=80",
      description: "The epitome of serenity and acoustic refinement with satellite-aided transmission and handcrafted Starlight headliner."
    },
    {
      id: "bentley-gt",
      name: "Bentley Continental GT Speed",
      category: "grand-tourer",
      categoryLabel: "Grand Tourer",
      price: "$302,000",
      year: 2026,
      engine: "6.0L W12 TSI",
      horsepower: "650 HP",
      acceleration: "3.5s (0–60)",
      topSpeed: "208 mph",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80",
      description: "Handcrafted British grand touring luxury combining athletic agility, diamond-quilted hides, and ferocious 12-cylinder surge."
    },
    {
      id: "porsche-turbo-s",
      name: "Porsche 911 Turbo S",
      category: "supercar",
      categoryLabel: "Supercar",
      price: "$230,000",
      year: 2026,
      engine: "3.8L Twin-Turbo Boxer 6",
      horsepower: "640 HP",
      acceleration: "2.6s (0–60)",
      topSpeed: "205 mph",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
      description: "The ultimate supercar benchmark, fusing active aerodynamics, rear-axle steering, and unrelenting all-wheel acceleration."
    },
    {
      id: "maybach-s680",
      name: "Mercedes-Maybach S 680",
      category: "sedan",
      categoryLabel: "Ultra-Luxury Sedan",
      price: "$229,000",
      year: 2026,
      engine: "6.0L Biturbo V12",
      horsepower: "621 HP",
      acceleration: "4.4s (0–60)",
      topSpeed: "155 mph",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
      description: "First-class executive motoring with active road noise cancellation, handcrafted Nappa leather, and silver champagne flutes."
    },
    {
      id: "aston-db12",
      name: "Aston Martin DB12 Coupe",
      category: "grand-tourer",
      categoryLabel: "Grand Tourer",
      price: "$245,000",
      year: 2026,
      engine: "4.0L Twin-Turbo V8",
      horsepower: "671 HP",
      acceleration: "3.5s (0–60)",
      topSpeed: "202 mph",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80",
      description: "The world's first Super Tourer, fusing assertive British muscular presence with a cutting-edge bespoke digital cockpit."
    },
    {
      id: "ferrari-roma",
      name: "Ferrari Roma Spider",
      category: "supercar",
      categoryLabel: "Supercar",
      price: "$275,000",
      year: 2026,
      engine: "3.9L Turbocharged V8",
      horsepower: "612 HP",
      acceleration: "3.4s (0–60)",
      topSpeed: "199 mph",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80",
      description: "A contemporary representation of the carefree, pleasurable way of life that characterized 1950s and 1960s Rome."
    }
  ];

  /* ======================================================
     2. DOM ELEMENT REFERENCES
     ====================================================== */
  const carGrid = document.getElementById("carGrid");
  const filterButtonsContainer = document.getElementById("filterButtons");
  const carSearchInput = document.getElementById("carSearchInput");
  const emptyState = document.getElementById("emptyState");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  
  // Navigation elements
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const favCountBadge = document.getElementById("favCountBadge");
  const favoritesBtn = document.getElementById("favoritesBtn");

  // Favorites Modal elements
  const favoritesModal = document.getElementById("favoritesModal");
  const closeFavModalBtn = document.getElementById("closeFavModalBtn");
  const favoritesList = document.getElementById("favoritesList");
  const emptyFavorites = document.getElementById("emptyFavorites");
  const clearAllFavsBtn = document.getElementById("clearAllFavsBtn");
  const exploreFromFavsBtn = document.getElementById("exploreFromFavsBtn");

  // Contact Form elements
  const contactForm = document.getElementById("contactForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const vehicleSelect = document.getElementById("vehicleSelect");
  const formAlert = document.getElementById("formAlert");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");

  // Gallery Lightbox elements
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

  // Toast Notification element
  const toastNotification = document.getElementById("toastNotification");

  // State variables
  let currentCategory = "all";
  let currentSearchQuery = "";

  /* ======================================================
     3. LOCALSTORAGE FOR FAVORITES MANAGEMENT
     ====================================================== */
  const STORAGE_KEY = "prestige_motors_favorites";

  /**
   * Retrieves array of saved car IDs from LocalStorage
   * @returns {Array<string>}
   */
  function getFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Could not access localStorage:", e);
      return [];
    }
  }

  /**
   * Saves array of car IDs to LocalStorage
   * @param {Array<string>} favoritesArray 
   */
  function saveFavorites(favoritesArray) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesArray));
      updateFavoritesBadge();
    } catch (e) {
      console.error("Could not save to localStorage:", e);
    }
  }

  /**
   * Checks if a car is currently favorited
   * @param {string} carId 
   * @returns {boolean}
   */
  function isCarFavorite(carId) {
    const favorites = getFavorites();
    return favorites.includes(carId);
  }

  /**
   * Toggles favorite status for a car ID
   * @param {string} carId 
   * @param {string} carName 
   */
  function toggleFavorite(carId, carName) {
    let favorites = getFavorites();
    const index = favorites.indexOf(carId);

    if (index > -1) {
      // Remove from favorites
      favorites.splice(index, 1);
      saveFavorites(favorites);
      showToast(`Removed "${carName}" from favorites.`);
    } else {
      // Add to favorites
      favorites.push(carId);
      saveFavorites(favorites);
      showToast(`Added "${carName}" to your saved favorites.`);
    }

    // Refresh UI states
    renderCarGrid();
    renderFavoritesModal();
  }

  /**
   * Updates badge count in the header navigation
   */
  function updateFavoritesBadge() {
    const favorites = getFavorites();
    if (favCountBadge) {
      favCountBadge.textContent = favorites.length;
      // Subtle pulse animation
      favCountBadge.style.transform = "scale(1.3)";
      setTimeout(() => {
        favCountBadge.style.transform = "scale(1)";
      }, 200);
    }
  }

  /* ======================================================
     4. CAR COLLECTION RENDERING & FILTERING
     ====================================================== */

  /**
   * Filter and render cars matching the active category and search keyword
   */
  function renderCarGrid() {
    if (!carGrid) return;

    // Filter using array methods (filter)
    const filteredCars = luxuryCars.filter(car => {
      const matchesCategory = (currentCategory === "all") || (car.category === currentCategory);
      const query = currentSearchQuery.toLowerCase().trim();
      const matchesSearch = query === "" || 
        car.name.toLowerCase().includes(query) ||
        car.engine.toLowerCase().includes(query) ||
        car.categoryLabel.toLowerCase().includes(query) ||
        car.price.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    // Check if empty
    if (filteredCars.length === 0) {
      carGrid.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    // Build HTML string using template literals and map/forEach
    let cardsHTML = "";

    filteredCars.forEach(car => {
      const isFav = isCarFavorite(car.id);
      const heartClass = isFav ? "is-favorite" : "";
      const favAriaLabel = isFav ? `Remove ${car.name} from favorites` : `Add ${car.name} to favorites`;

      cardsHTML += `
        <article class="car-card" data-id="${car.id}">
          <!-- Card Media Container -->
          <div class="card-media">
            <span class="card-category-badge">${car.categoryLabel}</span>
            <img src="${car.image}" alt="${car.name} in showroom" class="card-img" loading="lazy">
            <!-- Favorite Heart Toggle Button -->
            <button type="button" 
                    class="btn-fav-toggle ${heartClass}" 
                    data-car-id="${car.id}" 
                    data-car-name="${car.name}" 
                    aria-label="${favAriaLabel}"
                    title="Save to favorites">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <div class="card-header-info">
              <h3 class="card-car-name">${car.name}</h3>
              <span class="card-car-price">${car.price}</span>
            </div>

            <p class="card-car-desc">${car.description}</p>

            <!-- Specifications Grid -->
            <div class="specs-list">
              <div class="spec-item">
                <span class="spec-title">Engine</span>
                <span class="spec-value">${car.engine}</span>
              </div>
              <div class="spec-item">
                <span class="spec-title">Horsepower</span>
                <span class="spec-value">${car.horsepower}</span>
              </div>
              <div class="spec-item">
                <span class="spec-title">Acceleration</span>
                <span class="spec-value">${car.acceleration}</span>
              </div>
              <div class="spec-item">
                <span class="spec-title">Top Speed</span>
                <span class="spec-value">${car.topSpeed}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions">
              <a href="#contact" class="btn btn-primary inquire-btn" data-model="${car.name}">Inquire</a>
              <button type="button" class="btn btn-outline quick-fav-btn" data-car-id="${car.id}" data-car-name="${car.name}">
                ${isFav ? "Saved ★" : "Favorite ♡"}
              </button>
            </div>
          </div>
        </article>
      `;
    });

    carGrid.innerHTML = cardsHTML;

    // Attach event listeners to favorite toggle buttons inside newly created cards
    attachCardEventListeners();
  }

  /**
   * Attaches click handlers to dynamic card elements
   */
  function attachCardEventListeners() {
    // Heart toggle buttons
    const favButtons = document.querySelectorAll(".btn-fav-toggle, .quick-fav-btn");
    favButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const carId = btn.getAttribute("data-car-id");
        const carName = btn.getAttribute("data-car-name");
        if (carId && carName) {
          toggleFavorite(carId, carName);
        }
      });
    });

    // Inquire buttons (auto-selects model in contact form)
    const inquireButtons = document.querySelectorAll(".inquire-btn");
    inquireButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const carModel = btn.getAttribute("data-model");
        if (vehicleSelect && carModel) {
          // Pre-select matching model option
          for (let i = 0; i < vehicleSelect.options.length; i++) {
            if (vehicleSelect.options[i].text.includes(carModel.split(" ")[0])) {
              vehicleSelect.selectedIndex = i;
              break;
            }
          }
        }
      });
    });
  }

  // Filter Buttons Event Delegation
  if (filterButtonsContainer) {
    filterButtonsContainer.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-btn");
      if (!button) return;

      // Update active class on filter buttons
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Update category state
      currentCategory = button.getAttribute("data-category") || "all";
      renderCarGrid();
    });
  }

  // Live Search Input Event Listener
  if (carSearchInput) {
    carSearchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      renderCarGrid();
    });
  }

  // Reset Filters Button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      currentCategory = "all";
      currentSearchQuery = "";
      if (carSearchInput) carSearchInput.value = "";
      document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-category") === "all");
      });
      renderCarGrid();
    });
  }

  /* ======================================================
     5. FAVORITES MODAL DIALOG MANAGEMENT
     ====================================================== */

  /**
   * Renders saved car items in the Favorites Modal
   */
  function renderFavoritesModal() {
    if (!favoritesList || !emptyFavorites) return;

    const favorites = getFavorites();

    if (favorites.length === 0) {
      favoritesList.innerHTML = "";
      emptyFavorites.style.display = "block";
      if (clearAllFavsBtn) clearAllFavsBtn.style.display = "none";
      return;
    }

    emptyFavorites.style.display = "none";
    if (clearAllFavsBtn) clearAllFavsBtn.style.display = "inline-flex";

    // Find car objects for saved IDs
    let itemsHTML = "";
    favorites.forEach(carId => {
      const car = luxuryCars.find(c => c.id === carId);
      if (car) {
        itemsHTML += `
          <div class="fav-item" data-id="${car.id}">
            <div class="fav-item-info">
              <img src="${car.image}" alt="${car.name}" class="fav-item-img">
              <div>
                <h4 class="fav-item-name">${car.name}</h4>
                <span class="fav-item-price">${car.price}</span>
              </div>
            </div>
            <button type="button" class="btn-remove-fav" data-id="${car.id}" data-name="${car.name}">Remove</button>
          </div>
        `;
      }
    });

    favoritesList.innerHTML = itemsHTML;

    // Attach remove event listener
    const removeButtons = favoritesList.querySelectorAll(".btn-remove-fav");
    removeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const name = btn.getAttribute("data-name");
        toggleFavorite(id, name);
      });
    });
  }

  // Open Favorites Modal
  if (favoritesBtn) {
    favoritesBtn.addEventListener("click", () => {
      renderFavoritesModal();
      if (favoritesModal) {
        favoritesModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
    });
  }

  // Close Favorites Modal
  function closeFavoritesModal() {
    if (favoritesModal) {
      favoritesModal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  if (closeFavModalBtn) {
    closeFavModalBtn.addEventListener("click", closeFavoritesModal);
  }

  if (exploreFromFavsBtn) {
    exploreFromFavsBtn.addEventListener("click", closeFavoritesModal);
  }

  // Clear All Favorites Button
  if (clearAllFavsBtn) {
    clearAllFavsBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all your saved favorites?")) {
        saveFavorites([]);
        renderCarGrid();
        renderFavoritesModal();
        showToast("All favorite vehicles cleared.");
      }
    });
  }

  // Close modal when clicking on backdrop
  if (favoritesModal) {
    favoritesModal.addEventListener("click", (e) => {
      if (e.target === favoritesModal) {
        closeFavoritesModal();
      }
    });
  }

  /* ======================================================
     6. CONTACT FORM VALIDATION & SUBMISSION
     ====================================================== */

  /**
   * Helper function to display input error message
   */
  function setError(inputElement, errorElement, message) {
    inputElement.classList.add("invalid");
    errorElement.textContent = message;
  }

  /**
   * Helper function to clear input error message
   */
  function clearError(inputElement, errorElement) {
    inputElement.classList.remove("invalid");
    errorElement.textContent = "";
  }

  /**
   * Validates email format using regular expression
   * @param {string} email 
   * @returns {boolean}
   */
  function isValidEmail(email) {
    // Standard CAP135 RFC-compatible email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validates telephone number format
   * @param {string} phone 
   * @returns {boolean}
   */
  function isValidPhone(phone) {
    // Allows digits, spaces, parentheses, dashes, leading +
    const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/;
    const cleanDigits = phone.replace(/\D/g, "");
    return phoneRegex.test(phone.trim()) && cleanDigits.length >= 7;
  }

  // Real-time input validation listeners for immediate feedback
  if (fullNameInput) {
    fullNameInput.addEventListener("input", () => {
      if (fullNameInput.value.trim().length >= 3) {
        clearError(fullNameInput, nameError);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      if (isValidPhone(phoneInput.value)) {
        clearError(phoneInput, phoneError);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim().length >= 10) {
        clearError(messageInput, messageError);
      }
    });
  }

  // Form Submit Event Handler
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Prevent browser default refresh
      e.preventDefault();

      let isValid = true;
      const fullName = fullNameInput ? fullNameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";
      const selectedVehicle = vehicleSelect ? vehicleSelect.value : "";

      // 1. Full Name Validation
      if (fullName === "") {
        setError(fullNameInput, nameError, "Full name is required.");
        isValid = false;
      } else if (fullName.length < 3) {
        setError(fullNameInput, nameError, "Name must be at least 3 characters.");
        isValid = false;
      } else {
        clearError(fullNameInput, nameError);
      }

      // 2. Email Validation
      if (email === "") {
        setError(emailInput, emailError, "Email address is required.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        setError(emailInput, emailError, "Please enter a valid email address (e.g., name@domain.com).");
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // 3. Phone Validation
      if (phone === "") {
        setError(phoneInput, phoneError, "Phone number is required for VIP concierge.");
        isValid = false;
      } else if (!isValidPhone(phone)) {
        setError(phoneInput, phoneError, "Please enter a valid telephone number with area code.");
        isValid = false;
      } else {
        clearError(phoneInput, phoneError);
      }

      // 4. Message Validation
      if (message === "") {
        setError(messageInput, messageError, "Please include a brief message or consultation request.");
        isValid = false;
      } else if (message.length < 10) {
        setError(messageInput, messageError, "Message must contain at least 10 characters.");
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }

      // If form has validation errors, halt and scroll to first error
      if (!isValid) {
        if (formAlert) {
          formAlert.className = "form-alert error";
          formAlert.textContent = "Please correct the highlighted fields before submitting.";
          formAlert.style.display = "block";
        }
        return;
      }

      // Successful Validation & Submission Simulation
      if (formAlert) {
        formAlert.className = "form-alert success";
        formAlert.innerHTML = `
          <strong>Thank you, ${fullName}!</strong> Your private consultation request for <em>${selectedVehicle}</em> has been securely received. 
          A Prestige Motors VIP Concierge director will contact you via ${email} within 2 hours.
        `;
        formAlert.style.display = "block";
      }

      // Show toast notification
      showToast("VIP Inquiry successfully submitted!");

      // Reset form fields
      contactForm.reset();

      // Scroll smoothly to alert
      formAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* ======================================================
     7. IMAGE GALLERY LIGHTBOX
     ====================================================== */
  if (galleryItems.length > 0 && lightboxModal && lightboxImg && lightboxCaption) {
    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const caption = item.getAttribute("data-caption") || (img ? img.alt : "");

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxCaption.textContent = caption;
          lightboxModal.style.display = "flex";
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Close Lightbox
    function closeLightbox() {
      lightboxModal.style.display = "none";
      document.body.style.overflow = "";
      lightboxImg.src = "";
    }

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener("click", closeLightbox);
    }

    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    // Keyboard ESC key to close any active modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (lightboxModal.style.display === "flex") closeLightbox();
        if (favoritesModal && favoritesModal.style.display === "flex") closeFavoritesModal();
      }
    });
  }

  /* ======================================================
     8. MOBILE NAVIGATION & SMOOTH SCROLLING
     ====================================================== */
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
      hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("open");
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active Navigation link highlighting on page scroll
  const sections = document.querySelectorAll("main > section");
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120; // Offset for header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  /* ======================================================
     9. TOAST NOTIFICATION HELPER
     ====================================================== */
  let toastTimeout;
  function showToast(message) {
    if (!toastNotification) return;

    toastNotification.textContent = message;
    toastNotification.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 3200);
  }

  /* ======================================================
     10. INITIALIZATION
     ====================================================== */
  updateFavoritesBadge();
  renderCarGrid();
});
