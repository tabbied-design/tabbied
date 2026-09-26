import type { Metadata } from 'next';
import { sparkle } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Steadfast Pest Control | Residential pest control", description: "Measured pest treatment for homes and small businesses, with careful inspections, family-conscious options, and useful prevention advice." };

const business: LocalBusiness = {
  name: "Steadfast Pest Control",
  eyebrow: "Local pest control | Mill County",
  headline: "Solve the problem. Keep the household calm.",
  intro: "Measured pest treatment for homes and small businesses, with careful inspections, family-conscious options, and useful prevention advice.",
  phone: "(555) 013-2778",
  area: "Mill County and the north valley",
  colors: ["#F1F4EC", "#1E3024", "#D68A24", "#DCE6CF", "#55745E"],
  services: [
    { name: "Home inspection", detail: "Identify the pest, entry points, conditions, and the least disruptive response.", price: "$79" },
    { name: "Targeted treatment", detail: "One-time treatment for ants, wasps, rodents, roaches, and common invaders.", price: "From $145" },
    { name: "Seasonal plan", detail: "Quarterly exterior service plus priority visits if a covered pest returns.", price: "$39 / month" },
  ],
  promise: "We identify before we treat, explain what is being used and why, and never sell a larger plan than the evidence supports.",
  steps: [
    { title: "Tell us what you saw", detail: "Call or send a photo, plus where and when the activity appears." },
    { title: "Inspect the cause", detail: "We trace access and food or moisture sources before recommending treatment." },
    { title: "Treat and prevent", detail: "Get written prep, safety, and follow-up notes with a return date if needed." },
  ],
  quote: "They found the tiny gap behind the meter, treated one area, and gave us a simple fix instead of pushing a contract.",
  quoteBy: "Luis G., Mill County",
  hours: "Mon-Sat, 8:00 AM-6:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={sparkle} />;
}
