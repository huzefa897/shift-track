# Phase 1 Day-by-Day Roadmap

## Day 1 — Project setup

Goal: app runs and connects to database.

Tasks:

- create Spring Boot project
- add dependencies
- configure PostgreSQL in `application.properties`
- run app successfully
- verify DB connection
- create base package structure

Deliverable:

- backend project starts without errors

---

## Day 2 — Company module

Goal: company CRUD basics done.

Tasks:

- create `Company` entity
- create `CompanyRepository`
- create `CompanyService`
- create `CompanyController`
- create DTOs for company
- test create company
- test get all companies
- test get by id

Deliverable:

- you can save and fetch companies in Postman

---

## Day 3 — WorkEntry module structure

Goal: save work entries linked to company.

Tasks:

- create `WorkEntry` entity
- add `ManyToOne` relationship with `Company`
- create `WorkEntryRepository`
- create `WorkEntryService`
- create `WorkEntryController`
- create request/response DTOs
- save entry without calculation first if needed

Deliverable:

- a work entry can be saved for a company

---

## Day 4 — Hours and pay calculation

Goal: business logic works.

Tasks:

- create `PayCalculationService`
- calculate `totalHours`
- determine weekday/saturday/sunday rate
- calculate `calculatedPay`
- plug this into work entry creation flow
- test with multiple dates

Deliverable:

- entry automatically calculates pay correctly

---

## Day 5 — Filtering and summary

Goal: reports start working.

Tasks:

- add repository query for date range
- create `GET /api/work-entries/filter`
- create `SummaryResponse`
- create `GET /api/reports/summary`
- calculate:
    - total hours
    - total pay
    - total entries

Deliverable:

- backend can filter entries and return summary totals

---

## Day 6 — Exception handling and cleanup

Goal: make project more professional.

Tasks:

- add `ResourceNotFoundException`
- add `GlobalExceptionHandler`
- handle invalid company id
- handle invalid work entry data
- clean service/controller code
- improve response structure if needed

Deliverable:

- errors are readable and project looks cleaner

---

## Day 7 — Backend testing and polish

Goal: phase 1 backend complete.

Tasks:

- test all endpoints in Postman
- create sample companies
- create sample entries
- verify Saturday/Sunday calculations
- verify date filters
- fix edge cases
- prepare for frontend

Deliverable:

- Phase 1 backend done and stable

---

# Frontend Phase 1 Plan

After backend is stable, frontend should be very simple.

## Pages

### 1. Companies page

- form to add company
- list existing companies

### 2. Work Entries page

- form to add work entry
- dropdown for company
- table of entries

### 3. Summary page / Dashboard

- from date
- to date
- total hours card
- total pay card
- entries count card

That’s enough.

---

# Order of coding inside backend

This matters a lot. Do it in this order:

## First

- setup project
- database connection

## Then

- Company entity → repository → service → controller

## Then

- WorkEntry entity → repository → service → controller

## Then

- PayCalculationService

## Then

- filter and summary endpoints

## Then

- exception handling

Do not jump around randomly.

# Definition of “Phase 1 complete”

Phase 1 is done when all these are true:

- company can be created
- work entry can be created
- pay is auto-calculated correctly
- entries can be listed
- entries can be filtered by from/to date
- summary totals work
- backend tested in Postman

That’s it. Don’t move the goalpost.

# Project: ShiftTrack

A personal application to record work shifts for different companies and automatically calculate pay based on weekday, Saturday, and Sunday rates.

The application will allow:

- recording work shifts
- managing companies and pay rates
- calculating pay automatically
- filtering work data by time ranges
- viewing summaries of hours and income

Later phases will introduce analytics, UI improvements, and optional automation features.

---

# Tech Stack

### Backend

Spring Boot

PostgreSQL

Spring Data JPA

Bean Validation

JUnit (testing)

### Frontend

React

Vite

Tailwind CSS

Axios

React Router

### DevOps (later phases)

Docker

Docker Compose

---

# Development Philosophy

The project will be built in **incremental phases**:

1. Backend foundation
2. Backend business logic
3. Backend polish
4. Frontend core UI
5. Frontend usability
6. Product-level improvements

Each phase contains **small daily milestones**.

---

# Phase 1 — Backend Foundation

Goal: create a stable backend that stores companies and work entries.

### Day 1 — Project Setup

Create Spring Boot project

Setup:

```
Spring Web
Spring Data JPA
PostgreSQL
Validation
Lombok
```

Configure:

```
application.yml
database connection
```

Create base project structure:

```
controller
service
repository
entity
dto
```

Add:

```
HealthController
```

Test endpoint:

```
GET /api/health
```

---

### Day 2 — Company Entity

Create:

```
Company
```

Fields:

```
id
name
weekdayRate
saturdayRate
sundayRate
createdAt
```

Create:

```
CompanyRepository
CompanyService
CompanyController
```

Endpoints:

```
POST /companies
GET /companies
GET /companies/{id}
```

---

### Day 3 — WorkEntry Entity

Create:

```
WorkEntry
```

Fields:

```
id
workDate
startTime
endTime
breakHours
totalHours
calculatedPay
notes
company
```

Relationship:

```
ManyToOne -> Company
```

Create:

```
WorkEntryRepository
WorkEntryService
WorkEntryController
```

Endpoints:

```
POST /work-entries
GET /work-entries
GET /work-entries/{id}
```

---

### Day 4 — Pay Calculation Logic

Create:

```
PayCalculationService
```

Responsibilities:

Determine rate depending on day:

```
Weekday -> weekdayRate
Saturday -> saturdayRate
Sunday -> sundayRate
```

Calculate:

```
totalHours
pay = hours × rate
```

Integrate into `WorkEntryService`.

---

### Day 5 — Date Filtering

Add query methods:

```
findByWorkDateBetween()
```

Endpoints:

```
GET /work-entries/filter?from=&to=
```

Create:

```
SummaryResponse
```

Endpoint:

```
GET /reports/summary
```

Returns:

```
totalHours
totalPay
totalEntries
```

---

### Day 6 — Error Handling

Add global exception handling.

Create:

```
ResourceNotFoundException
GlobalExceptionHandler
ErrorResponse
```

Return proper HTTP statuses:

```
404
400
500
```

Add validation to DTOs.

---

### Day 7 — Backend Polish

Add missing CRUD operations.

Endpoints:

```
PUT /companies/{id}
DELETE /companies/{id}

PUT /work-entries/{id}
DELETE /work-entries/{id}
```

Improve validation.

Add service-level checks.

---

# Phase 2 — Frontend Core

Goal: create a working UI that talks to backend.

---

### FE Day 1 — Frontend Setup

Create React app using Vite.

Install:

```
axios
react-router-dom
tailwindcss
```

Create structure:

```
components
pages
api
```

Create pages:

```
DashboardPage
CompaniesPage
WorkEntriesPage
```

Create:

```
Navbar
```

---

### FE Day 2 — Companies Page

Build:

```
CompanyForm
CompanyList
```

Features:

```
Create company
Fetch companies
Display companies
```

Connect to backend.

---

### FE Day 3 — Work Entries Page

Build:

```
WorkEntryForm
WorkEntryTable
```

Features:

```
Select company
Enter shift details
Calculate pay via backend
Display entries
```

---

### FE Day 4 — Dashboard

Create:

```
SummaryCards
DateFilter
EntriesTable
```

Features:

```
Filter by date range
Show totals
Show filtered entries
```

---

### FE Day 5 — UI Improvements

Improve design:

```
Apple-style minimal UI
Better spacing
Better cards
Cleaner typography
```

Introduce reusable components:

```
Card
Input
Button
SectionHeader
```

---

# Phase 3 — Product Improvements

Goal: make the app actually useful daily.

---

### Day 1 — Better Filtering

Add filters:

```
Last week
Last fortnight
Last month
```

---

### Day 2 — Editing Entries

Allow:

```
Edit work entry
Inline editing
```

---

### Day 3 — Deleting Entries

Add confirmation modals.

---

### Day 4 — Sorting

Sort by:

```
Date
Company
Pay
```

---

### Day 5 — Pagination

Handle large datasets.

---

# Phase 4 — Analytics

Goal: visualize work data.

---

### Features

Charts:

```
Weekly income
Hours worked
Income per company
```

Libraries:

```
Recharts
```

---

# Phase 5 — DevOps

Goal: production-ready app.

---

### Docker

Create:

```
Dockerfile backend
Dockerfile frontend
docker-compose
```

Run full stack with one command.

---

### Deployment

Possible options:

```
Render
Railway
Fly.io
AWS
```

---

# Phase 6 — Advanced Features

Optional future features.

---

### Mobile optimization

Better responsive layout.

---

### Export

Export work logs to:

```
CSV
PDF
```

---

### Automation

Possible integrations:

```
Google Calendar
Timesheet imports
```

---

# Final Folder Structure (Backend)

```
shifttrack-backend
│
├── controller
├── service
├── repository
├── entity
├── dto
├── exception
└── config
```

---

# Final Folder Structure (Frontend)

```
shifttrack-frontend
│
├── components
├── pages
├── api
├── hooks
└── utils
```

---

# Realistic Timeline

If you work consistently:

```
Phase 1 backend     → 1 week
Phase 2 frontend    → 1 week
Phase 3 improvements→ 1 week
Phase 4 analytics   → 3–4 days
Phase 5 docker      → 2 days
```

Total:

**~3 weeks for a polished project.**

That’s a **very solid portfolio project**.

---

If you want, I can also give you something extremely useful for the new project:

**A full project README + architecture diagram that makes this look like a professional GitHub project.**

yes

Good move. If you’re starting fresh, the first thing you should create is a **strong README + architecture overview**. This does two things:

1. Keeps *you* disciplined about the structure.
2. Makes the project look **serious and professional** on GitHub.

Below is a **complete README template** you can literally paste into your repo and adjust as you build.

---

# ShiftTrack

A personal shift tracking application that records daily work entries for multiple companies and automatically calculates pay based on weekday, Saturday, and Sunday rates.

The application provides an easy way to track hours worked, calculate income, and view summaries over custom date ranges.

---

# Project Goals

The goal of this project is to build a **real-world full-stack application** while learning:

- backend architecture with Spring Boot
- REST API design
- frontend development with React
- database modelling
- testing and error handling
- Docker and deployment

The project is built incrementally through structured phases.

---

# Features

### Core Features

- Create and manage companies
- Define weekday, Saturday, and Sunday pay rates
- Record work shifts
- Automatic pay calculation
- Filter work entries by date
- View total hours and earnings

### Planned Improvements

- Dashboard analytics
- Charts for weekly/monthly earnings
- CSV export
- Mobile-friendly UI
- Dockerized deployment

---

# Tech Stack

## Backend

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Bean Validation
- JUnit

## Frontend

- React
- Vite
- TailwindCSS
- Axios
- React Router

## DevOps (planned)

- Docker
- Docker Compose

---

# System Architecture

```
React Frontend
      |
      | REST API
      |
Spring Boot Backend
      |
      | JPA
      |
PostgreSQL Database
```

---

# Application Architecture

The backend follows a layered architecture:

```
Controller
    |
Service
    |
Repository
    |
Database
```

### Controller

Handles HTTP requests and responses.

Example:

```
POST /api/work-entries
GET  /api/companies
```

---

### Service

Contains business logic such as:

- calculating pay
- validating data
- applying business rules

---

### Repository

Responsible for database access using Spring Data JPA.

---

### DTO Layer

DTOs separate API models from database entities.

Example:

```
CompanyRequest
CompanyResponse
WorkEntryRequest
WorkEntryResponse
SummaryResponse
```

---

# Database Design

## Company

```
Company
-------
id
name
weekday_rate
saturday_rate
sunday_rate
created_at
```

---

## WorkEntry

```
WorkEntry
---------
id
work_date
start_time
end_time
break_hours
total_hours
calculated_pay
notes
company_id
```

Relationship:

```
Company 1 ---- * WorkEntry
```

---

# API Endpoints

## Companies

Create company

```
POST /api/companies
```

Get all companies

```
GET /api/companies
```

Get company by id

```
GET /api/companies/{id}
```

Update company

```
PUT /api/companies/{id}
```

Delete company

```
DELETE /api/companies/{id}
```

---

## Work Entries

Create entry

```
POST /api/work-entries
```

Get all entries

```
GET /api/work-entries
```

Get entry by id

```
GET /api/work-entries/{id}
```

Update entry

```
PUT /api/work-entries/{id}
```

Delete entry

```
DELETE /api/work-entries/{id}
```

Filter entries

```
GET /api/work-entries/filter?from=YYYY-MM-DD&to=YYYY-MM-DD
```

---

## Reports

Get summary

```
GET /api/reports/summary?from=YYYY-MM-DD&to=YYYY-MM-DD
```

Response example:

```
{
  totalHours: 45.5,
  totalPay: 1520.50,
  totalEntries: 6
}
```

---

# Project Phases

## Phase 1 — Backend Foundation

- Spring Boot setup
- Company entity
- WorkEntry entity
- Pay calculation logic
- Date filtering
- Error handling
- CRUD operations

Estimated time: **1 week**

---

## Phase 2 — Frontend Core

- React setup
- Navigation
- Companies page
- Work entry form
- Work entries table
- Dashboard page

Estimated time: **1 week**

---

## Phase 3 — Product Improvements

- Entry editing
- Entry deletion
- Advanced filtering
- Sorting
- Pagination

Estimated time: **1 week**

---

## Phase 4 — Analytics

- Weekly income charts
- Monthly summaries
- Company comparison

---

## Phase 5 — DevOps

- Docker
- Docker Compose
- Deployment

---

# Project Structure

## Backend

```
shifttrack-backend
│
├── controller
├── service
├── repository
├── entity
├── dto
├── exception
└── config
```

---

## Frontend

```
shifttrack-frontend
│
├── components
├── pages
├── api
├── hooks
└── utils
```

---

# Example Workflow

1. Create companies and define pay rates.
2. Record work entries for each shift.
3. System calculates hours and pay automatically.
4. Use date filters to view earnings.
5. View summaries of total hours and pay.

---

# Future Improvements

Possible future features:

- mobile app
- receipt export
- automatic timesheet generation
- integrations with calendar tools

---

# License

This project is for learning and personal productivity purposes.
