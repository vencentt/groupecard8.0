import { NextResponse } from 'next/server'
import { createWish, getWishesByCardId } from '@/lib/wish'
import { createParticipation } from '@/lib/participation'
import { prisma } from '@/lib/prisma'

/**
 * 获取贺卡所有祝福API
 * GET /api/cards/[id]/wishes
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wishes = await getWishesByCardId(params.id)
    return NextResponse.json(wishes)
  } catch (error) {
    console.error('获取祝福失败:', error)
    return NextResponse.json({ error: '获取祝福失败' }, { status: 500 })
  }
}

/**
 * 创建祝福API
 * POST /api/cards/[id]/wishes
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // 验证必要字段
    if (!body.content || !body.participantName) {
      return NextResponse.json(
        { error: '祝福内容和参与者姓名为必填项' }, 
        { status: 400 }
      )
    }
    
    // 创建参与者
    const participation = await createParticipation({
      cardId: params.id,
      participantName: body.participantName,
      participantEmail: body.participantEmail,
      status: 'contributed',
    })
    
    // 创建祝福
    const wish = await createWish({
      content: body.content,
      participationId: participation.id,
      cardId: params.id,
    })
    
    return NextResponse.json(wish, { status: 201 })
  } catch (error) {
    console.error('创建祝福失败:', error)
    return NextResponse.json({ error: '创建祝福失败' }, { status: 500 })
  }
}