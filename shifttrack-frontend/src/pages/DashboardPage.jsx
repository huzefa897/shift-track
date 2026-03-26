import { useEffect, useState } from "react";
import {
  fetchCompanies,
  fetchFilteredWorkEntries,
  fetchSummary,
} from "@/api/dashboardApi";
import DateFilter from "@/components/DateFilter";
import SummaryCards from "@/components/SummaryCards";
import EntriesTable from "@/components/EntriesTable";
import WeeklyIncomeCharts from "@/components/WeeklyIncomeCharts";
import { fetchWeeklyIncome } from "../api/reportService";

function DashboardPage() {
  const today = new Date().toISOString().split("T")[0];
  const [weeklyIncome, setWeeklyIncome] = useState([]); // TODO: Implement weekly income chart
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({
    from: today,
    to: today,
    companyId: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: "workDate",
    direction: "desc",
  });

  const [summary, setSummary] = useState({
    totalHours: 0,
    totalPay: 0,
    totalTax: 0,
    totalNetPay: 0,
    totalEntries: 0,
  });


  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loadCompanies() {
    try {
      const companiesData = await fetchCompanies();
      setCompanies(companiesData);
    } catch (err) {
      console.error("Failed to load companies:", err);
    }
  }

  function handleQuickFilter(type) {
    const today = new Date();
    const fromDate = new Date();

    if (type === "week") {
      fromDate.setDate(today.getDate() - 7);
    } else if (type === "fortnight") {
      fromDate.setDate(today.getDate() - 14);
    } else if (type === "month") {
      fromDate.setMonth(today.getMonth() - 1);
    }

    const updatedFilters = {
      ...filters,
      from: fromDate.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    };

    setFilters(updatedFilters);
    fetchDashboardData(updatedFilters);
  }

  async function fetchDashboardData(currentFilters = filters) {
    if (!currentFilters.from || !currentFilters.to) {
      setError("Please select both from and to dates.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [entriesData, summaryData,weeklyIncomeData] = await Promise.all([
        fetchFilteredWorkEntries(currentFilters),
        fetchSummary(currentFilters),
        fetchWeeklyIncome(currentFilters)
      ]);

      setEntries(entriesData);
      setSummary(summaryData);
      setWeeklyIncome(weeklyIncomeData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompanies();
    fetchDashboardData(filters);
  }, []);

  const sortedEntries = [...entries].sort((a, b) => {
    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];

    if (sortConfig.key === "company") {
      valueA = a.company?.name?.toLowerCase() || "";
      valueB = b.company?.name?.toLowerCase() || "";
    }

    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
            ShiftTrack
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            View filtered totals and work entries for a selected date range.
          </p>
        </div>

        <div className="space-y-6">
          <DateFilter
            filters={filters}
            onChange={handleFilterChange}
            onApply={() => fetchDashboardData(filters)}
            onQuickFilter={handleQuickFilter}
          />

          <select
            name="companyId"
            value={filters.companyId}
            onChange={handleFilterChange}
            className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-600 disabled:opacity-60"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortConfig({ key: "workDate", direction: "desc" })}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800"
            >
              Latest Date
            </button>
            <button
              onClick={() => setSortConfig({ key: "calculatedPay", direction: "desc" })}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800"
            >
              Highest Pay
            </button>
            <button
              onClick={() => setSortConfig({ key: "totalHours", direction: "desc" })}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800"
            >
              Highest Hours
            </button>
            <button
              onClick={() => setSortConfig({ key: "company", direction: "asc" })}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800"
            >
              Company A-Z
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              Loading dashboard...
            </div>
          ) : (
            <>
              <SummaryCards summary={summary} />
              <WeeklyIncomeCharts weeklyIncome={weeklyIncome}/>
              <EntriesTable entries={sortedEntries} />
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;