import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Toast = ({ msg, handleCloseClick }) => {
  useEffect(() => {
    setTimeout(() => {
      handleCloseClick();
    }, 3000);
  }, []);

  //return color based on alert type
  const returnColor = (type) => {
    switch (type) {
      case "error":
        return "red";

      case "success":
        return "green";

      case "info":
        return "gray";

      case "warning":
        return "orange";

      default:
        return "gray";
    }
  };

  //return icon based on alert type

  const returnIcon = (type) => {
    switch (type) {
      case "error":
        return faExclamationTriangle;

      case "success":
        return faCheckCircle;

      case "info":
        return faInfoCircle;

      case "warning":
        return faExclamationTriangle;

      default:
        return faInfoCircle;
    }
  };

  return (
    <div className="flex justify-center fixed top-20 left-1/6 w-full z-50">
      <div
        className={`bg-${returnColor(
          msg.title
        )}-100 border-l-4 border-${returnColor(
          msg.title
        )}-400 text-${returnColor(
          msg.title
        )}-700 w-auto px-4 py-3 rounded relative`}
        role="alert"
      >
        <strong className="font-bold pr-3">
          <FontAwesomeIcon icon={returnIcon(msg.title)} />
        </strong>
        <span className="block sm:inline">{msg.msg}</span>

        <strong
          className="font-bold pl-3 cursor-pointer"
          onClick={handleCloseClick}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </strong>
      </div>
    </div>
  );
};

export default Toast;
