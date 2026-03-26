# Technical Specification: Warszawski Czas "Luxury Premium" UI

This document provides exact technical parameters for engineers to replicate the premium aesthetic of Warszawski Czas.

---

## 1. Sharp CTA Button (`.btn-sharp`)
Core action element with high-contrast, non-rounded typography.

*   **Font Family:** `Inter`, sans-serif.
*   **Font Size:** `11px`.
*   **Font Weight:** `700` (bold).
*   **Text Transform:** `uppercase`.
*   **Letter Spacing:** `0.3em` (approx. `3.3px`).
*   **Border Radius:** `0px`.
*   **Padding:** `1rem 2rem` (vertical/horizontal).
*   **Transition:** `background-color 0.35s ease-out`, `color 0.35s ease-out`.
*   **States:**
    *   **Default:** Dark background (`#0a0a0a`), Cream text (`#f5f3ef`).
    *   **Hover:** Gold background (`#c9a962`), Dark text (`#0a0a0a`).

---

## 2. Cinematic Hero Backdrop (CSS Filters)
A layered approach to styling background images for editorial legibility.

*   **HTML Structure:**
    1.  Container (`bg-black`).
    2.  `div.overlay` (Z-index 10, `background: rgba(0,0,0,0.5)`).
    3.  `div.bg-image` (Z-index 0, `background-size: cover`).
*   **CSS Filters on Image:**
    *   `filter: grayscale(1) contrast(1.25)`.
    *   `opacity: 0.4`.
*   **Implementation Note:** Ensure text sits at Z-index 20+ to remain sharp above the overlay.

---

## 3. Scroll Indicator Animation (`animate-bounce`)
A subtle vertical bounce combined with wide tracking.

*   **Label Styles:** `9px`, `uppercase`, `tracking-widest` (`0.4em`), `color: rgba(245,243,239, 0.4)`.
*   **Animation Logic:**
    *   `keyframes bounce`: `0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }`
    *   **Duration:** `1s` (infinite).
*   **Hover Interaction:** Parent group hover changes both label and icon color to `#c9a962` (`Transition: 0.3s`).

---

## 4. Testimonial Card Frame (`.trust-card`)
Minimalist card with a deep hover transition.

*   **Base Styles:**
    *   `border: 1px solid rgba(229,226,220, 0.5)`.
    *   `background: #faf9f7`.
    *   `padding: 2.5rem`.
*   **Hover State:**
    *   `border-color: rgba(201,169,98, 0.4)`.
    *   `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`.
    *   `transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1)`.
*   **Decorative Quote:** `absolute top-10 right-10`, `size: 32px`, `color: rgba(201,169,98, 0.1)`.

---

## 5. Secret Collection Blurring (`.lock-overlay`)
A two-state mechanism for gated content.

*   **Blurred State:**
    *   `filter: blur(16px)`.
    *   `opacity: 0.6`.
    *   `user-select: none`.
    *   `pointer-events: none`.
*   **Lock Overlay:**
    *   `backdrop-filter: blur(4px)`.
    *   `background: rgba(10,10,10, 0.8)`.
    *   `border: 1px solid rgba(201,169,98, 0.3)`.
*   **Transition:** To unblur, remove the filter classes via state change. Toggle `filter: blur(0)` with a `0.5s ease-in-out` transition.

---

## 6. Navbar Underline Hover (`.nav-link`)
A classic editorial detail using pseudo-elements.

*   **Link Styles:** `font-family: Playfair Display`, `text-sm`, `relative`.
*   **The Underline (`::after`):**
    *   `content: ""`.
    *   `position: absolute; bottom: -4px; left: 0; right: 0;`.
    *   `height: 1px`.
    *   `background-color: #c9a962` (Gold).
    *   `transform: scaleX(0)`.
    *   `transform-origin: left`.
    *   `transition: transform 0.3s ease-out`.
*   **Hover State:**
    *   `a:hover::after { transform: scaleX(1); }`
*   **Active State:** If the link is active, `transform: scaleX(1)` remains fixed.
