import React from 'react';
import styles from '@/components/layout/header/Header.module.scss';
import classNames from 'classnames/bind';
import HeaderSearchInput from '@/components/common/input/headerSearchInput';
import ConnectButton from '@/components/common/button/connectButton';
import BaseLogo from '@/components/common/logo/baseLogo';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx('header-container')}>
      <BaseLogo />
      <HeaderSearchInput />
      <ConnectButton />
    </header>
  );
};

export default Header;
