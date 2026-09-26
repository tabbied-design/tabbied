import type { Metadata } from 'next';
import { sheared } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Patch & Plane | Handyman service", description: "A dependable one-person repair service for the loose, cracked, dripping, and unfinished things that make a home feel neglected." };

const business: LocalBusiness = {
  name: "Patch & Plane",
  eyebrow: "Home repairs | Southbank",
  headline: "The small jobs deserve good work too.",
  intro: "A dependable one-person repair service for the loose, cracked, dripping, and unfinished things that make a home feel neglected.",
  phone: "(555) 017-3055",
  area: "Southbank and neighborhoods within 12 miles",
  colors: ["#F4F0E6", "#24251F", "#D9782D", "#DFD9C8", "#6F7A61"],
  services: [
    { name: "Half-day list", detail: "Bundle several repairs, hanging jobs, adjustments, and touch-ups into one visit.", price: "$320" },
    { name: "Full-day list", detail: "A focused day for a room refresh, punch list, or move-in repairs.", price: "$580" },
    { name: "Single repair", detail: "One defined job such as a door, drywall patch, shelf, or fixture swap.", price: "From $120" },
  ],
  promise: "I arrive with the right fixings, protect the room, and do not leave you with sanding dust or a mystery extra charge.",
  steps: [
    { title: "Send the list", detail: "Share a short description and phone photos so I can plan materials and time." },
    { title: "Confirm the scope", detail: "Receive a fixed estimate or a clearly capped time-and-materials range." },
    { title: "Clear the list", detail: "We walk through the finished work together before tools and covers come up." },
  ],
  quote: "Five irritating jobs gone in one morning, including the door everyone else said needed replacing.",
  quoteBy: "Harper N., Southbank",
  hours: "Mon-Fri, 8:00 AM-5:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={sheared} />;
}
