# SmartBank - AI Predictive Lead Scoring System

**SmartBank** is a modern, enterprise-grade frontend application designed for financial institutions. It leverages Artificial Intelligence to analyze customer data, predict conversion probabilities, and optimize marketing campaigns. Built with the latest **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**, it provides a seamless, responsive, and data-rich user experience.

## 🚀 Features

### 📊 Intelligent Dashboard

- **Real-time Analytics:** Visual trends of lead conversions, active campaigns, and efficiency metrics.
- **Data Visualization:** Interactive charts (Bar, Area, Pie) powered by `recharts`.
- **KPI Tracking:** Instant view of Total Reach, Potential Leads, and Conversion Rates.

### 🎯 Campaign & Lead Management

- **Campaign Engine:** Create targeted marketing campaigns based on demographics (Age, Job, Marital Status) and financial history.
- **Target Audience Filtering:** Advanced filtering to segment customers based on JSON logic.
- **Simulation Mode:** Run AI simulations on campaigns to estimate success rates before launch.

### 🤖 AI Prediction Interface

- **Single & Batch Prediction:** Run machine learning models on specific customers to determine "YES/NO" conversion probability.
- **Confidence Scores:** Detailed probability breakdown (Confidence YES vs. NO).
- **Manual Calibration:** Allow authorized staff to override/calibrate AI predictions based on business context.

### 👥 Customer Data Platform

- **Bulk Import/Export:** Seamlessly upload `.csv` or `.xlsx` files to populate the database.
- **Detailed Profiles:** Comprehensive views of customer demographics, economic indicators (Euribor 3m, CPI), and interaction history.
- **Data Validation:** Robust form validation using `zod` and `react-hook-form`.

### 🛡️ Security & Role Management

- **RBAC (Role-Based Access Control):** Granular permissions for `ADMIN`, `STAFF`, and `USER`.
- **Secure Authentication:** JWT-based auth with automatic access/refresh token rotation via Axios interceptors.
- **Account Management:** Profile updates and avatar uploads.

---

## 🛠️ Tech Stack

This project uses a cutting-edge stack focused on performance and developer experience:

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
├── 📁 app/                 # Next.js App Router pages and layouts
│   ├── 📁 (main)/          # Public landing pages (Home, About, Contact)
│   ├── 📁 (util-pages)/    # Maintenance, 404, Unauthorized pages
│   ├── 📁 auth/            # Sign In, Sign Up, Reset Password
│   └── 📁 dashboard/       # Protected application routes
├── 📁 components/          # Reusable UI components
│   ├── 📁 dashboard/       # Dashboard-specific widgets & tables
│   ├── 📁 main/            # Landing page sections
│   └── 📁 ui/              # Shadcn/Radix primitives (Button, Card, etc.)
├── 📁 config/              # Constants and navigation config
├── 📁 hooks/               # Custom React hooks (useGetData, usePostData)
├── 📁 lib/                 # Utilities (Axios instance, utils.ts)
├── 📁 providers/           # Context providers (Theme, QueryClient)
└── 📁 public/              # Static assets
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.17.0 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/zidanindratama/fe-predictive-lead-scoring.git
    cd fe-predictive-lead-scoring
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory.
    _(Note: The project currently defaults to a hardcoded base URL in `lib/axios.ts`, but using ENV is recommended)_

    ```env
    NEXT_PUBLIC_API_URL=https://be-predictive-lead-scoring.vercel.app
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---

## 🌐 API Integration

The application communicates with a backend service (NestJS/Prisma) configured in `lib/axios.ts`.

- **Base URL:** `https://be-predictive-lead-scoring.vercel.app` (or localhost for dev)
- **Authentication:** HttpOnly Cookies are used for secure token storage.
- **Interceptors:** Automatic handling of `401 Unauthorized` errors to trigger the refresh token flow.

---

## 👥 The Team

This project was architected and built by:

- **Alexander Brian Susanto** - React & Backend with AI (Binus University)
- **Nur Bintang Hidayat** - Machine Learning (Gunadarma University)
- **Muhamad Zidan Indratama** - React & Backend with AI (Gunadarma University)
- **Muhamad Rafli Kamal** - Machine Learning (Politeknik Enjinering Indorama)
- **Ilham Maulana** - React & Backend with AI (Gunadarma University)

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
