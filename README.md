<p align="center">
  <a href="https://lex-land.online" target="blank"><img src="./static/images/logo.svg" width="150" alt="Lex Logo" /></a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/lex-land/lex" target="blank"><img src="https://circleci.com/gh/lex-land/lex.svg?style=svg" alt="CircleCI" /></a>
</p>

Lex 是一个接口文档管理工具，是在 Rap2 的想法上重新架构的一个产品。相比 Swagger UI、sosoApi、showDoc 等工具，Lex 主要做的不仅仅把接口呈现出来，更多的是提供结构化的接口定义去为前端的 mock 数据、自动化接口测试、批量测试用例覆盖等一系列配合上下游的协作。

## Environment

- node
- docker
- docker-compose
- mysql
- nginx

## Start

```shell
# 安装依赖
npx yarn

# 使用server/migration/sql/init-db.sql进行数据库初始化并启动两个容器
# 一个是mysql5.6，它会把数据挂载在cache目录做持久化存储
# 另一个是phpmyadmin，会启动一个数据库管理工具
npm run start:server

# 运行开发环境，使用本地docker内的mysql
npm run start:dev
```

成功运行开发环境后

- 查看 [http://localhost:3000](http://localhost:3000)
- 查看 [http://localhost:3001](http://localhost:3001)，可以访问 API
- 查看 [http://localhost:8080](http://localhost:8080)，可以进入 phpmyadmin 进行数据库管理

## Docker

- [lexland/lex](https://cloud.docker.com/u/lexland/repository/docker/lexland/lex)
- [lexland/lex-server](https://cloud.docker.com/u/lexland/repository/docker/lexland/lex-server)

## Roadmap

- [ ] Brand/UI/VI
  - [x] 使用[blueprint](https://blueprintjs.com/docs/#core)代替 bootstrap
  - [x] 使用一个更酷的名字代替 rap, 它叫[Lex](https://zh.wikipedia.org/wiki/%E9%9B%B7%E5%85%8B%E6%96%AF%C2%B7%E8%B7%AF%E7%91%9F)
  - [x] 重新设计 logo
- [ ] Tech/Arch
  - [x] 使用 nestjs 代替 koa, 使用 Next 9
  - [x] 使用 nextjs 作为写 React 的姿势，代替 create-react-app
  - [x] 使用 typeorm 代替 sequelize-typescript
  - [x] 轻状态管理，使用 hooks 进行状态逻辑复用
  - [x] 使用 styled-component 进行组件样式重构，移除已有 less
  - [x] 前后端拆分， 服务端项目为[lex-server](https://github.com/lex-land/lex-server)
  - [ ] 不断优化 helpers、components、core、pages 之间的关系
- [ ] Pruduct
  - [ ] 完成与 Rap 的功能
    - [x] 页面异常处理。
      - [x] 异常页面，包含 401、403、404、500、503 等
      - [x] nginx 的 502 页面
    - [x] join 页面
    - [x] login 页面
    - [ ] 优先完成 repo 仓库模块
      - [x] repo/new 页
        - [ ] 添加从 Rap2 迁移功能，方便用户从 Rap2 迁移至 Lex
          - [x] 新增从 JSON 创建仓库
      - [x] repo/[repo_id] 页
      - [x] repo/modules 页
      - [ ] repo/settings 页
        - [x] 仓库删除功能
      - [ ] repo/members 页
        - [x] 成员的新增和删除
      - [ ] 添加仓库 Wiki
        - [ ] 添加接口操作日志
        - [ ] 添加 mock 数据和接口数据的匹配
        - [ ] 添加接口返回码
        - [ ] 添加仓库内公共内容
        - [ ] 添加接口类型，用于复用那些[复杂数据接口](https://blueprintjs.com/docs/#core/components/control-group.props)
    - [ ] users 页
      - [ ] 添加用户角色，前端、后端、测试
    - [ ] orgs 页
    - [ ] settings 页
    - [ ] 权限
- [ ] CI/CD
  - [x] 使用 docker 运行项目的开发环境，为部署做无缝衔接
  - [x] 使用 docker 运行项目的生产环境
  - [x] 支持 CicleCI

## Troubleshooting

```
ERROR in /Users/briefguo/Public/www/lex/node_modules/react-use/lib/useAsyncRetry.d.ts
5:72 ',' expected.
```

https://github.com/streamich/react-use/issues/270


## TODO 

```yaml
version: 2

jobs:
  build:
    docker:
      - image: circleci/node:latest
    steps:
      - checkout
      - run: npx yarn
      # 使用docker内host
      - run: PROD_API_URL=https://lex-land.cloud npm run build
      # https://circleci.com/docs/2.0/building-docker-images/
      # docker 集群分配新的 docker 引擎
      - setup_remote_docker:
          docker_layer_caching: true
      - run: docker login -u $DOCKER_USER -p $DOCKER_PASS
      - run: npm run docker:build
      - run: npm run docker:push
  deploy:
    machine:
      image: ubuntu-1604:201903-01
    steps:
      - checkout
      - add_ssh_keys:
          fingerprints:
            - 'a6:f7:79:2b:9f:58:f2:db:1e:2e:4d:14:95:29:4c:c3'
      - run:
          name: Copy Files
          command: |
            scp -r docker/** $SSH_USER@$SSH_HOST:/root
      - run:
          name: Deploy Over SSH
          command: |
            # docker stack deploy 类似 service xx reload
            ssh $SSH_USER@$SSH_HOST "docker-compose pull && docker stack deploy --compose-file docker-compose.yml lex"

workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build:
          filters:
            branches:
              only: master
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master

```
