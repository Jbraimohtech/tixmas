import React from "react";
import { Check } from "lucide-react";

interface TicketChipProps {
  seat: string;
  selected: boolean;
  selectionNumber?: number | null;
  onClick: () => void;
}

const TicketChip: React.FC<TicketChipProps> = ({
  seat,
  selected,
  selectionNumber,
  onClick,
}) => {
  return (
    <button
      className={`flex h-[96px] w-[96px] cursor-pointer flex-col overflow-auto rounded-[22px] border-none bg-white outline-none shadow-[0_10px_24px_rgba(0,0,0,.16)] transition-all duration-200 hover:-translate-y-1 active:scale-[.96] max-[375px]:h-[100px] min-[376px]:h-[112px] min-[431px]:w-[96px] ${selected ? "-translate-y-0.5" : ""}`}
      onClick={onClick}
      type="button"
    >
      {/* Blue Header */}
      <div className="flex h-[32px] w-full items-center justify-center bg-[#0d5bff] text-center text-[12px] font-bold text-white min-[376px]:h-[44px] min-[376px]:text-[12px] max-[375px]:text-[15px]">
        <span>{seat}</span>
      </div>

      {/* Selection Circle */}
      <div className="flex h-[70px] w-full items-center justify-center bg-white max-[430px]:h-auto max-[430px]:flex-1">
        <div
          className={`relative z-[1] flex size-[34px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#d6d6d6] bg-0d5bff transition-all duration-200 ${
            selected
              ? "scale-[1.08] border-[#0d5bff] bg-[#0d5bff] shadow-[0_6px_16px_rgba(13,91,255,.35)]"
              : ""
          }`}
        >
          {selected &&
            (selectionNumber ? (
              <span className="text-[14px] font-bold text-white">
                {selectionNumber}
              </span>
            ) : (
              <Check size={16} strokeWidth={3} color="#fff" />
            ))}
        </div>
      </div>
    </button>
  );
};

export default TicketChip;
