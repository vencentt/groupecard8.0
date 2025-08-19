import { prisma } from './prisma'

/**
 * 获取所有贺卡
 * @returns 贺卡列表
 */
export async function getAllCards() {
  return prisma.card.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      creator: true,
      wishes: {
        include: {
          participation: true,
        },
      },
      participations: true,
    },
  });
}

/**
 * 创建新贺卡
 * @param data 贺卡数据
 * @returns 创建的贺卡对象
 */
export async function createCard(data: {
  title: string
  description?: string
  creatorId?: string
  recipientName: string
  senderName: string
  celebrationDate: Date
}) {
  return prisma.card.create({
    data,
  })
}

/**
 * 根据ID获取贺卡详情
 * @param id 贺卡ID
 * @returns 贺卡详情，包含创建者、祝福和参与者信息
 */
export async function getCardById(id: string) {
  return prisma.card.findUnique({
    where: { id },
    include: {
      creator: true,
      wishes: {
        include: {
          participation: true,
        },
      },
      participations: true,
    },
  })
}

/**
 * 更新贺卡状态
 * @param id 贺卡ID
 * @param status 新状态
 * @returns 更新后的贺卡对象
 */
export async function updateCardStatus(id: string, status: string) {
  return prisma.card.update({
    where: { id },
    data: { status },
  })
}

/**
 * 获取用户创建的所有贺卡
 * @param userId 用户ID
 * @returns 贺卡列表
 */
export async function getCardsByCreator(userId: string) {
  return prisma.card.findMany({
    where: { creatorId: userId },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * 更新贺卡信息
 * @param id 贺卡ID
 * @param data 更新的数据
 * @returns 更新后的贺卡对象
 */
export async function updateCard(id: string, data: {
  title?: string
  description?: string
  recipientName?: string
  senderName?: string
  celebrationDate?: Date
  status?: string
}) {
  return prisma.card.update({
    where: { id },
    data,
  })
}
