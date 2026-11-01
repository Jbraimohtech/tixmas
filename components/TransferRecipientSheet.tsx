import React from "react";

import { ChevronLeft, UserRoundPlus, Plus, Send } from "lucide-react";

import TransferOption from "./TransferOption";

interface TransferRecipientSheetProps {
  open: boolean;
  ticketCount?: number;
  onClose: () => void;
  onSelectContacts?: () => void;
  onManualEntry?: () => void;
}

const TransferRecipientSheet: React.FC<TransferRecipientSheetProps> = ({
  open,
  ticketCount = 0,
  onClose,
  onSelectContacts,
  onManualEntry,
}) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 z-[998] bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Bottom Sheet */}

      <div className="fixed right-0 bottom-0 left-0 z-[999] flex h-[80vh] w-full flex-col overflow-hidden rounded-t-[30px] bg-white">
        {/* Drag Handle */}

        <div className="mx-auto mt-[14px] mb-[22px] h-[6px] w-[62px] rounded-full bg-[#bdbdbd]" />

        {/* Title */}

        <h2 className="-mb-[2px] mb-5 h-[30px] text-center text-[16px] font-bold tracking-[.4px] text-[#111] min-[431px]:mb-[20px] min-[431px]:text-[12px]">
          TRANSFER {ticketCount} TICKET{ticketCount === 1 ? "" : "S"} TO
        </h2>

        <div className="mx-auto my-[10px] mb-7 h-px w-[calc(100%-40px)] bg-[#ededed]" />

        {/* Options */}

        <div className="flex flex-col gap-3 px-[16px] min-[376px]:px-[22px]">
          <TransferOption
            title="Select From Contacts"
            icon={<UserRoundPlus size={28} />}
            onClick={onSelectContacts}
          />

          <TransferOption
            title="Manually Enter A Recipient"
            icon={<Plus size={30} />}
            onClick={onManualEntry}
          />
        </div>

        {/* Illustration */}

        <div className="mt-12 mb-7 flex items-center justify-center p-[15px]">
          <div className="flex size-[76px] items-center justify-center rounded-full bg-[#f3f3f7] text-[#6f6f6f] [&>svg]:opacity-80 min-[431px]:size-[70px]">
            <Send size={30} strokeWidth={1.6} />
          </div>
        </div>

        {/* Description */}

        <div className="px-[22px] text-center min-[376px]:px-[34px]">
          <h3 className="mb-[18px] text-[16px] leading-[1.25] font-bold text-[#111] min-[431px]:text-[32px]">
            Transfer Tickets Via Email or Text Message
          </h3>

          <p className="text-[14px] leading-[1.7] text-[#7a7a7a] min-[431px]:text-[21px]">
            Select an Email or mobile number to transfer tickets to your
            recipient.
          </p>
        </div>

        {/* Bottom */}

        <div className="mt-auto border-t border-[#ececec] px-[22px] py-[18px]">
          <button
            className="flex cursor-pointer items-center gap-[6px] border-none bg-transparent text-[12px] font-medium text-[#0b5cff] transition-opacity hover:opacity-70 min-[431px]:text-[22px] min-[431px]:font-semibold"
            onClick={onClose}
          >
            <ChevronLeft size={22} />

            <span>Back</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TransferRecipientSheet;
