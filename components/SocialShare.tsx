import React from "react";
import Image from "next/image";

import { Link2, Share2 } from "lucide-react";

const SocialShare: React.FC = () => {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Event link copied!");
    } catch {
      alert("Unable to copy link.");
    }
  };

  return (
    <section className="mt-7 w-full rounded-[18px] bg-white p-[18px] shadow-[0_8px_25px_rgba(0,0,0,.08)] min-[431px]:p-5">
      <div className="mb-5 flex items-center gap-[10px]">
        <Share2 size={20} />

        <h3>Share Event</h3>
      </div>

      <div className="flex items-center justify-between max-[360px]:gap-[10px]">
        {/* WhatsApp */}
        <a
          href="#"
          className="flex size-[48px] items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:-translate-y-1 max-[430px]:size-[54px] min-[431px]:size-[58px]"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            alt="WhatsApp"
            width={54}
            height={54}
            unoptimized
          />
        </a>

        {/* X */}
        <a
          href="#"
          className="flex size-[48px] items-center justify-center rounded-full bg-black text-white transition-transform hover:-translate-y-1 max-[430px]:size-[54px] min-[431px]:size-[58px]"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
            alt="Twitter"
            width={54}
            height={54}
            unoptimized
          />
        </a>

        {/* Copy Link */}
        <button
          className="flex size-[48px] cursor-pointer items-center justify-center rounded-full border-none bg-[#333] text-white outline-none transition-transform hover:-translate-y-1 max-[430px]:size-[54px] min-[431px]:size-[58px]"
          onClick={copyLink}
        >
          <Link2 size={22} />
        </button>
      </div>
    </section>
  );
};

export default SocialShare;
