import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessMessage = (msg) => {
  toast.success(`${msg}`, {
    position: "top-right",
  });
};
export const showErrorMessage = (msg) => {
  toast.error(`${msg}`, {
    position: "top-right",
  });
};
