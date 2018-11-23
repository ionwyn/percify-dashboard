import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { appsConfigs } from 'main/content/apps/appsConfigs';
import { pagesConfigs } from 'main/content/pages/pagesConfigs';
import { authRoleExamplesConfigs } from 'main/content/auth/authRoleExamplesConfigs';
import { LoginConfig } from 'main/content/login/LoginConfig';
import { RegisterConfig } from 'main/content/register/RegisterConfig';
import { LogoutConfig } from 'main/content/logout/LogoutConfig';

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  LoginConfig,
  RegisterConfig,
  LogoutConfig,
];

export const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/login" />,
  },
];
