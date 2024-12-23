"use client";
import React from "react";
import styles from "@/styles/pages/HomeClient.module.scss";
import classNames from "classnames/bind";
import {
  SystemProgram,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

const HomeClient = () => {
  const router = useRouter();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  return <div className={cx("client-container")}></div>;
};

export default HomeClient;
