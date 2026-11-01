import React from "react";

interface TransferOptionProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const TransferOption: React.FC<TransferOptionProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <button
      className="flex h-[60px] w-full cursor-pointer items-center justify-between rounded-[5px] border-2 border-[#e8e8e8] bg-white px-[18px] transition-all hover:-translate-y-0.5 hover:border-[#0d5bff] hover:shadow-[0_8px_18px_rgba(13,91,255,.12)] active:scale-[.98] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,91,255,.25)] sm:h-[72px] sm:rounded-[1px] sm:px-[22px]"
      onClick={onClick}
      type="button"
    >
      <span className="w-full text-center text-[12px] font-bold tracking-[.2px] text-[#111] sm:w-auto sm:text-left sm:text-[21px]">
        {title}
      </span>

      <div className="flex items-center gap-[12px] sm:gap-4">
        <span className="flex items-center justify-center text-[#111] transition-colors [&>svg]:size-[22px] sm:[&>svg]:size-[28px]">
          {icon}
        </span>

        {/* <ChevronRight
          size={20}
          className="transferOptionArrow"
        /> */}
      </div>
    </button>
  );
};

export default TransferOption;
