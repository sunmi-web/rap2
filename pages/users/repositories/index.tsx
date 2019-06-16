import { H1 } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';

const UsersRepos: NextSFC = () => {
  return (
    <Page>
      <Page.Navbar />
      <div className="page lex-container">
        <H1>仓库列表</H1>
        <Page.EmberedError code={503} />
      </div>
    </Page>
  );
};

UsersRepos.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default UsersRepos;
