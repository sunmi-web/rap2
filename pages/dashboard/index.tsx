import './index.less';
import { AnchorButton, Divider } from '@blueprintjs/core';
import { AvatorNav } from '@components/navs/avator';
import Error from '@components/errors';
import { ListHeader } from '@components/headers';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { SiderPanel } from '@components/navs/sider-panel';
import { User } from '@server/user/user.entity';
import { usePageProps } from '@helpers/hooks';

const DashboardIndex: NextSFC = () => {
  const { user } = usePageProps<{ user: User }>();
  return (
    <Page authed>
      <div className="dashboard">
        <SiderPanel className="dashboard-sidebar">
          <AvatorNav name={user.fullname} />
          <Divider />
          <ListHeader
            title="仓库"
            rightElement={
              <AnchorButton
                icon="git-repo"
                intent="success"
                href={`/users/${user.fullname}/repositories/new`}
                text="新增"
              />
            }
          />
          <NavList
            itemIcon="git-repo"
            rowKey="repository_id"
            itemRoute="repositories/show"
            dataSource={user.joinedRepositories.concat(user.ownedRepositories)}
          />
          <Divider />
          <ListHeader title="团队" />
        </SiderPanel>
        <div className="dashboard-content">
          <Error code={503} embered />
          {/* <div>我的团队成员动态</div>
          <div>我加入仓库的动态</div> */}
        </div>
      </div>
    </Page>
  );
};

DashboardIndex.getInitialProps = async ctx => {
  // 没有token重定向到login
  if (!ctx.getToken()) {
    return ctx.redirect('/login');
  }
  return {
    user: await ctx.http.get('/api/session/user'),
  };
};

export default DashboardIndex;
