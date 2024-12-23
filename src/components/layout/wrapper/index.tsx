import React, { Fragment, ReactNode } from 'react';
import Header from '@/components/layout/header';

type Props = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default LayoutWrapper;
