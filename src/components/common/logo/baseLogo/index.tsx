import React from "react";
import styles from "@/components/common/logo/baseLogo/BaseLogo.module.scss";
import classNames from "classnames/bind";
import Logo from "@/public/logo/base-logo.svg";
import Link from "next/link";

const cx = classNames.bind(styles);

const BaseLogo = () => {
  return (
    <Link href={"/"} className={cx("logo-container")}>
      <Logo viewBox="0 0 1024 1024" className={cx("logo")} />
    </Link>
  );
};

export default BaseLogo;
