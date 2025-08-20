# SEO 实施指南

本文档提供了 Happy Work Anniversary 平台 SEO 优化的详细实施指南，包括技术实现方法和最佳实践。

## 元标签优化实施指南

### 基础 Meta 标签

在 `layout.tsx` 文件中添加以下基础 meta 标签：

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Happy Work Anniversary | Create & Share Work Anniversary Cards",
    template: "%s | Happy Work Anniversary"
  },
  description: "Create personalized work anniversary cards, collect team messages, and celebrate career milestones with our digital greeting platform.",
  keywords: ["Happy work anniversary", "work anniversary images", "work anniversary messages", "digital cards", "team celebration"],
  authors: [{ name: "Happy Work Anniversary Team" }],
  creator: "Happy Work Anniversary",
  publisher: "Happy Work Anniversary",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.happyworkanniversary.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.happyworkanniversary.net",
    title: "Happy Work Anniversary | Create & Share Work Anniversary Cards",
    description: "Create personalized work anniversary cards, collect team messages, and celebrate career milestones with our digital greeting platform.",
    siteName: "Happy Work Anniversary",
    images: [
      {
        url: "https://www.happyworkanniversary.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Work Anniversary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Work Anniversary | Create & Share Work Anniversary Cards",
    description: "Create personalized work anniversary cards, collect team messages, and celebrate career milestones with our digital greeting platform.",
    images: ["https://www.happyworkanniversary.net/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### 页面特定 Meta 标签

为每个页面创建特定的 meta 标签：

```tsx
// src/app/page.tsx (首页)
export const metadata: Metadata = {
  title: "Create & Share Happy Work Anniversary Cards",
  description: "Create personalized work anniversary cards, collect team messages, and celebrate career milestones with our easy-to-use digital platform.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Create & Share Happy Work Anniversary Cards",
    description: "Create personalized work anniversary cards, collect team messages, and celebrate career milestones with our easy-to-use digital platform.",
  },
};
```

## 结构化数据实现指南

### 面包屑导航结构化数据

```tsx
// 在相关页面组件中添加
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.happyworkanniversary.net"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Create Card",
          "item": "https://www.happyworkanniversary.net/create"
        }
      ]
    })
  }}
/>
```

### FAQ 页面结构化数据

```tsx
// 在 FAQ 页面组件中添加
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a work anniversary?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A work anniversary marks the date an employee started working at their company. It celebrates their loyalty, contributions, and growth within the organization."
          }
        },
        // 添加更多问答...
      ]
    })
  }}
/>
```

## 内容优化指南

### 关键词使用策略

- **标题中的关键词**: 确保核心关键词"Happy work anniversary"出现在H1标签中
- **段落开头**: 在首段中自然融入核心关键词
- **图片优化**: 在图片alt文本中包含关键词
- **内部链接**: 使用关键词作为锚文本链接到相关页面

### 内容结构建议

- 使用清晰的标题层级(H1 > H2 > H3)
- 每个页面只使用一个H1标签
- 段落保持简短(3-5句话)
- 使用项目符号和编号列表增强可读性
- 添加相关图片和视觉元素

## 技术SEO实施指南

### robots.txt 文件

创建 `public/robots.txt` 文件：

```
User-agent: *
Allow: /

Sitemap: https://www.happyworkanniversary.net/sitemap.xml
```

### XML 站点地图

使用 `next-sitemap` 包生成站点地图：

1. 安装依赖：
```bash
npm install next-sitemap --save-dev
```

2. 创建 `next-sitemap.config.js` 文件：
```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.happyworkanniversary.net',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.happyworkanniversary.net/sitemap.xml',
    ],
  },
}
```

3. 在 `package.json` 中添加构建后脚本：
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

## 性能优化指南

### 图片优化

- 使用 Next.js 的 Image 组件
- 实现延迟加载
- 提供适当的尺寸和格式

```tsx
import Image from 'next/image';

<Image
  src="/images/work-anniversary.jpg"
  alt="Happy work anniversary celebration"
  width={800}
  height={600}
  loading="lazy"
/>
```

### CSS 和 JavaScript 优化

- 使用 Next.js 的自动代码分割
- 实现关键CSS内联
- 延迟加载非关键JavaScript

## 监测与分析设置

### Google Search Console 设置

1. 验证网站所有权
2. 提交站点地图
3. 设置性能监测

### Google Analytics 设置

1. 创建 GA4 属性
2. 添加跟踪代码
3. 设置转化目标

## 新页面开发指南

### FAQ 页面结构

```tsx
// src/app/faq/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Anniversary FAQs | Happy Work Anniversary",
  description: "Find answers to frequently asked questions about work anniversaries, celebration ideas, and how to use our digital card platform.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions About Work Anniversaries</h1>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">What is a work anniversary?</h2>
          <p>A work anniversary marks the date an employee started working at their company. It celebrates their loyalty, contributions, and growth within the organization.</p>
        </div>
        
        {/* 添加更多FAQ项目 */}
      </div>
    </div>
  );
}
```

### About Us 页面结构

```tsx
// src/app/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Happy Work Anniversary | Our Mission and Story",
  description: "Learn about Happy Work Anniversary platform, our mission to celebrate workplace milestones, and the team behind our digital card service.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Happy Work Anniversary</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">At Happy Work Anniversary, we believe that celebrating career milestones is essential for building strong workplace relationships and recognizing professional growth.</p>
        {/* 添加更多内容 */}
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">Happy Work Anniversary was founded in 2023 with a simple goal: make it easy for teams to celebrate work anniversaries in a meaningful way, even in remote and hybrid work environments.</p>
        {/* 添加更多内容 */}
      </section>
    </div>
  );
}