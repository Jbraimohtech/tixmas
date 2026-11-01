 "use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, RotateCw, Info } from "lucide-react";
import BrunoMarsImage from "../assets/images/BrunoMarsImg.jpg";
import { DEFAULT_TICKET_EVENT, loadTicketEvent, TicketDetails } from "@/lib/ticketStorage";

const TicketView: React.FC = () => {
  const router = useRouter();
  const [currentTicket, setCurrentTicket] = useState(0);
  const [eventName, setEventName] = useState(DEFAULT_TICKET_EVENT.eventName);
  const [dateTime, setDateTime] = useState(DEFAULT_TICKET_EVENT.dateTime);
  const [venue, setVenue] = useState(DEFAULT_TICKET_EVENT.venue);
  const [ticketImage, setTicketImage] = useState(BrunoMarsImage.src);
  const [tickets, setTickets] = useState<TicketDetails[]>(DEFAULT_TICKET_EVENT.tickets);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = loadTicketEvent();
      if (!saved) return;
      setEventName(saved.eventName);
      setDateTime(saved.dateTime);
      setVenue(saved.venue);
      setTicketImage(saved.ticketImage || BrunoMarsImage.src);
      setTickets(saved.tickets);
      setCurrentTicket(0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const ticket = tickets[currentTicket];

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-x-hidden bg-white pb-[30px] font-[Inter,sans-serif]">
      {/* ================= Header ================= */}

      <header className="flex items-center gap-3 bg-white px-4 pt-[18px] pb-[14px]">
        <button
          className="flex size-[42px] cursor-pointer items-center justify-center border-none bg-transparent [&>svg]:text-[#111]"
          onClick={handleBack}
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1">
          <h2 className="mb-1 text-[12px] font-bold text-[#111]">
            {eventName}
          </h2>

          <p className="overflow-hidden text-[12px] whitespace-nowrap text-[#777] text-ellipsis">
            {dateTime} — {venue}
          </p>
        </div>
      </header>

      {/* ================= Ticket ================= */}

      <div className="p-[14px]">
        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_12px_35px_rgba(0,0,0,.12)]">
          {/* Event image */}

          <div
            className="relative h-[340px] bg-cover bg-center max-[390px]:before:absolute max-[390px]:before:inset-0 max-[390px]:before:bg-black/45 min-[391px]:h-[410px]"
            style={{ backgroundImage: `url("${ticketImage}")` }}
          >
            {/* Barcode */}

            <div className="absolute top-[5px] left-[55px] z-[2] h-[100px] w-[70%] rounded-[5px] bg-white p-3">
              <div className="flex items-center justify-around">
                <span>Screenshots won&apos;t get you in</span>

                <RotateCw size={18} />
              </div>

              <div className="relative mt-[17px] h-[30px] overflow-hidden">
                <div className="h-full w-full bg-[repeating-linear-gradient(90deg,black_0px,black_2px,transparent_2px,transparent_4px,black_4px,black_5px,transparent_5px,transparent_8px)]"></div>

                <div className="absolute inset-y-0 left-0 w-[3px] bg-[#1a73ff]"></div>
              </div>
            </div>
          </div>

          {/* White card */}

          <div className="p-5 min-[391px]:p-6">
            <h2 className="text-[28px] font-bold text-[#111] min-[391px]:text-[34px]">
              General admission Ticket
            </h2>

            <p className="mt-1 text-[18px] tracking-[1px] text-[#8a8a8a] min-[391px]:text-[22px]">
              {ticket.type}
            </p>

            <div className="mt-[42px]">
              <span className="text-[18px] tracking-[2px] text-[#888]">
                SECTION
              </span>

              <h1 className="mt-[6px] text-[44px] font-extrabold min-[391px]:text-[52px]">
                {ticket.section}
              </h1>
            </div>

            <button className="mt-[36px] h-[56px] w-full cursor-pointer rounded-[8px] border-none bg-[#111] text-[18px] font-semibold text-white transition-colors hover:bg-black min-[391px]:h-[62px] min-[391px]:text-[22px]">
              General admission Ticket
            </button>
          </div>
        </div>
      </div>

      {/* ================= Indicator ================= */}

      <div className="mt-4 flex items-center justify-center gap-[18px]">
        <button
          onClick={() =>
            setCurrentTicket((prev) => (prev > 0 ? prev - 1 : prev))
          }
        >
          ◀
        </button>

        <span>
          {currentTicket + 1} of {tickets.length}
        </span>

        <button
          onClick={() =>
            setCurrentTicket((prev) =>
              prev < tickets.length - 1 ? prev + 1 : prev,
            )
          }
        >
          ▶
        </button>
      </div>

      {/* ================= Bottom Buttons ================= */}

      <div className="mt-auto flex justify-center gap-[14px] px-4 py-6">
        <button className="flex h-[54px] flex-1 cursor-pointer items-center justify-center gap-[10px] rounded-[40px] border-2 border-[#111] bg-white text-[15px] font-semibold hover:bg-[#f7f7f7] min-[391px]:h-[60px] min-[391px]:text-[17px]">
          <Image src="/images/apple-wallet.png" alt="Apple Wallet" width={24} height={24} />

          <span>Add to Apple Wallet</span>
        </button>

        <button className="flex h-[54px] flex-1 cursor-pointer items-center justify-center gap-[10px] rounded-[40px] border-2 border-[#111] bg-white text-[15px] font-semibold hover:bg-[#f7f7f7] min-[391px]:h-[60px] min-[391px]:text-[17px]">
          <Info size={18} />

          <span>Ticket Info</span>
        </button>
      </div>
    </div>
  );
};

export default TicketView;
