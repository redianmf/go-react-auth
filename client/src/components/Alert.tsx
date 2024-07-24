import { HTMLMotionProps, motion } from "framer-motion";
import { LuAlertTriangle, LuCheckCircle, LuInfo } from "react-icons/lu";

import { AlertType } from "../types/types";

interface IAlert extends HTMLMotionProps<"div"> {
  message: string;
  type?: AlertType;
}

const getAlertTypeClass = (alertType: AlertType | undefined) => {
  switch (alertType) {
    case AlertType.ERROR:
      return "bg-red-500";
    case AlertType.WARNING:
      return "bg-yellow-500";
    case AlertType.SUCCESS:
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
};

const getAlertIcon = (alertType: AlertType | undefined) => {
  let Icon;

  switch (alertType) {
    case AlertType.ERROR:
      Icon = LuAlertTriangle;
      break;
    case AlertType.WARNING:
      Icon = LuAlertTriangle;
      break;
    case AlertType.SUCCESS:
      Icon = LuCheckCircle;
      break;
    default:
      Icon = LuInfo;
      break;
  }

  return <Icon className="mr-2 text-xl" />;
};

const Alert = ({ message, type, ...rest }: IAlert) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 100 }}
      data-testid="component-alert"
      className={`p-3 w-full rounded text-white font-bold flex items-center ${getAlertTypeClass(type)}`}
    >
      {getAlertIcon(type)}
      <p>{message}</p>
    </motion.div>
  );
};

export default Alert;
