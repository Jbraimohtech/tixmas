import React from "react";
import EventImg from "../assets/images/Screenshot_28-7-2026_141048_.jpeg";
import TicketHero from "./TicketHero";
// import { Map } from "lucide-react";

const SeatMap: React.FC = () => {
  return (
    <section className="mx-[10px] mt-5">
      <h3 className="mb-[6px] text-[13px] font-bold tracking-[1px] text-[#111]">
        SEAT MAP
      </h3>

      <p className="mb-[18px] text-[13px] text-[#777] min-[376px]:text-[14px]">
        Venue layout for this event
      </p>

      <div className="flex h-[150px] w-full flex-col items-center justify-center rounded-[10px] border border-[#ececec] bg-[#f7f7f7] text-center max-[375px]:min-h-[185px] min-[376px]:min-h-[150px] min-[376px]:p-6">
        {/* <div className="seatMapIcon">
          <Map size={42} strokeWidth={1.8} />
        </div> */}

        {/* <h4>Seat map unavailable</h4> */}

        <p className="max-w-[260px] text-[14px] leading-[1.7] text-[#777] min-[431px]:text-[15px]">
          Seat map unavailable
        </p>
      </div>

      {/* <img src={EventImg} alt="" className="eventBannerImg"/> */}
      <TicketHero
        eventImage={EventImg.src}
        eventName="BRUNO MARS - THE ROMANTIC TOUR"
        venue="Wembley Stadium • London"
        date="Fri • Jul 24 2026 • 5:00 PM"
        ticketCount={4}
      />
    </section>
  );
};

export default SeatMap;
