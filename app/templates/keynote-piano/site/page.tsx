import type { Metadata } from 'next';
import { ringfield } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Keynote Piano Care | Piano tuning and repair", description: "In-home tuning, regulation, and repair for uprights and grands, from family pianos to hard-working teaching studios." };

const business: LocalBusiness = {
  name: "Keynote Piano Care",
  eyebrow: "Piano technician | Greater Marlow",
  headline: "Bring the whole instrument back into focus.",
  intro: "In-home tuning, regulation, and repair for uprights and grands, from family pianos to hard-working teaching studios.",
  phone: "(555) 019-8831",
  area: "Greater Marlow and the lakeside towns",
  colors: ["#F8F5EE", "#191A1D", "#B54735", "#E1D6C4", "#626C78"],
  services: [
    { name: "Standard tuning", detail: "A careful aural and electronic tuning at or near concert pitch.", price: "$165" },
    { name: "Pitch correction", detail: "A stabilizing first pass and fine tuning for instruments far from pitch.", price: "From $225" },
    { name: "Repair and regulation", detail: "Sticky keys, pedals, action noise, voicing, and full regulation plans.", price: "From $95" },
  ],
  promise: "Your piano gets the time it needs, a stable tuning, and an honest note about what matters now versus later.",
  steps: [
    { title: "Describe the piano", detail: "Share its make, last tuning date, and any keys or sounds bothering you." },
    { title: "Reserve a visit", detail: "Choose a morning or afternoon appointment with a clear arrival time." },
    { title: "Play before I leave", detail: "Try the instrument, ask questions, and receive a service record for its bench." },
  ],
  quote: "The piano sounds open again, and the two stubborn keys finally repeat properly. The explanation was as good as the work.",
  quoteBy: "Ellen V., Marlow",
  hours: "Mon-Fri, 9:00 AM-5:30 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={ringfield} />;
}
