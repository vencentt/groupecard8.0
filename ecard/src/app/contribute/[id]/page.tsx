import { Metadata } from "next";
import ContributeForm from "@/components/contribute/contribute-form";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Contribute to Work Anniversary Card",
  description: "Add your wishes to a colleague's work anniversary card",
};

export default function ContributePage({ params }: { params: { id: string } }) {
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Add Your Work Anniversary Wishes</h1>
        <p className="text-muted-foreground">
          Share your congratulations for your colleague&apos;s work anniversary
        </p>
      </div>
      
      <ContributeForm cardId={params.id} />
    </div>
  );
}