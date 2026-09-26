import type { Metadata } from 'next';
import { ogee } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Ledger Tax Studio | Tax preparation service", description: "Personal and small-business tax returns prepared locally, with secure document sharing, transparent fees, and answers in plain language." };

const business: LocalBusiness = {
  name: "Ledger Tax Studio",
  eyebrow: "Tax preparation | Cedar Grove",
  headline: "A calm desk for a complicated year.",
  intro: "Personal and small-business tax returns prepared locally, with secure document sharing, transparent fees, and answers in plain language.",
  phone: "(555) 011-6042",
  area: "Cedar Grove, with remote appointments statewide",
  colors: ["#F5F7F2", "#163029", "#C55A32", "#D8E4D8", "#587D6C"],
  services: [
    { name: "Personal return", detail: "Federal and state filing for wages, investments, homes, and dependents.", price: "From $240" },
    { name: "Sole proprietor", detail: "Schedule C filing, estimated payments, and an organized year-end review.", price: "From $425" },
    { name: "Small partnership", detail: "Form 1065, partner statements, and a planning session for the next year.", price: "From $850" },
  ],
  promise: "You get a fee range before we begin, a checklist that fits your return, and a review before anything is filed.",
  steps: [
    { title: "Start securely", detail: "Complete a short organizer and upload documents through the private portal." },
    { title: "Review together", detail: "Meet in person or by video to cover questions and see the draft numbers." },
    { title: "Approve and file", detail: "Sign electronically, receive confirmation, and keep a tidy digital copy." },
  ],
  quote: "For the first time I understood why I owed quarterly tax and exactly how much to set aside each month.",
  quoteBy: "Devon P., Cedar Grove",
  hours: "Mon-Fri, 9:00 AM-6:00 PM; Saturdays Feb-Apr",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={ogee} />;
}
