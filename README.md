# PulseWatch 官方文档

Web 应用性能与用户体验监控平台的公开文档站，基于 Nuxt 3、Nuxt UI Pro 与 Nuxt Content 构建。

## 文档范围

- 产品介绍与核心概念
- 访问、性能、错误和业务事件能力
- LCP、INP、CLS、FCP、TTFB、TBT 等指标说明
- Browser SDK 安装、配置与 API 参考
- 隐私和数据采集边界
- 项目管理、免费额度和会员规划

## 本地开发

```bash
pnpm install
pnpm dev
```

默认访问 `http://localhost:3000`。

## 检查与构建

```bash
pnpm typecheck
pnpm lint
pnpm generate
```

生产构建前设置公开地址，以生成正确的 Open Graph 图片 URL：

```bash
NUXT_PUBLIC_SITE_URL=https://docs.example.com pnpm generate
```

构建结果位于 `.output/public`，可部署到静态托管服务。
