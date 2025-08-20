"use client";

import { Metadata } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// 定义活动类型
interface Activity {
  id: string;
  employeeName: string;
  createdAt: string;
  status: "collecting" | "completed";
}

export default function MyActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从API和localStorage加载活动
    const loadActivities = async () => {
      try {
        // 从localStorage获取用户创建的贺卡ID列表
        const savedCardIds = JSON.parse(localStorage.getItem('userCreatedCards') || '[]');
        
        // 获取所有贺卡
        const response = await fetch('/api/cards');
        
        if (!response.ok) {
          throw new Error('获取活动失败');
        }
        
        const cardsData = await response.json();
        
        // 转换数据格式
        let formattedActivities = cardsData.map((card: any) => ({
          id: card.id,
          employeeName: card.title.split('的')[0], // 从标题中提取姓名
          createdAt: card.createdAt,
          status: card.status
        }));
        
        // 如果有本地存储的贺卡ID，只显示这些贺卡
        if (savedCardIds.length > 0) {
          formattedActivities = formattedActivities.filter((activity: Activity) => 
            savedCardIds.includes(activity.id)
          );
        }
        
        setActivities(formattedActivities);
      } catch (error) {
        console.error("Failed to load activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // 获取状态标签样式
  const getStatusBadgeClass = (status: string) => {
    return status === "collecting"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mt-4">My Work Anniversary Activities</h1>
        <p className="text-muted-foreground">View and manage your created celebrations</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <p className="text-muted-foreground">Loading your activities...</p>
          </div>
        </div>
      ) : activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{activity.employeeName}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeClass(
                      activity.status
                    )}`}
                  >
                    {activity.status === "collecting" ? "Collecting" : "Completed"}
                  </span>
                </div>
                <CardDescription>Created on {formatDate(activity.createdAt)}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col gap-2">
                <div className="grid grid-cols-1 gap-4 w-full">
                  <div className="flex flex-col">
                    <Link href={`/share/${activity.id}`} className="w-full">
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-primary bg-white shadow-sm py-6 hover:bg-gray-50"
                      >
                        Share & Preview
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      Invite colleagues, share links and preview celebration
                    </p>
                  </div>
                
                  <div className="flex flex-col">
                    <Link 
                      href={`${activity.status === "collecting" ? `/manage/${activity.id}` : `/celebration/${activity.id}`}`} 
                      className="w-full"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-primary bg-white shadow-sm py-6 hover:bg-gray-50"
                      >
                        {activity.status === "collecting" ? "Manage" : "View Details"}
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      {activity.status === "collecting" 
                        ? "Edit recipient info, manage wishes and collection process" 
                        : "View collected wishes and celebration details"}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-6">You haven&apos;t created any celebrations yet</p>
            <Link href="/create">
              <Button>Create Your First Celebration</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </main>
  );
}