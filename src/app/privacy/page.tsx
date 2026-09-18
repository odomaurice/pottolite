import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Potto",
  description:
    "How Potto handles school, student, staff and parent information.",
};

const UPDATED = "18 September 2026";


const SECTIONS: LegalSection[] = [
  {
    heading: "Who this notice is for",
    blocks: [
      "This notice explains how Potto handles personal information when a school uses the Potto platform:Potto Secure, Potto Assess, Potto Pay, Potto Pocket, Potto Store, Potto Admin and Potto Comm, together with our hand-held and terminal attendance devices and smart ID cards.",
      "It is written for three audiences: the schools that subscribe to Potto, the parents and guardians whose children attend those schools, and the staff who use the platform day to day.",
      // {
      //   confirm:
      //     "Potto's registered company name and RC number, so this notice names the correct legal entity.",
      // },
    ],
  },
  {
    heading: "Your school decides; we process on its instructions",
    blocks: [
      "This is the most important thing to understand about Potto. Your school is the data controller: it decides which records go into Potto, which features to switch on, who may see what, and how long to keep records. Potto is the data processor: we process that information on your school's instructions in order to provide the service.",
      "In practice, this means that if you are a parent, a guardian or a member of staff, your school is the first place to go with a question about your own or your child's records — it is the school that decides what is collected and who can see it. We will always support a school in answering you, and you can contact us directly using the details at the end of this notice.",
      "Potto is a controller in its own right for a narrower set of information: enquiries sent to us, correspondence with school administrators, and our own business and employment records.",
    ],
  },
  {
    heading: "The information we process",
    blocks: [
      "What we hold depends entirely on which Potto solutions your school uses. Across the platform it can include:",
      {
        list: [
          "Student records: name, class or year group, admission details, photograph, guardian relationships, attendance, movement in and out of school, exeat and hostel records, and results where the school uses Potto Assess.",
          "Staff records: name, role, contact details, the permissions granted to them, and their own attendance.",
          "Parent and guardian records: name, relationship to the student, phone number, email address, and whether they are authorised to collect a particular child.",
          "Visitor records: the details a school captures when someone signs in at the gate.",
          "Credentials used to identify people at a device: biometric identifiers where face recognition is enabled, RFID or NFC card identifiers, QR codes and PINs. These are covered in their own section below.",
          "Financial records: fee invoices and payments through Potto Pay, wallet balances and transactions through Potto Pocket, and purchases through Potto Store.",
          "Messages and notifications: the alerts, SMS and emails sent through the platform, and records of when they were sent and delivered.",
          "Technical records: sign-in times, IP address, device and browser information, and activity logs showing which user viewed or changed a record.",
        ],
      },
    ],
  },
  {
    heading: "Children's information",
    blocks: [
      "Most of the information in Potto is about children, and the Nigeria Data Protection Act 2023 gives children's data particular protection.",
      "Your school is responsible for obtaining the consent of a parent or guardian, or for identifying another lawful basis, before a child's information is entered into Potto. We provide schools with the tools to record and manage this, but the school holds the relationship with the family and makes that decision.",
      "We do not use children's information to advertise anything to them, we do not build profiles of children for any purpose beyond the features the school has switched on, and we do not sell personal information about anyone.",
      // {
      //   confirm:
      //     "How the school evidences parental consent in practice — on paper at admission, or captured in Potto — so this section can describe the actual process.",
      // },
    ],
  },
  {
    heading: "Biometrics, cards, QR codes and PINs",
    blocks: [
      "Potto devices can identify a student or a member of staff in four ways: face recognition, an RFID or NFC card, a QR code, or a PIN. A school chooses which of these to use.",
      "Biometric information is treated as sensitive personal information under the Nigeria Data Protection Act 2023. Where a school enables face recognition, that information is used for one purpose only: confirming that the person at the device is who the record says they are, so that attendance and movement are recorded against the right person. It is not used to identify people anywhere else, and it is not shared with anyone outside the school's own authorised users and our own processing of it on the school's behalf.",
      "Card identifiers, QR codes and PINs are credentials rather than biometrics. If a card is lost, the school can deactivate it so it can no longer be used.",
      // {
      //   confirm:
      //     "Exactly what the devices store for face recognition — a mathematical template or an image — where it is held (on the device, in Potto, or both), and how long it survives after a student leaves. This section should state it plainly, and the answer needs to come from the engineering team rather than be assumed.",
      // },
    ],
  },
  {
    heading: "Why we are allowed to process it",
    blocks: [
      "We rely on the following lawful bases under the Nigeria Data Protection Act 2023:",
      {
        list: [
          "Performance of a contract: to deliver the service the school has subscribed to, and to administer that subscription.",
          "Consent: obtained by the school, particularly for children's information and for biometric identification. Consent can be withdrawn, and the school can switch a student to a card, QR code or PIN instead.",
          "Legal obligation: where we must keep or disclose records to comply with Nigerian law.",
          "Legitimate interests: keeping the platform secure, investigating misuse, and maintaining and improving the service — weighed against the interests of the people whose information is involved.",
        ],
      },
    ],
  },
  {
    heading: "What we use it for",
    blocks: [
      "We use the information to provide the features your school has chosen, and for no unrelated purpose. That means:",
      {
        list: [
          "Recording attendance and verifying identity at a device.",
          "Tracking movement in and out of school, including bus activity, dismissals and exeat.",
          "Verifying that a parent, guardian or other person is authorised to collect a child.",
          "Managing visitors at the gate.",
          "Raising and distributing emergency alerts.",
          "Sending attendance, dismissal and other notifications to parents and staff by app, SMS or email.",
          "Processing school fees, wallet top-ups and store purchases.",
          "Producing and issuing smart ID cards.",
          "Providing support to your school, and keeping the platform secure and working.",
        ],
      },
      "We do not sell personal information, and we do not use school, student, staff or parent records to advertise to anyone.",
      // {
      //   confirm:
      //     "Whether Potto uses school data in aggregated, de-identified form for product analytics or benchmarking. If so, this notice must say so and explain the safeguards.",
      // },
    ],
  },
  {
    heading: "Who we share it with",
    blocks: [
      "Information in Potto is visible to your school's own authorised users, according to the permissions the school sets, and to parents and guardians for the children linked to them.",
      "Beyond that, we share information only with:",
      {
        list: [
          "Service providers who help us run the platform: hosting, messaging and payment providers, under contracts that require them to protect it and to use it only for the service they provide to us.",
          "Professional advisers, where necessary and under a duty of confidentiality.",
          "Authorities or courts, where the law requires it.",
          "A buyer or successor, if Potto is ever sold or reorganised, on the same terms as this notice.",
        ],
      },
      // {
      //   confirm:
      //     "The named list of sub-processors — hosting provider, SMS gateway, payment processor and media hosting — and where each of them is located. Schools acting as controllers are entitled to this list, and some will ask for it before signing.",
      // },
    ],
  },
  {
    heading: "Where it is stored, and for how long",
    blocks: [
      "Some of our providers may process information outside Nigeria. Where that happens, we take the steps the Nigeria Data Protection Act 2023 requires for transfers abroad, including contractual protections with the provider.",
      "We keep records for as long as your school needs them for the purpose it collected them, and then for any period Nigerian law requires. When a subscription ends, we make the school's records available for export and then delete them, subject to any legal retention obligation.",
      // {
      //   confirm:
      //     "The hosting region, the retention period for each category of record (attendance, results, financial records, biometrics, message logs), and the length of the export window after a subscription ends. These should be stated as definite periods here and must match the Terms.",
      // },
    ],
  },
  {
    heading: "How we protect it",
    blocks: [
      "We use role-based access, so a user sees only the records their role requires; encryption of information in transit; audit logging of access to records; and controls over who on our own team can reach a school's data.",
      "If a breach of personal information occurs, we will inform the affected school without undue delay so it can meet its own obligations, and we will notify the Nigeria Data Protection Commission where the Act requires it, the Act sets a 72-hour window for notifying the Commission.",
      "No system is perfectly secure. Schools have an important part to play: keeping user accounts to the people who need them, removing access when staff leave, and not sharing credentials.",
      // {
      //   confirm:
      //     "Whether records are encrypted at rest as well as in transit, and the internal breach-response procedure this section should summarise.",
      // },
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      "Under the Nigeria Data Protection Act 2023 you have the right to ask for access to your personal information, to have it corrected, to have it deleted, to restrict or object to how it is used, to receive a copy in a portable form, and to withdraw consent where processing relies on it.",
      "Because your school is the controller, please start with your school — it can act on most requests directly in Potto. If you contact us instead, we will pass your request to the school and support it in responding.",
      "You also have the right to complain to the Nigeria Data Protection Commission.",
    ],
  },
  {
    heading: "The Potto website",
    blocks: [
      "This website (potto.ng) sets no cookies, runs no analytics or advertising trackers, and loads no third-party scripts. Our fonts are served from our own site rather than fetched from another provider, so simply reading these pages does not report your visit to anyone else.",
      "Our web host processes standard server request information, including IP addresses, in order to serve the site and keep it secure.",
      "If you send us an enquiry, we use your details to reply to it and keep the correspondence for our records.",
      // {
      //   confirm:
      //     "Revisit this section the moment any analytics, chat widget, embedded video or advertising pixel is added to the site — the statement above is accurate for the current version and would become untrue.",
      // },
    ],
  },
  {
    heading: "Changes to this notice",
    blocks: [
      "We will update this notice when the platform or the law changes, and the revision date at the top will tell you when it last changed. Where a change materially affects how we handle information, we will tell subscribing schools directly.",
    ],
  },
  {
    heading: "How to reach us",
    blocks: [
      "Potto, House 83 Coal City Gardens, Behind Central Bank of Nigeria, Okpara Avenue, Enugu.",
      "Email Info@potto.ng for general enquiries or support@potto.ng for help with the platform. By phone: +234 808 472 4276 or +234 812 557 8825, Monday to Friday 8AM – 4PM and Saturday 8AM – 12 Noon.",
      // {
      //   confirm:
      //     "The name and contact address of Potto's data protection officer or the person accountable for data protection, which this section should give directly.",
      // },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy"
      title="Privacy Policy"
      updated={UPDATED}
      intro={[
        "Potto is used by schools to keep track of children — where they are, who collects them, how they are doing and what their families are told. That only works if the people involved can see how their information is handled.",
        "This notice explains what Potto processes, why, who can see it, and what you can ask us to do about it.",
      ]}
      sections={SECTIONS}
    />
  );
}
