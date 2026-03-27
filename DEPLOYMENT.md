# Deployment Guide: Startup Idea Validator

This guide outlines the steps to deploy the **Convex** backend and the **Next.js** frontend using the Vercel CLI.

---

## 1. Deploy Convex Backend

Before deploying the frontend, your backend schema and functions must be live in the Convex production environment.

1.  **Deploy to Production:**
    ```bash
    npx convex deploy
    ```
2.  **Get Production URL:**
    After the command finishes, it will provide a **Production HTTP API URL**.
    - Example: `https://vibrant-mammal-123.convex.cloud`
    - **Keep this URL handy for the next section.**

---

## 2. Deploy Frontend (Vercel CLI)

Ensure you have the Vercel CLI installed (`npm i -g vercel`).

1.  **Authenticate (if not already):**
    ```bash
    vercel login
    ```

2.  **Initialize & Link Project:**
    ```bash
    vercel link
    ```
    - Follow the prompts to link to your Vercel account and set a project name (e.g., `startup-idea-validator`).

3.  **Add Environment Variable:**
    Vercel needs your production Convex URL to communicate with the backend.
    ```bash
    vercel env add NEXT_PUBLIC_CONVEX_URL production
    ```
    - When prompted for the value, paste the **Production HTTP API URL** from the Convex deployment step above.

4.  **Final Production Build & Deploy:**
    ```bash
    vercel --prod
    ```
    - Vercel will build your Next.js app and provide a live production URL (e.g., `https://startup-idea-validator.vercel.app`).

---

## 3. Data Migration (Optional)

If you have test ideas/feedback in your **development** environment that you want to move to **production**:

1.  **Export Dev Data:**
    ```bash
    npx convex export --path backup.zip
    ```

2.  **Import to Production:**
    ```bash
    npx convex import --prod --replace backup.zip
    ```

3.  **Cleanup:**
    ```bash
    rm backup.zip
    ```

---

## 🛠 Summary of Key Commands

| Task | Command |
| :--- | :--- |
| **Local Dev (App)** | `npm run dev` |
| **Local Dev (Backend)** | `npx convex dev` |
| **Deploy Backend** | `npx convex deploy` |
| **Deploy Frontend** | `vercel --prod` |
| **View Vercel Dashboard** | `vercel dashboard` |
