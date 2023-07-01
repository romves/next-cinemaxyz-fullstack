import CloseModal from "@/components/CloseModal";
import SignIn from "@/components/SignIn";
import React from "react";

const page = () => {
  return (
    <dialog id="my_modal_3" className="modal modal-open">
      <form method="dialog" className="modal-box">
        <CloseModal />
        <SignIn />
      </form>
    </dialog>
  );
};

export default page;
