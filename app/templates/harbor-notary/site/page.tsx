import type { Metadata } from 'next';
import { apse } from 'tabbied/patterns';
import LocalBusinessSite, { type LocalBusiness } from 'components/template/LocalBusinessSite';

export const metadata: Metadata = { title: "Harbor Notary | Mobile notary service", description: "A commissioned mobile notary who comes to your home, office, hospital, or care facility, with clear fees and evening appointments." };

const business: LocalBusiness = {
  name: "Harbor Notary",
  eyebrow: "Mobile notary | Alder County",
  headline: "Signed, sealed, and on your schedule.",
  intro: "A commissioned mobile notary who comes to your home, office, hospital, or care facility, with clear fees and evening appointments.",
  phone: "(555) 014-7282",
  area: "Alder County and the east shore",
  colors: ["#F7F3E8", "#182A32", "#D8572A", "#DDE6DF", "#8CA39A"],
  services: [
    { name: "General notarization", detail: "Acknowledgments, jurats, affidavits, and certified copies handled carefully.", price: "From $15" },
    { name: "Estate documents", detail: "Patient appointments for trusts, powers of attorney, and advance directives.", price: "From $65" },
    { name: "Loan signings", detail: "Complete buyer, seller, refinance, and HELOC signing appointments.", price: "From $125" },
  ],
  promise: "You will know the travel fee before I set out, and every name, date, and seal gets checked twice.",
  steps: [
    { title: "Choose a time", detail: "Send the document type, neighborhood, and a few times that suit you." },
    { title: "Bring valid ID", detail: "Have an unexpired government photo ID and the unsigned documents ready." },
    { title: "Sign together", detail: "We review the certificate, witness the signature, and complete the journal entry." },
  ],
  quote: "She met us at the care home after dinner, explained every step without rushing Dad, and caught a missing page before it became a problem.",
  quoteBy: "Mina R., Alder Bay",
  hours: "Mon-Sat, 8:00 AM-8:00 PM",
};

export default function Page() {
  return <LocalBusinessSite business={business} pattern={apse} />;
}
