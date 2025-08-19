"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { WishesPreview } from "./wishes-preview";

// 表单验证模式
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

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
  status: "collecting" | "completed";
  wishes?: Wish[];
}

export default function ContributeForm({ cardId }: { cardId: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [cardData, setCardData] = useState<CardData | null>(null);

  // 初始化表单
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      email: "",
    },
  });

  // 从API加载数据
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        // 获取贺卡数据
        const cardResponse = await fetch(`/api/cards/${cardId}`);
        if (!cardResponse.ok) {
          throw new Error('获取贺卡数据失败');
        }
        const card = await cardResponse.json();
        setCardData(card);
        
        // 获取祝福数据
        const wishesResponse = await fetch(`/api/cards/${cardId}/wishes`);
        if (wishesResponse.ok) {
          const wishesData = await wishesResponse.json();
          setWishes(wishesData);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
        toast({
          title: "数据加载失败",
          description: "无法加载贺卡数据，请稍后再试",
          variant: "destructive",
        });
      }
    };

    fetchCardData();
  }, [cardId, toast]);

  // 表单提交处理
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
      // 调用API创建祝福
      const response = await fetch(`/api/cards/${cardId}/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data.message,
          participantName: data.name,
          participantEmail: data.email || undefined,
        }),
      });
      
      if (!response.ok) {
        throw new Error('提交祝福失败');
      }
      
      const newWish = await response.json();
      
      // 更新本地状态
      const updatedWishes = [...wishes, newWish];
      setWishes(updatedWishes);
      
      // 显示成功消息
      toast({
        title: "Success!",
        description: "Your wishes have been added to the card.",
      });
      
      // 更新提交状态
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting wishes:", error);
      toast({
        title: "Something went wrong.",
        description: "Your wishes could not be submitted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {!isSubmitted ? (
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name or nickname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Wishes *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write your congratulations message here..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Wishes"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
                <p className="text-muted-foreground">
                  Your wishes have been added to the anniversary card.
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }} 
                variant="outline" 
                className="w-full"
              >
                Add Another Message
              </Button>
            </CardContent>
          </Card>
          
          <WishesPreview wishes={wishes} />
        </div>
      )}
    </div>
  );
}