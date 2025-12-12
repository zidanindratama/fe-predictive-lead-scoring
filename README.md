# ![SmartBank](https://raw.githubusercontent.com/zidanindratama/fe-predictive-lead-scoring/refs/heads/main/app/og-image.png)

# SmartBank - AI Predictive Lead Scoring System

**SmartBank** is a modern frontend application for financial institutions. It leverages **Artificial Intelligence** to analyze customer data, predict conversion probabilities, and optimize marketing campaigns. Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**, it provides a responsive and data-rich user experience.

---

## 🌐 Demo / Production

Access the application at: [https://fe-predictive-lead-scoring.vercel.app](https://fe-predictive-lead-scoring.vercel.app)

---

## 🚀 Features

### 📊 Intelligent Dashboard

- **Real-time Analytics:** Track lead conversions, active campaigns, and efficiency metrics.
- **Data Visualization:** Interactive charts (Bar, Area, Pie) using `recharts`.
- **KPI Tracking:** Instant view of Total Reach, Potential Leads, and Conversion Rates.

### 🎯 Campaign & Lead Management

- **Campaign Engine:** Create targeted marketing campaigns based on demographics (Age, Job, Marital Status) and financial history.
- **Target Audience Filtering:** Segment customers using JSON-based logic.
- **Simulation Mode:** Run AI simulations to estimate campaign success rates before launching.

### 🤖 AI Prediction Interface

- **Single & Batch Prediction:** Run ML models on specific customers to determine "YES/NO" conversion probability.
- **Confidence Scores:** Detailed breakdown of YES vs NO probability.
- **Manual Calibration:** Authorized staff can override or calibrate AI predictions based on business context.

### 👥 Customer Data Platform

- **Bulk Import/Export:** Upload `.csv` or `.xlsx` files to populate the database.
- **Detailed Profiles:** View customer demographics, economic indicators (Euribor 3m, CPI), and interaction history.
- **Data Validation:** Robust forms with `zod` and `react-hook-form`.

### 🛡️ Security & Role Management

- **RBAC:** Granular permissions for `ADMIN`, `STAFF`, and `USER`.
- **Secure Authentication:** JWT with automatic access/refresh token rotation via Axios interceptors.
- **Account Management:** Profile updates & avatar uploads.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **State & Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest)
- **Tables:** [TanStack Table v8](https://tanstack.com/table/v8)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** Axios
- **Utilities:** `date-fns`, `clsx`, `sonner` (Toast notifications)

---

## 📂 Project Structure

```bash
fe-predictive-lead-scoring/
├── 📁 app/                 # Next.js App Router pages & layouts
│   ├── 📁 (main)/          # Public landing pages (Home, About, Contact)
│   ├── 📁 (util-pages)/    # Maintenance, 404, Unauthorized
│   ├── 📁 auth/            # Sign In, Sign Up, Reset Password
│   └── 📁 dashboard/       # Protected app routes
├── 📁 components/          # Reusable UI components
│   ├── 📁 dashboard/       # Dashboard widgets & tables
│   ├── 📁 main/            # Landing page sections
│   └── 📁 ui/              # Shadcn/Radix primitives (Button, Card, etc.)
├── 📁 config/              # Constants & navigation config
├── 📁 hooks/               # Custom React hooks
├── 📁 lib/                 # Utils (Axios instance, utils.ts)
├── 📁 providers/           # Context providers (Theme, QueryClient)
└── 📁 public/              # Static assets
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18.17.0 or higher
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/zidanindratama/fe-predictive-lead-scoring.git
cd fe-predictive-lead-scoring
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Configure Environment Variables**

Create `.env.local` in the root folder:

```env
NEXT_PUBLIC_API_URL=https://be-predictive-lead-scoring.vercel.app
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API Integration

- **Base URL:** `https://be-predictive-lead-scoring.vercel.app` (or localhost for development)
- **Authentication:** HttpOnly Cookies
- **Axios Interceptors:** Automatically handle `401 Unauthorized` errors and trigger refresh token flow.

---

## 👥 Tester Accounts

| Role  | Email                                             | Password |
| ----- | ------------------------------------------------- | -------- |
| ADMIN | [admin@smartbank.com](mailto:admin@smartbank.com) | password |
| STAFF | [staff@smartbank.com](mailto:staff@smartbank.com) | password |
| USER  | [user@smartbank.com](mailto:user@smartbank.com)   | password |

---

## 👥 Development Team

- **Alexander Brian Susanto** - React & Backend with AI (Binus University)
- **Nur Bintang Hidayat** - Machine Learning (Gunadarma University)
- **Muhamad Zidan Indratama** - React & Backend with AI (Gunadarma University)
- **Muhamad Rafli Kamal** - Machine Learning (Politeknik Enjinering Indorama)
- **Ilham Maulana** - React & Backend with AI (Gunadarma University)

---

## 📄 License

MIT License - see the [`LICENSE`](LICENSE) file for details.

```

```
