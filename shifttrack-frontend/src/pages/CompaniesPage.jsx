import { useState } from "react";

export default function CompanyForm({ onCompanyCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    weekdayRate: "",
    saturdayRate: "",
    sundayRate: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    await onCompanyCreated({
      name: formData.name,
      weekdayRate: Number(formData.weekdayRate),
      saturdayRate: Number(formData.saturdayRate),
      sundayRate: Number(formData.sundayRate),
    });

    setFormData({
      name: "",
      weekdayRate: "",
      saturdayRate: "",
      sundayRate: "",
    });

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto bg-[#0f0f0f] border border-[#222] rounded-3xl p-10 shadow-lg">

      <h2 className="text-2xl font-semibold text-white text-center mb-2">
        Add Company
      </h2>

      <p className="text-center text-gray-400 text-sm mb-8">
        Define the hourly rates for this company
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Company Name */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Company Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-gray-500 transition"
            placeholder="e.g. RDC"
            required
          />
        </div>

        {/* Weekday */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Weekday Rate
          </label>

          <input
            type="number"
            step="0.01"
            name="weekdayRate"
            value={formData.weekdayRate}
            onChange={handleChange}
            className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-gray-500 transition"
            placeholder="30.00"
            required
          />
        </div>

        {/* Saturday */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Saturday Rate
          </label>

          <input
            type="number"
            step="0.01"
            name="saturdayRate"
            value={formData.saturdayRate}
            onChange={handleChange}
            className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-gray-500 transition"
            placeholder="36.00"
            required
          />
        </div>

        {/* Sunday */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Sunday Rate
          </label>

          <input
            type="number"
            step="0.01"
            name="sundayRate"
            value={formData.sundayRate}
            onChange={handleChange}
            className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-gray-500 transition"
            placeholder="42.00"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-white text-black rounded-xl py-3 font-medium hover:opacity-90 transition"
        >
          {loading ? "Saving..." : "Add Company"}
        </button>

      </form>
    </div>
  );
}