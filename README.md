# Algonauts Competitive Programming Club Website

The official, production-ready website for **Algonauts**, the competitive programming club of Newton School of Technology (NST-ADYPU). Built with a minimal, dark-mode "mission-control" aesthetic, the site showcases team rankings, educational roadmaps, contest schedules, and community events.

🚀 **Live Production URL:** [https://algonauts-nst.netlify.app](https://algonauts-nst.netlify.app)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Netlify (via manual CLI deployment)
- **Git Sync:** Connected to [GitHub Repo](https://github.com/spy-in-shadows/algonauts-website)

---

## 📂 Core Directory Structure

- `/app` — Page routing and layout systems:
  - `/` — Homepage featuring ratings stats, problem of the week, and active member standings preview.
  - `/about` — Club journey timeline, pillars, and the ICPC Regional teams showcase (featuring Ryu & SAKE).
  - `/team` — Officer profile grid featuring enlarged card visuals, Codeforces handle tiers, and LinkedIn redirects.
  - `/events` — Contest archives, calendar integrations, and a spotlight for past historic runs.
  - `/events/the-syndicate` — Historical gallery memory and rule structures for Algonauts' biggest event.
  - `/leaderboard` — Active organization standings pulling Codeforces API data in real-time, complete with custom officer tags.
  - `/resources` — Structured training roadmaps and interactive accordion lists mapped to rating milestones.
  - `/blog` — Markdown-driven announcements and algorithmic tutorials.
  - `/join` — Registration portal with validation constraints.
- `/components` — Reusable React UI elements (Navbar, Footer, Leaderboard rank components).
- `/public` — Static image uploads, logo assets, and event files.

---

## 🚀 Getting Started

To run the development server locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Dev Server
Ensure you run with the `--webpack` compiler flag if you are compiling inside a macOS sandbox environment to bypass socket-binding restrictions:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build & Compile for Production
```bash
npm run build
```

---

## 🌐 Netlify CLI Deployment

To deploy updates manually to the linked production URL:
```bash
npx netlify deploy --build --prod
```
