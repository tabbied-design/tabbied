import type { Metadata } from 'next';
import { gyre } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Good Dog Walks | Dog walking service", description: "Reliable neighborhood walks, small-group adventures, and thoughtful puppy visits from an insured local walker who knows every dog by name." };

const business: LocalBusiness = {
  name: "Good Dog Walks",
  eyebrow: "Dog walks | West Briar",
  headline: "A better day for your best friend.",
  intro: "Reliable neighborhood walks, small-group adventures, and thoughtful puppy visits from an insured local walker who knows every dog by name.",
  phone: "(555) 012-9364",
  area: "West Briar, Oak Hill, and the river wards",
  colors: ["#FFF8E8", "#243226", "#F06F3C", "#DCE8B5", "#6B8F3D"],
  services: [
    { name: "Solo walk", detail: "A focused neighborhood walk shaped around your dog's pace and routine.", price: "$24 / 30 min" },
    { name: "Trail group", detail: "A screened group of up to four dogs, with pickup and a full hour outside.", price: "$38 / outing" },
    { name: "Puppy visit", detail: "Potty break, play, lunch, and simple reinforcement for growing pups.", price: "$22 / visit" },
  ],
  promise: "The same familiar walker arrives in the agreed window, sends a real update, and leaves your home exactly as found.",
  steps: [
    { title: "Meet at home", detail: "We learn the routine, check the gear, and make sure your dog is comfortable." },
    { title: "Pick a rhythm", detail: "Choose regular weekdays or request occasional walks in the client calendar." },
    { title: "Follow the walk", detail: "Get a note, route, and photo after every visit, never a mystery status." },
  ],
  quote: "Mabel waits at the window on Tuesdays now. The updates are specific enough that I know they truly understand her.",
  quoteBy: "Jo and Mabel, Oak Hill",
  hours: "Mon-Fri, 8:00 AM-6:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={gyre} />;
}
