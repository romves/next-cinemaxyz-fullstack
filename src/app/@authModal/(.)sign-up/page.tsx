import CloseModal from "@/components/CloseModal";
import SignUp from "@/components/auth/SignUp";
import React from "react";

const page = () => {
  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <form method="dialog" className="modal-box">
        <CloseModal />
        <SignUp />
      </form>
    </dialog>
  );
};

export default page;
