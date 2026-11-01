const EventBanner = () => {
  return (
    <section className="relative mt-10 h-[200px] w-full overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,.15)] sm:h-[260px] sm:rounded-[20px]">
      {/* <div className="eventBannerOverlay">

        <div className="eventBannerDate">
          <span>{date}</span>
          <small>{time}</small>
        </div>

        <h2>{title}</h2>

        <p>{venue}</p>

        <div className="eventTicketCount">

          <Ticket size={18} strokeWidth={2} />

          <span>{tickets} Ticket{tickets > 1 ? "s" : ""}</span>

        </div>

      </div> */}
    </section>
  );
};

export default EventBanner;
