interface TicketHeroProps {
  eventImage: string;
  eventName: string;
  venue: string;
  date: string;
  ticketCount: number;
}

const TicketHero = ({
  eventImage,
  eventName,
  venue,
  date,
  ticketCount,
}: TicketHeroProps) => {
  return (
    <div className="relative mt-5 h-[200px] w-full overflow-hidden bg-[#1111116b] min-[769px]:h-[250px]">
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.65))]" />

      <Image
        src={eventImage}
        alt={eventName}
        fill
        unoptimized={eventImage.startsWith("data:")}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 769px"
      />

      <div className="absolute right-4 bottom-4 left-4 z-[2] flex justify-between rounded-[8px] bg-[#1111115b] p-[18px] text-white shadow-[0_12px_30px_rgba(0,0,0,.45)] min-[769px]:right-6 bottom-6 left-6 p-6">
        <div className="relative mb-[-150px] h-[150px] flex-1">
          <div className="-ml-[10px] mb-[10px] inline-block bg-[#111] px-[10px] py-[5px] text-[8px] min-[769px]:mb-[18px] min-[769px]:ml-0 min-[769px]:rounded-[4px] min-[769px]:px-[14px] min-[769px]:py-2 min-[769px]:text-[11px]">
            {date}
          </div>

          <div className="-mt-[10px] bg-[#111] min-[769px]:mt-0 min-[769px]:bg-transparent">
            <h2 className="m-0 text-[11px] leading-[1.15] font-bold min-[769px]:text-[34px]">
              {eventName}
            </h2>

            <p className="mt-[18px] text-[13px] text-[#cfcfcf] min-[769px]:text-[22px]">
              {venue}
            </p>
          </div>
        </div>

        <div className="flex w-[120px] flex-col justify-center text-right min-[769px]:w-[210px]">
          <h3 className="m-0 text-[20px] leading-[1.1] font-bold min-[769px]:text-[34px]">
            YOU GOT
            <br />
            TICKETS!
          </h3>

          <div className="ml-auto my-5 h-[2px] w-[50px] bg-white min-[769px]:w-[90px]" />

          <span className="text-[16px] tracking-[3px] text-[#d8d8d8] min-[769px]:text-[26px]">
            X{ticketCount} TICKETS
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketHero;
import Image from "next/image";
