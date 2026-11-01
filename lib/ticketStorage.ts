export interface TicketDetails {
  id: number;
  section: string;
  type: string;
  row: string;
  seat: string;
}

export interface TicketEvent {
  eventName: string;
  dateTime: string;
  venue: string;
  orderNumber: string;
  heroImage: string;
  ticketImage: string;
  tickets: TicketDetails[];
}

export const DEFAULT_TICKET_EVENT: TicketEvent = {
  eventName: "BTS WORLD TOUR 'ARIRANG' IN LOS ANGELES",
  dateTime: "SAT, SEP 5, 2026, 8:00 PM",
  venue: "SoFi Stadium, Inglewood, CA",
  orderNumber: "42-14323/WES",
  heroImage: "",
  ticketImage: "",
  tickets: [
    { id: 1, section: "131", type: "ARMY MEMBERSHIP PRESALE", row: "12", seat: "5" },
    { id: 2, section: "131", type: "ARMY MEMBERSHIP PRESALE", row: "12", seat: "6" },
    { id: 3, section: "131", type: "ARMY MEMBERSHIP PRESALE", row: "12", seat: "7" },
    { id: 4, section: "140", type: "ARMY MEMBERSHIP PRESALE", row: "12", seat: "8" },
  ],
};

export const TICKET_EVENT_STORAGE_KEY = "my-tix-us:event";

export function loadTicketEvent(): TicketEvent | null {
  if (typeof window === "undefined") return null;

  const saved = window.localStorage.getItem(TICKET_EVENT_STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as TicketEvent;
  } catch {
    return null;
  }
}

export function saveTicketEvent(event: TicketEvent) {
  window.localStorage.setItem(TICKET_EVENT_STORAGE_KEY, JSON.stringify(event));
}
