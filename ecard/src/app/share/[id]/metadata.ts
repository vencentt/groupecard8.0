import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  return {
    title: "Share Work Anniversary Card | Happy Work Anniversary",
    description: "Share your work anniversary card with colleagues to collect wishes and celebrate professional milestones together.",
    keywords: "share work anniversary card, work anniversary wishes, work anniversary celebration",
    alternates: {
      canonical: `https://www.happyworkanniversary.net/share/${params.id}`,
    }
  };
}
