import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  return (
    <div>
      {notify.loading && <Loading />}
      {notify.error && <Toast />}
      {notify.success && <Toast />}
      {notify.info && <Toast />}
    </div>
  );
};

export default Notify;
