"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CardPage() {
  const router = useRouter();
  const [data, setData] = useState({
    cardNumber: "",
    issuedDate: "",
    nameOnCard: "",
  });

  const validate = () => {
    if (!data.cardNumber || !data.issuedDate || !data.nameOnCard) {
      alert("All fields are required.");
      return false;
    }

    if (!/^\d+$/.test(data.cardNumber)) {
      alert("Card number must contain only digits.");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(data.nameOnCard)) {
      alert("Name on card must contain only letters.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    localStorage.setItem("survey-card", JSON.stringify(data));
    router.push("/review");
  };

  const handleBack = () => {
    router.push("/account");
  };

  return (
    <div className="p-6 max-w-xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Card Details</h1>

      <div className="grid gap-4">
        <input
          placeholder="Card Number"
          className="border p-3 rounded"
          value={data.cardNumber}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setData({ ...data, cardNumber: e.target.value });
            }
          }}
        />

        <label className="text-gray-500">Card Issue Date</label>
        <input
          type="date"
          placeholder="Card issue date"
          className="border p-3 rounded"
          value={data.issuedDate}
          onChange={(e) => setData({ ...data, issuedDate: e.target.value })}
        />

        <input
          placeholder="Name on Card"
          className="border p-3 rounded"
          value={data.nameOnCard}
          onChange={(e) => {
            if (/^[A-Za-z ]*$/.test(e.target.value)) {
              setData({ ...data, nameOnCard: e.target.value });
            }
          }}
        />

        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-black p-3 rounded w-full"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="bg-blue-600 text-white p-3 rounded w-full"
          >
            Next
          </button>
        </div>
      </div>

          <div className="min-h-screen p-6 max-w-xl mx-auto flex flex-col">
  {/* Your form content */}
  <div className="space-y-4">
    {/* ...inputs and buttons... */}
  </div>

  {/* Footer with Admin link */}
  {/* Admin Link */}
        <footer className="w-full py-4 text-center mt-200">
          <Link 
            href="/admin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Admin Dashboard
          </Link>
        </footer>
</div>

    </div>
  );
}
