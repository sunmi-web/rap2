import { AnchorButton, Button, Divider, H5 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { CURD } from '@components/curd';
import { Dashboard } from '@components/domains/dashboard';
import { Flex } from '@components/layout/flex';
import { Organization } from '@server/organization/organization.entity';
import { Page } from '@components/page';
import React from 'react';
import { org } from '@helpers/page-props';

export default composePageProps(org)(() => {
  const { org } = usePageProps<{ org: Organization }>();
  return (
    <Page>
      <Page.Navbar />
      <Flex>
        <Page.Sider>
          <Dashboard.Switcher name={org.name} />
          <Divider />
          <Flex align="center" justify="space-between">
            <H5 style={{ marginBottom: 0 }}>仓库</H5>
            <AnchorButton
              icon="git-repo"
              intent="success"
              href={`/orgs/${org.name}/repositories/new`}
              text="新增"
            />
          </Flex>
          <Dashboard.Navlist
            icon="git-repo"
            dataSource={org.repositories}
            itemHref={record => `/repositories/${record.id}`}
          />
        </Page.Sider>
        <Flex.Auto>
          <Page.Content>
            <AnchorButton minimal intent="primary">
              编辑
            </AnchorButton>
            <CURD.Delete
              alertWhen
              successGoto="/"
              action={`/api/organization/${org.id}`}
              button={
                <Button intent="danger" minimal text="退出并删除这个组织" />
              }
            />
            <Page.EmberedError visible code={503} />
          </Page.Content>
        </Flex.Auto>
      </Flex>
    </Page>
  );
});
