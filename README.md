# Portfolio Website Documentation

This document provides a comprehensive breakdown of all the technologies, features, and design patterns used in the `code.html` portfolio website.

## 🛠️ Technology Stack

1. **HTML5**: The structural foundation of the application, utilizing semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`) for accessibility and structure.
2. **Tailwind CSS (via CDN)**: The utility-first CSS framework used for rapid UI development, layout structuring, responsive design, and applying custom themes directly within HTML classes.
3. **Vanilla JavaScript**: Used for all interactivity, animations, DOM manipulation, and canvas rendering without relying on heavy frameworks like React or jQuery.
4. **Google Fonts**:
   - **Inter**: Primary clean sans-serif font for body text.
   - **Outfit**: Modern geometric sans-serif for headings.
   - **Playfair Display**: Elegant serif font used for specific accented text.
   - **Caveat**: Handwritten style font used for artistic flair (e.g., "Developer", "SIRI" signatures).

---

## 🎨 Design System & Aesthetics

- **Theme**: A premium dark-mode aesthetic with a "pearlescent" and deep-space vibe. 
- **Color Palette**: Custom configuration within Tailwind (Deep blacks `#0a0a0a`, soft whites `#e5e5e5`, and subtle grays `#a3a3a3`).
- **Glassmorphism**: Heavy use of frosted glass effects (`.glass-card`), achieving depth through `backdrop-filter: blur()`, semi-transparent borders, and soft glowing drop shadows.
- **Fluid Ambient Background**: CSS-animated, softly colored "blobs" that float infinitely in the background behind a blur overlay to create a dynamic, living environment.

---

## ✨ Core Features & Sections

### 1. Advanced Loading Experience
- **WebGL Particle Preloader**: A custom shader engine (`index.html`) that simulates the HTML5 canvas particles, providing an identical aesthetic while the main content loads. The canvas is completely transparent, allowing the site's true ambient background to show through.
- **Scrollable Skeleton UI**: A glassmorphic wireframe that spans the entire document. Users can scroll the skeleton layout during the loading phase, and it gracefully fades away to reveal the actual content exactly where it's mapped.
- **Synchronized Reveal**: Entrance animations are intelligently delayed via custom events (`preloaderComplete`), guaranteeing they only trigger a buttery-smooth slide-up once the preloader completely fades out.

### 2. Interactive Hero Section
- **Particle Canvas**: A custom-built HTML `<canvas>` particle system that tracks mouse/touch movement and draws connecting lines between nearby particles.
- **Orbiting Skills**: A creative half-circle layout anchored to the right side of the screen where skill badges (HTML, React, C/C++, Python) float continuously along an invisible orbital path.
- **Hanging ID Card**: A deeply customized profile card that utilizes a CSS `@keyframes swing` animation and `transform-origin-top` to simulate a physical ID card hanging from a lanyard.

### 3. Projects Showcase
- **Layout**: CSS Grid layout (`grid-cols-1 md:grid-cols-12`) used for staggered, asymmetric project cards.
- **Interactions**: Image zoom-on-hover effects (`group-hover:scale-110`), floating animations, and absolute positioned transparent overlays ensuring the entire card is a clickable link without disrupting layout.

### 4. Experience & Academic Base
- **Timeline UI**: Clean vertical timeline featuring a pulsing dot indicator (`bg-primary rounded-full left-[-4.5px]`) to display academic history (e.g., Dr. Babasaheb Ambedkar Technological University).

### 5. About & Skills Marquee
- **Profile Image**: A stylized asymmetrical image container using an advanced `border-radius: 40% 60% 70% 30% / 40% 50% 60% 40%` to create a morphing, organic shape.
- **Infinite Marquee**: A continuous sliding text ribbon (`@keyframes slide`) displaying a stream of technical skills across the screen.

### 6. Connect & Footer
- **Contact Details**: Centered, gradient-backed area displaying contact email and location.
- **Social Links**: External links (GitHub, LinkedIn, Instagram) configured with `target="_blank"` to safely open in new tabs without navigating users away from the portfolio.

---

## ⚡ JavaScript Functionality

The script at the bottom of the document handles the following logical tasks:

1. **Particle Engine**: Initializes an array of `Particle` objects that update their coordinates, bounce off screen edges, and draw lines to nearby particles and the user's cursor.
2. **WebGL Preloader & Skeleton Logic**: Executes the WebGL shader for the preloader particle simulation. It removes the scroll locks and dispatches a custom `preloaderComplete` event when the loading phase finishes.
3. **Scroll Reveal (`IntersectionObserver`)**: Watches elements with the `.reveal-on-scroll` class and triggers a fade-in/slide-up animation when they enter the viewport. These animations are meticulously delayed until the `preloaderComplete` event fires.
4. **Magnetic Buttons**: Calculates mouse position relative to button bounds to slightly pull (`translate`) elements like the navigation links towards the cursor for a premium, tactile feel.
5. **Smooth Scrolling**: Intercepts clicks on anchor links (`href="#id"`) and smoothly scrolls the viewport to the target section.
6. **Active Nav Highlighting**: Listens to the `scroll` event and dynamically applies an active styling class to the current navigation item based on which section is currently on screen.
7. **Mobile Touch Feedback**: Detects mobile users (`/Android|webOS|iPhone.../i.test(navigator.userAgent)`) and swaps out desktop hover effects for touch-based scaling and box-shadow feedback.
