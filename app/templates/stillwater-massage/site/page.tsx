import type { Metadata } from 'next';
import { terrain } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Stillwater Massage | Massage therapy practice", description: "Quiet, attentive massage therapy for persistent tension, active bodies, and anyone who needs an hour without noise or hurry." };

const business: LocalBusiness = {
  name: "Stillwater Massage",
  eyebrow: "Therapeutic massage | Linden Row",
  headline: "Make room to move and breathe again.",
  intro: "Quiet, attentive massage therapy for persistent tension, active bodies, and anyone who needs an hour without noise or hurry.",
  phone: "(555) 015-7419",
  area: "Linden Row, inside the Hearthwell Building",
  colors: ["#F6F1E9", "#27312D", "#A95844", "#DCE4D7", "#708476"],
  services: [
    { name: "Focused session", detail: "Targeted work for one or two problem areas, with time to settle in.", price: "$75 / 45 min" },
    { name: "Full session", detail: "A complete treatment shaped around pressure, movement, and your goals.", price: "$105 / 60 min" },
    { name: "Long session", detail: "Unhurried full-body work with extra time for persistent patterns.", price: "$145 / 90 min" },
  ],
  promise: "Every session starts with a real conversation, stays within your comfort, and never follows a generic routine.",
  steps: [
    { title: "Choose a session", detail: "Book online and add any areas you want to focus on or avoid." },
    { title: "Set the plan", detail: "We check pressure, goals, and relevant health details before beginning." },
    { title: "Leave unhurried", detail: "Take a few quiet minutes, then receive simple aftercare if it is useful." },
  ],
  quote: "The first therapist who listened when I said gentle, and still made a real difference to my shoulder.",
  quoteBy: "Rosa M., Linden Row",
  hours: "Tue-Sat, 10:00 AM-7:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={terrain} />;
}
