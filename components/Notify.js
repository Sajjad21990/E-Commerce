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
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "error" }}
          handleCloseClick={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "success" }}
          handleCloseClick={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
      {notify.info && (
        <Toast
          msg={{ msg: notify.info, title: "info" }}
          handleCloseClick={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
      {notify.warning && (
        <Toast
          msg={{ msg: notify.warning, title: "warning" }}
          handleCloseClick={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
    </div>
  );
};

export default Notify;
