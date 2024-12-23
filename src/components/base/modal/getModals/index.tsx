import AccountModal from '@/components/common/modal/accountModal';
import { ModalParamManager, ModalType } from '@/shared/types/ui/modal';
import React, { ReactNode } from 'react';

type Props = {
  modalName: ModalType;
  modalParams: (typeof ModalParamManager)[ModalType];
};

const GetModals = ({ modalName, modalParams }: Props) => {
  switch (modalName) {
    case 'account-modal': {
      return <AccountModal params={modalParams} />;
    }
    default: {
      null;
    }
  }
};

export default GetModals;
