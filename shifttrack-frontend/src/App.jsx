import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import CompaniesPage from "./pages/CompaniesPage";
import WorkEntriesPage from "./pages/WorkEntriesPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <main className="max-w-6xl mx-auto py-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/work-entries" element={<WorkEntriesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}