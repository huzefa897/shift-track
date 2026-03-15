import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DashboardPage from "@/pages/DashboardPage";
import CompaniesPage from "@/pages/CompaniesPage";
import WorkEntriesPage from "@/pages/WorkEntriesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-zinc-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/entries" element={<WorkEntriesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;