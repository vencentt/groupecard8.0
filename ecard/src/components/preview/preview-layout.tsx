"use client";

import { EyeIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
                onClick={() => {
                  // 生成最终链接并跳转
                  router.push(`/celebration/${celebrationId}?final=true`);
                }}
                variant="outline"
              >
                Generate Final Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}