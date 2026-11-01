"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MapImg from "@/assets/images/btsmap.jpeg";
import DobTicketImg from "@/assets/images/dob-ticket.jpeg";
import OneTicketImg from "@/assets/images/one-tic.jpeg";
import {
  // ArrowLeft,
  MoreVertical,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import BrunoImage from "@/assets/images/LOSANGELBTS.jpeg";
import MoreOptions from "@/components/MoreOptions";
import SeatMap from "@/components/SeatMap";
import TransferSheet from "@/components/TransferSheet";
import {
  DEFAULT_TICKET_EVENT,
  loadTicketEvent,
  TicketEvent,
} from "@/lib/ticketStorage";

const EventTickets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tickets" | "extras">("tickets");
  const [transferOpen, setTransferOpen] = useState(false);
  const router = useRouter();
  const [event, setEvent] = useState<TicketEvent>(DEFAULT_TICKET_EVENT);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEvent(loadTicketEvent() ?? DEFAULT_TICKET_EVENT);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const tickets = event.tickets;

  // const handleBack = () => {
  //   if (window.history.length > 1) {
  //     navigate(-1);
  //   } else {
  //     navigate("/");
  //   }
  // };

  const handleOpenTicket = () => {
    router.push("/ticket-view");
  };

  const openTransferSheet = () => {
    setTransferOpen(true);
  };

  const closeTransferSheet = () => {
    setTransferOpen(false);
  };

  return (
    <div className="w-full min-h-screen pb-[120px] font-[Inter,sans-serif] md:hidden">
      {/* Hero Card */}

      <div className="relative h-[350px] w-full">
        {/* <div className="eventHeader">

          <button className="backButton" onClick={handleBack}>
            <ArrowLeft size={26} />
          </button>

        </div>
         */}
        <Image
          src={event.heroImage || BrunoImage.src}
          alt="Bruno Mars"
          fill
          unoptimized={Boolean(event.heroImage)}
          className="h-[260px] w-full object-cover"
          sizes="430px"
        />

        <div className="absolute right-0 bottom-0 left-0 flex flex-col text-white">
          <div className="flex w-[55%] bg-[#111] px-[15px] py-[15px] pl-[10px] text-[13.85px] font-semibold">
            <p>{event.dateTime}</p>
          </div>

          <div className="bg-[#111] p-[10px]">
            <h1 className="mb-[14px] bg-[#111] text-[1.3rem] leading-[1.1] font-bold">
              {event.eventName}
            </h1>

            <div className="flex items-center justify-between">
              <p className="text-[0.8rem] text-[#ddd]">{event.venue}</p>

              <div className="flex items-center gap-[6px] text-[1rem] font-semibold text-[#ddd]">
                {/* <Ticket size={18} color="white" /> */}
                <Image
                  src={DobTicketImg.src}
                  alt="Ticket Icon"
                  width={23}
                  height={23}
                  className="mr-[-5px] -mt-[5px] h-[23px] w-[23px] object-cover"
                />
                <p className="text-[1.2rem] font-bold text-white">
                  x{tickets.length}
                </p>
              </div>
            </div>
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-[10px] border-none bg-[#0142e7] p-[12px] text-base font-medium text-white"
            onClick={handleOpenTicket}
          >
            <Image
              src={OneTicketImg.src}
              alt="Ticket Icon"
              width={30}
              height={23}
              className="mr-[-5px] h-[23px] w-[30px] object-cover"
            />
            View Tickets
          </button>
        </div>
      </div>

      {/* Tabs */}

      <div className="ml-[10px] flex w-[95%] border-none">
        <button
          className={`relative h-[50px] flex-1 cursor-pointer border-none border-b-[3px] border-b-[#d6d5d5] bg-transparent p-[18px] text-center text-[13px] font-normal ${
            activeTab === "tickets"
              ? "text-black after:absolute after:right-0 after:bottom-[-3px] after:left-0 after:h-[3px] after:rounded-[20px] after:bg-black"
              : "text-[#888]"
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          Tickets
        </button>

        <button
          className={`relative h-[50px] flex-1 cursor-pointer border-none border-b-[3px] border-b-[#d6d5d5] bg-transparent p-[18px] text-center text-[13px] font-normal ${
            activeTab === "extras"
              ? "text-black after:absolute after:right-0 after:bottom-[-3px] after:left-0 after:h-[3px] after:rounded-[20px] after:bg-black"
              : "text-[#888]"
          }`}
          onClick={() => setActiveTab("extras")}
        >
          Extras
        </button>
      </div>

      {/* Order */}

      <div className="mt-[10px] flex justify-between bg-white px-[20px] py-[22px]">
        <div className="flex flex-col items-start justify-between">
          <h2 className="text-[14px] font-bold">Order #{event.orderNumber}</h2>

          <p className="mt-[8px] text-[12px] text-[#666]">
            x{tickets.length} Tickets
          </p>
        </div>

        <button
          className="border-none bg-transparent outline-none"
          onClick={() => router.push("/create-ticket")}
          aria-label="Create or edit ticket"
        >
          <MoreVertical size={22} />
        </button>
      </div>

      {/* Tickets */}

      {activeTab === "tickets" && (
        <div className="flex flex-col gap-px">
          {tickets.map((ticket) => (
            <div
              className="m-[5px_10px] flex cursor-pointer flex-col overflow-hidden rounded-[1px] bg-[#f8f6f6]"
              key={ticket.id}
            >
              <h4 className="border-b-2 border-b-white px-[18px] py-[16px] text-[14px] font-bold">
                {ticket.type}
              </h4>

              <div className="flex items-center justify-between px-[18px] py-[18px]">
                <div>
                  <span className="mb-[8px] block text-[10px] tracking-[1px] text-[#888]">
                    SECTION
                  </span>

                  <h2 className="text-[20px]">{ticket.section}</h2>
                </div>

                <div>
                  <span className="mb-[8px] block text-[10px] tracking-[1px] text-[#888]">
                    ROW
                  </span>

                  <h2 className="text-[20px]">{ticket.row}</h2>
                </div>

                <div>
                  <span className="mb-[8px] block text-[10px] tracking-[1px] text-[#888]">
                    SEAT
                  </span>

                  <h2 className="text-[20px]">{ticket.seat}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "extras" && (
        <div className="px-[20px] py-[35px] text-center text-[#888]">
          <h3 className="mb-[12px]">Extras</h3>

          <p>
            Merchandise, parking passes and VIP experiences will appear here.
          </p>
        </div>
      )}

      {/* Floating Bottom Buttons */}

      <div className="fixed bottom-[24px] left-1/2 flex max-w-[270px] -translate-x-1/2 overflow-hidden rounded-full bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] w-[calc(100%-50px)]">
        <button
          className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[8px] border-none border-r border-r-[#eee] bg-white px-[18px] py-[18px] text-base font-bold text-[#0047ff]"
          onClick={openTransferSheet}
        >
          <ArrowUpRight size={20} />

          <span>Transfer</span>
        </button>

        <button
          className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[8px] border-none bg-white px-[18px] py-[18px] text-base font-bold text-[#777] disabled:cursor-default"
          disabled
        >
          <RefreshCw size={20} />

          <span>Sell</span>
        </button>
      </div>
      <MoreOptions mapImage={MapImg.src} />

      <SeatMap />

      <TransferSheet open={transferOpen} onClose={closeTransferSheet} />

      {/* <EventBanner />

      <SocialShare />

      <FloatingActions /> */}
    </div>
  );
};

export default EventTickets;
