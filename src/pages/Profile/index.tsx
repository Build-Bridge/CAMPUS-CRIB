/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TitleHead from "../../components/Ui/TitleHead";
import profile from "/icons/profile.png";
import {
  ArchiveBook,
  ArrowRight2,
  Calendar1,
  CardPos,
  Headphone,
  Logout,
  ProfileCircle,
  Setting3,
  Notification,
} from "iconsax-react";
import { Link } from "react-router";

const Profile = () => {
  const profileItems = [
    {
      title: "Personal Details",
      link: "/personal-details",
      image: <ProfileCircle size="22" color="#0E0F1D" />,
    },
    {
      title: "My Bookings",
      link: "/my-bookings",
      image: <Calendar1 size="22" color="#0E0F1D" />,
    },
    {
      title: "Payment Details",
      link: "/payment-history",
      image: <CardPos size="22" color="#0E0F1D" />,
    },
    {
      title: "Saved Hostels",
      link: "/saved-hostels",
      image: <ArchiveBook size="22" color="#0E0F1D" />,
    },
    {
      title: "Notification Settings",
      link: "/notification-settings",
      image: <Notification size="22" color="#0E0F1D" />,
    },
    {
      title: "App Settings",
      link: "/app-settings",
      image: <Setting3 size="22" color="#0E0F1D" />,
    },
    {
      title: "Contact Support",
      link: "/contact-support",
      image: <Headphone size="22" color="#0E0F1D" />,
    },
    {
      title: "Log Out",
      link: "/log-out",
      image: <Logout size="22" color="#B90000" />,
    },
  ];

  return (
    <main>
      <TitleHead title={"profile"} />

      <section className="p-5 pt-20">
        <div className="flex items-center gap-x-3 mb-3">
          <img src={profile} className="size-16 rounded-xl" />
          <div className="flex-row gap-0 justify-center">
            <h2 className="text-dark font-semibold text-lg">Cliton Sandra</h2>
            <span className="text-variant-500 text-sm">clisan@gmail.com</span>
          </div>
        </div>

        <hr />

        <div className="flex-row gap-y-3 mt-4">
          {profileItems?.map((item: any, i: number) => {
            return (
              <Link key={i} to={item?.link} className="my-3">
                <div className="flex items-center justify-between gap-x-2 my-3">
                  <span className="bg-[#F5F5F5] rounded-xl p-2">
                    {item?.image}
                  </span>

                  <div className={`grow font-medium ${i > 6 && 'text-[#B90000]' }`}>{item?.title}</div>

                  {
                    i < 7 && <ArrowRight2 size={20} /> 
                  }
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Profile;
