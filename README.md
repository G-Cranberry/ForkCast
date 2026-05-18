# 🍴 ForkCast — Your Meal Planner & Recipe Hub

> **ForkCast** is a beautifully designed, frontend-only web application for discovering recipes, planning your weekly meals, searching by ingredients, and managing your grocery list — all in one aesthetic, pastel-themed experience.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Feed** | Curated recipe cards, meal categories, Today's ForkCast highlight, and quick ingredient tags |
| 🍽️ **Recipes** | Browse a full recipe library with filtering by category (Breakfast, Lunch, Dinner) |
| 📄 **Recipe Detail** | View full recipe details including ingredients, steps, and cook time |
| 📅 **Weekly Planner** | Plan your meals day-by-day across breakfast, lunch, and dinner |
| 🛒 **Grocery List** | Auto-generate and manage a smart grocery list from your meal plan |
| 🔍 **Smart Search** | Search recipes by ingredient — supports text, voice (🎤), and image scan (📷) |
| 👤 **Profile** | View your account info and joined date |
| 🔑 **Auth (Sign In / Sign Up)** | Glassmorphism-styled login & signup with tab switching (uses `localStorage`) |
| 🌈 **Rainbow Cursor Trail** | Canvas-based animated rainbow trail that follows your mouse across every page |

---

## 🗂️ Project Structure

```
site/
├── index.html          # Landing / splash page
├── login.html          # Sign In & Create Account page
├── home.html           # Main dashboard with hero, meal types & popular recipes
├── recipes.html        # Full recipe listing with category filter
├── recipe-detail.html  # Individual recipe page (loaded by query param ?id=)
├── search.html         # Ingredient-based smart search page
├── planner.html        # Weekly meal planner
├── grocery.html        # Grocery list manager
├── profile.html        # User profile page
│
├── style.css           # Global stylesheet (dark theme, glassmorphism, animations)
├── main.js             # Shared JS: sidebar, auth, search, rainbow trail, nav render
├── recipes-data.js     # Static recipe dataset (ALL_RECIPES array)
│
└── ForkCast.jpeg       # App logo
```

---

## 🚀 Getting Started

ForkCast is a **pure HTML/CSS/JavaScript** project — no build step, no npm install needed.

### Run Locally

1. **Clone or download** the repository.
2. Open `index.html` (or `login.html`) in any modern browser.

```bash
# Or serve with a simple local server (recommended to avoid CORS issues)
npx serve .
# Then open: http://localhost:3000
```

> 💡 You can also use the **VS Code Live Server** extension — right-click `index.html` → *Open with Live Server*.

### Login

ForkCast uses a **dummy authentication** system backed by `localStorage`. No real backend is required.

- Enter **any email + password** on the Sign In page → you're logged in!
- Your session persists until you click **Logout**.

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | Vanilla CSS (glassmorphism, CSS variables, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts |
| Data | Static JS file (`recipes-data.js`) |
| Storage | Browser `localStorage` |

---

## 🖥️ Pages Overview

### `index.html` — Landing Page
The entry point of the app. Links to the login/signup flow.

### `login.html` — Authentication
- Tabbed UI: **Sign In** / **Create Account**
- On submit, stores user object in `localStorage` via `Auth.setUser()`
- Redirects to `home.html` after successful login

### `home.html` — Dashboard
- Hero banner with CTA to explore recipes
- Meal type cards: Breakfast 🌅 | Lunch ☀️ | Dinner 🌙
- "Today's Forkcast" — featured recipe spotlight
- Quick ingredient tags (Onion, Paneer, Potato, etc.)
- Popular Recipes grid (first 8 from dataset)

### `recipes.html` — Recipe Browser
Browse all recipes with optional category filtering via URL query (`?cat=breakfast`).

### `recipe-detail.html` — Recipe Detail
Loads a specific recipe based on `?id=` URL parameter from the `ALL_RECIPES` dataset.

### `search.html` — Smart Search
- Search by typing, voice (Web Speech API), or uploading a photo (simulated scan)
- Filters `ALL_RECIPES` by matching ingredient keywords

### `planner.html` — Weekly Meal Planner
Interactive table to assign meals to each day of the week.

### `grocery.html` — Grocery List
Smart list manager generated from planned meals. Supports manual additions.

### `profile.html` — User Profile
Displays the logged-in user's name, email, and joined date from `localStorage`.

---

## 🌈 Special Effects

- **Rainbow Cursor Trail** — A canvas element (`#rainbow-canvas`) renders a colorful, fading dot trail that follows your mouse on every page, powered by `requestAnimationFrame`.
- **Glassmorphism Cards** — Auth cards, recipe cards, and the hero section use a frosted-glass aesthetic via CSS `backdrop-filter`.
- **Fade-Up Animation** — Page content gracefully fades and slides into view on load (`.fade-up` class).
- **Sidebar** — A slide-in navigation panel toggled by the hamburger menu, auto-closes on outside click.

---

## 📦 Recipe Data

All recipe data lives in `recipes-data.js` as a global `ALL_RECIPES` array. Each recipe object follows this shape:

```js
{
  id: "pn2",
  title: "Paneer Butter Masala",
  desc: "Rich, creamy tomato-butter sauce...",
  img: "https://...",
  category: "dinner",
  time: "40 min",
  ingredients: ["Paneer", "Tomato", "Butter", ...],
  steps: ["Step 1...", "Step 2...", ...]
}
```

To add more recipes, simply append objects to the `ALL_RECIPES` array in `recipes-data.js`.

---

## 🔮 Future Improvements

- [ ] Real backend / database integration (Firebase, Supabase, etc.)
- [ ] User-uploaded custom recipes
- [ ] Nutritional info and calorie tracking
- [ ] Saved/favorited recipes per user
- [ ] Dark/light mode toggle
- [ ] Mobile app (PWA support)

---

## 👨‍💻 Author

** Shilpa & Mouli & Karman  ** — Built with 💚 as part of the ForkCast project.

---

*ForkCast — Plan. Discover. Cook. 🍴*
