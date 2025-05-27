import toast from "react-hot-toast";
import { AlertType } from "../types";

export const showAlert = (message: string, type: AlertType) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
};
