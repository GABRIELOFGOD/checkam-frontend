export interface BillType {
  id: string;
  image?: string;
  title: string;
  summary: string;
  file: string;
  category: Category,
  stage: BillStage
}

export enum Category {
  DEVELOPMENT = "development",
  HEALTH = "health",
  EDUCATION = "education"
}

export enum BillStage {
  FIRST_READING = "first-reading",
  SECOND_READING = "second-reading",
  PASSED = "passed"
}

export const bills: BillType[] = [
  {
    id: "4567-gmdfvujb-535bb",
    image: "/images/education.png",
    title: "Education reform bill",
    summary: "This bill aims to improve the quality of education in Osun State by increasing funding for schools, providing better training for teachers, and updating the curriculum to meet modern standards.",
    file: "/documents/example.pdf",
    category: Category.EDUCATION,
    stage: BillStage.FIRST_READING
  },
  {
    id: "4567-gmdfvujb-9876h",
    image: "/images/health.png",
    title: "Healthcare Improvement Bill",
    summary: "This bill seeks to enhance healthcare services in Osun State by establishing new clinics in underserved areas, upgrading existing hospitals, and ensuring access to affordable medication for all citizens.",
    file: "/documents/example.pdf",
    category: Category.HEALTH,
    stage: BillStage.SECOND_READING
  },
  {
    id: "4567-vhjgdf7-bvjdd76",
    image: "/images/infrastructure.png",
    title: "Infrastructure Development Bill",
    summary: "This bill focuses on improving infrastructure in Osun State by constructing new roads, repairing existing ones, and ensuring access to clean water and electricity for all communities.",
    file: "/documents/example.pdf",
    category: Category.DEVELOPMENT,
    stage: BillStage.PASSED
  }
]