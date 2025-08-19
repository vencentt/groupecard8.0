"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Share2, Mail, Download } from "lucide-react";

interface ShareSectionProps {
  celebrationId: string;
  celebrantName: string;
  years: number;
}

export function ShareSection({ celebrationId, celebrantName, years }: ShareSectionProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // 处理邮件发送
  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email Sent!",
        description: "The celebration card has been sent to your email.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "There was an error sending the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  // 处理分享
  const handleShare = async () => {
    // 检查浏览器是否支持Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${celebrantName}'s Work Anniversary Celebration`,
          text: `Join me in celebrating ${celebrantName}'s ${years} year work anniversary!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // 如果不支持Web Share API，则复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard.",
      });
    }
  };
  
  // 处理下载
  const handleDownload = () => {
    // 这里应该实现下载功能，但在MVP阶段可能只是一个占位功能
    toast({
      title: "Download Started",
      description: "Your celebration card is being prepared for download.",
    });
  };

  return (
    <div className="space-y-6">
      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      
      {/* 邮件发送表单 */}
      <Card>
        <CardHeader>
          <CardTitle>Receive a Copy</CardTitle>
          <CardDescription>
            Enter your email to receive a copy of this celebration card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSendEmail} disabled={isSending}>
              {isSending ? (
                <>Sending...</>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          We will only use your email to send this celebration card.
        </CardFooter>
      </Card>
    </div>
  );
}