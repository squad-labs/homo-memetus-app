export type ModalType = 'account-modal';

export const ModalParamManager = {
  'account-modal': {},
};

export type ModalShape = {
  key: ModalType;
  params: (typeof ModalParamManager)[ModalType];
};
