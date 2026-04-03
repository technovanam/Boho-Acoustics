export type CaseStudyItem = {
  slug: string;
  city: string;
  state: string;
  title: string;
  service: string;
  problem: string;
  solution: string;
  result: string;
  before: string[];
  after: string[];
};

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    slug: "mumbai-home-theatre-project",
    city: "Mumbai",
    state: "Maharashtra",
    title: "Mumbai Home Theatre Project",
    service: "Home Theatre Acoustics",
    problem:
      "A premium apartment media room suffered from boomy bass, unclear dialogue, and inconsistent surround imaging across seating positions.",
    solution:
      "We redesigned the room with staged low-frequency control, first-reflection treatment, and calibrated speaker/listener alignment integrated into the interior plan.",
    result:
      "Dialogue intelligibility improved significantly, bass response became controlled across seats, and the client achieved immersive cinema-grade playback without compromising aesthetics.",
    before: [
      "Voices sounded muffled during film playback.",
      "Bass varied drastically between seats.",
      "Long listening sessions caused fatigue.",
    ],
    after: [
      "Dialogue became crisp and centered.",
      "Low-end response became balanced and predictable.",
      "The room delivered consistent cinematic immersion.",
    ],
  },
  {
    slug: "pune-office-soundproofing",
    city: "Pune",
    state: "Maharashtra",
    title: "Pune Office Soundproofing",
    service: "Soundproofing Services",
    problem:
      "An open-plan office reported speech spill, poor meeting privacy, and persistent external noise affecting productivity.",
    solution:
      "We implemented acoustic zoning, ceiling absorption, interface sealing, and conference room speech-clarity corrections with phased execution.",
    result:
      "Collaboration remained active while distraction reduced substantially, meeting quality improved, and leadership reported better productivity consistency.",
    before: [
      "Cross-team speech spill caused constant distraction.",
      "Client calls in meeting rooms had echo.",
      "Teams experienced cognitive fatigue in long work blocks.",
    ],
    after: [
      "Focused zones became quieter and more usable.",
      "Meeting rooms gained speech clarity for hybrid calls.",
      "Overall workspace comfort and output improved.",
    ],
  },
  {
    slug: "bangalore-studio-acoustics",
    city: "Bangalore",
    state: "Karnataka",
    title: "Bangalore Studio Acoustics",
    service: "Acoustic Consultant",
    problem:
      "A content production studio had severe room coloration, poor vocal capture consistency, and unreliable low-end monitoring.",
    solution:
      "We deployed broadband treatment at critical reflection points, low-frequency control in modal zones, and vocal capture optimization around the recording chain.",
    result:
      "Monitoring translation improved, editing quality stabilized, and the creator team reduced rework cycles during publishing.",
    before: [
      "Recorded vocals required heavy correction.",
      "Mixes sounded different across devices.",
      "Studio decisions were inconsistent session to session.",
    ],
    after: [
      "Cleaner source recordings reduced post-processing load.",
      "Monitoring confidence improved for final exports.",
      "Production workflow became faster and more predictable.",
    ],
  },
  {
    slug: "chennai-residential-acoustics",
    city: "Chennai",
    state: "Tamil Nadu",
    title: "Chennai Residential Acoustics",
    service: "Soundproofing Services",
    problem:
      "A family home experienced street-noise intrusion, room-to-room transfer, and echo in modern hard-surface interiors.",
    solution:
      "We designed a mixed strategy of leak-path sealing, selective boundary reinforcement, and interior reflection control tailored to daily home usage.",
    result:
      "The home became acoustically calmer, sleep quality improved in bedrooms, and living spaces delivered better speech comfort.",
    before: [
      "Traffic noise interrupted late-evening routines.",
      "Bedroom privacy was poor.",
      "Living room conversations sounded harsh.",
    ],
    after: [
      "Noise intrusion reduced to manageable levels.",
      "Private zones felt significantly quieter.",
      "Shared spaces became more comfortable for family use.",
    ],
  },
  {
    slug: "hyderabad-workspace-noise-control",
    city: "Hyderabad",
    state: "Telangana",
    title: "Hyderabad Workspace Noise Control",
    service: "Acoustic Consultant",
    problem:
      "A rapidly scaling workspace had poor focus conditions, low call clarity, and no acoustic strategy for mixed activity teams.",
    solution:
      "We introduced activity-based acoustic planning, corrected speech-critical rooms, and implemented scalable standards for future floor expansion.",
    result:
      "The client gained a repeatable acoustic framework, improved team communication quality, and reduced complaint rates across departments.",
    before: [
      "Work areas had frequent interruption spikes.",
      "Remote call quality was inconsistent.",
      "No standardized acoustic policy existed.",
    ],
    after: [
      "Noise behavior became predictable by zone.",
      "Calls became clearer and less fatiguing.",
      "Expansion-ready standards were established.",
    ],
  },
];
