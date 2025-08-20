"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CopyIcon, EyeIcon, Share2Icon, MailIcon } from "lucide-react";

interface SuccessViewProps {
  id: string;
  employeeName: string;
}

export default function SuccessView({ id, employeeName }: SuccessViewProps) {
  const router = useRouter();
  
  // 生成链接
  const contributeLink = typeof window !== "undefined" 
    ? `${window.location.origin}/contribute/${id}`
    : `/contribute/${id}`;
  
  // Copy link to clipboard
  const copyToClipboard = (text: string, e?: React.MouseEvent) => {
    // Prevent default behavior and event bubbling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Link Copied",
          description: "Invitation link has been copied to clipboard",
        });
      },
      (err) => {
        console.error("Failed to copy link: ", err);
        toast({
          title: "Copy Failed",
          description: "Unable to copy link, please copy manually",
          variant: "destructive",
        });
      }
    );
  };

  // Send link via email
  const sendEmail = () => {
    const subject = `Join ${employeeName}'s Work Anniversary Celebration`;
    const body = `Hello!\n\nI'm collecting anniversary wishes for ${employeeName} and would love your participation.\n\nPlease click the link below to add your wishes:\n${contributeLink}\n\nThank you!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">1</div>
              <div className="h-1 w-16 bg-primary"></div>
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">2</div>
              <div className="h-1 w-16 bg-primary"></div>
              <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center">3</div>
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Card Created Successfully!</CardTitle>
          <CardDescription className="text-center">
            Now you can invite colleagues to add wishes for {employeeName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 核心操作区域 - 突出显示 */}
          <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary/20">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
              Invite Colleagues to Add Wishes
            </h3>
            <p className="text-sm mb-4">Share this link to invite colleagues to add wishes for {employeeName}</p>
            
            {/* 链接输入框 - 没有复制按钮 */}
            <div className="mb-4">
              <Input 
                value={contributeLink} 
                readOnly 
                className="bg-white border-primary/30 focus:border-primary"
              />
            </div>
            
            {/* 主要复制按钮 - 突出显示 */}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              size="lg"
              type="button"
              onClick={(e) => copyToClipboard(contributeLink, e)}
            >
              <CopyIcon className="mr-2 h-5 w-5" />
              Copy Invitation Link
            </Button>
          </div>
          
          {/* 次要操作区域 - 分组显示 */}
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Other Sharing Options</h4>
            <Button 
              variant="outline" 
              className="w-full mb-2" 
              onClick={sendEmail}
            >
              <MailIcon className="mr-2 h-4 w-4" />
              Send via Email
            </Button>
          </div>
        </CardContent>
        
        {/* 辅助操作区域 - 视觉权重降低 */}
        <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
          <div className="w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => router.push("/my-activities")} className="w-full sm:w-auto">
              My Activities
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
            <Button variant="outline" size="sm" onClick={() => router.push(`/manage/${id}`)}>
              Manage Card
            </Button>
            <Button variant="secondary" size="sm" onClick={() => router.push(`/celebration/${id}`)}>
              <EyeIcon className="mr-2 h-4 w-4" />
              Preview Card
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}