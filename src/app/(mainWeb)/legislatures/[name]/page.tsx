import LegislatorProfileComp from "@/components/layouts/legislature/legislator-profile";
import { Metadata } from "next";
export interface ParamProp {
  params: {
    name: string;
  };
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: ParamProp): Promise<Metadata> {
  return {
    title: `Legislator: ${params.name}`,
    description: `Profile page for legislator ${params.name}`,
  };
}

const LegislatorProfile = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Legislator Profile</h1>
      <LegislatorProfileComp
        name={name}
      />
    </main>
  );
};

export default LegislatorProfile;