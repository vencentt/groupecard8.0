"use client";

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CopyIcon, EyeIcon, InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardPreview from "@/components/share/card-preview";

interface SharePageProps {
  params: {
    id: string;
  };
}

interface SavedCard {
  id: string;
  employeeName: string;
  createdAt: string;
  status: "collecting" | "completed";
}

export default function SharePage({ params }: SharePageProps) {
  const { id } = params;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("link");
  const [savedCard, setSavedCard] = useState<SavedCard | null>(null);
  const [wishes, setWishes] = useState<number>(0); // 模拟已收集的祝福数量
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  // 生成链接
  const contributeLink = typeof window !== "undefined" 
    ? `${window.location.origin}/contribute/${id}`
    : `/contribute/${id}`;
  const celebrationLink = typeof window !== "undefined"
    ? `${window.location.origin}/celebration/${id}`
    : `/celebration/${id}`;

  // 从API加载数据
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        // 获取贺卡数据
        const cardResponse = await fetch(`/api/cards/${id}`);
        if (!cardResponse.ok) {
          throw new Error('获取贺卡数据失败');
        }
        const card = await cardResponse.json();
        
        // 获取祝福数据
        const wishesResponse = await fetch(`/api/cards/${id}/wishes`);
        if (!wishesResponse.ok) {
          throw new Error('获取祝福数据失败');
        }
        const wishes = await wishesResponse.json();
        
        setSavedCard({
          id: card.id,
          employeeName: card.title.split('的')[0], // 从标题中提取姓名
          createdAt: card.createdAt,
          status: card.status
        });
        
        setWishes(wishes.length);
      } catch (error) {
        console.error('获取数据失败:', error);
        toast({
          title: "数据加载失败",
          description: "无法加载贺卡数据，请稍后再试",
          variant: "destructive",
        });
        router.push("/");
      }
    };
    
    fetchCardData();
  }, [id, router, toast]);

  // 复制链接到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Link Copied",
          description: "Link has been copied to clipboard, ready to share with colleagues",
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

  // 完成收集，生成最终祝福页面
  const completeCollection = async () => {
    if (savedCard) {
      try {
        // 调用API更新贺卡状态
        const response = await fetch(`/api/cards/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'completed'
          }),
        });
        
        if (!response.ok) {
          throw new Error('更新贺卡状态失败');
        }
        
        const updatedCard = await response.json();
        
        // 显示成功消息
        toast({
          title: "Collection Completed",
          description: "You can now share the final celebration page",
        });
        
        // 更新当前卡片状态
        setSavedCard({ ...savedCard, status: "completed" });
      } catch (error) {
        console.error('完成收集失败:', error);
        toast({
          title: "操作失败",
          description: "无法完成收集，请稍后再试",
          variant: "destructive",
        });
      }
    }
  };

  if (!savedCard) {
    return <div className="container py-10 text-center">Loading...</div>;
  }

  return (
    <div className="container max-w-3xl py-10">
      {/* 顶部导航按钮 */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => router.push("/my-activities")}
        >
          Back to My Activities
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.push(`/manage/${id}`)}
        >
          Manage Collection
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        {savedCard.status === "collecting" ? "Share Work Anniversary Wishes Collection Link" : "Share Work Anniversary Celebration Page"}
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        {savedCard.status === "collecting" 
          ? "Invite colleagues to add wishes for " + savedCard.employeeName 
          : "Share " + savedCard.employeeName + "'s final celebration page"}
      </p>

      {/* 卡片预览组件 */}
      <div className="mb-6">
        <CardPreview 
          id={id}
          employeeName={savedCard.employeeName}
          status={savedCard.status}
          wishesCount={wishes}
        />
      </div>

      {/* 分享链接区域 - 主要功能 */}
      <div className="mt-8 mb-6">
        <h2 className="text-lg font-medium mb-2">Share Link</h2>
        <p className="text-sm text-muted-foreground mb-3">Copy this link and share with colleagues to invite them to add wishes</p>
        
        <div className="flex gap-2 mb-4">
          <Input 
            value={contributeLink} 
            readOnly 
            className="flex-1"
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => copyToClipboard(contributeLink)}
            title="Copy link"
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => copyToClipboard(contributeLink)}
        >
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>


      {/* 底部操作区 - 次要功能 */}
      <div className="flex flex-col gap-4 mt-8 pt-4 border-t">
        {savedCard.status === "collecting" && (
          <Button 
            variant="default" 
            className="w-full" 
            onClick={() => setCompleteDialogOpen(true)}
          >
            Finalize & Lock Celebration
          </Button>
        )}
      </div>

      {/* 完成收集确认对话框 */}
      <Dialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Finalization</DialogTitle>
            <DialogDescription>
              Are you sure you want to finalize this celebration?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-start space-x-2 text-sm">
              <div className="flex-shrink-0 mt-0.5">
                <InfoIcon className="h-4 w-4 text-amber-500" />
              </div>
              <p>
                <strong>Important:</strong> Once finalized, you will no longer be able to edit or add wishes to this celebration.
              </p>
            </div>
            
            <div className="flex items-start space-x-2 text-sm">
              <div className="flex-shrink-0 mt-0.5">
                <InfoIcon className="h-4 w-4 text-blue-500" />
              </div>
              <p>
                <strong>Note:</strong> Before finalizing, you can continue to share the link to collect wishes.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={completeCollection}>
              Finalize Celebration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
