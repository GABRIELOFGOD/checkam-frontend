export interface LegislatorType {
  name: string;
  image?: string;
  constituency: Constituencies;
  office: LegislativeOffice;
  bio?: string;
  socials?: {
    facebook?: string;
    linkedIn?: string;
    x?: string;
    mail?: string;
  }
}

export enum Constituencies {
  IFE_NORTH = "ife-north",
  IFE_SOUTH = "ife-south",
  OSOGBO = "osogbo",
  AKORAYE = 'akoraye',
  EDE = 'ede'
}

export enum LegislativeOffice {
  CHIEF_WHIP = "chief-whip",
  SPEAKER = "speaker",
  DEPUTY_SPEAKER = "deputy-speaker",
  MAJORITY_LEADER = "majority-leader",
  MINORITY_LEADER = "minority-leader",
  DEPUTY_MEJORIY_LEADER = "deputy-mejority-leader"
}

export const legislators: LegislatorType[] = [
  {
    name: "Hon. Afeez Abiodun Ibrahim",
    image: "/images/afeez.jpg",
    constituency: Constituencies.AKORAYE,
    office: LegislativeOffice.CHIEF_WHIP,
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Hon. Adekunle Emmanuel Oladimeji",
    image: "/images/adekunle.jpg",
    constituency: Constituencies.IFE_SOUTH,
    office: LegislativeOffice.DEPUTY_MEJORIY_LEADER,
    socials: {
      facebook: "#",
      linkedIn: "#",
      x: "#",
      mail: "#"
    },
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Hon. Olawale Oladipupo Akerele",
    image: "/images/olawale.jpg",
    constituency: Constituencies.IFE_NORTH,
    office: LegislativeOffice.SPEAKER,
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    socials: {
      facebook: "#",
      x: "#",
      mail: "#"
    }
  },
  {
    name: "Hon. Kofoworola Babajide Adewunmi",
    image: "/images/kofoworola.jpg",
    constituency: Constituencies.EDE,
    office: LegislativeOffice.MAJORITY_LEADER,
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    socials: {
      facebook: "#",
      x: "#",
    }
  },
  {
    name: "Hon. Akinyode Abidemi Oyewusi",
    image: "/images/Akinyode.jpg",
    constituency: Constituencies.IFE_NORTH,
    office: LegislativeOffice.DEPUTY_SPEAKER,
    socials: {
      facebook: "#",
      linkedIn: "#",
      x: "#",
      mail: "#"
    },
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
]
