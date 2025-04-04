import React, { useEffect } from "react";
import EmptyNotifications from "../Reuseables/EmptyNotifications";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../lib/getNotifications";
import Loader from "../Ui/Loader";
import { useUserStore } from "../../store/UseUserStore";

const AllNotifications: React.FC = () => {
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");

  const userData = user || (localUser ? JSON.parse(localUser) : null);

  console.log(userData?._id);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(userData?._id),
  });

  useEffect(() => {
    if (notifications) {
      console.log(notifications);
    }
  }, []);

  if (isLoading)
    <div className="h-screen w-full flex items-center justify-center">
      <Loader />
    </div>;

  return (
    <div className="h-full w-full">
      {/* Fetch notification from the backend and display them */}
      <EmptyNotifications />
    </div>
  );
};

export default AllNotifications;
