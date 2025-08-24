"use client";

import { WishCard } from "./wish-card";
import { CardHeader } from "./card-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Download, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// 类型定义
interface Celebrant {
  name: string;
  years: number;
  department: string;
  celebrationDate: string;
}

interface Initiator {
  name: string;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  isInitiator: boolean;
  createdAt: string;
}

interface CelebrationViewProps {
  celebrationId: string;
  celebrant: Celebrant;
  initiator: Initiator;
  wishes: Wish[];
  showBackButton?: boolean;
  isPreview?: boolean; // 添加预览模式标志
}

export default function CelebrationView({ 
  celebrationId, 
  celebrant, 
  initiator, 
  wishes,
  showBackButton = false,
  isPreview = false // 默认非预览模式
}: CelebrationViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // 处理分享功能
  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    // 检查浏览器是否支持Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${celebrant.name}'s Work Anniversary Celebration`,
          text: `Join me in celebrating ${celebrant.name}'s ${celebrant.years} year work anniversary!`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // 如果不支持Web Share API，则复制链接到剪贴板
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* 返回按钮 */}
      {showBackButton && (
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/manage/${celebrationId}`)}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Management
          </Button>
        </div>
      )}
      
      {/* 贺卡头部 */}
      <h1 className="sr-only">{celebrant.name}'s {celebrant.years} Year Work Anniversary Celebration</h1>
      <CardHeader 
        title={`Happy ${celebrant.years}${getOrdinalSuffix(celebrant.years)} Work Anniversary!`}
        description={`Celebrating ${celebrant.name} from ${initiator.name} on ${formatDate(celebrant.celebrationDate)}`}
      />
      
      
      {/* 祝福墙 */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Wishes From Your Colleagues</h2>
        <div className="space-y-4">
          {wishes.map((wish) => (
            <WishCard
              key={wish.id}
              name={wish.name}
              message={wish.message}
              isInitiator={wish.isInitiator}
              createdAt={wish.createdAt}
            />
          ))}
        </div>
      </div>
      
      {/* 分享部分 - 仅在非预览模式下显示 */}
      {!isPreview && (
        <div className="border-t pt-8 mt-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-2">Share This Celebration</h3>
            <p className="text-muted-foreground mb-4">Share this celebration with {celebrant.name} or other colleagues</p>
            
            <div className="space-y-4">
              {/* 复制链接按钮 */}
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link Copied!",
                    description: "Celebration link has been copied to clipboard.",
                  });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
                Copy Link to Share with {celebrant.name}
              </Button>
              
              {/* 社交媒体分享按钮 */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Share on Social Media</p>
                <div className="grid grid-cols-3 gap-2">
                  {/* Twitter/X 分享 */}
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => {
                      const text = `Join me in celebrating ${celebrant.name}'s ${celebrant.years} year work anniversary!`;
                      const url = window.location.href;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </Button>
                  
                  {/* Facebook 分享 */}
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                    </svg>
                  </Button>
                  
                  {/* LinkedIn 分享 */}
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => {
                      const url = window.location.href;
                      const title = `${celebrant.name}'s Work Anniversary Celebration`;
                      const summary = `Join me in celebrating ${celebrant.name}'s ${celebrant.years} year work anniversary!`;
                      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`, '_blank');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Button>
                </div>
              </div>
              
              {/* 删除了通用分享按钮 */}
            </div>
          </div>
        </div>
      )}
      
      {/* 底部信息 */}
      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>Created with ❤️ by {initiator.name}</p>
      </div>
    </div>
  );
}

// 获取序数后缀的辅助函数
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}