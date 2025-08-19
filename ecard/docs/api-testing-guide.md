# API 测试指南

本文档提供了如何测试 API 端点的指南。

## 测试 API 端点

要测试 API 端点是否正常工作，请按照以下步骤操作：

1. 首先，启动开发服务器：

```bash
cd ecard
npm run dev
```

2. 然后，在另一个终端窗口中运行测试脚本：

```bash
cd ecard
npm run test:api
```

测试脚本将依次测试以下 API 端点：

- 创建贺卡 (`POST /api/cards`)
- 获取所有贺卡 (`GET /api/cards`)
- 获取贺卡详情 (`GET /api/cards/:id`)
- 更新贺卡 (`PATCH /api/cards/:id`)
- 创建参与者 (`POST /api/cards/:id/participations`)
- 获取参与者列表 (`GET /api/cards/:id/participations`)
- 创建祝福 (`POST /api/cards/:id/wishes`)
- 获取祝福列表 (`GET /api/cards/:id/wishes`)
- 删除祝福 (`DELETE /api/cards/:id/wishes/:wishId`)

## 手动测试

如果您想手动测试 API 端点，可以使用 Postman 或 curl 等工具。以下是一些示例：

### 创建贺卡

```bash
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -d '{"title":"测试用户的1周年庆祝","description":"为测试用户庆祝1年工作周年","celebrationDate":"2025-08-20T00:00:00.000Z"}'
```

### 获取所有贺卡

```bash
curl http://localhost:3000/api/cards
```

### 获取贺卡详情

```bash
curl http://localhost:3000/api/cards/{贺卡ID}
```

### 更新贺卡

```bash
curl -X PATCH http://localhost:3000/api/cards/{贺卡ID} \
  -H "Content-Type: application/json" \
  -d '{"title":"更新后的标题","description":"更新后的描述"}'
```

### 创建参与者

```bash
curl -X POST http://localhost:3000/api/cards/{贺卡ID}/participations \
  -H "Content-Type: application/json" \
  -d '{"participantName":"测试参与者","participantEmail":"test@example.com","status":"invited"}'
```

### 获取参与者列表

```bash
curl http://localhost:3000/api/cards/{贺卡ID}/participations
```

### 创建祝福

```bash
curl -X POST http://localhost:3000/api/cards/{贺卡ID}/wishes \
  -H "Content-Type: application/json" \
  -d '{"content":"祝贺你工作周年快乐！","participantName":"测试祝福者","participantEmail":"wisher@example.com"}'
```

### 获取祝福列表

```bash
curl http://localhost:3000/api/cards/{贺卡ID}/wishes
```

### 删除祝福

```bash
curl -X DELETE http://localhost:3000/api/cards/{贺卡ID}/wishes/{祝福ID}
```

## 故障排除

如果测试失败，请检查以下几点：

1. 确保开发服务器正在运行
2. 确保数据库连接正常
3. 检查错误消息，了解具体问题
4. 查看服务器日志，获取更多信息