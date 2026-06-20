# InvestFlow Progress Documentation

## Project Overview

**Project Name:** InvestFlow

**Type:** Mobile-First PWA Investment Tracking Platform

---

## Core Business Flow

```text
Admin
├── Create Investor
├── Add Investment
├── Distribute Profit
├── View Reports
└── Send Notifications

Investor
├── View Portfolio
├── View Investment History
├── View Profit History
├── Receive Notifications
└── View Profile
```

---

## Business Rules

* Admin creates investor accounts.
* Mobile number is used for login.
* Email is NOT required.
* Admin manually adds investments.
* Profit calculation formula will be hardcoded in backend.
* Same formula applies to all investors.
* Investors cannot modify financial data.
* Investors have read-only access.
* Whenever Admin adds investment or distributes profit, investor receives an in-app notification.

---

# Frontend Tech Stack

```text
React
Vite
Tailwind CSS
React Router DOM
Framer Motion
Lucide React
Chart.js
React ChartJS 2
```

---

# Installed Dependencies

```bash
npm install react-router-dom

npm install framer-motion

npm install lucide-react

npm install chart.js react-chartjs-2

npm install -D tailwindcss
```

---

# Stable Frontend Folder Structure

```text
src
├── components
│   ├── charts
│   │   └── PortfolioGrowthChart.jsx
│   │
│   ├── common
│   │   ├── GlassCard.jsx
│   │   ├── GradientButton.jsx
│   │   ├── PageContainer.jsx
│   │   ├── PremiumInput.jsx
│   │   └── StatCard.jsx
│   │
│   ├── dashboard
│   │   ├── AdminSidebar.jsx
│   │   └── PortfolioHero.jsx
│   │
│   └── investor
│       ├── AddInvestmentModal.jsx
│       ├── BottomNav.jsx
│       ├── DistributeProfitModal.jsx
│       ├── InvestmentHistoryTable.jsx
│       ├── ProfitHistoryTable.jsx
│       └── TransactionTimeline.jsx
│
├── context
│   └── AuthContext.jsx
│
├── layouts
│   ├── AdminLayout.jsx
│   ├── AuthLayout.jsx
│   └── InvestorLayout.jsx
│
├── pages
│   ├── admin
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminNotifications.jsx
│   │   ├── Distributions.jsx
│   │   ├── InvestorDetails.jsx
│   │   ├── Investors.jsx
│   │   ├── Reports.jsx
│   │   └── Transactions.jsx
│   │
│   ├── auth
│   │   └── Login.jsx
│   │
│   └── investor
│       ├── InvestmentHistory.jsx
│       ├── InvestorDashboard.jsx
│       ├── InvestorNotifications.jsx
│       ├── Portfolio.jsx
│       ├── Profile.jsx
│       └── ProfitHistory.jsx
│
├── routes
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services
├── hooks
├── utils
└── constants
```

---

# Frontend Screens Completed

## Admin

```text
✅ Dashboard
✅ Investors
✅ Investor Details
✅ Transactions
✅ Distributions
✅ Reports
✅ Notifications
```

## Investor

```text
✅ Dashboard
✅ Portfolio
✅ Investment History
✅ Profit History
✅ Notifications
✅ Profile
```

---

# Components Completed

## Common

```text
GlassCard
GradientButton
PremiumInput
PageContainer
StatCard
```

## Dashboard

```text
AdminSidebar
PortfolioHero
```

## Investor

```text
AddInvestmentModal
DistributeProfitModal
InvestmentHistoryTable
ProfitHistoryTable
TransactionTimeline
BottomNav
```

## Charts

```text
PortfolioGrowthChart
```

---

# Current Routes

## Admin

```text
/admin/dashboard
/admin/investors
/admin/investors/:id
/admin/transactions
/admin/distributions
/admin/reports
/admin/notifications
```

## Investor

```text
/investor/dashboard
/investor/portfolio
/investor/history
/investor/notifications
/investor/profile
```

---

# Completed Business Flows

## Investor Management

```text
Admin
→ Investors
→ Click Investor
→ Investor Details
```

## Investment Flow

```text
Admin
→ Open Investor
→ Add Investment
→ Investment History Updates
```

## Profit Distribution Flow

```text
Admin
→ Open Investor
→ Distribute Profit
→ Profit History Updates
```

---

# Frontend State Naming Standard

Use these names consistently:

```javascript
investor
investors

investment
investments

profitDistribution
profitDistributions

notification
notifications
```

Avoid:

```javascript
data
list
records
items
history
```

---

# Planned Backend Models

```text
Investor
Investment
ProfitDistribution
Notification
```

---

# Planned Backend APIs

## Authentication

```http
POST /api/auth/login
```

## Investors

```http
GET    /api/investors
GET    /api/investors/{id}
POST   /api/investors
PUT    /api/investors/{id}
DELETE /api/investors/{id}
```

## Investments

```http
GET    /api/investments/{investorId}
POST   /api/investments
```

## Profit Distributions

```http
GET    /api/profit-distributions/{investorId}
POST   /api/profit-distributions
```

## Notifications

```http
GET    /api/notifications/{investorId}
POST   /api/notifications
```

---

# Current Project Status

```text
Frontend UI/UX        : ~85% Complete
Routing               : In Progress
Navigation Audit      : In Progress
Responsive Pass       : Pending
Toast Notifications   : Pending
Loading States        : Pending
Backend Development   : Not Started
API Integration       : Not Started
Deployment            : Not Started
```

---

# Next Session Checklist

```text
1. Audit BottomNav.jsx

2. Verify all investor routes

3. Verify distributions route

4. Make investor cards clickable

5. Complete InvestorDetails routing

6. Add Create Investor Modal

7. Responsive pass

8. Loading skeletons

9. Toast notifications

10. Final frontend polish

11. Start ASP.NET Core backend
```

---

# Current Frontend Dependencies

```text
react-router-dom
tailwindcss
framer-motion
lucide-react
chart.js
react-chartjs-2
```

---

# Architecture Status

```text
✔ Stable folder structure finalized
✔ Notification naming standardized
✔ Admin routing structure established
✔ Investor routing structure established
✔ Modal-based investment workflow implemented
✔ Modal-based profit distribution workflow implemented
✔ Frontend-first development approach adopted

Next Major Milestone:
Complete Frontend → Responsive Pass → UI Polish → ASP.NET Core Backend
```
