import { prisma } from './prisma'

/**
 * 创建新参与者
 * @param data 参与者数据
 * @returns 创建的参与者对象
 */
export async function createParticipation(data: {
  cardId: string
  userId?: string
  participantName: string
  participantEmail?: string
  status?: string
}) {
  return prisma.participation.create({
    data,
  })
}

/**
 * 根据贺卡ID获取所有参与者
 * @param cardId 贺卡ID
 * @returns 参与者列表
 */
export async function getParticipationsByCardId(cardId: string) {
  return prisma.participation.findMany({
    where: { cardId },
    include: {
      wish: true,
      user: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}

/**
 * 更新参与者状态
 * @param id 参与者ID
 * @param status 新状态
 * @returns 更新后的参与者对象
 */
export async function updateParticipationStatus(id: string, status: string) {
  return prisma.participation.update({
    where: { id },
    data: { status },
  })
}

/**
 * 根据邮箱查找参与者
 * @param email 参与者邮箱
 * @returns 参与者列表
 */
export async function findParticipationsByEmail(email: string) {
  return prisma.participation.findMany({
    where: { participantEmail: email },
    include: {
      card: true,
      wish: true,
    },
  })
}