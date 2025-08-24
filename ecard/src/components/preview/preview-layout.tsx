"use client";

import { EyeIcon, InfoIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PreviewLayoutProps {
  children: ReactNode;
  celebrationId: string;
}

/**
 * 预览模式布局组件
 * 在贺卡内容外围添加预览标识和操作按钮
 */
export default function PreviewLayout({ children, celebrationId }: PreviewLayoutProps) {
  const router = useRouter();
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* 预览模式标识条 - 顶部 */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-3 flex items-center justify-center sticky top-0 z-10">
        <EyeIcon className="h-5 w-5 text-yellow-600 mr-2" />
        <p className="text-yellow-800 font-medium">
          Preview Mode
        </p>
        <p className="text-yellow-700 ml-2">
          This is a preview of the final celebration page. The content may change when more wishes are collected.
        </p>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* 操作按钮栏 - 底部 */}
      <div className="bg-white border-t p-4 sticky bottom-0 z-10 shadow-md">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {/* 主要操作按钮组 */}
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  // 生成贡献链接
                  const contributeLink = typeof window !== "undefined" 
                    ? `${window.location.origin}/contribute/${celebrationId}`
                    : `/contribute/${celebrationId}`;
                    
                  router.push(contributeLink);
                }}
                variant="default"
              >
                Invite More People
              </Button>
              
              <Button 
                onClick={() => {
                  // 生成最终链接
                  const finalLink = typeof window !== "undefined" 
                    ? `${window.location.origin}/celebration/${celebrationId}`
                    : `/celebration/${celebrationId}`;
                    
                  navigator.clipboard.writeText(finalLink);
                  alert("Final link copied to clipboard");
                }}
                variant="default"
              >
                Share with Recipient
              </Button>
            </div>
            
            {/* 次要操作按钮组 */}
            <div className="flex gap-2">
              <Button 
                onClick={() => router.push(`/manage/${celebrationId}`)}
                variant="outline"
              >
                Back to Edit
              </Button>
              
              <Button 
                onClick={() => setCompleteDialogOpen(true)}
                variant="outline"
              >
                Finalize & Lock Celebration
              </Button>
            </div>
          </div>
        </div>
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
            <Button 
              variant="default" 
              onClick={() => {
                setCompleteDialogOpen(false);
                // 生成最终链接并跳转
                router.push(`/celebration/${celebrationId}?final=true`);
              }}
            >
              Finalize Celebration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
