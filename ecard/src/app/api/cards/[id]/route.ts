import { NextResponse } from 'next/server'
import { getCardById, updateCard } from '@/lib/card'

/**
 * 获取贺卡详情API
 * GET /api/cards/[id]
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const card = await getCardById(params.id)
    if (!card) {
      return NextResponse.json({ error: '贺卡不存在' }, { status: 404 })
    }
    return NextResponse.json(card)
  } catch (error) {
    console.error('获取贺卡失败:', error)
    return NextResponse.json({ error: '获取贺卡失败' }, { status: 500 })
  }
}

/**
 * 更新贺卡API
 * PATCH /api/cards/[id]
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // 更新贺卡
    const card = await updateCard(params.id, {
      title: body.title,
      description: body.description,
      recipientName: body.recipientName,
      senderName: body.senderName,
      celebrationDate: body.celebrationDate ? new Date(body.celebrationDate) : undefined,
      status: body.status,
    })
    
    return NextResponse.json(card)
  } catch (error) {
    console.error('更新贺卡失败:', error)
    return NextResponse.json({ error: '更新贺卡失败' }, { status: 500 })
  }
}