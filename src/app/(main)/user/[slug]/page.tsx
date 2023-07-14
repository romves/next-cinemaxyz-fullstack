"use client";

import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/use-toast";
import { useFetchSession } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const { data: session } = useFetchSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    age: 0,
  });

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: async () => {
      axiosInstance.patch("user/me", {
        data: profileDetails,
      });
    },
    onSuccess: () => {
      return toast({
        title: "Edit success",
        description: "Your details is successfully updated",
        variant: "default",
      });
    },
    onError: (error: any) => {
      return toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (profileDetails.name === "" || profileDetails.age === 0) {
      return toast({
        title: "Something went wrong",
        description: "Fill all the fields",
        variant: "destructive",
      });
    }

    updateUser();

    setIsEditing(false);
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
              placeholder="Username"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.username || ""}
            />
          </div>
          <div>
            Name:{" "}
            <Input
              placeholder="Fullname"
              disabled
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.fullname || ""}
            />
          </div>
          <div>
            Age:{" "}
            <Input
              placeholder="Age"
              disabled
              className="input input-sm border-neutral-400"
              type="number"
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
              disabled
              placeholder="Username"
              className="input input-sm border-neutral-400"
              type="text"
              value={session?.username || ""}
            />
          </div>
          <div>
            Name:{" "}
            <Input
              placeholder="Input your new fullname"
              className="input input-sm border-neutral-400"
              type="text"
              value={profileDetails.name}
              onChange={(e) =>
                setProfileDetails((prevProfileDetails) => ({
                  ...prevProfileDetails,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div>
            Age:{" "}
            <Input
              placeholder="Input your new age"
              className="input input-sm border-neutral-400"
              type="number"
              value={profileDetails.age}
              onChange={(e) =>
                setProfileDetails((prevProfileDetails) => ({
                  ...prevProfileDetails,
                  age: parseInt(e.target.value),
                }))
              }
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
