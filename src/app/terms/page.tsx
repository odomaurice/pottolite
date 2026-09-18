import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Potto",
  description:
    "The terms on which schools subscribe to and use the Potto platform.",
};

const UPDATED = "18 September 2026";


const SECTIONS: LegalSection[] = [
  {
    heading: "Who these terms bind",
    blocks: [
      "These terms are an agreement between Potto and the school that subscribes to the Potto platform. By subscribing, or by using Potto, your school accepts them.",
      "Staff, parents, guardians and students use Potto through the school. They are not parties to this agreement, but the school is responsible for their use of the platform, and their access is governed by the permissions the school sets.",
      // {
      //   confirm:
      //     "Potto's registered company name and RC number, and whether an order form or quotation signed with each school sits above these terms.",
      // },
    ],
  },
  {
    heading: "Definitions",
    blocks: [
      {
        list: [
          "Potto, we, us: the company providing the platform.",
          "School, you: the institution subscribing to Potto.",
          "Platform: the Potto web and mobile applications, including Potto Secure, Potto Assess, Potto Pay, Potto Pocket, Potto Store, Potto Admin and Potto Comm.",
          "Devices: the Potto hand-held and terminal attendance devices and smart ID cards supplied to a school.",
          "Users: the people your school authorises to use the platform, including staff, parents and guardians.",
          "Records: the student, staff, parent, guardian, attendance, academic and financial information your school puts into the platform.",
          "Order form: the document recording the plan your school has chosen, its price and its billing arrangements.",
        ],
      },
    ],
  },
  {
    heading: "The service and your plan",
    blocks: [
      "Potto offers plans: currently Free, Basic, Suite and Enterprise, which differ in the applications they include and in whether customization and managed service are provided. What your school is entitled to is what its chosen plan includes, as recorded on its order form.",
      "We develop the platform continuously, and features may be added, improved or changed. We will not materially reduce the features your plan includes during a paid term without telling you first.",
      // {
      //   confirm:
      //     "The billing period each price relates to — per student, per term, per month — because the plan prices are published without one, and this is the single most likely source of a dispute.",
      // },
    ],
  },
  {
    heading: "Onboarding and what your school agrees to do",
    blocks: [
      "We will guide your school through onboarding: setting up the school, preparing records, configuring the features you need and training your team.",
      "Your school agrees to:",
      {
        list: [
          "Provide accurate and up-to-date records, and correct them when they change.",
          "Obtain the consent of a parent or guardian, or identify another lawful basis, before a child's information is entered into the platform — including for biometric identification where the school enables it.",
          "Appoint administrators, and decide which users may see and do what.",
          "Remove a user's access promptly when they leave the school or change role.",
          "Keep account credentials confidential, and tell us promptly if an account may have been compromised.",
          "Provide the power and network connectivity the devices need at the places they are installed.",
        ],
      },
      "Potto is a tool that supports a school's own safeguarding decisions. It does not replace the school's supervision of its students, and the school remains responsible for those decisions.",
    ],
  },
  {
    heading: "Accounts, users and access",
    blocks: [
      "Access to the platform is by named user account, with permissions set by role. Accounts must not be shared.",
      "Your school is responsible for activity carried out under its users' accounts. We may suspend an individual account where we reasonably believe it is being misused or has been compromised.",
    ],
  },
  {
    heading: "Parents and guardians",
    blocks: [
      "Your school decides which parents and guardians are linked to which students, and which of them are authorised to collect a child. More than one guardian may be linked to a student where the school allows it.",
      "Potto verifies people against the records the school provides. It cannot know that a record is wrong, so keeping guardian and authorisation records current is the school's responsibility.",
    ],
  },
  {
    heading: "Devices and smart ID cards",
    blocks: [
      "Where your school takes Potto devices or smart ID cards, they are supplied for use with the platform for as long as your subscription lasts.",
      "Your school agrees to use the devices as instructed, keep them in the condition supplied allowing for fair wear, and tell us promptly if one is faulty, lost, stolen or damaged. The devices are described as water and dust resistant; that does not make them indestructible.",
      // {
      //   confirm:
      //     "Whether devices are sold or loaned; who owns them; the warranty period and what it covers; the charge for a replacement device or reissued ID card; and whether devices must be returned when a subscription ends.",
      // },
    ],
  },
  {
    heading: "Fees, billing and taxes",
    blocks: [
      "Your school pays the fees for its plan as recorded on its order form. Fees are exclusive of value added tax and any other applicable taxes or bank charges, which are payable in addition.",
      "We will tell your school before its fees change, and a change will not take effect during a term your school has already paid for.",
      // {
      //   confirm:
      //     "Payment terms (in advance or in arrears, and how many days to pay), what happens on late payment, whether fees are refundable, and the notice given before a price change.",
      // },
    ],
  },
  {
    heading: "The Free plan",
    blocks: [
      "The Free plan is provided at no cost so that a school can try Potto. It includes fewer applications than the paid plans, and we may change or withdraw it. We will give notice before withdrawing it from a school that is using it, and the school will be able to export its records.",
      // {
      //   confirm:
      //     "The limits of the Free plan — number of students, classes or applications — and the notice period before it can be withdrawn.",
      // },
    ],
  },
  {
    heading: "Changing plans",
    blocks: [
      "Your school can move to a plan with more applications at any time by arrangement with our team; the new fee applies from the change.",
      // {
      //   confirm:
      //     "How a downgrade works — when it takes effect, whether any fee is credited, and what happens to records belonging to applications the school no longer has.",
      // },
    ],
  },
  {
    heading: "Third-party services",
    blocks: [
      "Parts of Potto depend on other providers: payment processing, SMS delivery, hosting, and the app stores through which mobile applications are distributed. Their own terms govern their services.",
      "We choose these providers with care, but we are not responsible for their acts or outages beyond our reasonable control. Where a payment is processed by a third party, that provider handles the card or account details.",
    ],
  },
  {
    heading: "Acceptable use",
    blocks: ["Your school and its users must not:",
      {
        list: [
          "Use Potto for any unlawful purpose, or in breach of data protection law.",
          "Use the platform to monitor staff or students for purposes the school has not told them about.",
          "Attempt to access another school's data, or any part of the platform they are not authorised to reach.",
          "Copy, resell, sublicense or provide the platform to anyone else, or use it to build a competing product.",
          "Reverse engineer, decompile or interfere with the platform or the devices, or bypass their security.",
          "Upload anything unlawful, or anything that infringes another person's rights.",
        ],
      },
      "We may suspend access where we reasonably believe this section is being breached and the breach is serious or ongoing.",
    ],
  },
  {
    heading: "Intellectual property",
    blocks: [
      "Potto owns the platform, the devices' software, and everything we create in providing the service. Nothing in these terms transfers that to your school; your school receives permission to use it for the duration of its subscription.",
      "Your school's records remain your school's. We use them only to provide the service, as described in our Privacy Policy.",
      "If your school suggests an improvement, we may use the suggestion without obligation. That does not give us any right to your records.",
    ],
  },
  {
    heading: "Confidentiality",
    blocks: [
      "Each of us may learn confidential information about the other — your school's records and operations, our pricing and technology. Each of us agrees to keep the other's confidential information confidential, to use it only for this agreement, and to disclose it only to people who need it and are under a similar duty.",
      "This does not apply to information that is public through no fault of the receiver, or that the law requires to be disclosed.",
    ],
  },
  {
    heading: "Data protection",
    blocks: [
      "For the records your school puts into Potto, your school is the data controller and Potto is the data processor. We process those records on your school's instructions, in accordance with the Nigeria Data Protection Act 2023 and our Privacy Policy.",
      "Your school is responsible for having a lawful basis for the records it collects — in particular, for the consent of a parent or guardian for a child's information and for biometric identification.",
      "We will assist your school in responding to requests from parents, guardians, staff or students exercising their rights, and will tell your school without undue delay if a breach affecting its records occurs.",
      // {
      //   confirm:
      //     "Whether a separate data processing agreement is signed with each school, and if so that it is referenced here and provided at onboarding. Schools with careful procurement will ask for one.",
      // },
    ],
  },
  {
    heading: "Availability, maintenance and support",
    blocks: [
      "We aim to keep Potto available at all times and will use reasonable efforts to do so, but no online service is available without interruption. Some features need an internet connection at the school, and will be unavailable while that connection is down.",
      "We may carry out maintenance, and will try to schedule anything disruptive outside school hours.",
      "Support is available by email at support@potto.ng and by phone on +234 808 472 4276 or +234 812 557 8825, Monday to Friday 8AM – 4PM and Saturday 8AM – 12 Noon.",
      // {
      //   confirm:
      //     "Whether Potto commits to an uptime target and response times, and what happens if they are missed. Until this is agreed, no availability figure should be published anywhere.",
      // },
    ],
  },
  {
    heading: "Suspension and termination",
    blocks: [
      "Either of us may end this agreement by notice. We may suspend or end it where fees are unpaid after reminders, or where your school breaches these terms seriously and does not put it right after being asked.",
      "When the agreement ends, access to the platform stops. Before deleting your school's records we will make them available for export for a defined period, after which we delete them, subject to any retention the law requires.",
      // {
      //   confirm:
      //     "The notice period for each party, the grace period before suspension for non-payment, the length of the record export window, and whether fees already paid are refunded in part.",
      // },
    ],
  },
  {
    heading: "Warranties",
    blocks: [
      "We warrant that we will provide the service with reasonable skill and care, and that we have the right to provide it to your school.",
      "Beyond that, the platform is provided as it is. We do not warrant that it will be uninterrupted or error free, and we do not warrant that using Potto will prevent any particular incident. Potto supports a school's safeguarding; it does not guarantee outcomes.",
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      "Neither of us excludes liability for death or personal injury caused by negligence, for fraud, or for anything else the law does not allow to be limited.",
      "Subject to that, neither of us is liable for indirect or consequential loss, or for loss of profit, revenue, goodwill or anticipated savings.",
      // {
      //   confirm:
      //     "The cap on Potto's total liability — usually expressed as the fees paid over a defined preceding period. This is a decision for management and counsel, and the figure must not be guessed.",
      // },
    ],
  },
  {
    heading: "Indemnity",
    blocks: [
      "Your school will indemnify Potto against claims arising from records it entered into the platform without a lawful basis or the necessary parental consent, and from use of the platform in breach of the acceptable use section.",
    ],
  },
  {
    heading: "Force majeure",
    blocks: [
      "Neither of us is in breach for a delay or failure caused by something outside our reasonable control, including power and network failure, industrial action, government action or natural events. If such an event continues for a long period, either of us may end the agreement.",
      // {
      //   confirm:
      //     "How long a force majeure event must continue before either party may terminate.",
      // },
    ],
  },
  {
    heading: "Changes to these terms",
    blocks: [
      "We may update these terms as the platform and the law change. We will tell subscribing schools about material changes, and the revision date at the top of this page shows when it last changed. Changes do not apply retrospectively to a term already paid for.",
    ],
  },
  {
    heading: "Governing law and disputes",
    blocks: [
      "These terms are governed by the laws of the Federal Republic of Nigeria.",
      "If a dispute arises, we will both try in good faith to resolve it by discussion first.",
      // {
      //   confirm:
      //     "Whether unresolved disputes go to the courts (and if so, which state's) or to arbitration, and where any arbitration would be seated.",
      // },
    ],
  },
  {
    heading: "How to reach us",
    blocks: [
      "Potto, House 83 Coal City Gardens, Behind Central Bank of Nigeria, Okpara Avenue, Enugu.",
      "Email Info@potto.ng for general enquiries or support@potto.ng for help with the platform. By phone: +234 808 472 4276 or +234 812 557 8825.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms"
      title="Terms and Conditions"
      updated={UPDATED}
      intro={[
        "These terms set out what your school gets when it subscribes to Potto, what we each agree to do, and what happens if something goes wrong.",
        "They are written to be read rather than skimmed past. If anything here is unclear, ask us before you subscribe.",
      ]}
      sections={SECTIONS}
    />
  );
}
