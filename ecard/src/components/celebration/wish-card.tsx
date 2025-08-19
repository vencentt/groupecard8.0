import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface WishCardProps {
  name: string;
  message: string;
  isInitiator: boolean;
  createdAt: string;
}

export function WishCard({ name, message, isInitiator, createdAt }: WishCardProps) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className={isInitiator ? "border-primary" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {name}
          {isInitiator && (
            <span className="text-primary inline-flex items-center">
              <Star className="h-4 w-4 fill-primary" />
              <span className="text-xs ml-1">Initiator</span>
            </span>
          )}
        </CardTitle>
        <CardDescription>{formatDate(createdAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
}