Yes — here’s the **remade ShiftTrack roadmap** using your existing roadmap from the file, but updated with the **GitHub branching workflow** and with **Completed** marked on the parts you’ve already finished. The original roadmap covers Phase 1 backend, Phase 2 frontend, and the next phases from Product Improvements onward.

# ShiftTrack Roadmap — Updated with GitHub Workflow

## GitHub workflow rule for the whole project

Do **not** create one branch per phase.

Create **one branch per feature/day task**.

Branch naming style:

```bash
feature/<task-name>
```

Examples:

```bash
feature/company-module
feature/work-entry-module
feature/dashboard-page
feature/quick-filters
feature/edit-work-entry
feature/docker-setup
```

Recommended flow for every task:

```bash
git checkout main
git pull origin main
git checkout -b feature/<task-name>
# do the work
git add .
git commit -m "feat: <what you built>"
git checkout main
git merge feature/<task-name>
```

---

# Phase 1 — Backend Foundation

Goal: create a stable backend that stores companies and work entries.

## Day 1 — Project Setup — **Completed**

Suggested branch:

```bash
feature/backend-project-setup
```

Tasks:

- create Spring Boot project
- add dependencies
- configure PostgreSQL
- run app successfully
- verify DB connection
- create base package structure
- add health endpoint

Deliverable:

- backend project starts without errors

---

## Day 2 — Company Module — **Completed**

Suggested branch:

```bash
feature/company-module
```

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

- companies can be saved and fetched

---

## Day 3 — WorkEntry Module Structure — **Completed**

Suggested branch:

```bash
feature/work-entry-module
```

Tasks:

- create `WorkEntry` entity
- add `ManyToOne` relationship with `Company`
- create `WorkEntryRepository`
- create `WorkEntryService`
- create `WorkEntryController`
- create request/response DTOs

Deliverable:

- a work entry can be saved for a company

---

## Day 4 — Hours and Pay Calculation — **Completed**

Suggested branch:

```bash
feature/pay-calculation
```

Tasks:

- create `PayCalculationService`
- calculate `totalHours`
- determine weekday / saturday / sunday rate
- calculate `calculatedPay`
- plug this into work entry creation flow
- test with multiple dates

Deliverable:

- entry automatically calculates pay correctly

---

## Day 5 — Filtering and Summary — **Completed**

Suggested branch:

```bash
feature/filter-and-summary
```

Tasks:

- add repository query for date range
- create `GET /api/work-entries/filter`
- create `SummaryResponse`
- create `GET /api/reports/summary`
- calculate total hours, total pay, total entries

Deliverable:

- backend can filter entries and return summary totals

---

## Day 6 — Exception Handling and Cleanup — **Completed**

Suggested branch:

```bash
feature/exception-handling
```

Tasks:

- add `ResourceNotFoundException`
- add `GlobalExceptionHandler`
- handle invalid company id
- handle invalid work entry data
- clean service/controller code
- improve response structure

Deliverable:

- errors are readable and project looks cleaner

---

## Day 7 — Backend Testing and Polish — **Completed**

Suggested branch:

```bash
feature/backend-polish
```

Tasks:

- test all endpoints in Postman
- create sample companies
- create sample entries
- verify Saturday/Sunday calculations
- verify date filters
- fix edge cases
- prepare for frontend
- add/update/delete endpoints if missing

Deliverable:

- Phase 1 backend done and stable

---

# Phase 2 — Frontend Core

Goal: create a working UI that talks to backend.

## FE Day 1 — Frontend Setup — **Completed**

Suggested branch:

```bash
feature/frontend-setup
```

Tasks:

- create React app using Vite
- install `axios`, `react-router-dom`, `tailwindcss`
- create structure: `components`, `pages`, `api`
- create `DashboardPage`, `CompaniesPage`, `WorkEntriesPage`
- create `Navbar`

Deliverable:

- frontend app structure is ready

---

## FE Day 2 — Companies Page — **Completed**

Suggested branch:

```bash
feature/companies-page
```

Tasks:

- build `CompanyForm`
- build `CompanyList`
- create company
- fetch companies
- display companies
- connect to backend

Deliverable:

- companies page works end-to-end

---

## FE Day 3 — Work Entries Page — **Completed**

Suggested branch:

```bash
feature/work-entries-page
```

Tasks:

- build `WorkEntryForm`
- build `WorkEntryTable`
- select company
- enter shift details
- calculate pay via backend
- display entries

Deliverable:

- work entries page works end-to-end

---

## FE Day 4 — Dashboard — **Completed**

Suggested branch:

```bash
feature/dashboard-page
```

Tasks:

- create `SummaryCards`
- create `DateFilter`
- create `EntriesTable`
- filter by date range
- show totals
- show filtered entries

Deliverable:

- dashboard works with backend data

---

## FE Day 5 — UI Improvements — **Completed**

Suggested branch:

```bash
feature/ui-improvements
```

Tasks:

- improve design
- better spacing
- better cards
- cleaner typography
- reusable UI components like `Card`, `Input`, `Button`, `SectionHeader`

Deliverable:

- UI looks clean and reusable

---

# Phase 3 — Product Improvements

Goal: make the app actually useful daily.

## Day 1 — Better Filtering — **Next**

Suggested branch:

```bash
feature/quick-filters
```

Tasks:

- add preset filters:
    - last week
    - last fortnight
    - last month
- connect presets to dashboard date state
- refetch entries and summary automatically

Deliverable:

- user can filter quickly without manually picking dates

---

## Day 2 — Editing Entries

Suggested branch:

```bash
feature/edit-work-entry
```

Tasks:

- add edit action in table
- reuse `WorkEntryForm` in edit mode
- prefill data
- call `PUT /work-entries/{id}`

Deliverable:

- user can update an existing entry

---

## Day 3 — Deleting Entries

Suggested branch:

```bash
feature/delete-work-entry
```

Tasks:

- add delete action in table
- confirmation modal
- call `DELETE /work-entries/{id}`

Deliverable:

- user can safely delete entries

---

## Day 4 — Sorting

Suggested branch:

```bash
feature/sort-entries
```

Tasks:

- sort by:
    - date
    - company
    - pay
- optionally add hours sorting too

Deliverable:

- entries are easier to scan and use

---

## Day 5 — Pagination

Suggested branch:

```bash
feature/pagination
```

Tasks:

- handle large datasets
- add page navigation
- optionally move pagination to backend later

Deliverable:

- entries table scales better

---

# Phase 4 — Analytics

Goal: visualize work data.

Suggested branch options:

```bash
feature/weekly-income-chart
feature/hours-worked-chart
feature/company-income-chart
```

Tasks:

- add charts for:
    - weekly income
    - hours worked
    - income per company
- use `Recharts`

Deliverable:

- dashboard becomes portfolio-level, not just CRUD

---

# Phase 5 — DevOps

Goal: production-ready app.

## Docker

Suggested branches:

```bash
feature/backend-dockerfile
feature/frontend-dockerfile
feature/docker-compose
```

Tasks:

- create backend Dockerfile
- create frontend Dockerfile
- create docker-compose
- run full stack with one command

Deliverable:

- project runs in containers

## Deployment

Suggested branches:

```bash
feature/deployment-config
```

Tasks:

- prepare deployment for Render / Railway / Fly.io / AWS

Deliverable:

- app is deployable

---

# Phase 6 — Advanced Features

Optional future features.

Suggested branches:

```bash
feature/mobile-optimization
feature/export-csv
feature/export-pdf
feature/google-calendar-integration
feature-timesheet-import
```

Tasks:

- mobile optimization
- export to CSV/PDF
- automation integrations

Deliverable:

- advanced real-world usefulness

---

# Current status summary

## Completed

- Phase 1 backend
- Phase 2 frontend

## Current next task

- **Phase 3 Day 1 — Better Filtering**
- Branch to create:

```bash
git checkout -b feature/quick-filters
```

## After that

- `feature/edit-work-entry`
- `feature/delete-work-entry`
- `feature/sort-entries`
- `feature/pagination`

---

# Clean version you can paste into your repo

```markdown
# ShiftTrack Roadmap

## Git Workflow
Use one branch per feature, not one branch per phase.

Pattern:
- feature/<task-name>

---

## Phase 1 — Backend Foundation
- Day 1 Project Setup — Completed
- Day 2 Company Module — Completed
- Day 3 WorkEntry Module — Completed
- Day 4 Hours and Pay Calculation — Completed
- Day 5 Filtering and Summary — Completed
- Day 6 Exception Handling — Completed
- Day 7 Backend Testing and Polish — Completed

---

## Phase 2 — Frontend Core
- FE Day 1 Frontend Setup — Completed
- FE Day 2 Companies Page — Completed
- FE Day 3 Work Entries Page — Completed
- FE Day 4 Dashboard — Completed
- FE Day 5 UI Improvements — Completed

---

## Phase 3 — Product Improvements
- Day 1 Better Filtering — Next
- Day 2 Editing Entries
- Day 3 Deleting Entries
- Day 4 Sorting
- Day 5 Pagination

---

## Phase 4 — Analytics
- Weekly income chart
- Hours worked chart
- Income per company chart

---

## Phase 5 — DevOps
- Backend Dockerfile
- Frontend Dockerfile
- Docker Compose
- Deployment

---

## Phase 6 — Advanced Features
- Mobile optimization
- CSV/PDF export
- Automation integrations
```

If you want, I can turn this into a **proper `ROADMAP.md` file format** with checkboxes and branch names beside each task.
