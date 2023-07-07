"use client";

import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { useFetchSession } from "@/lib/auth";
import React, { useLayoutEffect, useState } from "react";

const Page = () => {
  const { data: session } = useFetchSession();
  const [balance, setBalance] = useState(0);
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

  useLayoutEffect(() => {
    setBalance(session?.balance!)
  }, [session?.balance])

  return (
    <UserInfoLayout className="flex flex-col gap-4 items-center justify-center ">
      <h3>Balance: ${balance}</h3>
      <div className="flex gap-4">
        <Button className="" onClick={handleTopUp}>
          Top-up
        </Button>
        <Button className="" onClick={handleWithdraw}>
          Withdraw
        </Button>
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
            <Button className="" onClick={handleTopUp}>
              Confirm
            </Button>
            <Button
              className=""
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </UserInfoLayout>
  );
};

export default Page;
