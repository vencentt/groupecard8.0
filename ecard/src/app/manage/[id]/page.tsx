"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ParticipantsList } from "@/components/manage/participants-list";
import { CopyIcon, Share2Icon, MailIcon, EyeIcon, CheckCircleIcon, PencilIcon, SaveIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

interface Wish {
  id: string;
  name: string;
  message: string;
  email?: string;
  createdAt: string;
}

interface CardData {
  id: string;
  employeeName: string;
  createdAt: string;
  anniversaryDate?: string; // 周年时间
  anniversaryYear?: string; // 周年年份
  status: "collecting" | "completed";
  wishes: Wish[];
}

export default function ManagePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  
  // 内联编辑状态
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAnniversaryDate, setIsEditingAnniversaryDate] = useState(false);
  const [isEditingAnniversaryYear, setIsEditingAnniversaryYear] = useState(false);
  
  // 编辑内容临时存储
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editAnniversaryDate, setEditAnniversaryDate] = useState<Date | undefined>(undefined);
  const [editAnniversaryYear, setEditAnniversaryYear] = useState("");

  useEffect(() => {
    // 从API获取数据
    const fetchCardData = async () => {
      try {
        // 获取贺卡数据
        const cardResponse = await fetch(`/api/cards/${params.id}`);
        if (!cardResponse.ok) {
          throw new Error('获取贺卡数据失败');
        }
        const card = await cardResponse.json();
        
        // 获取祝福数据
        const wishesResponse = await fetch(`/api/cards/${params.id}/wishes`);
        if (!wishesResponse.ok) {
          throw new Error('获取祝福数据失败');
        }
        const wishes = await wishesResponse.json();
        
        // 提取标题中的年份信息
        const yearMatch = card.title.match(/(\d+)周年/);
        const years = yearMatch ? yearMatch[1] : "1";
        
        // 提取标题中的姓名信息
        const nameMatch = card.title.match(/(.+?)的\d+周年/);
        const name = nameMatch ? nameMatch[1] : '同事';
        
        const cardData: CardData = {
          id: card.id,
          employeeName: name,
          createdAt: card.createdAt,
          anniversaryDate: card.celebrationDate,
          anniversaryYear: years,
          status: card.status,
          wishes: wishes.map((wish: any) => ({
            id: wish.id,
            name: wish.participation.participantName,
            message: wish.content,
            email: wish.participation.participantEmail,
            createdAt: wish.createdAt
          }))
        };
        
        setCardData(cardData);
        setEditEmployeeName(cardData.employeeName);
        setEditAnniversaryDate(cardData.anniversaryDate ? new Date(cardData.anniversaryDate) : undefined);
        setEditAnniversaryYear(cardData.anniversaryYear || "1");
        
        // 根据状态设置当前步骤
        if (cardData.status === "completed") {
          setCurrentStep(3);
        } else if (cardData.wishes.length > 0) {
          setCurrentStep(2);
        } else {
          setCurrentStep(1);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card data:", error);
        toast({
          title: "数据加载失败",
          description: "无法加载贺卡数据，请稍后再试",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchCardData();
  }, [params.id, toast]);

  // 复制链接到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "链接已复制",
          description: "链接已成功复制到剪贴板",
        });
      },
      (err) => {
        console.error("无法复制链接: ", err);
        toast({
          title: "复制失败",
          description: "无法复制内容，请手动复制",
          variant: "destructive",
        });
      }
    );
  };

  // 完成收集，生成最终祝福页面
  const completeCollection = async () => {
    if (cardData) {
      try {
        // 调用API更新贺卡状态
        const response = await fetch(`/api/cards/${params.id}`, {
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
        
        // 显示成功消息
        toast({
          title: "祝福收集已完成",
          description: "您现在可以分享最终的祝福链接",
        });
        
        // 更新当前卡片状态和步骤
        setCardData({ ...cardData, status: "completed" });
        setCurrentStep(3);
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

  // 删除祝福
  const handleDeleteWish = async (wishId: string) => {
    if (cardData) {
      try {
        // 调用API删除祝福
        const response = await fetch(`/api/cards/${params.id}/wishes/${wishId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('删除祝福失败');
        }
        
        // 更新当前状态
        const updatedWishes = cardData.wishes.filter(wish => wish.id !== wishId);
        setCardData({ ...cardData, wishes: updatedWishes });
        
        toast({
          title: "删除成功",
          description: "祝福已成功删除",
        });
      } catch (error) {
        console.error('删除祝福失败:', error);
        toast({
          title: "删除失败",
          description: "无法删除祝福，请稍后再试",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-64">
              <h2 className="text-xl font-semibold mb-2">Card not found</h2>
              <p className="text-muted-foreground mb-4">The card you are looking for does not exist or has been deleted.</p>
              <Button onClick={() => router.push("/create")}>Create New Card</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 生成链接
  const contributeLink = typeof window !== "undefined" 
    ? `${window.location.origin}/contribute/${params.id}`
    : `/contribute/${params.id}`;
    
  const celebrationLink = typeof window !== "undefined"
    ? `${window.location.origin}/celebration/${params.id}`
    : `/celebration/${params.id}`;

  return (
    <div className="container max-w-4xl py-10">
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
          onClick={() => router.push(`/share/${params.id}`)}
        >
          Share & Preview
        </Button>
      </div>
      
      {/* 顶部信息和进度指示器 */}
      <Card className="mb-6">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col w-full md:w-auto">
              {/* 被祝福者姓名 - 内联编辑 */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-1">
                  <span className="text-sm text-muted-foreground">Recipient Name</span>
                  <span className="text-xs text-muted-foreground ml-2">(This greeting will be sent to this person)</span>
                </div>
                {isEditingName ? (
                  <div className="flex items-center">
                    <Input
                      value={editEmployeeName}
                      onChange={(e) => setEditEmployeeName(e.target.value)}
                      className="mr-2 w-full md:w-64"
                      autoFocus
                      placeholder="Enter recipient name"
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={async () => {
                        if (editEmployeeName.trim()) {
                          try {
                            // 保存名字更改
                            if (cardData) {
                              // 提取周年年份
                              const years = cardData.anniversaryYear || "1";
                              
                              // 更新贺卡标题
                              const response = await fetch(`/api/cards/${params.id}`, {
                                method: 'PATCH',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  title: `${editEmployeeName}的${years}周年庆祝`,
                                }),
                              });
                              
                              if (!response.ok) {
                                throw new Error('更新贺卡失败');
                              }
                              
                              setCardData({ ...cardData, employeeName: editEmployeeName });
                              toast({
                                title: "更新成功",
                                description: "收件人姓名已更新",
                              });
                            }
                          } catch (error) {
                            console.error('更新失败:', error);
                            toast({
                              title: "更新失败",
                              description: "无法更新收件人姓名，请稍后再试",
                              variant: "destructive",
                            });
                          }
                        } else {
                          toast({
                            title: "错误",
                            description: "姓名不能为空",
                            variant: "destructive",
                          });
                          return;
                        }
                        setIsEditingName(false);
                      }}
                    >
                      <SaveIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{cardData.employeeName}</h1>
                    {cardData.status !== "completed" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 h-8" 
                        onClick={() => setIsEditingName(true)}
                      >
                        <PencilIcon className="h-3 w-3 mr-1" />
                        Edit Name
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {/* 周年信息编辑 */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-1">
                  <span className="text-sm text-muted-foreground">Anniversary Info</span>
                  <span className="text-xs text-muted-foreground ml-2">(Displayed at the top of the card)</span>
                </div>
                {isEditingAnniversaryYear ? (
                  <div className="flex items-center">
                    <Input
                      value={editAnniversaryYear}
                      onChange={(e) => {
                        // 只允许输入数字
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setEditAnniversaryYear(value);
                      }}
                      className="mr-2 w-20"
                      autoFocus
                      placeholder="Year"
                      type="number"
                      min="1"
                      max="100"
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={async () => {
                        if (editAnniversaryYear.trim() && parseInt(editAnniversaryYear) > 0) {
                          try {
                            // 保存周年年份更改
                            if (cardData) {
                              // 更新贺卡标题
                              const response = await fetch(`/api/cards/${params.id}`, {
                                method: 'PATCH',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  title: `${cardData.employeeName}的${editAnniversaryYear}周年庆祝`,
                                }),
                              });
                              
                              if (!response.ok) {
                                throw new Error('更新贺卡失败');
                              }
                              
                              // 使用类型断言确保 TypeScript 知道我们正在更新的属性
                              const updatedCardData: CardData = {
                                ...cardData,
                                anniversaryYear: editAnniversaryYear
                              };
                              setCardData(updatedCardData);
                              
                              toast({
                                title: "更新成功",
                                description: "周年年份已更新",
                              });
                            }
                          } catch (error) {
                            console.error('更新失败:', error);
                            toast({
                              title: "更新失败",
                              description: "无法更新周年年份，请稍后再试",
                              variant: "destructive",
                            });
                          }
                        } else {
                          toast({
                            title: "错误",
                            description: "请输入有效的年份",
                            variant: "destructive",
                          });
                          return;
                        }
                        setIsEditingAnniversaryYear(false);
                      }}
                    >
                      <SaveIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <h2 className="text-xl font-semibold">{cardData.anniversaryYear || cardData.id.charAt(0)}</h2>
                      <span className="ml-1 text-lg">Year Anniversary</span>
                    </div>
                    {cardData.status !== "completed" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 h-8" 
                        onClick={() => setIsEditingAnniversaryYear(true)}
                      >
                        <PencilIcon className="h-3 w-3 mr-1" />
                        Edit Year
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {/* 周年日期编辑 */}
              <div className="flex flex-col">
                <div className="flex items-center mb-1">
                  <span className="text-sm text-muted-foreground">Celebration Date</span>
                  <span className="text-xs text-muted-foreground ml-2">(The specific date of the anniversary)</span>
                </div>
                {isEditingAnniversaryDate ? (
                  <div className="flex items-center">
                    <DatePicker 
                      date={editAnniversaryDate} 
                      setDate={setEditAnniversaryDate}
                      className="w-full md:w-64 inline-block"
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="ml-2"
                      onClick={async () => {
                        if (editAnniversaryDate) {
                          try {
                            // 保存周年时间更改
                            if (cardData) {
                              // 更新贺卡庆祝日期
                              const response = await fetch(`/api/cards/${params.id}`, {
                                method: 'PATCH',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  celebrationDate: editAnniversaryDate.toISOString(),
                                }),
                              });
                              
                              if (!response.ok) {
                                throw new Error('更新贺卡失败');
                              }
                              
                              // 使用类型断言确保 TypeScript 知道我们正在更新的属性
                              const updatedCardData: CardData = {
                                ...cardData,
                                anniversaryDate: editAnniversaryDate.toISOString()
                              };
                              setCardData(updatedCardData);
                              
                              toast({
                                title: "更新成功",
                                description: "庆祝日期已更新",
                              });
                            }
                          } catch (error) {
                            console.error('更新失败:', error);
                            toast({
                              title: "更新失败",
                              description: "无法更新庆祝日期，请稍后再试",
                              variant: "destructive",
                            });
                          }
                        }
                        setIsEditingAnniversaryDate(false);
                      }}
                    >
                      <SaveIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-base">
                      {cardData.anniversaryDate ? new Date(cardData.anniversaryDate).toLocaleDateString() : "Not set"}
                    </span>
                    {cardData.status !== "completed" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 h-8" 
                        onClick={() => setIsEditingAnniversaryDate(true)}
                      >
                        <PencilIcon className="h-3 w-3 mr-1" />
                        Edit Date
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end w-full md:w-auto">
              <div className="bg-primary/10 text-primary rounded-md px-3 py-1 text-sm font-medium mb-2">
                {cardData.wishes.length} wishes collected
              </div>
              <div className="flex items-center space-x-1">
                <div className={`h-2 w-8 rounded ${currentStep >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`h-2 w-8 rounded ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`h-2 w-8 rounded ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Created on: {new Date(cardData.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 步骤 1: 分享收集链接 */}
      {currentStep === 1 && (
        <Card className="mb-6 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">1</span>
              Manage Collection Link
            </CardTitle>
            <CardDescription>
              Share this link with colleagues to collect wishes for {cardData.employeeName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={contributeLink}
                    readOnly
                    className="w-full pr-10 py-2 px-3 border rounded-md"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={() => copyToClipboard(contributeLink)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => copyToClipboard(contributeLink)}
                  >
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "Work Anniversary Wishes",
                          text: "Please participate in this work anniversary celebration",
                          url: contributeLink,
                        });
                      } else {
                        copyToClipboard(contributeLink);
                      }
                    }}
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      const subject = "Invitation to Work Anniversary Celebration";
                      const body = `Hello!\n\nI'm collecting work anniversary wishes and would love your participation.\n\nPlease click the link to add your wishes: ${contributeLink}\n\nThank you!`;
                      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                  >
                    <MailIcon className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
              
              {cardData.wishes.length > 0 && (
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setCurrentStep(2)}
                >
                  View Collected Wishes
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* 步骤 2: 查看收集的祝福 */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">2</span>
                Manage Collected Wishes
              </CardTitle>
              <CardDescription>
                {cardData.wishes.length} wishes have been collected so far
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 内联分享区域 - 替代"Back to Share Collection Link"按钮 */}
              <div className="mb-6 p-4 border rounded-md bg-slate-50">
                <h3 className="text-sm font-medium mb-2">Collection Link</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={contributeLink}
                      readOnly
                      className="w-full pr-10 py-2 px-3 border rounded-md text-sm"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => copyToClipboard(contributeLink)}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(contributeLink)}
                  >
                    <CopyIcon className="mr-1 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>
              
              <ParticipantsList 
                wishes={cardData.wishes} 
                onDeleteWish={handleDeleteWish}
              />
              
              <div className="flex flex-col space-y-2 mt-6">
                <Button 
                  className="w-full" 
                  onClick={completeCollection}
                >
                  Complete Collection & Generate Final Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* 步骤 3: 完成并分享最终页面 */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">3</span>
                Manage Final Celebration Page
              </CardTitle>
              <CardDescription>
                Collection completed with {cardData.wishes.length} wishes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-700">Collection completed successfully!</p>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={celebrationLink}
                    readOnly
                    className="w-full pr-10 py-2 px-3 border rounded-md"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={() => copyToClipboard(celebrationLink)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => copyToClipboard(celebrationLink)}
                  >
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "Work Anniversary Wishes",
                          text: "Check out this work anniversary celebration",
                          url: celebrationLink,
                        });
                      } else {
                        copyToClipboard(celebrationLink);
                      }
                    }}
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      const subject = "Work Anniversary Celebration";
                      const body = `Hello!\n\nI'd like to share this work anniversary celebration page with you.\n\nPlease click the link to view: ${celebrationLink}\n\nThank you!`;
                      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                  >
                    <MailIcon className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => router.push(`/celebration/${params.id}`)}
                >
                  <EyeIcon className="mr-2 h-4 w-4" />
                  Preview Celebration Page
                </Button>
                
                {/* 内联分享区域 - 替代"Back to View Collected Wishes"按钮 */}
                <div className="p-4 border rounded-md bg-slate-50">
                  <h3 className="text-sm font-medium mb-2">View Collected Wishes</h3>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setCurrentStep(2)}
                  >
                    View Wishes List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}