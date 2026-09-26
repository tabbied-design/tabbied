import type { Metadata } from 'next';
import { quoit } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "True North Heating | Heating and cooling contractor", description: "Furnace, heat pump, and air conditioning service from a small licensed crew that gives you options before reaching for the parts list." };

const business: LocalBusiness = {
  name: "True North Heating",
  eyebrow: "Heating and cooling | Northfield",
  headline: "Comfort that holds through every season.",
  intro: "Furnace, heat pump, and air conditioning service from a small licensed crew that gives you options before reaching for the parts list.",
  phone: "(555) 016-4408",
  area: "Northfield and nearby townships",
  colors: ["#F2F5F4", "#102A35", "#E85D3F", "#CDE5E7", "#337C8D"],
  services: [
    { name: "Repair", detail: "Diagnosis and repair for furnaces, boilers, heat pumps, and central air.", price: "$89 callout" },
    { name: "Maintenance", detail: "Seasonal cleaning, safety checks, and a written report for your system.", price: "From $149" },
    { name: "Replacement", detail: "Right-sized equipment, tidy installation, permits, and haul-away included.", price: "Free quote" },
  ],
  promise: "We explain what failed, what can wait, and what each option costs before any work begins.",
  steps: [
    { title: "Call or message", detail: "Tell us what the system is doing and when you first noticed it." },
    { title: "Get a diagnosis", detail: "A technician tests the whole system, not just the noisy part." },
    { title: "Choose your fix", detail: "Approve a clear price, then receive photos and notes when the job is done." },
  ],
  quote: "They repaired the relay and showed me why I did not need the new furnace another company was selling me.",
  quoteBy: "Caleb T., Northfield",
  hours: "Mon-Fri, 7:30 AM-6:00 PM; emergency line after hours",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={quoit} />;
}
