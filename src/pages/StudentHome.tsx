/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
// import { useUserContext } from "../contexts/UserContext";
import { useUserStore } from "../store/UseUserStore";


const  StudentHome: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any | null>(null);
  
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");



  useEffect(() => {
    setUserProfile(user || (localUser ? JSON.parse(localUser) : null));
  }, []);
  
  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: fetchAllHostels,
  });

  return (
    <main>
      {/* Input the profile picture later */}
      <Head
        name={userProfile?.firstName as string}
        profilePic={profile}
        isAgent={false}
      />

      <section className="p-5 py-16">
        <Search />
        <PremiumPicks hostels={hostels} />
        <MyCarousel hostels={hostels} />
      </section>
    </main>
  );
};

export default StudentHome;
