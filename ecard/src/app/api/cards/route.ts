import { NextResponse } from 'next/server'
import { createCard, getAllCards } from '@/lib/card'

/**
 * 获取所有贺卡API
 * GET /api/cards
 */
export async function GET() {
  try {
    const cards = await getAllCards();
    return NextResponse.json(cards);
  } catch (error) {
    console.error('获取贺卡列表失败:', error);
    return NextResponse.json({ error: '获取贺卡列表失败' }, { status: 500 });
  }
}

/**
 * 创建贺卡API
 * POST /api/cards
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 验证必要字段
    if (!body.title || !body.celebrationDate) {
      return NextResponse.json(
        { error: '标题和庆祝日期为必填项' }, 
        { status: 400 }
      )
    }
    
    // 创建贺卡
    const card = await createCard({
      title: body.title,
      description: body.description,
      creatorId: body.creatorId,
      recipientName: body.recipientName,
      senderName: body.senderName,
      celebrationDate: new Date(body.celebrationDate),
    })
    
    return NextResponse.json(card, { status: 201 })
  } catch (error) {
    console.error('创建贺卡失败:', error)
    return NextResponse.json({ error: '创建贺卡失败' }, { status: 500 })
  }
}