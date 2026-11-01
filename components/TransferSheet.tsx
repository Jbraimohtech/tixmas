"use client";

import React, { useState } from "react";
import Image from "next/image";
import WhiteTicketImg from "@/assets/images/white-ticket.jpeg";

import { ChevronRight, X } from "lucide-react";

import TicketChip from "./TicketChip";
import TransferRecipientSheet from "@/components/TransferRecipientSheet";
import RecipientDetailsSheet from "@/components/RecipientDetailsSheet";

export interface TransferTicket {
  id: number;
  seat: string;
  selected: boolean;
  selectionNumber: number | null;
}

interface TransferSheetProps {
  open: boolean;
  onClose: () => void;
}

const TransferSheet: React.FC<TransferSheetProps> = ({ open, onClose }) => {
  const [recipientOpen, setRecipientOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [tickets, setTickets] = useState<TransferTicket[]>([
    {
      id: 1,
      seat: "Seat 5",
      selected: true,
      selectionNumber: 1,
    },
    {
      id: 2,
      seat: "Seat 6",
      selected: true,
      selectionNumber: 2,
    },
    {
      id: 3,
      seat: "Seat 7",
      selected: true,
      selectionNumber: 3,
    },
    {
      id: 4,
      seat: "Seat 8",
      selected: false,
      selectionNumber: null,
    },
  ]);

  const toggleTicket = (id: number) => {
    setTickets((previousTickets) => {
      const ticket = previousTickets.find((item) => item.id === id);
      if (!ticket) return previousTickets;

      let updatedTickets: TransferTicket[];

      if (ticket.selected) {
        updatedTickets = previousTickets.map((item) =>
          item.id === id
            ? { ...item, selected: false, selectionNumber: null }
            : item,
        );
      } else {
        const nextSelectionNumber =
          Math.max(
            0,
            ...previousTickets.map((item) => item.selectionNumber ?? 0),
          ) + 1;
        updatedTickets = previousTickets.map((item) =>
          item.id === id
            ? {
                ...item,
                selected: true,
                selectionNumber: nextSelectionNumber,
              }
            : item,
        );
      }

      const selectedInOrder = updatedTickets
        .filter((item) => item.selected)
        .sort(
          (first, second) =>
            (first.selectionNumber ?? 0) - (second.selectionNumber ?? 0),
        );

      selectedInOrder.forEach((item, index) => {
        item.selectionNumber = index + 1;
      });

      return updatedTickets;
    });
  };

  const selectedCount = tickets.filter((ticket) => ticket.selected).length;

  const openRecipientSheet = () => {
    setRecipientOpen(true);
  };

  const closeRecipientSheet = () => {
    setRecipientOpen(false);
  };

  const openDetailsSheet = () => {
    setRecipientOpen(false);
    setDetailsOpen(true);
  };

  const closeDetailsSheet = () => {
    setDetailsOpen(false);
  };

  const handleTransfer = (recipient: {
    firstName: string;
    lastName: string;
    email: string;
    note: string;
  }) => {
    console.log("Transferring to:", recipient);
    closeDetailsSheet();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Background Overlay */}

      <div
        className="fixed inset-0 z-[998] bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Bottom Sheet */}

      <div className="fixed right-0 bottom-0 left-0 z-[999] flex h-[75vh] max-h-[calc(100vh-20px)] flex-col overflow-hidden rounded-t-[30px] bg-white min-[431px]:h-[72vh]">
        {/* Drag Handle */}

        <div className="mx-auto mt-3 mb-[18px] h-[6px] w-[56px] rounded-full bg-[#d8d8d8]" />

        {/* Close */}

        <button
          className="absolute top-[18px] right-[18px] z-[10] flex size-9 cursor-pointer items-center justify-center rounded-full border-none bg-white transition-colors hover:bg-[#ececec]"
          onClick={onClose}
        >
          <X size={20} color="#111" />
        </button>

        {/* Title */}

        <h2 className="mb-[18px] px-[48px_12px_0_16px] text-center text-[12px] font-bold tracking-[.4px] text-[#111] min-[376px]:text-[14px] min-[431px]:text-[13px] min-[431px]:px-[50px_20px_0_16px]">
          SELECT TICKETS TO TRANSFER
        </h2>

        {/* Divider */}

        <div className="mx-auto mb-6 h-px w-[calc(100%-40px)] bg-[#ededed]" />

        {/* Header */}

        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 px-[12px] min-[376px]:px-4 min-[431px]:gap-4 min-[431px]:px-[22px]">
          <div>
            <h3 className="min-w-0 flex-1 break-words text-[14px] font-medium text-[#222] min-[376px]:text-[16px] min-[431px]:text-[22px] min-[431px]:font-semibold">
              Sec: 131, Row: 12
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[12px] font-semibold text-[#111] min-[376px]:text-[14px] min-[431px]:text-[20px]">
            {/* <Ticket
              size={18}
              strokeWidth={2}
            /> */}

            <Image
              src={WhiteTicketImg.src}
              alt="Ticket Icon"
              width={24}
              height={24}
              className="h-[18px] w-[18px] object-contain min-[376px]:h-5 min-[376px]:w-5 min-[431px]:h-6 min-[431px]:w-6"
            />

            <p>{tickets.length} Tickets</p>
          </div>
        </div>

        {/* Ticket List */}

        <div className="flex min-h-0 flex-1 gap-[12px] overflow-x-auto px-4 pb-[120px] min-[376px]:gap-[15px] min-[431px]:px-5">
          {tickets.map((ticket) => (
            <TicketChip
              key={ticket.id}
              seat={ticket.seat}
              selected={ticket.selected}
              selectionNumber={ticket.selectionNumber}
              onClick={() => toggleTicket(ticket.id)}
            />
          ))}
        </div>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-3 border-t border-[#ececec] bg-white px-3 py-3 min-[376px]:gap-4 min-[376px]:px-4 min-[431px]:px-6 min-[431px]:py-[18px]">
          <span className="text-[12px] font-medium text-[#111] min-[376px]:text-[14px] min-[431px]:text-[20px]">
            {selectedCount} Selected
          </span>

          <button
            className="flex shrink-0 cursor-pointer items-center gap-[6px] border-none bg-transparent text-[12px] font-bold whitespace-nowrap text-[#0057ff] disabled:cursor-default disabled:text-[#888] min-[431px]:gap-2 min-[431px]:text-[20px]"
            onClick={openRecipientSheet}
            disabled={selectedCount === 0}
          >
            TRANSFER TO
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <TransferRecipientSheet
        open={recipientOpen}
        ticketCount={selectedCount}
        onClose={closeRecipientSheet}
        onManualEntry={openDetailsSheet}
      />

      <RecipientDetailsSheet
        open={detailsOpen}
        ticketCount={selectedCount}
        onClose={closeDetailsSheet}
        onTransfer={handleTransfer}
      />
    </>
  );
};

export default TransferSheet;
