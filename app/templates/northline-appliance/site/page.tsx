import type { Metadata } from 'next';
import { bokeh } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Northline Appliance Repair | Home appliance repair", description: "In-home diagnosis and repair for washers, dryers, dishwashers, ovens, and refrigerators, with the callout applied to approved work." };

const business: LocalBusiness = {
  name: "Northline Appliance Repair",
  eyebrow: "Appliance repair | Northline",
  headline: "Repair first. Replace only when it makes sense.",
  intro: "In-home diagnosis and repair for washers, dryers, dishwashers, ovens, and refrigerators, with the callout applied to approved work.",
  phone: "(555) 010-5926",
  area: "Northline, Fairhaven, and East Junction",
  colors: ["#F4F6F7", "#172631", "#E45135", "#D8E6EA", "#47778A"],
  services: [
    { name: "Laundry", detail: "Washers and dryers that leak, shake, stop, or leave clothes unfinished.", price: "$95 diagnosis" },
    { name: "Kitchen", detail: "Dishwashers, ovens, ranges, and refrigerators from most major brands.", price: "$95 diagnosis" },
    { name: "Preventive care", detail: "Dryer vent cleaning, refrigerator coil service, and appliance checkups.", price: "From $110" },
  ],
  promise: "You see the diagnosis, parts price, labor, and honest remaining-life advice before deciding whether to repair.",
  steps: [
    { title: "Share the model", detail: "Send the model number, symptoms, and any error code when you book." },
    { title: "Diagnose at home", detail: "We test the appliance and quote the complete repair, not an open-ended hourly rate." },
    { title: "Get back to normal", detail: "Common parts are stocked; special orders come with a firm return appointment." },
  ],
  quote: "He had the drain pump on the van, fixed the washer in one visit, and showed us the coin that caused it.",
  quoteBy: "Aisha K., Fairhaven",
  hours: "Mon-Fri, 8:00 AM-6:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={bokeh} />;
}
