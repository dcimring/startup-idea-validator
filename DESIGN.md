```markdown
# Design System: The Architect’s Draft

## 1. Overview & Creative North Star: "The Living Manuscript"
This design system rejects the clinical coldness of traditional SaaS interfaces in favor of **The Living Manuscript**. Our North Star is the intersection of a high-end architect’s vellum sketch and a modern editorial layout.

The goal is to evoke the feeling of a "work in progress" that is simultaneously masterful and precise. We break the "template" look by utilizing intentional asymmetry—where elements are slightly offset as if placed by hand—and overlapping layers that mimic physical sheets of paper. This system prioritizes tactility, using "ink on paper" as its primary metaphor to create a space where startup founders feel they are *crafting* their pitch, not just filling out forms.

---

## 2. Colors & Surface Philosophy
The palette is rooted in organic, warm neutrals that reduce eye strain and provide a premium "heavy stock" paper feel.

- **Background & Base:** Use `surface` (`#fbf9f4`) as your primary canvas.
- **The "No-Line" Rule:** Sectioning must never be achieved through standard 1px solid gray lines. Instead, use background shifts. A side panel should transition from `surface` to `surface-container-low` (`#f5f4ed`) to define its boundary.
- **Surface Hierarchy & Nesting:** Treat the interface as stacked physical sheets.
- **Base:** `surface`
- **Inlaid Sections:** `surface-container`
- **Floating "Notes":** `surface-container-lowest` (`#ffffff`) to create a "bright paper" highlight.
- **The "Ink & Graphite" Rule:** Primary actions and text use `primary` (`#4d6169`) and `on-surface` (`#31332c`). These should feel like high-quality pigment ink, not digital black.
- **Signature Textures:** Apply a subtle grain overlay (2-3% opacity) across the `background` to break the digital flatness. For main CTAs, use a subtle gradient from `primary` to `primary_dim` to simulate the slight pooling of ink at the edge of a stroke.

---

## 3. Typography: The Human/Machine Duality
We use a high-contrast typographic pairing to balance professional structure with creative ideation.

- **Display & Headlines (Space Grotesk):** This monospaced-leaning sans-serif represents the "structure." Use `display-lg` for hero statements and `headline-md` for section headers. Its geometric nature feels like a blueprint.
- **Body & Titles (Work Sans):** Use `body-lg` for readability. Work Sans provides a clean, neutral balance that doesn't compete with the "draft" elements.
- **The "Annotated" Feel:** Use `label-md` in `tertiary` (`#575e78`) for micro-copy or helper text. This should feel like a designer’s side-note scribbled in the margins.

---

## 4. Elevation & Depth: Tonal Layering
Traditional box shadows are forbidden. We use "Ambient Depth" to simulate physical paper.

- **The Layering Principle:** To lift a card, place a `surface-container-lowest` object on a `surface-container` background. The color shift provides the "lift."
- **Ambient Shadows:** For floating modals or "sketched" popovers, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(49, 51, 44, 0.06);`. The shadow color must be a derivative of `on-surface`, never pure black.
- **The "Ghost Border":** If a boundary is required for accessibility, use the `outline-variant` token at 15% opacity. It should look like a faint pencil guideline, not a container.
- **Glassmorphism:** For navigation overlays, use `surface` at 80% opacity with a `backdrop-blur` of 12px. This mimics the look of translucent tracing paper.

---

## 5. Components

### Buttons: The Sketched Box
- **Primary:** A solid fill of `primary` (`#4d6169`). The corners should use the `sm` (`0.125rem`) roundedness to look hand-cut. Apply a custom `border-image` that mimics a slightly shaky ink stroke.
- **Secondary:** A "Ghost" button with an irregular border (use an SVG mask for a hand-drawn look) using the `outline` token.
- **States:** On hover, buttons should subtly shift in "tilt" (1-degree rotation) to mimic a physical object being touched.

### Cards & Containers
- **Forbid Dividers:** Never use `
` tags. Use `spacing-8` (2.75rem) to create clear mental breaks through whitespace.

- **Asymmetry:** Give cards a random `border-radius` variance (e.g., top-left: 2px, top-right: 4px, bottom-left: 1px, bottom-right: 3px) to reinforce the "hand-cut paper" aesthetic.

### Input Fields: The Underline
- Abandon the four-sided box. Use a "ruled paper" approach: a single bottom border using `outline-variant`. When focused, the line transitions to `primary` and thickens slightly like a bold ink stroke.

### Specialized Component: The "Margin Note"
- A specific tooltip variant positioned in the far right/left gutters. Uses `label-sm` in `secondary` color, acting as a "peer review" or "mentor tip" within the pitch tool.

---

## 6. Do’s and Don’ts

### Do:
- **Use White Space as a Luxury:** Leverage the `20` and `24` spacing tokens to let the "paper" breathe.
- **Embrace Imperfection:** If an icon is 1px "off-center" visually but feels right, leave it. The system should feel human.
- **Layer Surfaces:** Use `surface-container-highest` for the most important interactive "work areas" to draw the eye.

### Don’t:
- **Don't Use Sharp Gradients:** No high-contrast metallic or neon gradients. Stay within the matte, "ink-and-paper" tonal range.
- **Don't Use 1px Solid #000:** It breaks the "Architect's Draft" illusion. Always use the `outline` or `primary` tokens.
- **Don't Over-Animate:** Transitions should be "Snappy but Soft" (e.g., `200ms ease-out`). Avoid bouncy, "bubbly" animations that feel too "app-like." We are building a professional tool.

---

## 7. Interaction Model: The Tactile Response
Interaction should feel like moving paper on a desk.
- **Draggable Elements:** When a user grabs a component, increase the shadow diffusion and add a 2-degree rotation.
- **Success States:** Use `tertiary` (muted blue-green) rather than a loud, "digital" green. Success is a subtle ink-stamp, not a flashing neon sign.```
