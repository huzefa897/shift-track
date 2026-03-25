# ShiftTrack

A full-stack timesheet and pay tracking application that helps users record work shifts, calculate earnings, and analyze income across different companies.

---

## 🚀 Features

### ✅ Core Features

- Add and manage companies with custom pay rates
- Record work entries (date, time, breaks, notes)
- Automatic calculation of:
    - Total hours
    - Gross pay
    - Tax
    - Net pay
- Filter entries by date range and company
- Dashboard with summary cards:
    - Total Hours
    - Total Gross Pay
    - Total Tax
    - Total Net Pay
    - Total Entries

---

### ⚡ Product Improvements (Phase 3)

- Quick filters (last week, fortnight, month)
- Sorting (date, pay, hours, company)
- Editing and deleting entries
- Backend pagination for scalable data handling

---

## 🏗️ Tech Stack

### Backend

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Lombok

### Frontend

- React (Vite)
- Tailwind CSS
- shadcn/ui
- Axios

---

## 📊 Architecture

- RESTful API with layered architecture:
    - Controller → Service → Repository
- DTO-based request/response handling
- Centralized pay calculation logic
- Clean separation of concerns

---

## 📌 Current Status

### ✅ Completed

- Phase 1 — Backend Foundation
- Phase 2 — Frontend Core
- Phase 3 (in progress):
    - Filtering
    - Editing & Deleting entries
    - Sorting
    - Pagination (backend implemented)

### 🔄 In Progress

- Frontend pagination integration

### ⏭️ Next

- Analytics dashboard (charts)
- Dockerization & deployment

---

## 📈 Key Learnings

- Designing scalable REST APIs
- Handling financial calculations safely using `BigDecimal`
- Managing relational data with JPA (`ManyToOne`)
- Building reusable UI components with React + Tailwind
- Implementing pagination and filtering for real-world datasets

---

## 🛠️ Getting Started

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Enhancements

- Charts for income and hours (Recharts)
- CSV / PDF export
- Mobile responsiveness improvements
- Docker + deployment setup
- Calendar integrations

---

## 💡 About the Project

ShiftTrack was built as a real-world practice project to simulate production-level backend and frontend development, focusing on clean architecture, scalability, and usability.

---
