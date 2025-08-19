"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "@/hooks/use-toast";

interface CardData {
  id: string;
  recipientName: string;
  occasion: string;
  deadline: string;
  creatorEmail?: string;
}

interface CollectionSettingsProps {
  cardData: CardData;
  onUpdate: (updatedData: Partial<CardData>) => void;
}

export function CollectionSettings({ cardData, onUpdate }: CollectionSettingsProps) {
  const [recipientName, setRecipientName] = useState(cardData.recipientName || "");
  const [occasion, setOccasion] = useState(cardData.occasion || "Work Anniversary");
  const [deadline, setDeadline] = useState<Date | undefined>(
    cardData.deadline ? new Date(cardData.deadline) : undefined
  );
  const [creatorEmail, setCreatorEmail] = useState(cardData.creatorEmail || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    try {
      // 验证数据
      if (!recipientName) {
        toast({
          title: "验证错误",
          description: "收件人姓名不能为空",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // 准备更新数据
      const updatedData: Partial<CardData> = {
        recipientName,
        occasion,
        deadline: deadline ? deadline.toISOString() : cardData.deadline,
      };

      if (creatorEmail) {
        updatedData.creatorEmail = creatorEmail;
      }

      // 调用更新函数
      onUpdate(updatedData);
      
      toast({
        title: "设置已保存",
        description: "收集设置已成功更新",
      });
    } catch (error) {
      console.error("保存设置时出错:", error);
      toast({
        title: "保存失败",
        description: "无法保存设置，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Collection Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Enter recipient's name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Input
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g. Work Anniversary, Birthday"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Collection Deadline</Label>
            <DatePicker
              date={deadline}
              setDate={setDeadline}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="creatorEmail">Your Email (for notifications)</Label>
            <Input
              id="creatorEmail"
              type="email"
              value={creatorEmail}
              onChange={(e) => setCreatorEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}