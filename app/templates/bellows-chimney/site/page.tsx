import type { Metadata } from 'next';
import { lunette } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Bellows Chimney Co. | Chimney sweep and repair", description: "Annual sweeping, camera inspections, and practical masonry repairs for fireplaces and wood stoves across Redwick County." };

const business: LocalBusiness = {
  name: "Bellows Chimney Co.",
  eyebrow: "Certified chimney care | Redwick",
  headline: "Clean fires. Sound chimneys. No soot indoors.",
  intro: "Annual sweeping, camera inspections, and practical masonry repairs for fireplaces and wood stoves across Redwick County.",
  phone: "(555) 018-2210",
  area: "Redwick County and Pine Vale",
  colors: ["#F3EBDD", "#211E1B", "#C44B2B", "#D8C7AE", "#74706A"],
  services: [
    { name: "Sweep and inspect", detail: "A clean, contained sweep plus a level-one safety inspection and report.", price: "From $189" },
    { name: "Camera inspection", detail: "A full flue scan for home sales, chimney fires, and hidden damage.", price: "From $275" },
    { name: "Masonry repair", detail: "Caps, crowns, flashing, tuckpointing, and small rebuilds that keep water out.", price: "Written quote" },
  ],
  promise: "Drop cloths go down before a brush goes up, and you receive plain photos of anything we recommend repairing.",
  steps: [
    { title: "Book your window", detail: "Choose a two-hour arrival window and tell us your fireplace or stove type." },
    { title: "Prepare the hearth", detail: "Let the appliance cool for 24 hours; we handle all covering and cleanup." },
    { title: "Read the report", detail: "See what we saw, review priorities, and keep the report for your records." },
  ],
  quote: "Not a trace of soot in the room. The camera photos made the repair easy to understand and there was no sales pitch.",
  quoteBy: "Priya S., Redwick",
  hours: "Tue-Sat, 8:00 AM-5:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={lunette} />;
}
