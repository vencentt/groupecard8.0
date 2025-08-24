import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 删除卡片的API端点
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // 删除与卡片相关的所有祝福
    await prisma.wish.deleteMany({
      where: { cardId: id },
    });

    // 删除与卡片相关的所有参与记录
    await prisma.participation.deleteMany({
      where: { cardId: id },
    });

    // 删除卡片本身
    await prisma.card.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除卡片失败:", error);
    return NextResponse.json(
      { error: "删除卡片失败" },
      { status: 500 }
    );
  }
}