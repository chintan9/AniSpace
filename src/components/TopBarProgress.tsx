import "nprogress/nprogress.css";

import { FC, useEffect } from "react";

import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const TopBarProgress: FC = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);
  return <></>;
};

export default TopBarProgress;
