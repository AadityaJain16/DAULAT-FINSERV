# 💰 DAULAT FINSERV

> A modern, secure, mobile-first Investment Portfolio Management System built with **ASP.NET Core**, **React**, **SQL Server**, and **Clean Architecture**.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![.NET](https://img.shields.io/badge/.NET-10-purple)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)
![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-red)
![PWA](https://img.shields.io/badge/PWA-Enabled-success)

---

# 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Modules](#-modules)
- [Security Features](#-security-features)
- [Progressive Web App](#-progressive-web-app)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

# 📌 Overview

DAULAT FINSERV is a full-stack Investment Portfolio Management System that enables administrators to manage investor accounts, investments, withdrawals, notifications, and reports while providing investors with a secure portal to monitor their portfolio.

The project follows **Clean Architecture**, ensuring scalability, maintainability, separation of concerns, and enterprise-level code organization.

The frontend is built using **React + Vite**, while the backend is powered by **ASP.NET Core Web API** with **Entity Framework Core** and **SQL Server**.

---

# ✨ Key Features

## 🔐 Authentication

- JWT Authentication
- Mobile Number Login
- Secure Password Hashing (BCrypt)
- Role-Based Authorization
- Protected API Endpoints

---

## 👨‍💼 Admin Portal

- Dashboard Analytics
- Investor Management
- Add Investments
- Process Withdrawals
- Send Notifications
- Activity Logs
- Export Reports
- Search & Filter Investors
- Responsive Dashboard

---

## 👤 Investor Portal

- Personal Dashboard
- Investment History
- Withdrawal History
- Portfolio Summary
- Notifications
- Profile Information
- Mobile Friendly Interface

---

## 📊 Dashboard

- Total Investments
- Current Portfolio
- Withdrawals Summary
- Recent Activities
- Investment Charts
- Performance Overview

---

## 📱 Progressive Web App (PWA)

- Installable on Mobile
- Responsive Design
- Offline Ready Foundation
- App-like Experience
- Fast Loading

---

# 🏗 System Architecture

The application follows **Clean Architecture**.

```
DAULAT-FINSERV

├── frontend
│
└── backend
    ├── InvestFlow.API
    ├── InvestFlow.Application
    ├── InvestFlow.Domain
    ├── InvestFlow.Infrastructure
    └── InvestFlow.slnx
```

---

## Architecture Layers

### Domain

Contains:

- Entities
- Enums
- Interfaces
- Common Classes

Responsible for:

- Business Models
- Domain Rules

---

### Application

Contains:

- DTOs
- Interfaces
- Services
- Validators
- Business Logic

Responsible for:

- Application Logic
- Request Processing

---

### Infrastructure

Contains:

- Entity Framework Core
- Repository Pattern
- Database Context
- Authentication
- Background Services
- External Services

Responsible for:

- Data Access
- Authentication
- Database Operations

---

### API

Contains:

- Controllers
- Middleware
- Dependency Injection
- Swagger
- Authentication Configuration

Responsible for:

- HTTP Endpoints
- API Communication

---

# 🛠 Technology Stack

## Frontend

- React 19
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Chart.js
- Lucide React
- Progressive Web App

---

## Backend

- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- SQL Server
- JWT Authentication
- BCrypt
- Swagger
- Clean Architecture

---

## Database

- SQL Server

---

## DevOps

- Git
- GitHub
- GitHub Actions
- Azure App Service
- Azure SQL Database

---

# 📂 Project Structure

```
DAULAT-FINSERV/

│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── InvestFlow.API/
│   ├── InvestFlow.Application/
│   ├── InvestFlow.Domain/
│   ├── InvestFlow.Infrastructure/
│   └── InvestFlow.slnx
│
└── README.md
```

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

```
screenshots/

login.png

admin-dashboard.png

investor-dashboard.png

investments.png

withdrawals.png
```

Example Markdown

```md
![Login](screenshots/login.png)

![Dashboard](screenshots/dashboard.png)
```

---

# 🚀 Installation Guide

## Prerequisites

Install:

- .NET SDK 10
- Node.js
- SQL Server
- Git

---

## Clone Repository

```bash
git clone https://github.com/AadityaJain16/DAULAT-FINSERV.git

cd DAULAT-FINSERV
```

---

# ⚙ Backend Setup

Move to backend

```bash
cd backend
```

Restore packages

```bash
dotnet restore
```

Apply migrations

```bash
dotnet ef database update
```

Run API

```bash
dotnet run --project InvestFlow.API
```

---

# 🎨 Frontend Setup

Move to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

# 🌍 Environment Variables

## Frontend

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=https://localhost:5001/api
```

---

## Backend

Configure `appsettings.json` or Azure App Settings.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your SQL Server Connection String"
  },
  "Jwt": {
    "Key": "Your JWT Secret",
    "Issuer": "InvestFlow",
    "Audience": "InvestFlowUsers"
  }
}
```

---

# 🗄 Database Setup

Create a SQL Server database.

Run:

```bash
dotnet ef database update
```

The migrations will automatically create all required tables.

---

# ▶ Running the Project

Backend

```bash
cd backend

dotnet run --project InvestFlow.API
```

Frontend

```bash
cd frontend

npm run dev
```

---

# 📚 API Documentation

Swagger is enabled.

After running the backend:

```
https://localhost:5001/swagger
```

or

```
https://localhost:5000/swagger
```

depending on your launch profile.

---

# 🔐 Authentication

The project uses:

- JWT Authentication
- BCrypt Password Hashing
- Role-Based Authorization

Roles:

- Administrator
- Investor

Authentication Flow

```
Login

↓

Validate Credentials

↓

Generate JWT

↓

Return Token

↓

Access Protected APIs
```

---

# 📦 Modules

## Authentication

- Login
- JWT
- Authorization

---

## Investor Management

- Add Investor
- Update Investor
- Delete Investor
- View Investor

---

## Investment Management

- Add Investment
- Investment History
- Portfolio Summary

---

## Withdrawal Management

- Record Withdrawals
- Withdrawal History

---

## Dashboard

- Analytics
- Charts
- Overview

---

## Notifications

- Send Notifications
- View Notifications

---

## Reports

- Generate Reports
- Activity Logs

---

# 🔒 Security Features

- JWT Authentication
- BCrypt Password Hashing
- Role-Based Authorization
- Environment Variables
- Azure Secrets
- Secure API Endpoints
- Clean Architecture
- Input Validation

---

# 📱 Progressive Web App

The frontend supports:

- Installable Application
- Responsive Layout
- Mobile Experience
- Offline Ready Foundation
- Fast Performance

---

# ☁ Deployment

The project is configured for Azure deployment.

Deployment includes:

- Azure App Service
- Azure SQL Database
- GitHub Actions CI/CD

Production deployments are automated through GitHub Actions.

---

# 📈 Future Enhancements

- Automated Profit Engine
- Advanced Reports
- Email Notifications
- SMS Notifications
- Multi-Admin Support
- Investor Document Upload
- Audit Trail
- Portfolio Analytics
- Multi-language Support

---

# 🤝 Contributing

Contributions are welcome.

## Steps

Fork the repository.

Create a new branch.

```bash
git checkout -b feature/your-feature
```

Commit changes.

```bash
git commit -m "Add new feature"
```

Push changes.

```bash
git push origin feature/your-feature
```

Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Aaditya Jain

**GitHub**

https://github.com/AadityaJain16

**LinkedIn**

Add your LinkedIn profile here.

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

Your support motivates future improvements and helps others discover the project.

---

## 🙏 Acknowledgements

This project was developed as a full-stack portfolio application to demonstrate modern software engineering practices including:

- Clean Architecture
- ASP.NET Core Web API
- React + Vite
- SQL Server
- Entity Framework Core
- JWT Authentication
- Azure Deployment
- GitHub Actions CI/CD
- Progressive Web Applications (PWA)

Thank you for checking out the project!
