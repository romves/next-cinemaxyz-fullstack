"use client";

import { useFetchSession } from "@/lib/auth";
import React, { useState } from "react";

const Page = () => {
  const { data: session } = useFetchSession();
  const [balance, setBalance] = useState(session?.balance || 0);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleTopUp = () => {
    setShowModal(true);
    // Implement the logic for top-up here
    // Example: Make an API request to your backend to add funds to the user's balance
    // After the top-up is successful, update the balance state accordingly
    setBalance(balance + amount); // Replace "amount" with the actual top-up amount
  };

  const handleWithdraw = () => {
    setShowModal(true);
    // Implement the logic for withdrawal here
    // Example: Make an API request to your backend to subtract funds from the user's balance
    // After the withdrawal is successful, update the balance state accordingly
    setBalance(balance - amount); // Replace "amount" with the actual withdrawal amount
  };

  return (
    <div className="user-page-layout flex flex-col gap-4 items-center justify-center ">
      <h3>Balance: ${balance}</h3>
      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={handleTopUp}>
          Top-up
        </button>
        <button className="btn btn-primary" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box flex flex-col gap-4 items-center">
          <h3>Enter Amount</h3>
          <input
            className="input border-neutral-400"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="flex gap-4">
            <button className="btn btn-outline btn-md" onClick={handleTopUp}>
              Confirm
            </button>
            <button
              className="btn btn-outline btn-md"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Page;
