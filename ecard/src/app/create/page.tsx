"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessView from "@/components/create/success-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

// 定义表单数据类型
interface FormData {
  employeeName: string;
  anniversaryYear: number;
  celebrationDate: Date | undefined;
  initiatorName: string;
  wishContent: string;
  initiatorEmail?: string;
  recipientEmail?: string;
  deadlineDate?: Date;
}

export default function CreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [createdCardId, setCreatedCardId] = useState<string | null>(null);
  const [createdEmployeeName, setCreatedEmployeeName] = useState<string>("");
  
  // 初始化表单数据
  const [formData, setFormData] = useState<FormData>({
    employeeName: "",
    anniversaryYear: 1,
    celebrationDate: undefined,
    initiatorName: "",
    wishContent: "",
    initiatorEmail: "",
    recipientEmail: "",
    deadlineDate: undefined,
  });

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 处理数字输入变化
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 100) {
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  };

  // 处理日期变化
  const handleDateChange = (date: Date | undefined, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date,
    }));
  };

  // 设置默认截止日期（庆祝日期前一天）
  const setDefaultDeadline = () => {
    if (formData.celebrationDate) {
      const deadlineDate = new Date(formData.celebrationDate);
      deadlineDate.setDate(deadlineDate.getDate() - 1);
      setFormData((prev) => ({
        ...prev,
        deadlineDate,
      }));
    }
  };

  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 验证必填字段
      if (!formData.employeeName || !formData.anniversaryYear || !formData.celebrationDate || 
          !formData.initiatorName || !formData.wishContent) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
        setIsSubmitting(false);
        return;
      }

      // 创建贺卡
      const cardResponse = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${formData.employeeName}的${formData.anniversaryYear}周年庆祝`,
          description: `为${formData.employeeName}庆祝${formData.anniversaryYear}年工作周年`,
          recipientName: formData.employeeName,
          senderName: formData.initiatorName,
          celebrationDate: formData.celebrationDate,
        }),
      });

      if (!cardResponse.ok) {
        throw new Error('创建贺卡失败');
      }

      const cardData = await cardResponse.json();
      
      // 创建第一个参与者（发起人）
      const participationResponse = await fetch(`/api/cards/${cardData.id}/participations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantName: formData.initiatorName,
          participantEmail: formData.initiatorEmail,
          status: 'contributed',
        }),
      });

      if (!participationResponse.ok) {
        throw new Error('创建参与者失败');
      }

      const participationData = await participationResponse.json();
      
      // 创建第一条祝福（发起人的祝福）
      const wishResponse = await fetch(`/api/cards/${cardData.id}/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: formData.wishContent,
          participantName: formData.initiatorName,
          participantEmail: formData.initiatorEmail,
        }),
      });

      if (!wishResponse.ok) {
        throw new Error('创建祝福失败');
      }
      
      // 将贺卡ID保存到localStorage中
      try {
        // 获取现有的贺卡ID列表
        const savedCardIds = JSON.parse(localStorage.getItem('userCreatedCards') || '[]');
        
        // 添加新创建的贺卡ID
        if (!savedCardIds.includes(cardData.id)) {
          savedCardIds.push(cardData.id);
          localStorage.setItem('userCreatedCards', JSON.stringify(savedCardIds));
        }
      } catch (error) {
        console.error('保存贺卡ID到localStorage失败:', error);
        // 继续执行，不影响主流程
      }
      
      // 显示成功消息
      toast({
        title: "Celebration Created!",
        description: "You can now share the link to invite colleagues",
      });
      
      // 设置创建成功状态，显示成功视图
      setCreatedCardId(cardData.id);
      setCreatedEmployeeName(formData.employeeName);
    } catch (error) {
      console.error("提交表单时出错:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while creating the celebration, please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 如果已创建卡片，显示成功视图
  if (createdCardId) {
    return <SuccessView id={createdCardId} employeeName={createdEmployeeName} />;
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Work Anniversary Messages & Cards</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Fill in the basic information and your wishes here. After creation, you'll get a shareable link.
      </p>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create New Celebration</CardTitle>
            <CardDescription>
              Fill in the information below to create a new work anniversary celebration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="basic">Basic Info (Required)</TabsTrigger>
                <TabsTrigger value="optional">Optional Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employeeName">Employee Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      placeholder="Enter the employee's full name"
                      value={formData.employeeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="anniversaryYear">Anniversary Year <span className="text-red-500">*</span></Label>
                    <Input
                      id="anniversaryYear"
                      name="anniversaryYear"
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Enter which work anniversary (e.g. 1-30)"
                      value={formData.anniversaryYear}
                      onChange={handleNumberChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="celebrationDate">Celebration Date <span className="text-red-500">*</span></Label>
                    <DatePicker
                      date={formData.celebrationDate}
                      setDate={(date) => {
                        handleDateChange(date, "celebrationDate");
                        // Set default deadline to one day before celebration date
                        if (date) {
                          const deadlineDate = new Date(date);
                          deadlineDate.setDate(deadlineDate.getDate() - 1);
                          handleDateChange(deadlineDate, "deadlineDate");
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="initiatorName">Your Name/Nickname <span className="text-red-500">*</span></Label>
                    <Input
                      id="initiatorName"
                      name="initiatorName"
                      placeholder="Enter your name or nickname"
                      value={formData.initiatorName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="wishContent">Your Wishes <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="wishContent"
                      name="wishContent"
                      placeholder="Enter your wishes for your colleague"
                      value={formData.wishContent}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="optional" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="initiatorEmail">
                      Your Email <span className="text-muted-foreground text-sm">(Optional, for progress updates)</span>
                    </Label>
                    <Input
                      id="initiatorEmail"
                      name="initiatorEmail"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.initiatorEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recipientEmail">
                      Recipient Email <span className="text-muted-foreground text-sm">(Optional, for automatic sending)</span>
                    </Label>
                    <Input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      placeholder="Enter the employee's email address"
                      value={formData.recipientEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="deadlineDate">
                      Deadline Date <span className="text-muted-foreground text-sm">(Optional, default is 1 day before celebration)</span>
                    </Label>
                    <DatePicker
                      date={formData.deadlineDate}
                      setDate={(date) => handleDateChange(date, "deadlineDate")}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Card"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}