import { toast } from "react-toastify";

const success = (message) => {
  toast.success(message, {
    position: "bottom-right",
  });
};

const error = (message) => {
  toast.error(message, {
    position: "bottom-right",
  });
};

const notify = {
  success,
  error,
};

export default notify;
