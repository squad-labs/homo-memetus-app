"use client";
import LayoutWrapper from "@/components/layout/wrapper";
import React, { Fragment, ReactNode, useLayoutEffect } from "react";
import { getCookie } from "cookies-next";
import { ThemeType } from "@/shared/types/etc/theme";
import { useSelector } from "react-redux";
import { getModalList } from "@/states/global/slice/modal";
import GetModals from "@/components/base/modal/getModals";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const theme = getCookie("theme") as ThemeType;
  const modalList = useSelector(getModalList);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme ? theme : "dark");
  }, []);

  return (
    <Fragment>
      <LayoutWrapper>{children}</LayoutWrapper>
      {modalList.map((modal, index) => {
        return (
          <div key={`${modal.key}-${index}`}>
            <GetModals modalName={modal.key} modalParams={modal.params} />
          </div>
        );
      })}
    </Fragment>
  );
};

export default AppProvider;
