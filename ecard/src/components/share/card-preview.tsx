"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, CopyIcon, Share2Icon, UserPlusIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CardPreviewProps {
  id: string;
  employeeName: string;
  status: "collecting" | "completed";
  wishesCount: number;
}

export default function CardPreview({ id, employeeName, status, wishesCount }: CardPreviewProps) {
  const router = useRouter();
  
  // 生成链接
  const contributeLink = typeof window !== "undefined" 
    ? `${window.location.origin}/contribute/${id}`
    : `/contribute/${id}`;
  const celebrationLink = typeof window !== "undefined"
    ? `${window.location.origin}/celebration/${id}`
    : `/celebration/${id}`;
  
  // 当前应该使用的链接
  const currentLink = status === "collecting" ? contributeLink : celebrationLink;
  
  // 复制链接到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Link Copied",
          description: "Link has been copied to clipboard",
        });
      },
      (err) => {
        console.error("无法复制链接: ", err);
        toast({
          title: "Copy Failed",
          description: "Unable to copy link, please copy manually",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {employeeName}'s {status === "collecting" ? "Wishes Collection" : "Celebration Page"} Preview
        </CardTitle>
        <CardDescription>
          {status === "collecting" 
            ? `Collected ${wishesCount} wishes, invite more colleagues to participate`
            : `Collected ${wishesCount} wishes total, ready to share with the celebrant`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-6 rounded-lg mb-4 flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="text-xl font-bold mb-2">
            {employeeName}'s Work Anniversary
          </h3>
          <p className="text-muted-foreground mb-4 text-center">
            {status === "collecting" 
              ? "Collection in progress, click preview to see current status" 
              : "Collection completed, click preview to see final result"}
          </p>
          <Button onClick={() => router.push(`/celebration/${id}?preview=true`)}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}