import { Callout, H1, MenuItem } from '@blueprintjs/core';
import React, { useState } from 'react';
import { composePageProps, usePageProps } from '@/core/PageProps';
import { repo, user } from '@/helpers/page-props';
import { Flex } from '@/components/layout/flex';
import { MultiSelect } from '@blueprintjs/select';
import { Page } from '@/components/Page';
import { Repo } from '@/components/domains/repo';
import { Repository } from '@/interfaces/Repository';
import { User } from '@/interfaces/User';
// import { createHttpUtil } from '@/core/HttpUtil';

// const httpUtil = createHttpUtil();
const MemberMultiSelect = MultiSelect.ofType<any>();

export default composePageProps(repo, user.all, user.session)(() => {
  const { repo, allUsers: users, session } = usePageProps<{
    repo: Repository;
    allUsers: User[];
    session: User;
  }>();
  const [selectedItems, setSelectedItems] = useState(
    repo.members.map(i => ({ ...i, name: i.fullname })),
  );
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <Callout intent="primary">
              {session.id === repo.owner.id
                ? `You ownered this repository`
                : `${repo.owner.fullname} ownered this repository`}
            </Callout>
            <br />
            <H1>Members</H1>
            <MemberMultiSelect
              itemRenderer={(item, { handleClick }) => (
                <MenuItem
                  icon={item.checked && 'tick'}
                  key={item.id}
                  onClick={handleClick}
                  label={item.name}
                />
              )}
              items={users
                .filter(user => user.id !== session.id)
                .map(user => ({
                  id: user.id,
                  name: user.fullname,
                  checked: selectedItems.map(i => i.id).includes(user.id),
                }))}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={item => {
                item.checked = !item.checked;
                if (selectedItems.map(i => i.id).includes(item.id)) {
                  // remove
                  selectedItems.splice(
                    selectedItems.findIndex(i => i.id === item.id),
                    1,
                  );
                  // httpUtil.delete(`/api/repository/${repo.id}/members`, item);
                  setSelectedItems([...selectedItems]);
                } else {
                  // add
                  selectedItems.push(item);
                  // httpUtil.post(`/api/repository/${repo.id}/members`, item);
                  setSelectedItems([...selectedItems]);
                }
              }}
              tagRenderer={item => item.name}
              tagInputProps={{
                onRemove: (item, index) => {
                  // httpUtil.delete(
                  //   `/api/repository/${repo.id}/members`,
                  //   selectedItems[index],
                  // );
                  selectedItems.splice(
                    selectedItems.findIndex(
                      i => i.id === selectedItems[index].id,
                    ),
                    1,
                  );
                  setSelectedItems([...selectedItems]);
                },
              }}
              selectedItems={selectedItems}
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
