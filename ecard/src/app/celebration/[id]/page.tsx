import { Metadata } from "next";
import { notFound } from "next/navigation";
import CelebrationView from "@/components/celebration/celebration-view";
import PreviewLayout from "@/components/preview/preview-layout";

export const metadata: Metadata = {
  title: "Work Anniversary Celebration | Happy work anniversary",
  description: "Celebrate work milestones with personalized anniversary cards and messages from colleagues. View all wishes for your professional anniversary.",
  keywords: "work anniversary celebration, work anniversary wishes, professional milestone"
};

// 从API获取庆祝数据的函数
async function getCelebrationData(id: string) {
  try {
    // 使用硬编码的绝对URL
    const baseUrl = "https://www.happyworkanniversary.net";
    
    try {
      // 获取贺卡数据
      const cardResponse = await fetch(`${baseUrl}/api/cards/${id}`, {
        cache: 'no-store' // 确保获取最新数据
      });
      
      if (cardResponse.ok) {
        const card = await cardResponse.json();
        
        // 获取祝福数据
        const wishesResponse = await fetch(`${baseUrl}/api/cards/${id}/wishes`, {
          cache: 'no-store'
        });
        
        // 如果获取祝福数据失败，使用空数组继续
        let wishes = [];
        if (wishesResponse.ok) {
          wishes = await wishesResponse.json();
        } else {
          console.error('获取祝福数据失败，使用默认值继续');
        }
        
        // 获取参与者数据
        const participationsResponse = await fetch(`${baseUrl}/api/cards/${id}/participations`, {
          cache: 'no-store'
        });
        
        // 如果获取参与者数据失败，使用空数组继续
        let participations = [];
        if (participationsResponse.ok) {
          participations = await participationsResponse.json();
        } else {
          console.error('获取参与者数据失败，使用默认值继续');
        }
        
        // 找到发起人（第一个参与者）
        const initiator = participations.find((p: any) => p.status === 'contributed') || participations[0];
        
        // 提取标题中的年份信息
        const yearMatch = card.title.match(/(\d+)周年/) || card.title.match(/(\d+)/);
        const years = yearMatch ? parseInt(yearMatch[1]) : 1;
        
        return {
          celebrant: {
            name: card.recipientName || '同事', // 接收祝福的人
            years: years,
            department: card.description?.match(/为(.+?)庆祝/)?.[1] || '公司',
            celebrationDate: card.celebrationDate,
          },
          initiator: {
            name: card.senderName || (initiator?.participantName || '团队'), // 发送祝福的人
          },
          wishes: wishes.map((wish: any) => ({
            id: wish.id || `wish-${Math.random().toString(36).substr(2, 9)}`,
            name: wish.participation?.participantName || '匿名用户',
            message: wish.content || '',
            isInitiator: initiator ? (wish.participation?.id === initiator?.id) : false,
            createdAt: wish.createdAt || new Date().toISOString(),
          })).filter((wish: any) => wish.message && wish.message.trim() !== ''),
        };
      }
    } catch (error) {
      console.error('API调用失败，使用模拟数据:', error);
    }
    
    // 如果API调用失败，返回模拟数据
    console.log('使用模拟数据展示贺卡');
    return {
      celebrant: {
        name: '张三',
        years: 5,
        department: '技术部',
        celebrationDate: new Date().toISOString(),
      },
      initiator: {
        name: '李四',
      },
      wishes: [
        {
          id: 'wish-1',
          name: '李四',
          message: '恭喜你工作5周年！感谢你对团队的贡献，祝愿你在未来的日子里工作顺利，生活幸福！',
          isInitiator: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'wish-2',
          name: '王五',
          message: '五年来，你的专业精神和团队合作能力一直是我们学习的榜样。祝贺你工作5周年！',
          isInitiator: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'wish-3',
          name: '赵六',
          message: '恭喜工作5周年！感谢你一直以来的帮助和支持，希望我们能继续一起创造更多精彩！',
          isInitiator: false,
          createdAt: new Date().toISOString(),
        }
      ],
    };
  } catch (error) {
    console.error('获取庆祝数据失败:', error);
    throw error;
  }
}

// 页面组件，支持预览模式和最终展示模式
export default async function CelebrationPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string },
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // 检查是否为预览模式
  const isPreview = searchParams?.preview === "true";
  const isFinal = searchParams?.final === "true";
  
  // 检查是否来自完成状态（从manage页面完成后跳转）
  const isFromCompletion = searchParams?.source === "completion";
  
  // 获取庆祝数据
  const celebrationData = await getCelebrationData(params.id);
  
  if (!celebrationData) {
    notFound();
  }

  // 准备展示内容
  const celebrationContent = (
    <div className="container max-w-4xl py-4">
      <h1 className="sr-only">{celebrationData.celebrant.name}'s {celebrationData.celebrant.years} Year Work Anniversary Celebration</h1>
      <CelebrationView 
        celebrationId={params.id}
        celebrant={celebrationData.celebrant}
        initiator={celebrationData.initiator}
        wishes={celebrationData.wishes}
        showBackButton={isFromCompletion}
        isPreview={isPreview} // 传递预览模式标志
      />
    </div>
  );

  // 根据模式返回不同的布局
  if (isPreview && !isFinal) {
    return (
      <PreviewLayout celebrationId={params.id}>
        {celebrationContent}
      </PreviewLayout>
    );
  }

  // 最终展示模式
  return celebrationContent;
}
