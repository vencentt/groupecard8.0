"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CopyIcon, Share2Icon, MailIcon } from "lucide-react";

interface ShareOptionsProps {
  cardId: string;
}

export function ShareOptions({ cardId }: ShareOptionsProps) {
  // 生成链接
  const contributeLink = typeof window !== "undefined" 
    ? `${window.location.origin}/contribute/${cardId}`
    : `/contribute/${cardId}`;

  // 复制链接到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "链接已复制",
          description: "链接已成功复制到剪贴板",
        });
      },
      (err) => {
        console.error("无法复制链接: ", err);
        toast({
          title: "复制失败",
          description: "无法复制内容，请手动复制",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Share this link with colleagues to collect wishes
      </p>
      <div className="relative">
        <Input 
          value={contributeLink} 
          readOnly 
          className="pr-12"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={() => copyToClipboard(contributeLink)}
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => copyToClipboard(contributeLink)}
        >
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "工作周年祝福",
                text: "请参与这个工作周年祝福",
                url: contributeLink,
              });
            } else {
              copyToClipboard(contributeLink);
            }
          }}
        >
          <Share2Icon className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}