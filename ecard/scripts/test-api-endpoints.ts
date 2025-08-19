/**
 * API 端点测试脚本
 * 
 * 此脚本用于测试所有 API 端点是否正常工作
 * 运行方式: 
 * 1. 先启动开发服务器: npm run dev
 * 2. 然后在另一个终端运行: npx ts-node scripts/test-api-endpoints.ts
 */

import fetch from 'node-fetch';

// 基础 URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// 测试数据
let testCardId: string;
let testParticipationId: string;
let testWishId: string;

/**
 * 检查服务器是否运行
 */
async function checkServerRunning() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * 测试创建贺卡
 */
async function testCreateCard() {
  console.log('测试创建贺卡...');
  
  try {
    const response = await fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '测试用户的1周年庆祝',
        description: '为测试用户庆祝1年工作周年',
        celebrationDate: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`创建贺卡失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    testCardId = data.id;
    console.log('✅ 创建贺卡成功，ID:', testCardId);
    return true;
  } catch (error) {
    console.error('❌ 创建贺卡失败:', error);
    return false;
  }
}

/**
 * 测试获取所有贺卡
 */
async function testGetAllCards() {
  console.log('测试获取所有贺卡...');
  
  try {
    const response = await fetch(`${BASE_URL}/cards`);
    
    if (!response.ok) {
      throw new Error(`获取贺卡失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ 获取贺卡成功，共 ${data.length} 张贺卡`);
    return true;
  } catch (error) {
    console.error('❌ 获取贺卡失败:', error);
    return false;
  }
}

/**
 * 测试获取贺卡详情
 */
async function testGetCardById() {
  console.log(`测试获取贺卡详情 (ID: ${testCardId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}`);
    
    if (!response.ok) {
      throw new Error(`获取贺卡详情失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ 获取贺卡详情成功:', data.title);
    return true;
  } catch (error) {
    console.error('❌ 获取贺卡详情失败:', error);
    return false;
  }
}

/**
 * 测试更新贺卡
 */
async function testUpdateCard() {
  console.log(`测试更新贺卡 (ID: ${testCardId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '测试用户的2周年庆祝（已更新）',
        description: '为测试用户庆祝2年工作周年',
      }),
    });
    
    if (!response.ok) {
      throw new Error(`更新贺卡失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ 更新贺卡成功:', data.title);
    return true;
  } catch (error) {
    console.error('❌ 更新贺卡失败:', error);
    return false;
  }
}

/**
 * 测试创建参与者
 */
async function testCreateParticipation() {
  console.log(`测试创建参与者 (卡片ID: ${testCardId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}/participations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        participantName: '测试参与者',
        participantEmail: 'test@example.com',
        status: 'invited',
      }),
    });
    
    if (!response.ok) {
      throw new Error(`创建参与者失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    testParticipationId = data.id;
    console.log('✅ 创建参与者成功，ID:', testParticipationId);
    return true;
  } catch (error) {
    console.error('❌ 创建参与者失败:', error);
    return false;
  }
}

/**
 * 测试获取参与者列表
 */
async function testGetParticipations() {
  console.log(`测试获取参与者列表 (卡片ID: ${testCardId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}/participations`);
    
    if (!response.ok) {
      throw new Error(`获取参与者列表失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ 获取参与者列表成功，共 ${data.length} 个参与者`);
    return true;
  } catch (error) {
    console.error('❌ 获取参与者列表失败:', error);
    return false;
  }
}

/**
 * 测试创建祝福
 */
async function testCreateWish() {
  console.log(`测试创建祝福 (卡片ID: ${testCardId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: '祝贺你工作周年快乐！',
        participantName: '测试祝福者',
        participantEmail: 'wisher@example.com',
      }),
    });
    
    if (!response.ok) {
      throw new Error(`创建祝福失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    testWishId = data.id;
    console.log('✅ 创建祝福成功，ID:', testWishId);
    return true;
  } catch (error) {
    console.error('❌ 创建祝福失败:', error);
    return false;
  }
}

/**
 * 测试获取祝福列表
 */
async function testGetWishes() {
  console.log(`测试获取祝福列表 (卡片ID: ${testCardId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}/wishes`);
    
    if (!response.ok) {
      throw new Error(`获取祝福列表失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ 获取祝福列表成功，共 ${data.length} 条祝福`);
    return true;
  } catch (error) {
    console.error('❌ 获取祝福列表失败:', error);
    return false;
  }
}

/**
 * 测试删除祝福
 */
async function testDeleteWish() {
  console.log(`测试删除祝福 (卡片ID: ${testCardId}, 祝福ID: ${testWishId})...`);
  
  try {
    const response = await fetch(`${BASE_URL}/cards/${testCardId}/wishes/${testWishId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`删除祝福失败: ${response.status} ${response.statusText}`);
    }
    
    console.log('✅ 删除祝福成功');
    return true;
  } catch (error) {
    console.error('❌ 删除祝福失败:', error);
    return false;
  }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('开始测试所有 API 端点...\n');
  
  // 检查服务器是否运行
  const serverRunning = await checkServerRunning();
  if (!serverRunning) {
    console.error('❌ 错误：无法连接到开发服务器。请确保先运行 npm run dev');
    console.log('提示：在一个终端窗口运行 npm run dev，然后在另一个终端窗口运行此测试脚本');
    return;
  }
  
  // 创建和获取贺卡测试
  const createCardSuccess = await testCreateCard();
  if (!createCardSuccess) {
    console.error('❌ 测试中断：创建贺卡失败，无法继续测试');
    return;
  }
  
  await testGetAllCards();
  await testGetCardById();
  await testUpdateCard();
  
  // 参与者测试
  const createParticipationSuccess = await testCreateParticipation();
  if (!createParticipationSuccess) {
    console.error('❌ 测试中断：创建参与者失败，无法继续测试祝福相关功能');
    return;
  }
  
  await testGetParticipations();
  
  // 祝福测试
  const createWishSuccess = await testCreateWish();
  if (!createWishSuccess) {
    console.error('❌ 测试中断：创建祝福失败，无法继续测试删除祝福功能');
    return;
  }
  
  await testGetWishes();
  await testDeleteWish();
  
  console.log('\n✅ 所有测试完成');
}

// 运行测试
runAllTests().catch(error => {
  console.error('测试过程中发生错误:', error);
});