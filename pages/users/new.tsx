import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const UsersCreate: NextSFC = () => {
  return <Page authed>NULL</Page>;
};

UsersCreate.getInitialProps = async () => {
  return {
    statusCode: 503,
  };
};

export default UsersCreate;
