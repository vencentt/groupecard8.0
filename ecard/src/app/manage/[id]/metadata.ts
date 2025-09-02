import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  return {
    title: "Manage Work Anniversary Card | Happy Work Anniversary",
    description: "Manage your work anniversary card, collect wishes from colleagues, and share the final celebration with the recipient.",
    keywords: "manage work anniversary, work anniversary wishes, work anniversary celebration",
    alternates: {
      canonical: `https://www.happyworkanniversary.net/manage/${params.id}`,
    }
  };
}
