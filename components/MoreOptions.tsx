import React from "react";
import Image from "next/image";

interface MoreOptionsProps {
  mapImage: string;
}

const MoreOptions: React.FC<MoreOptionsProps> = ({ mapImage }) => {
  return (
    <section className="mx-[10px] mt-7">
      <h3 className="mb-[18px] text-[13px] font-bold tracking-[1px] text-[#111] min-[376px]:text-[14px]">
        MORE OPTIONS
      </h3>

      <div className="relative h-[175px] w-full overflow-hidden rounded-[18px] bg-[#f4f4f4] shadow-[0_4px_12px_rgba(0,0,0,.08)] min-[376px]:h-[190px] sm:h-[210px]">
        <Image
          src={mapImage}
          alt="Venue Map"
          fill
          className="object-cover"
          sizes="430px"
        />
      </div>

      <button
        className="mt-4 w-full cursor-pointer border-none bg-transparent text-[16px] font-medium text-[#111] underline transition-opacity active:scale-[.98] hover:opacity-70 min-[376px]:text-[17px]"
        type="button"
      >
        Get Directions
      </button>
    </section>
  );
};

export default MoreOptions;
