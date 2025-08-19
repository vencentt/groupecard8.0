import { prisma } from './prisma'

/**
 * 创建新祝福
 * @param data 祝福数据
 * @returns 创建的祝福对象
 */
export async function createWish(data: {
  content: string
  participationId: string
  cardId: string
}) {
  return prisma.wish.create({
    data,
  })
}

/**
 * 根据贺卡ID获取所有祝福
 * @param cardId 贺卡ID
 * @returns 祝福列表，包含参与者信息
 */
export async function getWishesByCardId(cardId: string) {
  return prisma.wish.findMany({
    where: { cardId },
    include: {
      participation: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}

/**
 * 根据ID获取祝福详情
 * @param id 祝福ID
 * @returns 祝福详情，包含参与者信息
 */
export async function getWishById(id: string) {
  return prisma.wish.findUnique({
    where: { id },
    include: {
      participation: true,
      card: true,
    },
  })
}

/**
 * 更新祝福内容
 * @param id 祝福ID
 * @param content 新内容
 * @returns 更新后的祝福对象
 */
export async function updateWishContent(id: string, content: string) {
  return prisma.wish.update({
    where: { id },
    data: { content },
  })
}