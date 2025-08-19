import { Card, CardContent } from "@/components/ui/card";

interface Wish {
  name: string;
  message: string;
}

interface WishesPreviewProps {
  wishes: Wish[];
  title?: string;
}

export function WishesPreview({ wishes, title = "Preview" }: WishesPreviewProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Card>
        <CardContent className="pt-6">
          {wishes.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No wishes have been added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <p className="font-semibold">{wish.name}</p>
                  <p className="text-muted-foreground">{wish.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}