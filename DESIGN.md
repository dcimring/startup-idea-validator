# Design System: High-Impact Athletic Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Monolith"**

This design system moves away from the polite, rounded aesthetics of standard SaaS platforms and embraces the raw, aggressive energy of performance athletics. The "Kinetic Monolith" is defined by sharp 0px corners, extreme typographic contrast, and an uncompromising color palette. It breaks the "template" feel through **Intentional Asymmetry**: large blocks of `primary_fixed` (Athletic Yellow) should overlap monochromatic imagery, and text should bleed across color boundaries to create a sense of forward motion. The layout isn't a grid to be filled; it is a canvas of high-tension surfaces where negative space is as heavy as the content.

## 2. Colors & Surface Logic

### The Palette
The core of this system is the tension between `#0e0e0e` (Deep Black) and `#fde400` (Athletic Yellow).
*   **Background (`#0e0e0e`)**: The void. All content emerges from this depth.
*   **Primary (`#fde400`)**: The "High-Voltage" accent. Used for high-impact callouts and primary actions.
*   **On-Surface (`#ffffff`)**: Pure white for maximum readability against the dark void.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. They feel "thin" and "digital." In this system, boundaries are created through:
1.  **Background Shifts**: Move from `surface` to `surface_container_low` (`#131313`) to define a new content area.
2.  **Color Blocking**: A full-bleed block of `primary` serves as a natural separator between two black sections.
3.  **Hard Edges**: Use high-contrast imagery meeting solid color blocks to define structure.

### Surface Hierarchy & Nesting
Treat the UI as stacked plates of industrial material. 
*   **Nesting Logic**: To highlight a card or featured section, do not use a border. Instead, place a `surface_container_highest` (`#262626`) element inside a `surface_container` (`#191919`) area. This "tonal layering" creates a sophisticated depth that feels architectural rather than "web-like."

### The "Glass & Gradient" Rule
While the brand is brutalist, "The Kinetic Monolith" requires polish. 
*   **Glassmorphism**: For floating elements like navigation bars or sticky CTAs, use `surface_container_low` at 80% opacity with a `backdrop-filter: blur(20px)`. This allows the high-impact yellow blocks to "glow" through the UI as the user scrolls.
*   **Signature Textures**: On large Primary CTAs, use a subtle linear gradient from `primary` (`#fde400`) to `primary_dim` (`#edd600`) at a 45-degree angle to give the yellow "weight" and professional density.

## 3. Typography

### Headline Philosophy: The Lexend Heavyweight
*   **Display & Headline (Lexend)**: Must always be **Uppercase**. The tracking should be tight (-0.02em to -0.05em) to create a "wall of text" effect that mirrors the intensity of the Hyrox branding. 
*   **Body & Title (Inter)**: Designed for maximum utility. Inter provides a technical, clean counter-balance to the aggressive headlines.

### Typographic Hierarchy
*   **Display-LG (3.5rem)**: Reserved for hero statements. Overlap these with imagery for an editorial look.
*   **Headline-MD (1.75rem)**: Used for section headers. Frequently placed inside solid `primary` color blocks using `on_primary_container` (`#5c5200`) text for a "label" aesthetic.
*   **Body-LG (1rem)**: The workhorse. High line-height (1.6) to ensure the dark background doesn't "crush" the white text.

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved via **Tonal Stacking**. 
*   Base: `surface` (`#0e0e0e`)
*   Section: `surface_container_low` (`#131313`)
*   Component: `surface_container_high` (`#1f1f1f`)
This creates a natural lift without the "dirty" look of standard grey shadows.

### Ambient Shadows
Shadows are rarely used. When essential (e.g., a floating Action Button), use an **Ambient Shadow**:
*   `box-shadow: 0 20px 40px rgba(0,0,0,0.4);`
*   Never use "Hard" shadows. The shadow should feel like a soft occlusion of light, not a drop-shadow effect.

### The "Ghost Border" Fallback
If UI elements (like input fields) need more definition, use a **Ghost Border**:
*   `outline-variant` (`#484848`) at 20% opacity. This provides just enough edge for accessibility without breaking the monolithic aesthetic.

## 5. Components

### Buttons
*   **Primary**: Solid `primary` (`#fde400`) background, `on_primary` (`#655b00`) text, 0px border-radius. All caps Lexend. Hover state: `primary_dim`.
*   **Secondary**: `outline` token at 20% opacity for the border. White text. 0px border-radius.
*   **Tertiary**: Text-only, uppercase, with a 2px `primary` underline that expands on hover.

### Cards & Sections
*   **Rule**: No divider lines. Use `surface_container` shifts.
*   **Imagery**: Use high-contrast, desaturated (black and white) photography. To integrate imagery, apply a `primary` color multiply filter or overlay a yellow block `(#fde400)` at the bottom corner to house the card title.

### Input Fields
*   **Style**: Bottom-border only or solid `surface_container_highest` background. 0px radius.
*   **Focus State**: The bottom border transitions to 2px solid `primary`.

### Impact Blocks (Unique Component)
*   A specific component for "The Kinetic Monolith." A full-width container of `primary` color with `display-md` text. It acts as a visual "speed bump" to break up long scrolling sections.

## 6. Do's and Don'ts

### Do:
*   **Use 0px Radius Everywhere**: Every corner must be sharp. This conveys strength and precision.
*   **Bleed Imagery**: Let photos take up 100% of the viewport width or height in specific sections.
*   **Contrast is King**: Ensure all yellow-on-black or white-on-black text meets WCAG AA standards.

### Don't:
*   **No Rounded Corners**: Any radius above 0px will immediately dilute the brand's "High-Impact" persona.
*   **No Pastel Colors**: Stick strictly to the defined palette. Adding soft blues or greens will break the "Athletic Brutalist" feel.
*   **No Thin Borders**: Avoid using `outline` at 100% opacity; it creates a "boxed-in" look that feels dated. Use background shifts instead.
*   **No Centered Body Text**: Keep body text left-aligned to maintain the technical, editorial structure of the system.
