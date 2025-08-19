import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * 删除祝福API
 * DELETE /api/cards/[id]/wishes/[wishId]
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string, wishId: string } }
) {
  try {
    // 查找祝福
    const wish = await prisma.wish.findUnique({
      where: { id: params.wishId },
      include: { participation: true }
    });

    if (!wish) {
      return NextResponse.json({ error: '祝福不存在' }, { status: 404 });
    }

    // 验证祝福是否属于指定的贺卡
    if (wish.cardId !== params.id) {
      return NextResponse.json({ error: '祝福不属于该贺卡' }, { status: 403 });
    }

    // 删除祝福
    await prisma.wish.delete({
      where: { id: params.wishId }
    });

    // 更新参与者状态
    if (wish.participation) {
      await prisma.participation.update({
        where: { id: wish.participation.id },
        data: { status: 'invited' } // 重置为邀请状态
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除祝福失败:', error);
    return NextResponse.json({ error: '删除祝福失败' }, { status: 500 });
  }
}