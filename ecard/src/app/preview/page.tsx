import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Star } from "lucide-react";
import { CardHeader as CelebrationCardHeader } from "@/components/celebration/card-header";

export const metadata: Metadata = {
  title: "Preview Work Anniversary Card | Happy Work Anniversary",
  description: "Preview our beautiful work anniversary cards before creating your own celebration. See how our digital cards look with personalized messages.",
};

// 示例祝福数据
const exampleWishes = [
  {
    id: "1",
    name: "Sarah Johnson",
    message: "Congratulations on your 5th work anniversary! Your dedication and hard work have been an inspiration to all of us. Thank you for your valuable contributions to our team.",
    isInitiator: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Michael Chen",
    message: "Five years of excellence! It's been a pleasure working with you. Your positive attitude and problem-solving skills have made a significant impact on our projects.",
    isInitiator: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    message: "Happy work anniversary! Your creativity and commitment have been instrumental to our success. Looking forward to many more years of collaboration!",
    isInitiator: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "David Thompson",
    message: "Congratulations on this milestone! Your leadership and expertise have helped us overcome numerous challenges. Thank you for being such a valuable team member.",
    isInitiator: false,
    createdAt: new Date().toISOString(),
  },
];

export default function PreviewPage() {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

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

  const years = 5;

  return (
    <main className="min-h-screen">
      {/* 预览模式标识条 */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 flex items-center justify-center mb-8">
        <p className="text-yellow-800 font-medium">
          Preview Example
        </p>
        <p className="text-yellow-700 ml-2">
          This is an example of a work anniversary celebration card. Create your own to customize it!
        </p>
      </div>
      
      <div className="container max-w-4xl py-4 mx-auto">
        <div className="space-y-8">
          {/* 贺卡头部 */}
          <h1 className="sr-only">Alex Morgan's 5 Year Work Anniversary Celebration</h1>
          <CelebrationCardHeader 
            title={`Happy ${years}${getOrdinalSuffix(years)} Work Anniversary!`}
            description={`Celebrating Alex Morgan from Marketing Team on ${formatDate(new Date().toISOString())}`}
          />
          
          {/* 祝福墙 */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Wishes From Your Colleagues</h2>
            <div className="space-y-4">
              {exampleWishes.map((wish) => (
                <Card key={wish.id} className={wish.isInitiator ? "border-primary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="text-lg flex items-center gap-2 font-medium">
                      {wish.name}
                      {wish.isInitiator && (
                        <span className="text-primary inline-flex items-center">
                          <Star className="h-4 w-4 fill-primary" />
                          <span className="text-xs ml-1">Initiator</span>
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{formatDate(wish.createdAt)}</div>
                  </CardHeader>
                  <CardContent>
                    <p>{wish.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* 预览页面不需要邮件收集表单 */}
          
          {/* 创建自己的卡片按钮 */}
          <div className="flex flex-col items-center justify-center py-8 border-t">
            <h3 className="text-xl font-bold mb-4">Ready to create your own celebration?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create">
                <Button size="lg" className="px-8">
                  Create Your Own
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="px-8">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
          
          {/* 底部信息 */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>Created with ❤️ by Happy Work Anniversary</p>
          </div>
        </div>
      </div>
    </main>
  );
}
