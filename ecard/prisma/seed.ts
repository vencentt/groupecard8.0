import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建测试用户
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: '测试用户',
    },
  })

  // 创建测试贺卡
  const card = await prisma.card.create({
    data: {
      title: '工作一周年快乐',
      description: '恭喜小明工作一周年！',
      creatorId: user.id,
      celebrationDate: new Date(2025, 8, 30),
    },
  })

  // 创建测试参与者
  const participation = await prisma.participation.create({
    data: {
      cardId: card.id,
      participantName: '小红',
      participantEmail: 'xiaohong@example.com',
    },
  })

  // 创建测试祝福
  await prisma.wish.create({
    data: {
      content: '恭喜小明工作一周年，祝贺你取得的成就！',
      participationId: participation.id,
      cardId: card.id,
    },
  })

  console.log('种子数据创建成功')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })