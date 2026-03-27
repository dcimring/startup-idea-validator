# Design System: The Kinetic Observatory

This document outlines the design language, aesthetic directions, and visual tokens used in the Cayman PropTech AI project. It is intended to serve as a blueprint for maintaining visual consistency across related applications.

## Design Ethos
The "Kinetic Observatory" theme is a blend of **cinematic minimalism** and **high-tech precision**. It prioritizes deep, dark surfaces contrasted with vibrant, glowing primary accents to create a sense of advanced intelligence and premium utility.

## 1. Color Palette

### Surfaces & Backgrounds
Deep, near-black neutrals that provide a sophisticated backdrop for content.
- **Surface (Base):** `#0f1419` — Main application background.
- **Surface Dim:** `#0a0d10` — Used for modal backdrops and high-contrast regions.
- **Surface Container Low:** `#171c21` — Default card background.
- **Surface Container Highest:** `#30353b` — Hover states and elevated UI elements.

### Brand & Accents (The Glow)
Vibrant cyan and teal tones used for primary actions, iconography, and ambient effects.
- **Primary Fixed Dim:** `#00dbe9` — The signature "Cyan Glow" color.
- **Secondary Fixed Dim:** `#2edcd7` — Complementary teal for gradients and secondary highlights.
- **Primary Container:** `#00f0ff` — High-intensity accents.

### Typography Colors
- **On Surface:** `#dee3ea` — Primary text, high readability.
- **On Surface Variant:** `#b9cacb` — Secondary text, descriptions, and labels.
- **On Primary:** `#00363a` — Text appearing on top of primary-colored elements.

## 2. Typography

### Primary Typeface: Manrope
- **Role:** UI, body copy, and technical labels.
- **Characteristics:** Clean, modern sans-serif with excellent legibility.
- **Styles:** Regular (400) for body, Bold (700) for subheads, Extrabold (800) for impact.

### Secondary Typeface: Playfair Display
- **Role:** Serif accents and display headlines.
- **Characteristics:** Sophisticated, italicized serif that adds a "luxury real estate" feel.
- **Usage:** Typically used for "Cayman Real Estate" headers or branding flourishes.

## 3. UI Patterns & Effects

### Bento Grid Layout
The primary dashboard structure uses a **Bento Grid**—a collection of varied-size rectangles that organize diverse data into a cohesive, tiled interface. This pattern communicates variety and modularity.

### Glassmorphism (Glass Effect)
Modals and overlays utilize a glass-like treatment:
- **Background:** `rgba(222, 227, 234, 0.15)` (Surface Bright at 15% opacity).
- **Blur:** `20px` backdrop-filter.
- **Border:** Subtle `1px` border with low opacity (`10%`) to define edges without adding visual weight.

### Ambient Cinematic Glow
Use large, highly blurred radial gradients in the background to create depth.
- **Implementation:** 70% width/height containers with `120px-180px` blur, set at low opacity (`5%`) to prevent distraction.

### Shadows & Elevation
- **Ambient Shadow:** `0px 24px 48px rgba(0, 240, 255, 0.06)` — A soft, cyan-tinted shadow that makes elements appear to float over a light source.

## 4. Interaction Design
- **Hover Transitions:** Elements should subtly lift (`-8px`) and shift background color to `Surface Container Highest`.
- **Iconography:** Use `Lucide React` icons. They should be consistently colored with `Primary Fixed Dim` and often wrapped in a container with a subtle shadow and border.
- **Micro-animations:** Use pulse rings and dots (using `Secondary Fixed Dim`) to indicate "live" or "active" AI states.
