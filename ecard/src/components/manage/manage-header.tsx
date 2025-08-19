"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ManageHeaderProps {
  recipientName: string;
  occasion: string;
  deadline: string;
}

export function ManageHeader({ recipientName, occasion, deadline }: ManageHeaderProps) {
  return (
    <Card>
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{recipientName}</h1>
            <p className="text-muted-foreground">
              {occasion || "Work Anniversary"} Celebration
            </p>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <p className="text-sm text-muted-foreground">Deadline</p>
            <p className="font-medium">{new Date(deadline).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}