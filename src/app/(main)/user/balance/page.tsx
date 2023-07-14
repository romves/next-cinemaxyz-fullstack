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

  const openModal = (action: string) => {
    setShowModal(true);
    setActionType(action);
  };

  const handleTopUp = () => {
    if (amount == 0) return;

    axiosInstance
      .post("/user/topup", {
        topupAmount: amount,
      })
      .then(() => {
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
    if (amount == 0) return;

    try {
      if (amount <= 500000) throw Error("Min withdraw is Rp.500000");
      
      axiosInstance
        .post("/user/withdraw", {
          withdrawAmount: amount,
        })
        .then(() => {
          return toast({
            title: "Withdraw Success",
            description: `Withdraw with amount of ${amount} is success`,
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
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      })
    }

    setAmount(0);
    setShowModal(false);
  };

  useLayoutEffect(() => {
    setBalance(session?.balance!);
  }, [session?.balance]);

  return (
    <UserInfoLayout className="flex flex-col gap-4 items-center justify-center ">
      <h3>Balance: Rp.{balance}</h3>
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
              {actionType === "withdraw" && <h3 className="font-bold text-red-500">Minimum withdraw is Rp.500000</h3>}
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
