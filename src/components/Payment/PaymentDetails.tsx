import React from "react";
import TitleHead from "../Ui/TitleHead";
import share from "/icons/share-08.png";
import download from "/icons/download-02.png";

const PaymentDetails = () => {
  const details = [
    {
      title: "Agent name",
      content: "Aremu davies",
    },
    {
      title: "Account Number",
      content: "2243568298",
    },
    {
      title: "Transaction date",
      content: "Monday, December 23rd",
    },
    {
      title: "Transaction ID",
      content: "2g2ttt4jee7dnjfne0wnf83j",
    },
  ];
  return (
    <main>
      <TitleHead title="Payment Details" />
      <section className="p-5 pt-20 flex flex-col gap-3">
        <div className="bg-[#fafafa]/50 border-2 border-[#A64E1B]/50 border-dashed px-2 py-4 rounded-xl gap-x-2 flex items-center justify-between">
          <div>
            <h3 className="text-dark text-lg font-semibold">-₦120,000.00</h3>
            <p className="text-sm">Monday, December 23rd | 5:17 PM</p>
          </div>
          <div>
            <p className="text-[#28A745] font-semibold">Successful</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 ">
          <div className="bg-[#fafafa]/50 p-2.5 flex items-center gap-x-1.5 rounded-xl">
            <div className="bg-[#E6CDBF80] p-1.5 rounded-xl ">
              <img src={share} className="size-8" />
            </div>
            <p className="text-dark font-semibold">Share</p>
          </div>

          <div className="bg-[#fafafa]/50 p-2.5 flex items-center gap-x-1.5 rounded-xl">
            <div className="bg-[#E6CDBF80] p-1.5 rounded-xl">
              <img src={download} className="size-8" />
            </div>
            <p className="text-dark font-semibold">Download</p>
          </div>
        </div>

        <div className="bg-[#fafafa]/50 p-3 py-5 rounded-xl">
          {details?.map((item, i: number) => (
            <div key={i} className="py-1.5 border-b">
              <p className="text-variant-500 capitalize">{item?.title}</p>
              <p className="text-dark">{item?.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PaymentDetails;