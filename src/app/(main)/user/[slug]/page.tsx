"use client";

import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useFetchSession } from "@/lib/auth";
import { useState } from "react";

const Page = () => {
  const { data: session } = useFetchSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.fullname || "");
  const [profileDetails, setProfileDetails] = useState({
    // username: "",
    // name: "",
    // age: 0,
  })

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
    <UserInfoLayout className="py-12 px-8 flex flex-col gap-6">
      <h2 className="font-bold text-2xl">My Profile</h2>

      <div className="w-48 h-48 bg-white rounded-full border"></div>

      {!isEditing && (
        <div className="flex flex-col gap-4 ">
          <div>
            Username:{" "}
            <Input
              placeholder="Name"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.username || ""}
            />
          </div>
          <div>
            Name:{" "}
            <Input
              placeholder="Name"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.fullname || ""}
            />
          </div>
          <div>
            Age:{" "}
            <Input
              placeholder="Name"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.age || 0}
            />
          </div>
          <Button
            className="self-start mt-4 btn btn-sm border-neutral-400"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </div>
      )}

      {isEditing && (
        <div className="flex flex-col gap-4">
          <div>
            Username:{" "}
            <Input
              placeholder="Name"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.username || ""}
              onChange={(e) => setProfileDetails(e.target.value)}
            />
          </div>
          <div>
            Name:{" "}
            <Input
              placeholder="Name"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.fullname || ""}
              onChange={(e) => setProfileDetails(e.target.value)}
            />
          </div>
          <div>
            Age:{" "}
            <Input
              placeholder="Name"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.age || 0}
              onChange={(e) => setProfileDetails(e.target.value)}
            />
          </div>
          <div className="space-x-2">
            <Button
              onClick={handleSave}
              className="btn btn-sm self-start mt-4 border-neutral-400"
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              className="btn btn-sm self-start mt-4 border-neutral-400"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </UserInfoLayout>
  );
};

export default Page;
