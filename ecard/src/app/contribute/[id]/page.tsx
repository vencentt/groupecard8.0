import { Metadata } from "next";
import ContributeForm from "@/components/contribute/contribute-form";
import { notFound } from "next/navigation";

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  return {
    title: "Add Work Anniversary Wishes | Happy work anniversary",
    description: "Share your personal message and wishes for a colleague's work anniversary celebration. Add your contribution to make their professional milestone special.",
    keywords: "work anniversary wishes, work anniversary message, professional celebration",
    alternates: {
      canonical: `https://www.happyworkanniversary.net/contribute/${params.id}`,
    }
  };
}

export default function ContributePage({ params }: { params: { id: string } }) {
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Add Your Work Anniversary Wishes</h1>
        <p className="text-muted-foreground">
          Share your congratulations for your colleague&apos;s work anniversary
        </p>
      </div>
      
      <h2 className="sr-only">Work Anniversary Wishes Form</h2>
      
      <ContributeForm cardId={params.id} />
    </div>
  );
}