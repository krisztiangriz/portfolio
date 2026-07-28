export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "project-alpha",
    title: "Project Alpha",
    summary:
      "A redesign of a complex enterprise dashboard focused on improving data visibility and user workflows.",
    sections: [
      {
        heading: "Overview",
        body: "Project Alpha involved rethinking a legacy enterprise dashboard used by 500+ internal users. The existing interface suffered from information overload and inconsistent navigation patterns.",
      },
      {
        heading: "Process",
        body: "We conducted stakeholder interviews, mapped existing workflows, and identified the top 5 pain points. From there, we iterated through wireframes and high-fidelity prototypes over a 6-week sprint.",
      },
      {
        heading: "Outcome",
        body: "The redesigned dashboard reduced average task completion time by 34% and received a satisfaction score of 4.6/5 in post-launch surveys.",
      },
    ],
  },
  {
    slug: "project-beta",
    title: "Project Beta",
    summary:
      "A mobile-first e-commerce experience designed to increase conversion rates for a fashion retailer.",
    sections: [
      {
        heading: "Overview",
        body: "Project Beta was a ground-up redesign of a fashion retailer's mobile shopping experience, targeting a 20% lift in mobile conversion.",
      },
      {
        heading: "Process",
        body: "We ran A/B tests on key flows (product discovery, cart, checkout), analyzed heatmaps, and redesigned the checkout to a single-page experience with progressive disclosure.",
      },
      {
        heading: "Outcome",
        body: "Mobile conversion increased by 27% within the first month post-launch, with cart abandonment dropping by 15%.",
      },
    ],
  },
  {
    slug: "project-gamma",
    title: "Project Gamma",
    summary:
      "A design system built from scratch to unify a suite of B2B SaaS products under a single visual language.",
    sections: [
      {
        heading: "Overview",
        body: "Project Gamma addressed fragmentation across 4 B2B products that had evolved independently, each with its own component library and design patterns.",
      },
      {
        heading: "Process",
        body: "We audited all existing components, identified overlaps and gaps, and created a unified token system, component library, and documentation site. The system was built in Figma and coded in React.",
      },
      {
        heading: "Outcome",
        body: "Design-to-development handoff time decreased by 40%. The system now serves 3 product teams and 12 designers.",
      },
    ],
  },
  {
    slug: "project-delta",
    title: "Project Delta",
    summary:
      "A user onboarding flow redesign that improved activation rates for a productivity SaaS tool.",
    sections: [
      {
        heading: "Overview",
        body: "Project Delta tackled a critical drop-off in the onboarding funnel of a productivity SaaS tool. Only 30% of signups completed setup.",
      },
      {
        heading: "Process",
        body: "We mapped the existing funnel, identified the 3 highest-friction steps, and redesigned them with progressive onboarding, contextual tooltips, and a streamlined setup wizard.",
      },
      {
        heading: "Outcome",
        body: "Setup completion rose from 30% to 58%. Time-to-first-value decreased by 3 days on average.",
      },
    ],
  },
];
