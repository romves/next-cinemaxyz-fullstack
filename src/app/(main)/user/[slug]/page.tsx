"use client";

import { useFetchSession } from "@/lib/auth";
import { useState } from "react";

const Page = () => {
  const { data: session } = useFetchSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.fullname || "");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Implement the logic to save the updated user profile
    // Example: Make an API request to update the user's profile information
    // After the update is successful, you can handle any necessary state changes or notifications
    setIsEditing(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="user-page-layout py-12 px-8 flex flex-col gap-6">
      <h2 className="font-bold text-2xl">My Profile</h2>

      <div className="w-48 h-48 bg-white rounded-full"></div>

      {!isEditing && (
        <div className="flex flex-col gap-4 ">
          <div>
            Username:{" "}
            <input
              placeholder="Name"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.username}
            />
          </div>
          <div>
            Name:{" "}
            <input
              placeholder="Name"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.fullname}
            />
          </div>
          <div>
            Age:{" "}
            <input
              placeholder="Name"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.age}
            />
          </div>
          <button
            className="self-start mt-4 btn btn-sm border-neutral-400"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>
      )}

      {isEditing && (
        <div className="flex flex-col gap-4">
          <div>
            Username:{" "}
            <input
              placeholder="Name"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.username}
            />
          </div>
          <div>
            Name:{" "}
            <input
              placeholder="Name"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.fullname}
            />
          </div>
          <div>
            Age:{" "}
            <input
              placeholder="Name"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.age}
            />
          </div>
          <button
            onClick={handleSave}
            className="btn btn-sm self-start mt-4 border-neutral-400"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
