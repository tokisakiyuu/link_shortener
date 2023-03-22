# 短链接生成

[***实验项目，不要用于正式用途***]

全栈零成本开发，从想法到上线没有产生任何金钱支出，如果作为一个小范围内使用的工具类网站的话还可以承诺长期都不会产生金钱支出。此仓库中的代码不是重点。

在线体验：[https://tksk.eu.org/](https://tksk.eu.org/)

## "Free Plan"

以下是本项目用到的免费资源。

### 域名

[eu.org](https://nic.eu.org/) 这个组织长期提供永久免费的二级域名。需申请和审核，但审核门槛非常低，一旦审核通过，就获得了这个域名的永久归属且不用续约。

### CDN

[cloudflare](https://www.cloudflare.com/) 提供免费的CDN网络服务和应用防火墙服务。使用没有门槛。前面得到的免费域名就交给它来管理。

### 数据库

[planetscale](https://planetscale.com) 提供免费的MySQL数据库和备份服务，容量5G，读写次数每月有限额，但是个人使用几乎用不完的。

### 网站静态内容托管和Serverless服务

由 [vercel](https://vercel.com/) + [nextjs](https://nextjs.org/) 提供长期的托管服务，虽然也有每月限额，但是依然是个人几乎是用不完。

## 本地运行

1. 安装依赖

```bash
pnpm install
```

2. 在根目录创建`.env`文件并参照`.env.example`填入相关环境变量

3. 初始化数据库

```bash
npm run push-db
```

4. 开始调试运行

```bash
npm run dev
```