# Next Social

## 介绍

[项目架构设计图](https://app.eraser.io/workspace/XfdaSgLZICzlB04g9TMY)

### 涉及技术栈

- Next15
- React19
- TypeScript5
- TailwindCSS
- Clerk(Auth、User management)
- svix (本地开发时，使用 webhooks 同步用户数据到本地数据时需要进行一些配置（ngrok 本地代理一个域名服务到 clerk）)

### 启动项目

1. 创建 `.env` 文件

项目环境配置文件，创建该文件后，根据你电脑环境的相关配置进行配置。

```bash
cp .env.example .env
```

1. start docker

本项目数据服务采用 `docker` 进行托管，所以确保你的电脑已经安装好了 `docker`， 这里提供了一个脚本（`start-database.sh`）进行创建和运行所需的 `docker` 容器。

```bash
./start-database.sh
```

2. init db

> 首次启动项目才需要执行此命令

```bash
npx prisma migrate dev --name init
```
