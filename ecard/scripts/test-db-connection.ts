import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  
  try {
    // 测试连接
    console.log('正在连接到Neon PostgreSQL数据库...')
    await prisma.$connect()
    console.log('数据库连接成功！')
    
    // 测试查询
    const userCount = await prisma.user.count()
    console.log(`用户表中有 ${userCount} 条记录`)
    
    const cardCount = await prisma.card.count()
    console.log(`贺卡表中有 ${cardCount} 条记录`)
    
    try {
      const wishCount = await prisma.wish.count()
      console.log(`祝福表中有 ${wishCount} 条记录`)
    } catch (e) {
      console.log('祝福表可能尚未创建')
    }
    
    try {
      const participationCount = await prisma.participation.count()
      console.log(`参与者表中有 ${participationCount} 条记录`)
    } catch (e) {
      console.log('参与者表可能尚未创建')
    }
    
  } catch (error) {
    console.error('数据库连接或查询失败:', error)
  } finally {
    await prisma.$disconnect()
    console.log('数据库连接已关闭')
  }
}

main()
