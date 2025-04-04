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
import { useHostelStore } from "../store/useHostelsStore";

const StudentHome: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [hostels, setHostels] = useState<any | null>(null);

  const { user } = useUserStore();
  const { storedHostels, setStoredHostels } = useHostelStore();
  const localUser = localStorage.getItem("user");

  const { data: fetchedHostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: fetchAllHostels,
  });

  useEffect(() => {
    setUserProfile(user || (localUser ? JSON.parse(localUser) : null));
  }, [localUser, user]);

  useEffect(() => {
    setHostels(fetchedHostels || storedHostels);

    
    if ( fetchedHostels && JSON.stringify(fetchedHostels) !== JSON.stringify(storedHostels) ) {
      setStoredHostels(fetchedHostels);
    }

    // console.log("Hostels", hostels);

    // console.log("fetched", fetchedHostels)

    // console.log("stored hostek", storedHostels);

  }, [hostels, storedHostels, setStoredHostels, fetchedHostels]);

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
