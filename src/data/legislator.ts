export interface LegislatorType {
  name: string;
  image?: string;
  constituency: Constituencies;
  office: LegislativeOffice
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
    office: LegislativeOffice.CHIEF_WHIP
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
    }
  },
  {
    name: "Hon. Olawale Oladipupo Akerele",
    image: "/images/olawale.jpg",
    constituency: Constituencies.IFE_NORTH,
    office: LegislativeOffice.SPEAKER,
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
    }
  }
]
