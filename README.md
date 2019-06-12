# Lex [![CircleCI](https://circleci.com/gh/sunmi-web/lex/tree/master.svg?style=svg)](https://circleci.com/gh/sunmi-web/lex/tree/master)

## Environment

- node
- docker

## Start

```shell
# 安装依赖
yarn

# 运行开发环境
npm run start:dev
```

成功运行开发环境后，查看 [http://localhost:3000](http://localhost:3000)

## Deploy

```shell
docker pull sunmiorg/lex:latest

docker run sunmiorg/lex:latest
```

## Roadmap

- [x] 使用一个更酷的名字代替 rap, 它叫[Lex](https://zh.wikipedia.org/wiki/%E9%9B%B7%E5%85%8B%E6%96%AF%C2%B7%E8%B7%AF%E7%91%9F)
- [x] 使用 nestjs 代替 koa
- [x] 使用 nextjs 作为写 React 的姿势，代替 create-react-app
- [x] 使用 typeorm 代替 sequelize-typescript
- [x] 使用[blueprint](https://blueprintjs.com/docs/#core)代替 bootstrap
- [x] 使用 docker 运行项目的开发环境，为部署做无缝衔接
- [ ] 轻状态管理，不用 redux，不用 mobx，使用 hooks 进行状态逻辑复用
- [ ] 重新思考 UI 呈现
- [ ] 使用 algolia 全局接口搜索
- [ ] 支持 CicleCI
- [ ] 支持 Jenkins 的 Pipeline 进行 CI/CD
- [ ] 使用 docker 运行项目的生产环境

## New Feature

- [ ] 添加接口操作日志
- [ ] 添加接口返回码
- [ ] 添加仓库内公共内容
- [ ] 添加仓库 Wiki
- [ ] 添加接口类型，用于复用那些[复杂数据接口](https://blueprintjs.com/docs/#core/components/control-group.props)
- [ ] 添加用户角色，前端、后端、测试

## Progress

- [x] 新增 dashboard、join、login、repo 相关页面
- [ ] 新用户注册页面
- [ ] 仓库成员管理页面
- [ ] 仪表盘页面
- [ ] 导航条里的全局搜索
- [ ] 个人中心页
- [ ] 个人中心页/仓库页
- [ ] 个人中心页/设置页

## Troubleshooting

- Q: macOS 下，docker 启动开发环境比直接用 node 启动慢
- A: https://www.google.com/search?newwindow=1&ei=WLj_XKKmN5Lj-Aa6k4GQAw&q=docker-compose+up+%E6%85%A2&oq=docker-compose+up+%E6%85%A2&gs_l=psy-ab.3..35i39.19786.20372..20872...0.0..0.608.1075.4-1j1......0....1..gws-wiz.nQxEVscW-Q4
