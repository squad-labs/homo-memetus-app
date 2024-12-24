import React from "react";
import styles from "@/components/common/input/agentGenInput/AgentGenInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AgentGenInput = () => {
  return (
    <div className={cx("input-container")}>
      <input
        type="text"
        aria-label="agent-generate-input"
        className={cx("input")}
        placeholder="write your memecoin trading strategy here.."
      />
    </div>
  );
};

export default AgentGenInput;
