import {
  Alignment,
  Classes,
  InputGroup,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
} from '@blueprintjs/core';
import { Avator } from '@components/users';
import { Logo } from '@components/vi';
import React from 'react';
import { User } from '@server/user/user.entity';
import { cleanToken } from '@helpers/secure';
import { usePageProps } from '@core/hooks';

const LoginedNavbar = () => {
  const { session } = usePageProps<{ session: User }>();
  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Logo />
        </NavbarHeading>
        <InputGroup leftIcon="search" placeholder="全局搜索，正在开发中..." />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Popover
          content={
            <Menu>
              <MenuItem text="账户" href={`/users/${session.fullname}`} />
              <MenuItem text="仓库" href={`/repositories`} />
              <MenuDivider />
              <MenuItem text="设置" href="/settings" />
              <MenuItem
                text="退出登录"
                onClick={() => cleanToken()}
                href="/login"
              />
            </Menu>
          }
          position={Position.BOTTOM_RIGHT}
        >
          <Avator user={session} />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};

export default LoginedNavbar;
