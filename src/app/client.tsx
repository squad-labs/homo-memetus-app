"use client";
import React from "react";
import styles from "@/styles/pages/HomeClient.module.scss";
import classNames from "classnames/bind";
import AgentGenInput from "@/components/common/input/agentGenInput";

const cx = classNames.bind(styles);

const HomeClient = () => {
  return (
    <div className={cx("client-container")}>
      <div className={cx("input-wrapper")}>
        <AgentGenInput />
      </div>
    </div>
  );
};

export default HomeClient;
