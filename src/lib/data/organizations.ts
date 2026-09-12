export interface OrganizationItem {
  organization: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
}

export const organizationsData = {
  title: "Organizations",
  subtitle: "Leadership & Community Involvement",
  items: [
    {
      organization: "UMN Festival 2024",
      role: "Competition Committee",
      period: "March 2024 – December 2024",
      description: [
        "Enhanced engagement: Coordinated Valorant e-sports competition logistics, including game rules, scheduling, and participant communication via Discord, that resulted in a 30% increase in participant satisfaction."
      ],
      tags: ["Event Coordination", "E-sports", "Discord Management", "Communication"],
    },
    {
      organization: "MIP Awards 8",
      role: "Sponsorship Committee",
      period: "May 2024 – October 2024",
      description: [
        "Secured vital funding: Collaborated with the team on cold outreach to 10+ companies and pitches to responsive organizations, contributing to the team's acquisition of over 50 sponsorships for the event, including securing 5+ sponsorships."
      ],
      tags: ["Sponsorship", "Cold Outreach", "Pitching", "Fundraising"],
    },
    {
      organization: "Obscura Exhibition 2024",
      role: "Security Committee",
      period: "January 2024 - December 2024",
      description: [
        "Handled event rules, flow, and safety as a security team member to ensure smooth D-day operations."
      ],
      tags: ["Security", "Event Operations", "Crowd Control", "Logistics"],
    },
    {
      organization: "UMN ECO 2023",
      role: "Frontend Developer",
      period: "March 2023 – December 2023",
      description: [
        "Developed the front-end part for the organization's website using Laravel, PHP, Bootstrap and CSS, creating a more intuitive and engaging online platform increasing user engagement by 20%."
      ],
      tags: ["Frontend Development", "Laravel", "Bootstrap", "Web Design"],
    },
    {
      organization: "Tunas Bangsa Christian School",
      role: "Member of the Student Council (OSIS)",
      period: "February 2018 - March 2020",
      description: [
        "Served as a member of OSIS during Junior/Senior high school."
      ],
      tags: ["Student Council", "Event Organization", "Leadership"],
    }
  ] as OrganizationItem[],
};
