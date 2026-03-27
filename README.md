# Startup Idea Validator

A high-fidelity evaluation suite for stress-testing startup concepts with industry experts. Built with the **Solo Founder Stack** and featuring the **Kinetic Observatory** design system.

![Admin Dashboard](https://raw.githubusercontent.com/danielcimring/startup-idea-validator/main/public/preview.png) *(Note: Placeholder for actual preview image)*

## 🚀 The Solo Founder Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Backend:** [Convex](https://www.convex.dev/) (Real-time Database & Mutations)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** Kinetic Observatory (Dark mode, cinematic glows, glassmorphism)

## ✨ Features

### 🛠 Command Center (Admin)
- **Concept Inventory:** Manage your startup ideas in a dedicated sidebar.
- **Real-Time Evaluation Feed:** Watch expert feedback stream in as it happens.
- **Metrics At-A-Glance:** Monitor total concepts, reviews, and unique expert engagement.
- **Sleek Idea Management:** Intuitive modal-driven creation and editing of startup concepts.

### 🧪 Expert Evaluation Suite
- **Phased Workflow:** Guided experience from professional intro to final thank you.
- **Interactive Voting:** High-fidelity "Validate" vs "Concerns" interaction.
- **Strategic Insights:** Structured feedback gathering for strengths, pitfalls, and additional strategy.
- **Unique Expert Links:** Personalized evaluation suites via `/vote/[expert-identifier]`.

## 🛠 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/startup-idea-validator.git
cd startup-idea-validator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Convex
1. Create an account at [Convex.dev](https://www.convex.dev/).
2. Initialize your project:
   ```bash
   npx convex dev
   ```
3. Copy your **HTTP API URL** from the Convex Dashboard.
4. Create a `.env.local` file in the root:
   ```bash
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud
   ```

### 4. Run Locally
Start the Next.js development server:
```bash
npm run dev
```
Start the Convex backend sync (in a separate terminal):
```bash
npx convex dev
```

## 📐 Design Philosophy: Kinetic Observatory
This project adheres to the **Kinetic Observatory** design language:
- **Cinematic Minimalism:** Deep, near-black surfaces (`#0f1419`).
- **The Glow:** Vibrant cyan accents (`#00dbe9`) for high-tech precision.
- **Bento Grid:** Modular, tiled interface for organizing complex data.
- **Glassmorphism:** Layered transparencies with 20px background blurs.

## 📄 License
MIT
