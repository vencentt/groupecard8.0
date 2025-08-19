# Neon PostgreSQL 数据库搭建计划

## 1. 当前数据库状况分析

### 1.1 已有数据库连接
- 项目已配置 Neon PostgreSQL 数据库连接
- 连接字符串已在 `.env` 文件中设置：
  ```
  DATABASE_URL='postgresql://neondb_owner:npg_igdf3AOGS4kz@ep-restless-violet-a8eyo68y-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
  ```

### 1.2 现有数据模型
- 目前只有两个基础模型：`User` 和 `Card`
- 模型之间缺少关联关系
- 缺少支持完整业务流程的其他必要模型

### 1.3 业务需求
- 根据 PRD 文档，需要支持工作周年庆祝贺卡的创建、收集祝福和展示
- MVP 阶段需要支持基础的文字祝福功能
- 后续阶段需要支持更多祝福形式（图片、视频等）

## 2. Neon 数据库搭建计划

### 阶段一：数据模型设计与实现（2天）

#### 2.1.1 完善现有模型

```prisma
// 完善用户模型
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  // 新增字段
  cards         Card[]    @relation("CardCreator")
  participations Participation[]
}

// 完善贺卡模型
model Card {
  id            String    @id @default(cuid())
  title         String
  description   String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  // 新增字段
  creatorId     String?
  creator       User?     @relation("CardCreator", fields: [creatorId], references: [id])
  celebrationDate DateTime
  status        String    @default("collecting") // collecting, completed
  wishes        Wish[]
  participations Participation[]
}
```

#### 2.1.2 添加新模型

```prisma
// 参与者模型
model Participation {
  id            String    @id @default(cuid())
  cardId        String
  card          Card      @relation(fields: [cardId], references: [id])
  userId        String?
  user          User?     @relation(fields: [userId], references: [id])
  participantName String
  participantEmail String?
  status        String    @default("invited") // invited, contributed
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  wish          Wish?
}

// 祝福内容模型
model Wish {
  id            String    @id @default(cuid())
  content       String
  participationId String  @unique
  participation Participation @relation(fields: [participationId], references: [id])
  cardId        String
  card          Card      @relation(fields: [cardId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

#### 2.1.3 验收标准
- Prisma schema 文件包含所有必要的模型和关系
- 模型设计符合业务需求，支持 MVP 阶段功能
- 字段命名规范，类型合理
- 关系定义正确，包含必要的外键约束

### 阶段二：数据库迁移与初始化（1天）

#### 2.2.1 创建迁移脚本

```bash
npx prisma migrate dev --name init
```

#### 2.2.2 编写种子数据脚本

```typescript
// prisma/seed.ts
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
```

#### 2.2.3 配置 package.json 脚本

```json
"scripts": {
  "db:migrate": "prisma migrate dev",
  "db:seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  "db:reset": "prisma migrate reset"
}
```

#### 2.2.4 验收标准
- 成功执行迁移命令，数据库表结构创建完成
- 种子数据脚本执行成功，测试数据正确插入
- 数据库连接测试脚本执行成功，能够查询到测试数据

### 阶段三：数据访问层实现（2天）

#### 2.3.1 创建 Prisma 客户端实例

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

#### 2.3.2 实现卡片相关数据访问函数

```typescript
// src/lib/card.ts
import { prisma } from './prisma'

export async function createCard(data: {
  title: string
  description?: string
  creatorId?: string
  celebrationDate: Date
}) {
  return prisma.card.create({
    data,
  })
}

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

export async function updateCardStatus(id: string, status: string) {
  return prisma.card.update({
    where: { id },
    data: { status },
  })
}
```

#### 2.3.3 实现祝福相关数据访问函数

```typescript
// src/lib/wish.ts
import { prisma } from './prisma'

export async function createWish(data: {
  content: string
  participationId: string
  cardId: string
}) {
  return prisma.wish.create({
    data,
  })
}

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
```

#### 2.3.4 验收标准
- Prisma 客户端实例配置正确，能够连接数据库
- 数据访问函数实现完整，覆盖所有必要的 CRUD 操作
- 查询包含必要的关联数据，满足业务需求
- 代码结构清晰，遵循最佳实践

### 阶段四：API 路由实现（2天）

#### 2.4.1 创建卡片 API

```typescript
// src/app/api/cards/route.ts
import { NextResponse } from 'next/server'
import { createCard } from '@/lib/card'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const card = await createCard({
      title: body.title,
      description: body.description,
      creatorId: body.creatorId,
      celebrationDate: new Date(body.celebrationDate),
    })
    return NextResponse.json(card, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建贺卡失败' }, { status: 500 })
  }
}
```

#### 2.4.2 获取卡片 API

```typescript
// src/app/api/cards/[id]/route.ts
import { NextResponse } from 'next/server'
import { getCardById } from '@/lib/card'

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
    return NextResponse.json({ error: '获取贺卡失败' }, { status: 500 })
  }
}
```

#### 2.4.3 创建祝福 API

```typescript
// src/app/api/cards/[id]/wishes/route.ts
import { NextResponse } from 'next/server'
import { createWish } from '@/lib/wish'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // 创建或获取参与者
    const participation = await prisma.participation.create({
      data: {
        cardId: params.id,
        participantName: body.participantName,
        participantEmail: body.participantEmail,
        status: 'contributed',
      },
    })
    
    // 创建祝福
    const wish = await createWish({
      content: body.content,
      participationId: participation.id,
      cardId: params.id,
    })
    
    return NextResponse.json(wish, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建祝福失败' }, { status: 500 })
  }
}
```

#### 2.4.4 验收标准
- API 路由实现完整，支持所有必要的操作
- 请求参数验证正确，返回适当的错误信息
- 响应格式统一，包含必要的状态码
- API 与数据访问层正确集成

### 阶段五：测试与优化（1天）

#### 2.5.1 编写数据库连接测试脚本

```typescript
// scripts/test-db-connection.ts
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
    
    const wishCount = await prisma.wish.count()
    console.log(`祝福表中有 ${wishCount} 条记录`)
    
    const participationCount = await prisma.participation.count()
    console.log(`参与者表中有 ${participationCount} 条记录`)
    
  } catch (error) {
    console.error('数据库连接或查询失败:', error)
  } finally {
    await prisma.$disconnect()
    console.log('数据库连接已关闭')
  }
}

main()
```

#### 2.5.2 优化数据库索引

```prisma
// 添加索引优化查询性能
model Card {
  // ... 其他字段
  
  @@index([creatorId])
  @@index([status])
}

model Participation {
  // ... 其他字段
  
  @@index([cardId])
  @@index([userId])
}

model Wish {
  // ... 其他字段
  
  @@index([cardId])
}
```

#### 2.5.3 验收标准
- 数据库连接测试脚本执行成功，能够查询所有表
- 索引配置合理，优化查询性能
- 数据库操作性能良好，响应时间在可接受范围内

## 3. 总体验收标准

### 3.1 数据模型完整性
- 所有必要的模型和关系已创建
- 字段类型和约束设置合理
- 索引配置优化查询性能

### 3.2 数据库连接稳定性
- 连接配置正确，能够稳定连接到 Neon PostgreSQL
- 连接池配置合理，能够处理并发请求
- 连接错误处理机制完善

### 3.3 数据访问层可用性
- 提供完整的 CRUD 操作函数
- 查询包含必要的关联数据
- 代码结构清晰，易于维护

### 3.4 API 接口可用性
- API 路由实现完整，支持所有必要的操作
- 请求参数验证正确，返回适当的错误信息
- 响应格式统一，符合 RESTful 设计原则

### 3.5 性能与安全
- 查询性能良好，响应时间在可接受范围内
- 数据库操作安全，防止 SQL 注入等安全问题
- 敏感数据处理符合安全最佳实践

## 4. 实施时间表

| 阶段 | 工作内容 | 时间估计 |
|------|---------|---------|
| 阶段一 | 数据模型设计与实现 | 2天 |
| 阶段二 | 数据库迁移与初始化 | 1天 |
| 阶段三 | 数据访问层实现 | 2天 |
| 阶段四 | API 路由实现 | 2天 |
| 阶段五 | 测试与优化 | 1天 |
| **总计** | | **8个工作日** |

## 5. 风险评估与缓解措施

### 5.1 数据库连接问题
- **风险**：Neon PostgreSQL 连接不稳定或配置错误
- **影响**：应用无法正常访问数据库，功能不可用
- **可能性**：中
- **缓解措施**：
  - 提前测试连接，确保连接字符串正确
  - 实现连接重试机制
  - 准备详细的连接故障排除指南
  - 监控数据库连接状态

### 5.2 数据模型设计不足
- **风险**：模型设计不能满足业务需求，需要频繁修改
- **影响**：需要进行数据迁移，可能导致数据丢失或不一致
- **可能性**：中
- **缓解措施**：
  - 基于详细的业务需求分析设计模型
  - 预留扩展字段
  - 使用版本控制管理模型变更
  - 实施增量迁移策略

### 5.3 性能问题
- **风险**：随着数据量增长，查询性能下降
- **影响**：应用响应缓慢，用户体验下降
- **可能性**：低（初期）
- **缓解措施**：
  - 合理设计索引
  - 优化查询
  - 实施数据分页
  - 考虑缓存策略

### 5.4 数据迁移风险
- **风险**：迁移脚本执行失败，导致数据不一致
- **影响**：数据库状态异常，应用功能受影响
- **可能性**：中
- **缓解措施**：
  - 在测试环境充分测试迁移脚本
  - 备份数据库
  - 准备回滚方案
  - 编写验证脚本确认数据一致性