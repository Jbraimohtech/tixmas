 "use client";

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface RecipientDetailsSheetProps {
  open: boolean;
  ticketCount: number;
  onClose: () => void;
  onTransfer: (recipient: {
    firstName: string;
    lastName: string;
    email: string;
    note: string;
  }) => void;
}

const RecipientDetailsSheet: React.FC<RecipientDetailsSheetProps> = ({
  open,
  ticketCount,
  onClose,
  onTransfer,
}) => {
  const [recipient, setRecipient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    note: "",
  });

  if (!open) return null;

  const update = (field: keyof typeof recipient, value: string) => {
    setRecipient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/45">
      <div className="h-[90vh] w-full max-w-[430px] overflow-y-auto rounded-t-[28px] bg-white min-[481px]:h-[88vh] [&::-webkit-scrollbar]:hidden">
        {/* Handle */}
        <div className="mx-auto mt-3 mb-5 h-[6px] w-[62px] rounded-full bg-[#6d6d72]" />

        {/* Title */}
        <h2 className="border-b border-[#ececec] px-6 pb-5 text-center text-[1rem] font-bold text-[#111]">
          Recipient Details
        </h2>

        <hr className="mx-auto mb-7 h-px w-[calc(100%-40px)] border-none bg-[#ededed]" />

        {/* Selected */}
        <p className="mb-7 text-center text-[13px] font-medium text-[#1d4ed8]">
          {ticketCount} ticket{ticketCount > 1 ? "s" : ""} selected for transfer
        </p>

        {/* Form */}
        <div className="flex flex-col gap-[18px] px-6">
          <label className="flex flex-col gap-[10px] text-[12px] font-medium text-[#111] [&_input]:w-full [&_input]:rounded-[8px] [&_input]:border-2 [&_input]:border-[#d8d8d8] [&_input]:bg-white [&_input]:p-4 [&_input]:text-base [&_input]:outline-none focus-within:[&_input]:border-[#2563eb] [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-[8px] [&_textarea]:border-2 [&_textarea]:border-[#d8d8d8] [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-base [&_textarea]:outline-none focus-within:[&_textarea]:border-[#2563eb]">
            First Name
            <input
              type="text"
              value={recipient.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-[10px] text-[12px] font-medium text-[#111] [&_input]:w-full [&_input]:rounded-[8px] [&_input]:border-2 [&_input]:border-[#d8d8d8] [&_input]:bg-white [&_input]:p-4 [&_input]:text-base [&_input]:outline-none focus-within:[&_input]:border-[#2563eb]">
            Last Name
            <input
              type="text"
              value={recipient.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-[10px] text-[12px] font-medium text-[#111] [&_input]:w-full [&_input]:rounded-[8px] [&_input]:border-2 [&_input]:border-[#d8d8d8] [&_input]:bg-white [&_input]:p-4 [&_input]:text-base [&_input]:outline-none focus-within:[&_input]:border-[#2563eb] [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-[8px] [&_textarea]:border-2 [&_textarea]:border-[#d8d8d8] [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-base [&_textarea]:outline-none focus-within:[&_textarea]:border-[#2563eb]">
            Email
            <input
              type="email"
              value={recipient.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>

          <button
            type="button"
            className="cursor-pointer border-none bg-transparent text-left text-[12px] font-semibold text-[#2563eb]"
          >
            Use Mobile Number Instead
          </button>

          <label className="flex flex-col gap-[10px] text-[12px] font-medium text-[#111] [&_textarea]:mb-5 [&_textarea]:max-h-[80px] [&_textarea]:min-h-[50px] [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-[8px] [&_textarea]:border-2 [&_textarea]:border-[#d8d8d8] [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-base [&_textarea]:outline-none focus-within:[&_textarea]:border-[#2563eb] [&>span]:mt-[-25px] [&>span]:ml-[30px] [&>span]:text-[#888]">
            Note <span>(optional)</span>
            <textarea
              rows={4}
              value={recipient.note}
              onChange={(e) => update("note", e.target.value)}
            />
          </label>
        </div>

        {/* Notice */}

        <div className="mx-6 mb-5 flex items-start gap-[14px] rounded-[8px] border border-[#d2ecff] bg-[#eef8ff] p-4">
          <ShieldCheck size={22} strokeWidth={2} />

          <p className="m-0 text-[.94rem] leading-[1.5] text-[#1f2937] [&~svg]:shrink-0">
            Only transfer tickets to people you know and trust to keep everyone
            safe.
          </p>
        </div>

        {/* Bottom */}

        <div className="sticky bottom-0 flex items-center justify-between border-t border-[#ececec] bg-white px-[22px] pt-4 pb-7">
          <button
            className="cursor-pointer border-none bg-none text-[1rem] font-semibold text-[#1d4ed8]"
            onClick={onClose}
          >
            Back
          </button>

          <button
            className="cursor-pointer rounded-[12px] border-none bg-[#111] px-[22px] py-4 text-[.95rem] font-semibold text-[#888] hover:bg-black min-[481px]:px-7 min-[481px]:text-[1rem]"
            onClick={() => onTransfer(recipient)}
          >
            Transfer {ticketCount} Ticket{ticketCount > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientDetailsSheet;
