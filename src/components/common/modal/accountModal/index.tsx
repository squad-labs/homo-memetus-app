import React, { ReactNode, useCallback, useRef } from "react";
import styles from "@/components/common/modal/accountModal/AccountModal.module.scss";
import classNames from "classnames/bind";
import { ModalParamManager } from "@/shared/types/ui/modal";
import BaseModal from "@/components/base/modal/baseModal";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "@/states/global/slice/modal";
import { useOnClick } from "@/shared/hooks/useOnClick";
import { useConnect } from "@/states/partial/wallet/WalletProvider";
import { getShortenAddr } from "@/shared/utils/format";
import WalletLogo from "@/components/base/logo/walletLogo";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import SampleProfile from "@/public/sample/sample-profile.png";

const cx = classNames.bind(styles);

type Props = {
  params: (typeof ModalParamManager)["account-modal"];
};

const AccountModal = ({ params }: Props) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const { disconnect } = useWallet();
  const { address, wallet } = useConnect();

  const handleClose = useCallback(() => {
    dispatch(CLOSE_MODAL({ key: "account-modal" }));
  }, []);

  useOnClick({ ref: modalRef, handler: handleClose, mouseEvent: "click" });
  return (
    <BaseModal>
      <div className={cx("modal-wrapper")}>
        <div className={cx("modal")} ref={modalRef}>
          <div className={cx("account-image-wrapper")}>
            <Image
              src={SampleProfile}
              alt={"user"}
              fill
              priority
              quality={100}
              className={cx("account-image")}
            />
          </div>
          <div className={cx("account-info-wrapper")}>
            <div className={cx("account-item")}>
              <span className={cx("account-item-text")}>@resister-boy</span>
            </div>
            <div className={cx("account-item")}>
              <span className={cx("account-item-text")}>
                {address && getShortenAddr(address, 12)}
              </span>
            </div>
            <div className={cx("wallet-item")}>
              <span className={cx("wallet-item-text")}>{wallet}</span>
              {wallet && <WalletLogo walletName={wallet} />}
            </div>
            <div className={cx("button-wrapper")}>
              <button className={cx("button")} onClick={handleClose}>
                <span className={cx("button-text")}>Close</span>
              </button>
              <button
                className={cx("button")}
                onClick={() => {
                  disconnect();
                  handleClose();
                }}
              >
                <span className={cx("button-text")}>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default AccountModal;
