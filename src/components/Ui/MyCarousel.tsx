/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import mapMarker from "/icons/location.svg";
import { Heart } from "iconsax-react";
import { Hostel } from "../../types/Hostel";
import { useNavigate } from "react-router";

interface HostelCardProps {
  image: string;
  title: string;
  address: string;
  desc?: string;
  isFlex?: boolean;
  id: string;
}

interface CarouselProps {
  hostels: Hostel[];
}

const HotelCard = ({
  image,
  title,
  address,
  desc,
  isFlex,
  id
}: HostelCardProps) => {
  const navigate = useNavigate()
  return (
    <div
    key={id}
    onClick={() => navigate(`/hostel/${id}`)}
      className={`bg-white rounded-2xl py-3 overflow-hidden max-w-sm ${
        isFlex && "grid grid-cols-1 gap-x-1 items-center"
      }`}
    >
      <div className="relative h-[230px]">
        <img
          src={image}
          alt="Aerial view of a large hotel complex surrounded by greenery"
          className="w-full h-full object-cover rounded-xl border shadow"
        />
        <div className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md">
          {/* <i className="fas fa-heart text-gray-500"></i> */}
          <Heart size="28" color="#ffffff" />
        </div>
      </div>
      <div className="pb-3 pt-1.5">
        <h2 className="text-lg font-semibold text-left">{title}</h2>
        <div className=" text-dark flex items-center text-left gap-1 justify-start mt-2 ">
          <div>
            <img src={mapMarker} className="size-5" />
          </div>
          <p className="text-left text-[15px]">{address}</p>
        </div>
        <p className="text-sm text-variant-500 text-left">
          {desc && desc.slice(0, 30)}
        </p>
      </div>
    </div>
  );
};

const MyCarousel: React.FC<CarouselProps> = ({ hostels }) => {
  return (
    <>
      <div>
        <h2 className="font-semibold text-base">Best deals</h2>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-10"
        >
          {hostels &&
            hostels?.map((hostel: Hostel) => (
              <HotelCard
                key={hostel?._id}
                id={hostel?._id}
                image={hostel?.images[0]}
                title={hostel?.hostelName}
                address={hostel?.location}
              />
            ))}
        </Carousel>
        {
          hostels?.length == 0 && (
            <div className="text-center w-full flex items-center justify-center py-10">No hostels available</div>
          )
        }
      </div>

      <div>
        <h2 className="font-semibold text-base">Top Amenities</h2>

        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-10"
        >
          {hostels &&
            hostels?.map((hostel: Hostel) => (
              <HotelCard
                key={hostel?._id}
                id={hostel?._id}
                image={hostel?.images[0]}
                title={hostel?.hostelName}
                address={hostel?.location}
                desc={hostel?.description}
                isFlex
              />
            ))}
        </Carousel>
        {
          hostels?.length == 0 && (
            <div className="text-center w-full flex items-center justify-center py-10">No hostels available</div>
          )
        }
      </div>
    </>
  );
};

export default MyCarousel;
