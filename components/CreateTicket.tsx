"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { ArrowLeft, ImagePlus, Plus, Trash2 } from "lucide-react";
import {
  DEFAULT_TICKET_EVENT,
  loadTicketEvent,
  saveTicketEvent,
  TicketDetails,
  TicketEvent,
} from "@/lib/ticketStorage";

async function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Unable to read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Unable to process image"));
      image.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function CreateTicket() {
  const router = useRouter();
  const [event, setEvent] = useState<TicketEvent>(DEFAULT_TICKET_EVENT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEvent(loadTicketEvent() ?? DEFAULT_TICKET_EVENT);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const updateTicket = (id: number, field: keyof Omit<TicketDetails, "id">, value: string) => {
    setEvent((current) => ({
      ...current,
      tickets: current.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket,
      ),
    }));
  };

  const handleImage = async (
    field: "heroImage" | "ticketImage",
    change: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = change.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const image = await resizeImage(file);
      setEvent((current) => ({ ...current, [field]: image }));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload image");
    }
  };

  const addTicket = () => {
    setEvent((current) => {
      const nextId = Math.max(0, ...current.tickets.map((ticket) => ticket.id)) + 1;
      const template = current.tickets.at(-1);
      return {
        ...current,
        tickets: [
          ...current.tickets,
          {
            id: nextId,
            section: template?.section ?? "",
            type: template?.type ?? "",
            row: template?.row ?? "",
            seat: template ? String(Number(template.seat) + 1 || "") : "",
          },
        ],
      };
    });
  };

  const submit = (submitEvent: FormEvent) => {
    submitEvent.preventDefault();
    setSaving(true);
    try {
      saveTicketEvent(event);
      router.push("/");
      router.refresh();
    } catch {
      setError("The browser could not store these images. Try smaller image files.");
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f4f4] font-[Inter,sans-serif]">
      <form onSubmit={submit} className="mx-auto min-h-screen w-full max-w-[430px] bg-white pb-10">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-[#eee] bg-white px-4 py-3">
          <button type="button" onClick={() => router.back()} aria-label="Back" className="border-none bg-transparent">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Create ticket</h1>
        </header>

        <div className="space-y-7 p-4">
          <section className="space-y-4">
            <h2 className="text-sm font-bold">Event information</h2>
            {([
              ["eventName", "Event name"],
              ["dateTime", "Date and time"],
              ["venue", "Venue"],
              ["orderNumber", "Order number"],
            ] as const).map(([field, label]) => (
              <label key={field} className="block text-xs font-semibold text-[#666]">
                {label}
                <input
                  required
                  value={event[field]}
                  onChange={(change) => setEvent((current) => ({ ...current, [field]: change.target.value }))}
                  className="mt-2 h-12 w-full rounded-lg border border-[#ccc] px-3 text-base text-black"
                />
              </label>
            ))}

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#aaa] p-4">
              <ImagePlus size={22} />
              <span className="text-sm font-semibold">{event.heroImage ? "Change event image" : "Upload event image"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(change) => void handleImage("heroImage", change)} />
            </label>
            {event.heroImage && (
              <div className="relative h-44 w-full overflow-hidden rounded-lg">
                <NextImage src={event.heroImage} alt="Event preview" fill unoptimized className="object-cover" sizes="430px" />
              </div>
            )}

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#aaa] p-4">
              <ImagePlus size={22} />
              <span className="text-sm font-semibold">{event.ticketImage ? "Change ticket image" : "Upload ticket image"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(change) => void handleImage("ticketImage", change)} />
            </label>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">Tickets</h2>
              <button type="button" onClick={addTicket} className="flex items-center gap-1 border-none bg-transparent font-bold text-[#0047ff]">
                <Plus size={18} /> Add
              </button>
            </div>

            {event.tickets.map((ticket, index) => (
              <fieldset key={ticket.id} className="rounded-xl border border-[#ddd] p-3">
                <legend className="px-1 text-xs font-bold">Ticket {index + 1}</legend>
                <label className="block text-xs font-semibold text-[#666]">
                  Ticket type
                  <input required value={ticket.type} onChange={(change) => updateTicket(ticket.id, "type", change.target.value)} className="mt-1 mb-3 h-11 w-full rounded-md border border-[#ccc] px-3 text-black" />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["section", "row", "seat"] as const).map((field) => (
                    <label key={field} className="text-xs font-semibold uppercase text-[#666]">
                      {field}
                      <input required value={ticket[field]} onChange={(change) => updateTicket(ticket.id, field, change.target.value)} className="mt-1 h-11 w-full rounded-md border border-[#ccc] px-2 text-black" />
                    </label>
                  ))}
                </div>
                {event.tickets.length > 1 && (
                  <button type="button" onClick={() => setEvent((current) => ({ ...current, tickets: current.tickets.filter((item) => item.id !== ticket.id) }))} className="mt-3 flex items-center gap-1 border-none bg-transparent text-xs font-bold text-red-600">
                    <Trash2 size={15} /> Remove ticket
                  </button>
                )}
              </fieldset>
            ))}
          </section>

          {error && <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>}
          <button disabled={saving} className="h-12 w-full rounded-full border-none bg-[#0047ff] text-base font-bold text-white disabled:opacity-60">
            {saving ? "Saving..." : "Save and show ticket"}
          </button>
        </div>
      </form>
    </main>
  );
}
