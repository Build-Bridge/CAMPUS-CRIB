import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import cap from "/onboarding/cap.svg";
import mentoring from "/onboarding/mentoring.svg";
import { fetchUser } from "../../lib/fetchUser";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AccountType: React.FC = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<"AGENT" | "BASIC">("BASIC");
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  useEffect(() => {
    if (user) {
      setAccountType(user.userType);
      console.log(user);
    }
  }, []);

  useEffect(() => {
    if (user && accountType === "AGENT") {
      navigate("/agent");
    } else if (user && accountType === "BASIC") {
      navigate("/student");
    }
  }, [user]);

  const handleChoice = (choice: string) => {
    // Store the user's choice in localStorage
    localStorage.setItem("accountType", choice);
  };
  return (
    <main className="flex justify-center gap-10 flex-col h-dvh w-full">
      <div>
        <h1 className="text-[22px] leading-7 p-3 font-medium">
          How Would You Like to Get Started?
        </h1>
      </div>
      <div className="flex items-center justify-around gap-5">
        <Link
          onClick={() => handleChoice("BASIC")}
          className="border border-dark rounded-lg py-8 px-2 flex items-center justify-center flex-col gap-2"
          to={"/student/onboarding"}
        >
          <img src={cap} alt="Cap" />
          <p className="text-center text-dark font-bold text-[14px] leading-5">
            Continue as A Student
          </p>
        </Link>
        <Link
          onClick={() => handleChoice("AGENT")}
          className=" rounded-lg py-8 px-2 flex items-center justify-center flex-col bg-primary gap-2"
          to={"/agent/onboarding"}
        >
          <img src={mentoring} alt="mentoring" />
          <p className="text-center text-white font-bold text-[14px] leading-5">
            Continue as An Agent
          </p>
        </Link>
      </div>
    </main>
  );
};

export default AccountType;
