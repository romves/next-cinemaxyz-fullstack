"use client";

import CloseModal from "@/components/CloseModal";
import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/use-toast";
import { useFetchSession } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import React, { SyntheticEvent, useLayoutEffect, useState } from "react";

const Page = () => {
  const { data: session } = useFetchSession();
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [actionType, setActionType] = useState("");

  const handleTopUp = () => {
    if (amount == 0) return;

    axiosInstance
      .post("/user/topup", {
        topupAmount: amount,
      })
      .then((res) => {
        return toast({
          title: "Topup Success",
          description: `Topup with amount of ${amount} is success`,
          variant: "default",
        });
      })
      .catch((error) =>
        toast({
          title: "Something went wrong",
          description: error,
          variant: "destructive",
        })
      );

    setAmount(0);
    setShowModal(false);
  };

  const handleWithdraw = () => {
    // Implement the logic for withdrawal here
    // Example: Make an API request to your backend to subtract funds from the user's balance
    // After the withdrawal is successful, update the balance state accordingly
    setBalance(balance - amount!); // Replace "amount" with the actual withdrawal amount
    setAmount(0);
    setShowModal(false);
  };

  const openModal = (action: string) => {
    setShowModal(true);
    setActionType(action);
  };

  useLayoutEffect(() => {
    setBalance(session?.balance!);
  }, [session?.balance]);

  return (
    <UserInfoLayout className="flex flex-col gap-4 items-center justify-center ">
      <h3>Balance: ${balance}</h3>
      <div className="flex gap-4">
        <Button className="" onClick={() => openModal("topup")}>
          Top-up
        </Button>
        <Button className="" onClick={() => openModal("withdraw")}>
          Withdraw
        </Button>
      </div>

      {showModal ? (
        <div className="fixed inset-0 bg-zinc-900/20 z-10">
          <div className="container flex items-center justify-center h-full max-w-lg mx-auto">
            <div className="relative flex flex-col items-center gap-2 bg-white w-fit h-fit py-16 px-8 rounded-lg">
              <h3>Enter Amount {actionType}</h3>
              <Input
                min={0}
                className="input border-neutral-400"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="flex gap-4">
                <Button
                  className=""
                  onClick={
                    actionType === "topup" ? handleTopUp : handleWithdraw
                  }
                >
                  Confirm
                </Button>
                <Button
                  className=""
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </UserInfoLayout>
  );
};

export default Page;
