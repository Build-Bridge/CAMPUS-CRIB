/* eslint-disable @typescript-eslint/no-explicit-any */
import TitleHead from "../../components/Ui/TitleHead";
import CustomInput from "../../components/Reuseables/CustomInput";
import profile from "/icons/profile.png";
import { Camera } from "iconsax-react";
import ControlledButton from "../../components/Reuseables/ControlledButton";
// import { useUserStore } from "../../store/UseUserStore";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useRef, useState } from "react";

const PersonalDetails = () => {
  // const { user } = useUserStore();
  const { fetchedUser: user } = useUserContext();

  const [image, setImage] = useState<any | null>(profile);
  const fileInputRef = useRef<any | null>(null); // Reference to the file input

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef?.current.click(); // Trigger the file input on camera icon click
  };

  useEffect(() => {
    console.log("image picked", user);
  }, [image]);

  return (
    <main>
      <TitleHead title={"Personal details"} />
      <section className="p-5 pt-20 flex flex-col gap-1">
        <div className="flex flex-col gap-3.5">
          <div className=" size-32 mx-auto rounded-xl relative mb-5">
            <img
              src={image}
              className="w-full h-full rounded-xl object-cover"
            />
            <span
              onClick={triggerFileInput}
              className="bg-[#f5f5f5] absolute rounded-lg right-0 bottom-0 p-1.5"
            >
              <Camera size="16" color="#1B85A6" />
            </span>
          </div>

          <CustomInput
            placeholder="firstname"
            type="text"
            name=""
            borderColor="#000"
            value={user?.firstName as string}
          />

          <CustomInput
            placeholder="lastname"
            type="text"
            name=""
            borderColor="#000"
            value={user?.lastName as string}
          />

          <CustomInput
            placeholder="mail"
            type="text"
            name="email"
            borderColor="#000"
            value={user?.email as string}
          />

          <CustomInput
            placeholder="dateOfBirth"
            type="date"
            name="dob"
            borderColor="#000"
            value={"Clinton Sandra"}
          />

          <CustomInput
            placeholder="number"
            type="number"
            name="phoneNumber"
            borderColor="#000"
            value={+1234567890}
          />
          <CustomInput
            placeholder="Nigeria"
            type="select"
            options={["Nigeria", "Togo"]}
            name="country"
            borderColor="#000"
            value={1}
          />
          <CustomInput
            placeholder="address"
            type="text"
            name="address"
            borderColor="#000"
            value={"45 Maple Drive, NY"}
          />

          <ControlledButton title="Save Changes" />
        </div>
      </section>

      <input
        ref={fileInputRef} // Attach the ref to the file input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </main>
  );
};

export default PersonalDetails;
