import { NextResponse } from 'next/server'
import { getParticipationsByCardId, createParticipation } from '@/lib/participation'

/**
 * 获取贺卡所有参与者API
 * GET /api/cards/[id]/participations
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const participations = await getParticipationsByCardId(params.id)
    return NextResponse.json(participations)
  } catch (error) {
    console.error('获取参与者失败:', error)
    return NextResponse.json({ error: '获取参与者失败' }, { status: 500 })
  }
}

/**
 * 创建参与者API
 * POST /api/cards/[id]/participations
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // 验证必要字段
    if (!body.participantName) {
      return NextResponse.json(
        { error: '参与者姓名为必填项' }, 
        { status: 400 }
      )
    }
    
    // 创建参与者
    const participation = await createParticipation({
      cardId: params.id,
      participantName: body.participantName,
      participantEmail: body.participantEmail,
      userId: body.userId,
      status: body.status || 'invited',
    })
    
    return NextResponse.json(participation, { status: 201 })
  } catch (error) {
    console.error('创建参与者失败:', error)
    return NextResponse.json({ error: '创建参与者失败' }, { status: 500 })
  }
}