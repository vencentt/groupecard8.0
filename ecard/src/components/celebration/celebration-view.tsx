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
}

export default function CelebrationView({ 
  celebrationId, 
  celebrant, 
  initiator, 
  wishes 
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

  return (
    <div className="space-y-8">
      {/* 贺卡头部 */}
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
      
      {/* 邮件收集表单 */}
      <div className="border-t pt-8 mt-8">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">Receive a Copy</h3>
          <p className="text-muted-foreground mb-4">Enter your email to receive a copy of this celebration card</p>
          
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your.email@example.com"
              className="flex-1"
            />
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            We will only use your email to send this celebration card.
          </p>
        </div>
      </div>
      
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