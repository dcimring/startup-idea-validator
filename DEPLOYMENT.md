# Deployment Guide: Startup Idea Validator

This guide outlines the steps to deploy the **Convex** backend and the **Next.js** frontend using Cloudflare Workers.

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

## 2. Deploy Frontend (Cloudflare Workers)

The frontend is a Next.js static export (`output: "export"` in `next.config.ts`) served by Cloudflare Workers static assets at **https://ideas.danielcimring.com** (`wrangler.jsonc`).

```bash
npm run deploy
```

This builds with the production Convex URL (`https://keen-grouse-979.convex.cloud`, set inline in the `deploy` script so it overrides `.env.local`), then runs `wrangler deploy`. Run `npx wrangler login` once on a new machine. Pushing to git does not deploy.

`/vote/<expert>` URLs all serve one prebuilt page (`/vote/_`) via `public/_redirects`; the page reads the expert name from the browser URL.

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
| **Deploy Frontend** | `npm run deploy` |
