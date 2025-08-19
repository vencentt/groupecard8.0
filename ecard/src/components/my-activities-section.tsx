"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 定义活动类型
interface Activity {
  id: string;
  employeeName: string;
  createdAt: string;
  status: "collecting" | "completed";
}

export function MyActivitiesSection() {
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
        
        // 只显示最近的3个活动
        setActivities(formattedActivities.slice(0, 3));
      } catch (error) {
        console.error("Failed to load activities:", error);
        
        // 如果API调用失败，尝试从localStorage加载
        try {
          const storedActivities = localStorage.getItem("workAnniversaryActivities");
          if (storedActivities) {
            const parsedActivities = JSON.parse(storedActivities);
            setActivities(parsedActivities.slice(0, 3));
          }
        } catch (localError) {
          console.error("Failed to load activities from localStorage:", localError);
        }
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Activities</CardTitle>
        <CardDescription>View your previously created celebrations</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Loading your activities...</p>
            </div>
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{activity.employeeName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created on {formatDate(activity.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeClass(
                      activity.status
                    )}`}
                  >
                    {activity.status === "collecting" ? "Collecting" : "Completed"}
                  </span>
                  <Link
                    href={`${activity.status === "collecting" ? `/manage/${activity.id}` : `/celebration/${activity.id}`}`}
                  >
                    <Button variant="outline" size="sm">
                      {activity.status === "collecting" ? "Manage" : "View"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Link href="/my-activities">
                <Button variant="outline">View All Activities</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Your created celebrations will appear here</p>
            <Link href="/create">
              <Button variant="outline">Create Your First Celebration</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}